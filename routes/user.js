const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const reviewcontroller = require("../controllers/user.js")



router.get("/signup",reviewcontroller.GetSignUp );

router.post("/signup", wrapAsync(reviewcontroller.PostSignUp));

router.get("/login", reviewcontroller.GetLogin);

router.post("/login", saveRedirectUrl,passport.authenticate("local", { failureRedirect: '/login', failureFlash: true })
    ,reviewcontroller.PostLogin );

router.get("/logout",reviewcontroller.LogOut );

module.exports = router;
