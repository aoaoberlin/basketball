require("dotenv/config");
const MONGO_URI = process.env.MONGODB_URI;

const mongoose = require("mongoose");
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const Season = require("./models/Season.model");
const seasons = require("../frontend/src/data/stats/stats.json");
const players = require("../frontend/src/data/players.json");

const seasonsData = seasons.map((season) => {
	const properties = {
		firstName: "",
		lastName: "",
		playerId: season.player_id,
		year: season.season,
		games: season.games_played,
		points: season.pts,
		rebounds: season.reb,
		assists: season.ast,
		steals: season.stl,
		blocks: season.blk,
	};
	const player = players.data.find((x) => x.id === properties.playerId);
	properties.firstName = player.first_name;
	properties.lastName = player.last_name;
	return properties;
});

Season.insertMany(seasonsData)
	.then((seasons) => {
		console.log("Seasons added successfully");
		mongoose.connection.close();
	})
	.catch((err) => console.log(err));
