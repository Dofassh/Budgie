const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
UserSchema.plugin(uniqueValidator, {
  message: "this email is already registered",
});

var User = mongoose.model("User", UserSchema);

module.exports = User;