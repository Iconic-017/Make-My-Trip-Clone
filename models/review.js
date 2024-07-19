const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        // required: true
    }, 
    
    rating: {
        type: Number,
        min: 1,
        max: 5,
        // required: true
    },

    createdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);
