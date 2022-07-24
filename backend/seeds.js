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
		name: "",
		playerId: s.player_id,
		season: s.season,
		games: s.games_played,
		points: s.pts,
		threePoints: s.fg3m,
		assists: s.ast,
		rebounds: s.reb,
		steals: s.stl,
		blocks: s.blk,
	};
	const player = players.data.find((x) => x.id === properties.playerId);
	properties.name = player.first_name + " " + player.last_name;
	return properties;
});

Stats.insertMany(statsData)
	.then((s) => {
		console.log(`Successfully added ${s.length} stats into the database`);
		mongoose.connection.close();
	})
	.catch((err) => console.log(err));
