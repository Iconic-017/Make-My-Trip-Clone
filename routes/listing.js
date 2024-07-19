const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware.js");

const multer = require('multer');
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router.route("/new")
    .get(isLoggedIn, listingController.newForm);

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn ,upload.single('listing[image]'), listingController.createNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showingForm))
    .put(isLoggedIn ,upload.single('listing[image]'), wrapAsync(listingController.updateForm))
    .delete(isLoggedIn, wrapAsync(listingController.deleteForm));

router.route("/:id/edit")
    .get(isLoggedIn, wrapAsync(listingController.editForm));



module.exports = router;
