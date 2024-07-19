const listingModel = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
    try {
        const allListing = await listingModel.find({});
        res.render("listings/index.ejs", { allListing });
    } catch (err) {
        next(err);
    }
};

module.exports.newForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showingForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Listing = await listingModel.findById(id).populate("reviews").populate("owner");
        if (!Listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }
        console.log(Listing);
        res.render("listings/show.ejs", { Listing });
    } catch (err) {
        next(err);
    }
};

module.exports.createNewForm = async (req, res, next) => {
    try {

        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
          })
        .send()
 
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new listingModel(req.body.listing);

        newListing.owner = req.user._id;
        newListing.image_url = { url, filename };
        newListing.geometry = response.body.features[0].geometry;

        let savelisting = await newListing.save();
        console.log(savelisting);
        req.flash("success", "Listing created successfully.");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
};

module.exports.editForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Listing = await listingModel.findById(id);
        if(!Listing){
            req.flash("error" ,"Id do not exist :(");
            res.redirect("/listings")
        }

        let originalImageUrl = Listing.image_url.url;
        originalImageUrl.replace("/upload" , "/upload/h_300,w_250")


        res.render("listings/edit.ejs", { Listing , originalImageUrl});
    } catch (err) {
        next(err);
    }
};

module.exports.updateForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingListing = await listingModel.findByIdAndUpdate(id, { ...req.body.listing });
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            existingListing.image_url = { url, filename };
            await existingListing.save();
        }

        req.flash("success", "Listing updated successfully.");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        await listingModel.findByIdAndDelete(id);
        req.flash("success", "Listing deleted successfully.");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
};
