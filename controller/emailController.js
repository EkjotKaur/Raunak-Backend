const nodemailer = require("nodemailer");
const Donator = require("../models/donations");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rauankh.techsoc@gmail.com",
    pass: "RaunakhTechOctaveSoc2019-2023",
  },
});

exports.sendMail = (req, res) => {
  const contactContent = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };

  const contactOptions = {
    from: "rauankh.techsoc@gmail.com",
    to: "rauankh.techsoc@gmail.com",
    subject: "[Raunakh] " + contactContent.subject,
    text:
      contactContent.name +
      " sent you a message : \n" +
      JSON.stringify(contactContent.message) +
      "\n email id: " +
      contactContent.email,
  };

  transporter.sendMail(contactOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ status: false, message: "Email Sent" });
    }
  });

  transporter.close();
};

exports.hook = (req, res) => {
  console.log("HOOK");
  const payment = req.body.payload.payment.entity;
  console.log(payment);

  if (req.body.event == "payment.captured") {
    console.log("payment.captured");
    const email = payment.email;
    const contact = payment.contact;
    const method = payment.method;
    const amount = payment.amount / 100;
    const currency = payment.currency;
    const order_id = payment.order_id;
    const date_created = new Date();

    const newDonator = new Donator({
      email: email,
      contact: contact,
      method: method,
      amount: amount,
      currency: currency,
      order_id: order_id,
      payment_id: payment.id,
      date_created: date_created,
      verified: true,
    });

    newDonator
      .save()
      .then((savedDonator) => {
        const mailContent = {
          name: "Raunakh",
          email: savedDonator.email,
          subject: "Thank you for donating!",
        };

        const mailOptions = {
          from: "rauankh.techsoc@gmail.com",
          to: mailContent.email,
          subject: mailContent.subject,
          html: str,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.json({
              data: {
                error: error,
                message: "Something went wrong",
              },
            });
          } else {
            console.log("Email sent: " + info.response);
            // res.redirect("/");
            res.status(200).json({ status: true, message: "Email Works!" });
          }
        });

        transporter.close();

        // ejs.renderFile(
        //   path.join(__dirname, "..", "email", "email.ejs"),
        //   function (err, str) {
        //     if (err) {
        //       console.log(err);
        //       return;
        //     }
        //   }
        // );

        return res.status(200).end();
      })
      .catch((err) => console.log(err));
  }

  res.status(200).end();
};
