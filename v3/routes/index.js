var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// homepage, every localhost:3000 call will get to the homepage
router.get("/", function(req, res) {
    res.render("landing");
});

// AUTH routes
// show register form
router.get("/register", function(req, res) {
    res.render("register");
})
// handle sign up logic
router.post("/register", function(req, res) {
    // once the user has signed up
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        // log user and authenticate them
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Cat Camp " + user.username);
            res.redirect("/campgrounds");
        })
    });
});

// show log in form
router.get("/login", function(req, res) {
    res.render("login");
});

// login route, handle login logic
// have the middleware that handles callback
// users are presume to exist already, different than how register handles
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});

// log out route
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;
