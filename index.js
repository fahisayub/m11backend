const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const { connectdb } = require("./config/db.config");
const { UserRouter } = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Bug Tracker!");
});

app.use("/user", UserRouter);

app.listen(port, async () => {
  try {
    await connectdb;
    console.log("Connected To MongoDB");
  } catch (e) {
    console.log(404, "Couldn't connect db");
  }
  console.log(`listening on port port`);
});
