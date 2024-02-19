const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  author:{type:String}

});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
