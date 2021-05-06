const express = require("express");
const ContentRouter = express.Router();
const User = require("../models/user");
const requireJwtAuth = require("../Middleware/RequireJWAuth");
const parser = require("../Middleware/Cloudinary");

const articleController = require("../controllers/articleController");

// Get all articles List from specific user
ContentRouter.get("/:username", articleController.article_get);

// Post article
ContentRouter.post(
  "/:username",
  requireJwtAuth,
  parser.single("img"),
  articleController.article_post
);

// Get article by Id
ContentRouter.get("/:username/:id", articleController.article_detail);

// Update article by id
ContentRouter.put(
  "/:username/:id",
  requireJwtAuth,
  articleController.article_update
);

// Delete article by id
ContentRouter.delete(
  "/:username/:id",
  requireJwtAuth,
  articleController.article_delete
);

module.exports = ContentRouter;
