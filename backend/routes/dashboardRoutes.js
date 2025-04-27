const { getWeeklyBookingData,getBookingStatusData, getBookingStats } = require('../controllers/dashboardcontroller');

const router = require('express').Router();


router.get("/getbooking", getBookingStats)
router.get("/getBookingStatus", getBookingStatusData)
router.get("/getweeklybooking", getWeeklyBookingData)

module.exports = router;