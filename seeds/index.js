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
	for (let i = 0; i < 50; i++) {
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
			images: [
				{
					url: "https://res.cloudinary.com/dx5p6bk9d/image/upload/v1689143313/YelpCamp/uavndkjv8ljrunrcq8wy.jpg",
					filename: "YelpCamp/uavndkjv8ljrunrcq8wy",
				},
				{
					url: "https://res.cloudinary.com/dx5p6bk9d/image/upload/v1689143365/YelpCamp/tsdrfydgq4emx2pv8q2k.jpg",
					filename: "YelpCamp/tsdrfydgq4emx2pv8q2k",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
