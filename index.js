const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/test", () => {
  console.log("test route is workin");
});

// to listen to the app
app.listen(process.env.PORT, () => {
  console.log("Server is running successfully");
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
