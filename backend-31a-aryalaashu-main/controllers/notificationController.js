const Users = require("../model/userModel");
const Notifications = require("../model/notificationModel");
const Futsals = require("../model/futsalModel");
const Bookings = require("../model/bookingModel");

const createNotification = async (req, res) => {
  console.log(req.body);
  const { userId, title, description } = req.body;

  try {
    const newNotification = new Notifications({
      user: userId,
      description: description,
      title: title,
    });

    console.log(newNotification);
    let savedNotification = await newNotification.save();

    const socketInfo = req.app.locals.socketInfo;

    // socketInfo.io.emit(" addadmin notification", savedNotification);

    let findAdminFustal = await Futsals.findOne({ user: userId });

    let futsalCustomers = await Bookings.distinct("user", {
      futsal: findAdminFustal._id,
    });

    futsalCustomers.forEach((userId) => {
      const targetSocketIds = socketInfo.users[userId] || [];
      targetSocketIds.forEach((targetSocketId) => {
        socketInfo.io
          .to(targetSocketId)
          .emit("admin add notification", savedNotification);
      });
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

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
      data : {
        notifications: notifications,
        adminFutsals: adminFutsals,
      }
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
