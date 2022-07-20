const axios = require("axios");
const fs = require("fs");

axios
	.get("https://www.balldontlie.io/api/v1/players?per_page=100")
	.then(function (response) {
		fs.writeFile(
			"./api/players.json",
			JSON.stringify(response.data),
			function (err) {
				if (err) throw err;
				console.log("Players successfully downloaded");
			}
		);
		return;
	})
	.catch(function (error) {
		console.log(error);
	});