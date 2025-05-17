const Bookings = require("../model/bookingModel");
const moment = require('moment');


const getBookingStats = async (req, res) => {
  try {
    // Get total count of bookings
    const totalBookings = await Bookings.countDocuments();

    // Get count of bookings by approval status
    const pendingBookings = await Bookings.countDocuments({
      approvalStatus: "pending",
    });
    const approvedBookings = await Bookings.countDocuments({
      approvalStatus: "approved",
    });
    const rejectedBookings = await Bookings.countDocuments({
      approvalStatus: "rejected",
    });

    // Return the statistics
    return res.status(200).json({
      success: true,
      stats: {
        total: totalBookings,
        pending: pendingBookings,
        approved: approvedBookings,
        rejected: rejectedBookings,
      },
    });
  } catch (error) {
    console.error("Error fetching booking statistics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking statistics",
      error: error.message,
    });
  }
};

const getBookingStatusData = async (req, res) => {
  try {
    // For pie chart - booking status distribution
    const approved = await Bookings.countDocuments({
      approvalStatus: "approved",
    });
    const pending = await Bookings.countDocuments({
      approvalStatus: "pending",
    });
    const rejected = await Bookings.countDocuments({
      approvalStatus: "rejected",
    });

    const pieData = [
      { name: "Approved", value: approved },
      { name: "Pending", value: pending },
      { name: "Rejected", value: rejected },
    ];

    return res.status(200).json({
      success: true,
      data: pieData,
    });
  } catch (error) {
    console.error("Error fetching booking status data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking status data",
      error: error.message,
    });
  }
};

/**
 * Get weekly booking data for bar chart
 */
const getWeeklyBookingData = async (req, res) => {
  try {
    // Get date for the beginning of this week (Sunday)
    const startOfWeek = moment().startOf("week").toDate();

    // Initialize data structure for the week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyData = daysOfWeek.map((day) => ({ day, bookings: 0 }));

    // Query all bookings from the current week
    const bookings = await Bookings.find({
      date: { $gte: startOfWeek },
    });

    // Process bookings to count by day of week
    bookings.forEach((booking) => {
      const dayOfWeek = moment(booking.date).day(); // 0 for Sunday, 1 for Monday, etc.
      weeklyData[dayOfWeek].bookings += 1;
    });

    return res.status(200).json({
      success: true,
      data: weeklyData,
    });
  } catch (error) {
    console.error("Error fetching weekly booking data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch weekly booking data",
      error: error.message,
    });
  }
};

module.exports = {
  getBookingStats,
  getBookingStatusData,
  getWeeklyBookingData,
};
