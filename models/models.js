var mongoose = require("mongoose");
var PersonSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  active: { type: Boolean, default: true },
  color: { type: String, default: 'yellow' }
});

var Person = mongoose.model("Person", PersonSchema);

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model("User", UserSchema);

var ThingSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	color: {type: String},
	description: {type: String}
});
var Thing = mongoose.model("Thing", ThingSchema);


module.exports = {
    Person: Person, 
    User: User,
    Thing: Thing
};