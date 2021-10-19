var Razorpay = require("razorpay");

// let rzr = new Razorpay({
//   key_id: process.env.KEY_ID,
//   key_secret: process.env.KEY_SECRET,
// });

exports.paymentFailed = (req, res, next) => {
  const error = {
    status: req.query.code,
  };
  const message = req.query.description;
  res.json({ data: { error: error, message: message } });

  // var reason = req.query.reason;
  //   res.render("error", {error: error, message: message});
};

exports.payment = async (req, res, next) => {
  console.log(req.body.amount);

  let callbackUri = "http://localhost:3000/thanks";

  if (process.env.NODE_ENV == "production") {
    callbackUri = req.protocol + "://" + req.get("host") + "/thanks";
  }

  console.log(callbackUri);

  var options = {
    amount: parseFloat(req.body.amount) * 100,
    currency: "INR",
  };

  //   rzr.orders.create(options, function (err, order) {
  //     if (!err) {
  //       console.log(order);
  //       res.render("payment", {
  //         order_id: order.id,
  //         amount: order.amount,
  //         callbackUri,
  //       });
  //     } else {
  //       res.render("error", { error: err, message: "Something went wrong." });
  //     }
  //   });
};
