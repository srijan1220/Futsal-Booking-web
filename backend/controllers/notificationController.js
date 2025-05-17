const mongoose = require("mongoose"); // Make sure mongoose is imported
const Users = require("../model/userModel");
const Notifications = require("../model/notificationModel");
const Futsals = require("../model/futsalModel");
const Bookings = require("../model/bookingModel");

const createNotification = async (req, res) => {
  const { userId, title, description } = req.body;

  console.log("Received data:", userId);

  // Validate userId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing userId",
    });
  }

  const objectId = new mongoose.Types.ObjectId(userId);

  try {
    const newNotification = new Notifications({
      user: objectId,
      description,
      title,
    });

    console.log("New notification to save:", newNotification);

    const savedNotification = await newNotification.save();

    const socketInfo = req.app.locals.socketInfo;

    // Find futsal managed by the admin user (using ObjectId for user)
    const findAdminFutsal = await Futsals.findOne({ user: objectId });
    if (!findAdminFutsal) {
      return res.status(404).json({
        success: false,
        message: "Futsal not found for the given user",
      });
    }

    // Get unique customers who booked that futsal
    const futsalCustomers = await Bookings.distinct("user", {
      futsal: findAdminFutsal._id,
    });

    // Notify all futsal customers via their socket connections
    futsalCustomers.forEach((customerUserId) => {
      const targetSocketIds = socketInfo.users[customerUserId] || [];
      targetSocketIds.forEach((socketId) => {
        socketInfo.io.to(socketId).emit("admin add notification", savedNotification);
      });
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification: savedNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { createNotification };


const getSingleNotification = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  if (!id) {
    return res.json({
      success: false,
      message: "Notification ID is required",
    });
  }

  try {
    const singleNotification = await Notifications.findById(id);
    res.json({
      success: true,
      message: "Futsal fetched Successfully",
      notification: singleNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const getNotification = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      success: false,
      message: "Notification ID is required",
    });
  }
  try {
    const notification = await Notifications.find({ user: id });
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.json({
      success: true,
      notification: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateNotification = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);

  const { title, description } = req.body;

  // destructure id from URL
  const id = req.params.id;

  if (!title || !description) {
    res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const updatedNotification = {
      title: title,
      description: description,
    };
    await Notifications.findByIdAndUpdate(id, updatedNotification);
    res.json({
      success: true,
      message: "Futsal Updated Successfully withous Image",
      notification: updatedNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  try {
    await Notifications.findByIdAndDelete(notificationId);
    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const usernotification = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Bookings.find({ user: userId }).populate("futsal");

    const futsalIds = [
      ...new Set(bookings.map((booking) => booking.futsal._id)),
    ];

    const adminFutsals = await Futsals.find({ _id: { $in: futsalIds } });

    const adminUserIds = adminFutsals.map((futsal) => futsal.user);

    const notifications = await Notifications.find({
      user: { $in: adminUserIds },
    });

    res.status(201).json({
      success: true,
      data: {
        notifications: notifications,
        adminFutsals: adminFutsals,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNotification,
  getNotification,
  updateNotification,
  deleteNotification,
  getSingleNotification,
  usernotification,
};
