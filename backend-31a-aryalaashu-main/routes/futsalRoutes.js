const router = require('express').Router();
const futsalController = require("../controllers/futsalcontrollers");
const { authGuardAdmin } = require('../middleware/authGuard');
// const authGuard = require('../middleware/authGuard');

// Create product API
router.post('/create_futsal',authGuardAdmin, futsalController.createFutsal)

// Get all products API
router.get("/get_futsals", futsalController.getAllFutsals)

// get single product api
router.get("/get_futsals/:id", futsalController.getSingleFutsal)

router.get("/getfutsalbyUser/:id", futsalController.getAllFutsalsbyUserId)

// update product api
router.put("/update_futsal/:id",authGuardAdmin,futsalController.updateFutsal)

// delete product api
router.delete("/delete_futsal/:id",authGuardAdmin, futsalController.deleteFutsal)


module.exports = router;