var express = require("express");
// merge params from campgrounds and comments together.
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comment routes
// when make a get request, app will check if the user is logged in first
// if not log in, redirect 
router.get("/new", isLoggedIn, function(req, res) {
    // find campground by id
    // send that through when render
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log("err");
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/", isLoggedIn, function(req, res) {
    // loopup comment by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log("err");
            res.redirect("/campgrounds");
        }
        else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log("err");
                }
                else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground showpage
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;