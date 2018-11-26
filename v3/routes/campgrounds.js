var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// index page - return all cats
router.get("/", function(req, res){
    // contain all user information of the currently login information
    //req.user
    // Get all campgrounds from db 
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log("err");
        } else {
            // names we want to give it : data that we are passing in
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.post("/", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var newCampground = {name: name, image: image, description: des};
    // create a new campground and save into database
    Campground.create(newCampground, function(err, newCreate){
        if (err) {
            console.log("err");
        } else {
            // redirect back to campgrounds page, default is redirect to a get request
            res.redirect("/campgrounds");
        }
    });
});

// Create a new camground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID, populating the comments on the campground
    // with exec we are executing the query that we made
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log("err");
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;