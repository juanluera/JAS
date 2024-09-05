const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema({
  tags: String,
  userId: String,
});

// compile model from schema
module.exports = mongoose.model("tags", TagsSchema);