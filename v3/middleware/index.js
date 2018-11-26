var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middlewares goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("back");
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        // goes back to previous page
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        // goes back to previous page
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    // check if user is logged in
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = middlewareObj;