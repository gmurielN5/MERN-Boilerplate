const express = require("express");
const passport = require("passport");
const requireJwtAuth = require("../Middleware/RequireJWAuth");
const parser = require("../Middleware/Cloudinary");

const User = require("../models/user");
const Article = require("../models/article");

const UserRoute = express.Router();

// Get user info with id as params // Profile //
UserRoute.get("/:id", requireJwtAuth, async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      res
        .status(404)
        .json({ message: { msgBody: "No user found.", msgError: true } });
    }
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return next(error);
  }
});

//Update user Profile Info

UserRoute.put(
  "/:id",
  [requireJwtAuth, parser.single("avatar")],
  async (req, res, next) => {
    try {
      const ReqUser = await User.findById(req.params.id);
      if (!ReqUser)
        return res
          .status(404)
          .json({ message: { msgBody: "User doesn't exist", msgError: true } });
      if (!(ReqUser.id === req.user.id))
        return res.status(400).json({
          message: { msgBody: "Authorization denied", msgError: true },
        });

      let avatarPath = null;
      if (req.file) {
        avatarPath = req.file.path;
      }

      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser && existingUser.id !== ReqUser.id) {
        return res.status(400).json({
          message: { msgBody: "Username already exist", msgError: true },
        });
      }

      if (req.body.username === "") {
        return res.status(400).json({
          message: { msgBody: "Username is required", msgError: true },
        });
      }

      const updatedUser = {
        avatar: avatarPath,
        username: req.body.username,
        bio: req.body.bio,
      };
      Object.keys(updatedUser).forEach(
        (k) =>
          !updatedUser[k] &&
          updatedUser[k] !== undefined &&
          delete updatedUser[k]
      );
      const user = await User.findByIdAndUpdate(
        ReqUser.id,
        { $set: updatedUser },
        { new: true }
      );

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          bio: user.bio,
          avatar: user.avatar,
        },
        message: {
          msgBody: "user profile edited successfully",
          msgError: false,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
);

// Delete User

UserRoute.delete("/:id", requireJwtAuth, async (req, res, next) => {
  try {
    const ReqUser = await User.findById(req.params.id);
    if (!ReqUser)
      return res
        .status(404)
        .json({ message: { msgBody: "User doesn't exist", msgError: true } });
    if (ReqUser.id !== req.user.id)
      return res
        .status(401)
        .json({ message: { msgBody: "Authorization denied", msgError: true } });

    const articles = await Article.remove({ author: ReqUser.id });
    const user = await User.findByIdAndDelete({ _id: ReqUser.id });

    return res.status(200).json({
      user,
      articles,
      message: {
        msgBody: "user profile deleted successfully",
        msgError: false,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = UserRoute;
