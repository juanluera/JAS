const mongoose = require("mongoose");

//define a story schema for the database
const RoomSchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  room_name: String,
  tag: String
});

// compile model from schema
module.exports = mongoose.model("room", RoomSchema);