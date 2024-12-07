const express = require("express");
const router = express.Router();

const User = require("./../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    //1.if user already exist

    const existUser = await User.findOne({ email: req.body.email });
    //2.send error message
    if (existUser) {
      return res.status(400).send({
        message: "user exist",
        success: false,
      });
    }

    //3.encrypt password
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    //4.save new user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send({
      message: "user added successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    //1.check for existing user
    const existUser = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!existUser) {
      return res.send({
        message: "user does not exist",
        success: false,
      });
    }

    //2.compare password
    const isValid = await bcrypt.compare(req.body.password, existUser.password);
    if (!isValid) {
      return res.send({
        message: "password is incorrect",
        success: false,
      });
    }

    //3.gererate token if user ans passwors match
    const token = jwt.sign({ userId: User._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.send({
      message: "user logged in successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
