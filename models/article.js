const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subtitle: String,
  body: String,
  img: {
    type: String,
  },
  publishedDate: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: true },
});

module.exports = mongoose.model("Article", articleSchema);
