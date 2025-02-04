const router = require('express').Router();
const notificationController = require("../controllers/notificationController");
const { authGuardAdmin } = require('../middleware/authGuard');


router.post('/createnotification',authGuardAdmin, notificationController.createNotification);

router.get('/get_notification/:id', notificationController.getNotification);

router.put('/update_notification/:id',authGuardAdmin, notificationController.updateNotification);

router.delete('/delete_notification/:id',authGuardAdmin, notificationController.deleteNotification);
router.get("/getsinglenotification/:id", notificationController.getSingleNotification)
router.get("/usernotification/:userId", notificationController.usernotification);


module.exports = router;
