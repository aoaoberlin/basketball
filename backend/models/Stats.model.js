const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
	firstName: String,
	lastName: String,
	playerId: Number,
	year: Number,
	games: Number,
	points: Number,
	rebounds: Number,
	assists: Number,
	steals: Number,
	blocks: Number,
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
