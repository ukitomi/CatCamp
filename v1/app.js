var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("landing");


});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Cat 1", image:"https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec13e2bc38df66aaaf8d88ff4607dfe1&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"},
        {name: "Cat 2", image:"https://images.unsplash.com/photo-1534135954997-e58fbd6dbbfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2e724cf5d1e02385116666884dedffa&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"},
        {name: "Cat 3", image:"https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6402d48f35584fbf36a874be1635374b&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"},
    ]

    // names we want to give it : data that we are passing in
    res.render("campgrounds", {campgrounds: campgrounds});
});
app.listen(3000, function() {
    console.log("server connected");
});