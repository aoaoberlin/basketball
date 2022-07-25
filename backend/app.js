require("dotenv/config");
require("./db");
const Stats = require("./models/Stats.model");

const express = require("express");
const app = express();

require("./config")(app);
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const DB_URL = process.env.MONGODB_URI;

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		cookie: { maxAge: 1000 * 60 * 60 * 24 },
// 		saveUninitialized: false,
// 		resave: true,
// 		store: MongoStore.create({
// 			mongoUrl: DB_URL,
// 		}),
// 	})
// );
app.get("/api/", (req, res) => {
	res.send("hello world");
});

app.get("/api/getStats", (req, res) => {
	console.log("----->>> GET /api/getStats called: ");
	Stats.find()
		.then((stats) => res.json({ stats }))
		.catch((err) => console.log(err));
});

module.exports = app;
