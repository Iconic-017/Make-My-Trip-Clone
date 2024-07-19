const joi = require("joi");

module.exports.listingschema = joi.object({
    listing : joi.object ({
        title: joi.string().required(),
        desc: joi.string().required(),
        image_url: joi.string().allow("" , null),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        country: joi.string().required(),
    })
})


module.exports.reviewSchema = joi.object({
    review: joi.object ({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required(),
    }).required(),
})