// importing any necessary packages
const mongoose = require("mongoose");

// function (Any)
const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to Database");
  });
};

// export
module.exports = connectDB;
