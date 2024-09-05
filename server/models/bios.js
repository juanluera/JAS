const mongoose = require("mongoose");

const BiosSchema = new mongoose.Schema({
  bios: String,
  userId: String,
});

// compile model from schema
module.exports = mongoose.model("bios", BiosSchema);