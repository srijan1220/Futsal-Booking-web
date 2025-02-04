// import
const router = require('express').Router();
const bookingController = require("../controllers/bookingcontrollers")


// create booking api

router.post("/create_booking", bookingController.createBooking),
router.get("/get_allbooking", bookingController.getAllBooking),
router.get("/getbookingUserId/:userId", bookingController.getBookingByUserid),
router.put("/update_booking/:id", bookingController.updateBooking),
router.get("/get_singlebooking/:id", bookingController.getSingleBooking),
router.delete("/delete_booking/:id", bookingController.deleteBooking),
router.get("/getbookingbyfutsalid/:id", bookingController.getBookingByFutsalid),
router.get("/getbookedslot/:id/:date", bookingController.getBookedTimeSlots)

// for approve and reject booking
router.put("/approve_booking/:id", bookingController.approveBooking);
router.put("/reject_booking/:id", bookingController.rejectBooking);





module.exports = router;






