const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// for login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("wrong credentials");

    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedpassword.toString(CryptoJS.enc.Utf8);
    res.status(401).json("wrong credentials");

    const accesstoken = jwt.sign(
      {
        id: user._id,
        isadmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/verify", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password, ...userData } = user._doc;

//     const newToken = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_SEC,
//       { expiresIn: "3d" }
//     );

//     res.status(200).json({
//       user: userData,
//       accessToken: newToken,
//     });
//   } catch (error) {
//     console.error("Error in /verify endpoint:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// verify token is not suppose to be in this code - you've not done what you should do before using the verify token endpoint check the repo in class

module.exports = router;
