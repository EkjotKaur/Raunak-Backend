const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Donations = require("../models/donations");

exports.createdAdmin = () => {
  const admin = new Admin({
    username: "TechSocOctave",
    password: "TechSoc",
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }

      const token = jwt.sign(
        {
          data: admin._id,
        },
        "secret",
        {}
      );
      admin.token = token;
      admin.password = hash;

      // console.log("1");
      // console.log(newUser);
      admin
        .save()
        .then(async (user) => {
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

exports.login = (req, res) => {
  // console.log();
  Admin.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(422).json({
        success: "false",
        message: "Incorrect Email or Password 1",
      });
    }
    console.log(user);
    bcrypt
      .compare(req.body.password, user.password)
      .then((doesMatched) => {
        if (!doesMatched) {
          return res.status(422).json({
            success: "false",
            message: "Incorrect Email or Password",
          });
        }
        user
          .save()
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(500).json({
                success: "false",
                message: "Something went wrong 1",
              });
            }

            res.status(200).json({
              success: "true",
              data: user,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              success: "false",
              message: "Something went wrong 2",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: "false",
          message: "Something went wrong 3",
        });
      });
  });
};
