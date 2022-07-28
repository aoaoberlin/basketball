import Tables from "./Components/Tables";

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<div className="card text-center">
					<h5 className="card-header">
						{"NBA Single-Season Leaders by AOAO"}
					</h5>
					<div className="button-box">
					<a
						href="https://github.com/aoaoberlin/basketball"
						target="_blank"
						className="btn btn-primary"
						role="button"
						rel="noreferrer"
					>
						Check us out on GitHub!
					</a>
					</div>
				</div>
				<Tables />
			</header>
		</div>
	);
}

export default App;
