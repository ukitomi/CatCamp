var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// this plugin gives all methods an important functionality to our user model
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);