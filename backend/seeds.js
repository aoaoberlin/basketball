require("dotenv/config");
const MONGO_URI = process.env.MONGODB_URI;

const mongoose = require("mongoose");
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const Stats = require("./models/Stats.model");
const stats = require("../frontend/src/data/stats/stats.json");
const players = require("../frontend/src/data/players.json");

const statsData = stats.map((s) => {
	const properties = {
		firstName: "",
		lastName: "",
		playerId: s.player_id,
		year: s.season,
		games: s.games_played,
		points: s.pts,
		rebounds: s.reb,
		assists: s.ast,
		steals: s.stl,
		blocks: s.blk,
	};
	const player = players.data.find((x) => x.id === properties.playerId);
	properties.firstName = player.first_name;
	properties.lastName = player.last_name;
	return properties;
});

Stats.insertMany(statsData)
	.then((s) => {
		console.log(`Successfully added ${s.length} stats into the database`);
		mongoose.connection.close();
	})
	.catch((err) => console.log(err));
