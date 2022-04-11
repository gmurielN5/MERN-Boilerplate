const Article = require("../models/article");
const User = require("../models/user");

// // Get all article from specific user with req.params.username
exports.article_get = async (req, res, next) => {
  try {
    const user = await User.find({ username: req.params.username });
    const userId = user.map((u) => u._id);
    const ReqUserId = userId.toString();
    if (!ReqUserId)
      return res.status(404).json({
        message: { msgBody: "Username doesn't exist", msgError: true },
      });
    const articles = await Article.find({ author: ReqUserId })
      .sort({ publishedDate: "desc" })
      .populate("author")
      .exec();
    return res.status(200).json({
      articles,
    });
  } catch (error) {
    return next(error);
  }
};

// // Post article
exports.article_post = async (req, res, next) => {
  try {
    const ReqUser = await User.find({ username: req.params.username });
    const userId = ReqUser.map((u) => u._id);
    const ReqUserId = userId.toString();
    if (!ReqUserId)
      return res.status(404).json({
        message: { msgBody: "Username doesn't exist", msgError: true },
      });
    if (ReqUserId !== req.user.id)
      return res
        .status(400)
        .json({ message: { msgBody: "Authorization denied", msgError: true } });

    let imgPath = null;
    if (req.file) {
      imgPath = req.file.path;
    }

    let article = await Article.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body,
      hidden: req.body.hidden,
      img: imgPath,
      author: ReqUserId,
    });

    const usertoUpdate = await User.findById(ReqUserId);
    usertoUpdate.articles.push(article);
    await usertoUpdate.save();

    article = await article.populate("author").execPopulate();

    return res.status(201).json({
      article,
      message: { msgBody: "article succesfully created", msgError: false },
    });
  } catch (error) {
    return next(error);
  }
};

// Get article by Id
exports.article_detail = async (req, res, next) => {
  try {
    const ReqUser = await User.find({ username: req.params.username });
    const [user] = ReqUser;
    if (!user)
      return res.status(404).json({
        message: { msgBody: "Username doesn't exist", msgError: true },
      });
    const { id } = user;

    const article = await (
      await Article.findOne({ _id: req.params.id, author: id }).populate(
        "author"
      )
    ).execPopulate();
    return res.status(200).json({
      article,
    });
  } catch (error) {
    return next(error);
  }
};

// Update article by id
exports.article_update = async (req, res, next) => {
  try {
    const ReqUser = await User.find({ username: req.params.username });
    const [user] = ReqUser;
    if (!user)
      return res.status(404).json({
        message: { msgBody: "Username doesn't exist", msgError: true },
      });
    const { id } = user;
    if (id !== req.user.id)
      return res
        .status(400)
        .json({ message: { msgBody: "Authorization denied", msgError: true } });

    const updatedArticle = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body,
    };
    const article = await Article.findByIdAndUpdate(
      { _id: req.params.id, author: req.user._id },
      updatedArticle,
      { new: true },
      (err, article) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Something went wrong. Profile not updated",
              msgError: true,
            },
          });
          return next(err);
        }
        return res.status(201).json({
          article,
          message: { msgBody: "article succesfully updated", msgError: false },
        });
      }
    );
  } catch (error) {
    return next(error);
  }
};

// Delete article by id
exports.article_delete = async (req, res, next) => {
  try {
    const ReqUser = await User.find({ username: req.params.username });
    const [user] = ReqUser;
    if (!user)
      return res.status(404).json({
        message: { msgBody: "Username doesn't exist", msgError: true },
      });
    const { id } = user;
    if (id !== req.user.id)
      return res
        .status(400)
        .json({ message: { msgBody: "Authorization denied", msgError: true } });

    const article = await Article.findByIdAndDelete(
      { _id: req.params.id, author: req.user._id },
      (err, article) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Something went wrong. Profile not updated",
              msgError: true,
            },
          });
          return next(err);
        }
        return res.json(article);
      }
    );
  } catch (error) {
    return next(error);
  }
};
