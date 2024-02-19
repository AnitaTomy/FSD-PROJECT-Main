const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Add a review for a specific recipe
router.post('/addReview/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment, author } = req.body;

    // Create a new review instance
    const newReview = new Review({
      recipeId,
      rating,
      comment,
      author,
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    res.status(201).json({ success: true, review: savedReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

  

// View all reviews
router.get('/getAllReviews', async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json({ success: true, reviews });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  // Delete a review
router.delete('/deleteReview/:reviewId', async (req, res) => {
    try {
      const { reviewId } = req.params;
  
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
  
      res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });


  // Get comments and ratings for a specific recipe
router.get('/getReviewsByRecipeId/:recipeId', async (req, res) => {
  try {
      const { recipeId } = req.params;

      // Find all reviews for the given recipeId
      const reviews = await Review.find({ recipeId });

      if (reviews.length === 0) {
          return res.status(404).json({ success: false, message: 'No reviews found for the specified recipe' });
      }

      res.json({ success: true, reviews });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
module.exports = router;
