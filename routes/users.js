var express = require("express");
var router = express.Router();
// const passport = require("passport");

const adminController = require("../controller/adminController");

/* GET users listing. */

// const user = {
//   id: "1",
//   username: "TechSocOctave",
//   password: "TechSoc",
// };

// router.get("/", (req, res, next) => {
//   res.json("login");
// });

// router.post("/", (req, res, next) => {
//   console.log("BYE");
//   passport.authenticate("local", (err, user) => {
//     console.log("HELLO");
//     // if (err) {
//     //   return res.status(500).json(err);
//     // }
//     console.log(user);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Wrong usernmame or password" });
//     }
//     req.login(user, () => {
//       // res.redirect("/donations");
//       Donator.find()
//         .sortBy("-createdAt")
//         .then((donators) => {
//           if (err) {
//             console.log(err);
//             res
//               .status(500)
//               .json({ status: false, message: "Something went wrong!" });
//           } else {
//             // res.render("donations", { donators: donators });
//             res.status(200).json({
//               status: true,
//               data: {
//                 donators: donators,
//               },
//             });
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           res
//             .status(500)
//             .json({ status: false, message: "Something went wrong!" });
//         });
//       // res.json();
//     });
//   })(req, res, next);
// });

router.post("/", adminController.login);

// router.login();
module.exports = router;
