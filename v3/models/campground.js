var mongoose = require("mongoose");

// SCHEMA SETUP for the db table, in mongodb it's called a collection
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    // the commets property should be an array of comment ids
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            // embedded with references of ids
            ref: "Comment"
        }
    ]
});

// .model function makes a copy of the schema, and create an instance of the document Campground
module.exports = mongoose.model("Campground", campgroundSchema);