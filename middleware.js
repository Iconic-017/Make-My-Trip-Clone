module.exports.isLoggedIn = (req , res , next)=> {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Bhai phela login karle");
        return res.redirect("/login");
    }

    next();
}

module.exports.saveRedirectUrl = (req ,res , next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}





// MIDDLEWARE FOR SCHEMA VALIDATION
// const validateSchema = (req, res, next) => {
//     const { error } = LISTINGSCHEMA.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };