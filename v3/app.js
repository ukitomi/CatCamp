var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

// connect to mongodb
mongoose.connect("mongodb://localhost/catcamp");

// convention, tell it to recognize all the '/' extensions
app.use(bodyParser.urlencoded({extended: true}));
// tell express to see all files without extension as .ejs
app.set("view engine", "ejs");
// __dirname refers to the directory that this scrip is running
app.use(express.static(__dirname + "/public"))
seedDB();

// PASSPORT config
app.use(require("express-session")({
    secret: "secret set up",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// this authenticate comes with passportlocalMongoose
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// homepage, every localhost:3000 call will get to the homepage
app.get("/", function(req, res) {
    res.render("landing");
});

// route to campground page, return all the cats
app.get("/campgrounds", function(req, res){
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

app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
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

// Comment routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
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

app.post("/campgrounds/:id/comments", function(req, res) {
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

// AUTH routes
// show register form
app.get("/register", function(req, res) {
    res.render("register");
})
// handle sign up logic
app.post("/register", function(req, res) {
    // once the user has signed up
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log("err");
            return res.render("register");
        }
        // log user and authenticate them
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    });
})
// start the server, tell it to listen on port 3000
app.listen(3000, function() {
    console.log("server connected, go to localhost/3000");
});