import Table from "./Components/Table";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div className="card text-center">
					<h5 className="card-header">
						{"Basketball Stats by AOAO".toUpperCase()}
					</h5>
					<div className="card-body">
						<h5 className="card-title">Who's the best player?</h5>
						<p className="card-text">
							Click on any column below to sort the table
							ascending or descending
						</p>
						<a
							href="https://github.com/aoaoberlin/basketball"
							target="_blank"
							className="btn btn-primary"
							rel="noreferrer"
						>
							Check us on GitHub
						</a>
					</div>
				</div>
				<Table />
			</header>
		</div>
	);
}

export default App;
