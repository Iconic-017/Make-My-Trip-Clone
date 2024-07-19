const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/error");
const { LISTINGSCHEMA , reviewSchema } = require("../schema");
const Review = require("../models/review");
const listing = require("../models/listing");


// MIDDLEWARE FOR REVIEW VALIDATION
const vaildateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// 9. REVIEWS [POST ROUTE]
router.post("/", vaildateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const Listing = await listing.findById(id); 
    const newReview = new Review(req.body.review);

    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    res.redirect(`/listings/${Listing.id}`);
}));

module.exports = router;
