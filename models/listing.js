const { string, required } = require("joi");
const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    desc:{
        type : String,
        required : true
    },
    image_url:{
        url : String,
        filename: String
    },
    price:{
        type : Number,
        // required : true
    },
    location:{
        type : String,
        required : true
    },
    country:{
        type : String,
        required : true
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
    },

    geometry: {
        type: {
            type:String ,
            enum: ["Point"],
            required:true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
});


const listing = new mongoose.model("listing" , ListingSchema);

module.exports = listing;







