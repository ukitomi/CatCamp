var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// convention, tell it to recognize all the '/' extensions
app.use(bodyParser.urlencoded({extended: true}));
// tell express to see all files without extension as .ejs
app.set("view engine", "ejs");

// moving this to db soon
var campgrounds = [
    {name: "Cat 1", image:"https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec13e2bc38df66aaaf8d88ff4607dfe1&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"},
    {name: "Cat 2", image:"https://images.unsplash.com/photo-1534135954997-e58fbd6dbbfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2e724cf5d1e02385116666884dedffa&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"},
    {name: "Cat 3", image:"https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6402d48f35584fbf36a874be1635374b&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"},
]

// an get request
app.get("/", function(req, res) {
    res.render("landing");
});

// route to campground page, return all the cats
app.get("/campgrounds", function(req, res){
    // names we want to give it : data that we are passing in
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);

    // redirect back to campgrounds page, default is redirect to a get request
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
// start the server, tell it to listen on port 3000
app.listen(3000, function() {
    console.log("server connected, go to localhost/3000");
});