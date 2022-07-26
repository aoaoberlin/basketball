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

app.get("/api/getStats", (req, res) => {
	console.log("----->>> GET /api/getStats called: ");
	Stats.find()
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
