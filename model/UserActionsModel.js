const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  username: { type: String },
  section: { type: String },
  message: { type: String },
  date: { type: String }
});

const UserActionsModel = mongoose.model("userActions", schema);

module.exports = UserActionsModel;
