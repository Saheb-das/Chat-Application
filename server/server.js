// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");

// internal imports
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes/index");
const socketHandler = require("./socket/index");

// create app and config
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    httpOnly: true,
  })
);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// route setup
app.use(router);

// create http server for socket IO
const httpServer = http.createServer(app);

// handle socket
socketHandler(httpServer);

// global error handler
app.use(errorHandler);

// server connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
    httpServer.listen(process.env.PORT, () => {
      console.log("server is running at:" + process.env.PORT);
    });
  })
  .catch((e) => console.log(e));
