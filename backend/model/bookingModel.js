const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    //   required: true,
  },
  futsal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "futsals",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
 
  from:[ {
    type: String,
    required: true,
  }],
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
}
  
});

const Bookings = mongoose.model("bookings", bookingSchema);
module.exports = Bookings;
