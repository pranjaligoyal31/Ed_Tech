const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    rating: {
        type:Number,
        required:true,
    },
    course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
    review:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);