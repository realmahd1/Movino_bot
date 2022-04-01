const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  username: { type: String },
  date: { type: String }
});

const StartModel = mongoose.model("userStart", schema);

module.exports = StartModel;
