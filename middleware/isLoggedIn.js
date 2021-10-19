const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/keys");
// const mongoose = require("mongoose");
// const Admin = mongoose.model("User");
const Admin = require("../models/admin");

module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (!jwt.JsonWebTokenError) {
    res.status(401).json({ error: "You must be logged in" });
  }
  const TOKEN = token;
  jwt.verify(TOKEN, "secret", (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    Admin.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
