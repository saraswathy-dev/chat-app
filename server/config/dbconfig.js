const mongoose = require("mongoose");

//connection logic
mongoose.connect(process.env.CONN_STRING);

//to check connection state
let db = mongoose.connection;

//to check connection
db.on("connected", () => {
  console.log("db is connected");
});
db.on("err", () => {
  console.log("db is failed");
});

module.exports = db;
