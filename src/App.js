// import "./App.css";
import Table from "./Components/Table";
import { Component } from "react";

function App() {
	const data = require("./api/response.json");

	return (
		<div className="App">
			<header className="App-header">
				<div class="card text-center">
					<h5 class="card-header">
						{"Basketball Stats by AOAO".toUpperCase()}
					</h5>
					<div class="card-body">
						<h5 class="card-title">Who's the best player?</h5>
						<p class="card-text">
							Click on any column below to sort the table
							ascending or descending
						</p>
						<a
							href="https://github.com/aoaoberlin/basketball"
							target="_blank"
							class="btn btn-primary"
							rel="noreferrer"
						>
							Check us on GitHub
						</a>
					</div>
				</div>
				<Table data={data} />
			</header>
		</div>
	);
}

export default App;
