const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateSent: {
    type: Date,
    default: Date.now
  }
});

const Notifications = mongoose.model("notifications", notificationSchema);
module.exports = Notifications;
