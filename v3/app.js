var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    methodOverride = require("method-override"),
    seedDB      = require("./seeds")

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index")
// connect to mongodb
mongoose.connect("mongodb://localhost/catcamp");

// convention, tell it to recognize all the '/' extensions
app.use(bodyParser.urlencoded({extended: true}));
// tell express to see all files without extension as .ejs
app.set("view engine", "ejs");
// __dirname refers to the directory that this scrip is running
app.use(express.static(__dirname + "/public"))
// convention to do _method
app.use(methodOverride("_method"));
// seedDB();  // seed the db   

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

app.use(function(req, res, next) {
    // pass currentUser to every route
    res.locals.currentUser = req.user;
    // move on 
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// start the server, tell it to listen on port 3000
app.listen(3000, function() {
    console.log("server connected, go to localhost/3000");
});