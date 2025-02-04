const mongoose = require("mongoose");

const futsalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    //   required: true,
  },
  futsalName: {
    type: String,
    required: true,
    trim: true,
  },
  futsalPrice: {
    type: Number,
    required: true,
  },
  futsalContact: {
    type: Number,
    required: true,
  },
  futsalDescription: {
    type: String,
    required: true,
    trim: true,
  },
  futsalCategory: {
    type: String,
    required: true,
    trim: true,
  },
  futsalLocation: {
    type: String,
    required: true,
    trim: true,
  },
  futsalImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    trim: true,
  },
  longitude: {
    type: Number,
    trim: true,
  },
});

const Futsals = mongoose.model("futsals", futsalSchema);
module.exports = Futsals;
