// console.log("Welcome To Hell")

// Importing
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary");
const mysocket = require("./socket/main");
const http = require("http");

// making express app
const app = express();
connectDB();

// dotenv config
dotenv.config();

// cors policy
const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));
app.use(multiparty());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// json middleware(to accept json data)
app.use(express.json());
// defining port
const port = process.env.PORT;

//creatins user routes
app.use("/api/user", require("./routes/userRoutes"));

// creating futsal routes

app.use("/api/futsal", require("./routes/futsalRoutes"));

// creating booking routes
app.use("/api/booking", require("./routes/bookingRoutes"));

app.use("/api/notification", require("./routes/notificationRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


const server = http.createServer(app);
const socketInfo = mysocket(server);

// Make io accessible globally using app.locals
app.locals.socketInfo = socketInfo;

// run the server
server.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
});

module.exports = app;
