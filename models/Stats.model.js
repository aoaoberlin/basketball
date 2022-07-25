const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
	name: String,
	playerId: Number,
	season: Number,
	games: Number,
	points: Number,
	threePoints: Number,
	assists: Number,
	rebounds: Number,
	steals: Number,
	blocks: Number,
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
