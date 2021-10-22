const Donator = require("../models/donations");

exports.getHomePage = (req, res) => {
  Donator.find({ verified: true }, (err, donators) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    } else {
      Donator.find({ verified: true })
        .then((allfetched) => {
          let amount = Math.round(
            allfetched.reduce((acc, val) => acc + parseFloat(val.amount), 0)
          );
          // let amount = allfetched.reduce((acc, val) => acc + parseFloat(val.amount), 0);

          let count = allfetched.length;
          //   res.render("index", { donators: donators, amount, count });
          res.status(200).json({
            status: true,
            data: { donators: donators, amount, count },
          });
        })
        .catch((err) =>
          //   res.render("error", {
          //     error: err,
          //     message: "error aagaya bhai mongodb m!!",
          //   })
          res
            .status(500)
            .json({ status: false, message: "Something went wrong!" })
        );
    }
  })
    .sort({ _id: -1 })
    .limit(10);
};

exports.donation = (req, res) => {
  // if (req.isAuthenticated()) {
  console.log("Donation");
  Donator.find()
    .sort("-createdAt")
    .then((donators) => {
      // if (err) {
      //   console.log(err);
      //   res
      //     .status(500)
      //     .json({ status: false, message: "Something went wrong!" });
      // else {
      // res.render("donations", { donators: donators });
      res.status(200).json({
        status: true,
        data: {
          donators: donators,
        },
      });
      // }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    });
  // Donator.find({}, (err, donators) => {});
};

exports.thanks = async (req, res) => {
  Donator.findOne({ payment_id: req.query.payment_id })
    .then((newDonatorCreated) => {
      console.log("added to db successfully");

      console.log(JSON.stringify(newDonatorCreated));

      //   res.render("thanks", {
      //     donate: JSON.stringify(newDonatorCreated),
      //     currency: newDonatorCreated.currency,
      //     amount: newDonatorCreated.amount,
      //   });
      res.status(200).json({
        status: true,
        data: {
          donate: JSON.stringify(newDonatorCreated),
          currency: newDonatorCreated.currency,
          amount: newDonatorCreated.amount,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ status: false, message: "Something went wrong!" });
    });
};

exports.addImg = (req, res) => {
  Donator.findOne({ payment_id: req.body.payment_id })
    .then((user) => {
      user.verificationImg = req.body.url;
      user
        .save()
        .then((savedUser) => {
          res.status(200).json({
            status: true,
            data: savedUser,
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ status: false, message: "Something went wrong!" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    });
};

exports.verify = (req, res) => {
  Donator.findOne({ payment_id: req.body.payment_id })
    .then((user) => {
      user.verified = req.body.verified;
      user.amount = req.body.amount;
      user
        .save()
        .then((savedUser) => {
          res.status(200).json({
            status: true,
            data: savedUser,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ status: false, message: "Something went wrong!" });
        });
    })
    .catch((err) => {
      res.status(500).json({ status: false, message: "Something went wrong!" });
    });
};
