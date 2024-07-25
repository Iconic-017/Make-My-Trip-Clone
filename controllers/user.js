const user = require("../models/user.js")


module.exports.GetSignUp = (req, res) => {
    res.render("users/signup.ejs");
}



module.exports.PostSignUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to the Kanto region");
            res.redirect("/listings");
        });
        console.log(registeredUser);
    } catch (e) {
        req.flash("error", "Username already exists");
        res.redirect("/signup");
    }
}




module.exports.GetLogin = (req, res) => {
    res.render("users/login.ejs");
}


module.exports.PostLogin = (req, res) => {
    req.flash("success", "Welcome to the Kanto region");
    res.redirect(res.locals.redirectUrl || '/listings');
}


module.exports.LogOut =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}