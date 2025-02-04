// importing any necessary packages
const mongoose = require('mongoose');

// function (Any)
const connectDB = async () => {
    mongoose.connect('mongodb://0.0.0.0:27017/web').then(() =>{
    console.log("Connected to Database")
})
}

// export 
module.exports = connectDB;