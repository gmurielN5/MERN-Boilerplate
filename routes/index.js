const express = require("express")
const article = require("../models/article")
const router = express.Router()
const Article = require("../models/article")

// Get all Public Posts
router.get("/public", async (req, res) => {
  try {
    const articles = await Article.find({})
      .sort({ publishedDate: "desc" })
      .populate("author")
    return res.status(200).json({
      articles,
      message: { msgBody: "articles succesfully fetched", msgError: false },
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: { msgBody: "Something went wrong", msgError: true } })
  }
})

module.exports = router
