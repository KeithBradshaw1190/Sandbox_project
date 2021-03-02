var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
	bookName: String,
	shortDescription: String,
	rating: Number,
	likes: Number,
	imgUrl: String,
}, {timestamps: true});

module.exports = mongoose.model("Book", BookSchema);