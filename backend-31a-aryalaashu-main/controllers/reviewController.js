const Reviews = require("../model/reviewModel");
const Bookings = require("../model/bookingModel");

// create review
const createReview = async (req, res) => {
  try {
    const { user, futsal, rating, review } = req.body;
    // check if user have preious booking or not
    const previousBooking = await Bookings.findOne({
      user: user,
      futsal: futsal,
    });

    if (!previousBooking) {
      return res.json({
        success: false,
        message: "You must have a previous booking to leave a review for this futsal.",
      });
    }

    // Create a new review
    const newReview = new Reviews({
      user: user,
      futsal: futsal,
      rating: rating,
      review: review,
    });

    await newReview.save();

    res.status(200).json({
      success: true,
      message: "Review submitted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// fetching review of particular futsal
const getReviewsByFutsalId = async (req, res) => {
  try {
    const { futsalId } = req.params;

    const reviews = await Reviews.find({ futsal: futsalId })
      .populate('user')  
      .exec();

    res.status(200).json({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } 
};


// getting average rating
const getAverageRating = async (req, res) => {
  try {
    const { futsalId } = req.params;
    const reviews = await Reviews.find({ futsal: futsalId });

    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        averageRating: 0,
      });
    }

    const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = sumOfRatings / reviews.length;

    res.status(200).json({
      success: true,
      averageRating: averageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



  // const deleteReview = async (req, res) => {
  //   const reviewId = req.params.reviewId;
  
  //   try {
  //     const userId = req.user ? req.user.id : null;
  
  //     if (!userId) {
  //       return res.status(401).json({
  //         success: false,
  //         message: "Unauthorized: User not authenticated",
  //       });
  //     }
  
  //     const deletedReview = await Reviews.findOneAndDelete({
  //       _id: reviewId,
  //       user: userId,
  //     });
  
  //     if (!deletedReview) {
  //       return res.status(403).json({
  //         success: false,
  //         message: "You are not authorized to delete this review",
  //       });
  //     }
  
  //     res.status(200).json({
  //       success: true,
  //       message: "Review deleted successfully",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Internal Server Error",
  //     });
  //   }
  // };

module.exports = {
  createReview,
  getReviewsByFutsalId,
  // deleteReview,
  getAverageRating,
};
