const express = require("express");

let app = express();

const authRouter = require("./controller/authController");
const userRouter = require("./controller/userController");
const chatRouter = require("./controller/chatcontroller");
const messageRouter = require("./controller/messageController");

// req body json to js convertion
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

module.exports = app;
