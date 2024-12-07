const express = require("express");
const router = express.Router();
const User = require("../model/user");

const authMiddleware = require("../middleware/authmiddleware");

//get details of current user
router.get("/get-logged-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    res.send({
      message: "user fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

//get all users

router.get("/get-all-user", authMiddleware, async (req, res) => {
  try {
    const userid = req.body.userId;
    const alluser = await User.find({ _id: { $ne: userid } });
    res.send({
      message: "All user fetched successfully",
      success: true,
      data: alluser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});
module.exports = router;
