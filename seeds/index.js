const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 500; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "64aa981413bed997678d776a",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			// image: "https://source.unsplash.com/collection/483251",
			description:
				" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim accusantium dolore nisi aperiam, velit nostrum molestiae repellendus vel consequatur ipsam consectetur. Pariatur tempore aspernatur magni minima obcaecati perspiciatis accusamus similique.",
			price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dx5p6bk9d/image/upload/v1689236925/YelpCamp/kpq3ncfk8lk0fcy0aouc.jpg",
					filename: "YelpCamp/kpq3ncfk8lk0fcy0aouc",
				},
				{
					url: "https://res.cloudinary.com/dx5p6bk9d/image/upload/v1689236925/YelpCamp/pz9ry99ltoanftogprzh.jpg",
					filename: "YelpCamp/pz9ry99ltoanftogprzh",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
