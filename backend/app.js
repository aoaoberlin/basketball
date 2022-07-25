require("dotenv/config");
require("./db");
const Stats = require("./models/Stats.model");

const express = require("express");
const app = express();

require("./config")(app);

app.get("/api/", (req, res) => {
	res.send("hello world");
});

app.get("/api/getStats", (req, res) => {
	console.log("----->>> GET /api/getStats called: ");
	Stats.find()
		.then((stats) => res.json({ stats }))
		.catch((err) => console.log(err));
});

app.use((req, res, next) => {
	res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
