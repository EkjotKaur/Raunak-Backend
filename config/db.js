var mongoose = require("mongoose");
require("dotenv").config();

let URI = process.env.MONGO_URL_DEV;

if (process.env.NODE_ENV == "production") {
  URI = process.env.MONGO_URL_PROD;
}
const connectDB = async () => {
  try {
    // console.log(process.env);
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }

  console.log("db connected");
};

module.exports = connectDB;
