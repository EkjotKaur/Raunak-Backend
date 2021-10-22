require("dotenv").config();
var express = require("express");
var router = express.Router();
var server = require("http").createServer(express());
var io = require("socket.io")(server);
const path = require("path");
const controller = require("../controller/index");
const emailController = require("../controller/emailController");
const paytmController = require("../controller/paytmController");
const paymentController = require("../controller/paymentController");
const isLoggedin = require("../middleware/isLoggedIn.js");

/* GET home page. */
router.get("/", controller.getHomePage);

router.post("/", emailController.sendMail);

// router.get("/donations", isLoggedin, controller.donation);
router.get("/donations", controller.donation);

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ status: true, message: "Logout successful!" });
});

router.post("/payment", paymentController.payment);

router.get("/thanks", controller.thanks);

router.get("/paymentfailed", paymentController.paymentFailed);

router.post("/hook", emailController.hook);

router.post("/paytm", paytmController.paytm);

router.post("/verify", controller.verify);

router.post("/image", controller.addImg);

module.exports = router;
