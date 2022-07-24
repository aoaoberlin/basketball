import Tables from "./Components/Tables";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div className="card text-center">
					<h5 className="card-header">
						{"Basketball Stats by AOAO".toUpperCase()}
					</h5>
					<a
						href="https://github.com/aoaoberlin/basketball"
						target="_blank"
						className="btn btn-primary"
						rel="noreferrer"
					>
						Check us on GitHub
					</a>
				</div>
				<Tables />
			</header>
		</div>
	);
}

export default App;
