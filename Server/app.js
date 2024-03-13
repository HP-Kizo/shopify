const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const server = http.createServer(app);
//////-------------------------------------------------------------------------------------------------/////

// Middleware xử lý lỗi

// Đăng ký middleware xử lý lỗi
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrongs";
  console.log(err);
  return res
    .status(errorStatus)
    .json({ success: false, status: errorStatus, message: errorMessage });
});

app.get("/", (req, res, next) => {
  res.json("OK");
});
//////----------MONGODB--------------------------------------------------------------------------/////

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
