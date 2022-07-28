require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
require("./config")(app);
const path = require("path");
const Stats = require("./models/Stats.model");

// routes
app.get("/api/", (req, res) => {
	res.send("hello world");
});

const filter = { games: { $gte: 25 } };
const projection = {
	points: { name: 1, season: 1, games: 1, points: 1 },
	threePoints: { name: 1, season: 1, games: 1, threePoints: 1 },
	assists: { name: 1, season: 1, games: 1, assists: 1 },
	rebounds: { name: 1, season: 1, games: 1, rebounds: 1 },
	steals: { name: 1, season: 1, games: 1, steals: 1 },
	blocks: { name: 1, season: 1, games: 1, blocks: 1 },
};
const sort = {
	points: { points: -1 },
	threePoints: { threePoints: -1 },
	assists: { assists: -1 },
	rebounds: { rebounds: -1 },
	steals: { steals: -1 },
	blocks: { blocks: -1 },
};
const limit = 500;

app.get("/api/getStats/:category", (req, res) => {
	console.log("----->>> GET /api/getStats called: ");
	const { category } = req.params;
	Stats.find(filter, projection[category])
		.sort(sort[category])
		.limit(limit)
		.then((stats) => res.json({ stats }))
		.catch((err) => console.log(err));
});

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use((req, res) => {
	// if no routes match, send them the React HTML
	res.sendFile(__dirname + "/frontend/build/index.html");
});
// end of routes

module.exports = app;
