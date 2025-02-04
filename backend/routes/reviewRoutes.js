const router = require('express').Router();
const reviewController = require("../controllers/reviewController")

router.post("/create_review", reviewController.createReview),
router.get("/getreviews/:futsalId", reviewController.getReviewsByFutsalId),
router.get("/averageRating/:futsalId", reviewController.getAverageRating);

module.exports = router;

