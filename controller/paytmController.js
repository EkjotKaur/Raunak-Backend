const Donator = require("../models/donations");

exports.paytm = async (req, res) => {
  const body = req.body;

  let paytmCount = await Donator.count({ method: "paytm" });
  if (!paytmCount) paytmCount = 0;

  let newDonator = new Donator({
    email: body.email,
    contact: body.contact,
    method: "paytm",
    amount: body.amount,
    currency: "INR",
    order_id: "paytm_order_" + (paytmCount + 1),
    payment_id: "paytm_id_" + (paytmCount + 1),
    verified: false,
    date_created: Date.now(),
  });

  try {
    // const existingDoner = await Donator.findOne({
    //   email: newDonator.email,
    //   method: "paytm",
    // });

    // if (existingDoner) {
    //   //   return res.redirect("/");
    //   return res.status(400).json({ status: false, message: "User exists" });
    // }

    let savedDonator;
    try {
      savedDonator = await newDonator.save();
    } catch (err) {
      res.status(500).json({ status: false, message: "Something went wrong!" });
    }
    console.log(savedDonator);
    // return res.render("paytm");
    res.status(200).json({ status: true, data: { savedDonator } });
  } catch (error) {
    // res.redirect("/");
    res.status(500).json({ status: false, message: "Something went wrong!" });
  }
};
