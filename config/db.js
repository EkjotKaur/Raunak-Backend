var mongoose = require("mongoose");
require("dotenv").config();
// ////MONGO_URL_DEV = mongodb//localhost:27017/raunak
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
