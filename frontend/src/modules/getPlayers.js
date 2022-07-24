const axios = require("axios");
const fs = require("fs");

for (let page = 1; page <= 38; page++) {
	axios
		.get(
			`https://www.balldontlie.io/api/v1/players?page=${page}&per_page=100`
		)
		.then((response) => {
			fs.writeFile(
				`../data/players/players${page}.json`,
				JSON.stringify(response.data),
				(err) => {
					if (err) throw err;
					console.log(
						`Players from page ${page} successfully downloaded`
					);
				}
			);
			return;
		})
		.catch((error) => {
			console.log(error);
		});
}
