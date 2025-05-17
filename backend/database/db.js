// importing any necessary packages
const mongoose = require('mongoose');

// function (Any)
const connectDB = async () => {
    mongoose.connect('mongodb://root:example@localhost:27017').then(() =>{
    console.log("Connected to Database")
})
}

// export 
module.exports = connectDB;