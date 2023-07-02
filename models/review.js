const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	body: String,
	price: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
