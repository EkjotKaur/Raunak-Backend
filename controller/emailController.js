const nodemailer = require("nodemailer");
const Donator = require("../models/donations");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "octave.raunakh@gmail.com",
    pass: "Octave#Raunakh2020",
  },
});

exports.sendMail = (req, res) => {
  const contactContent = {
    name: req.body.contactname,
    email: req.body.contactemail,
    subject: req.body.contactsubject,
    message: req.body.contactmessage,
  };

  const contactOptions = {
    from: "octave.raunakh@gmail.com",
    to: "octave.raunakh@gmail.com",
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
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });

  transporter.close();
};

exports.hook = (req, res) => {
  const payment = req.body.payload.payment.entity;
  // console.log(payment);

  if (req.body.event == "payment.captured") {
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
          from: "octave.raunakh@gmail.com",
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
