const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
