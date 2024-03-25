const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const server = http.createServer(app);
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

//////-------------------------------------------------------------------------------------------------/////

app.use(cors());
app.use(express.json());

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGO,
  collection: "session",
});

app.use(
  session({
    secret: "hoimanchi",
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
    store: store,
  })
);

app.get("/", (req, res, next) => {
  res.json("OK");
});
app.use("/auth", userRouter);
app.use("/api", productRouter);


// Đăng ký middleware xử lý lỗi
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  console.log(err);
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
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
