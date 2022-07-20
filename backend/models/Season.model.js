const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
  firstName: String,
  lastName: String,
  playerId: Number,
  year: Number,
  games: Number,
  points: Number,
  rebounds: Number,
  assists: Number,
  steals: Number,
  blocks: Number
});

const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;