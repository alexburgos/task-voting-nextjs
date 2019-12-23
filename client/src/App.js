import React from 'react';
import { useFetchPolls } from './hooks/index';
import Poll from './components/Poll';

function App() {
	let [polls, isError, isLoading] = useFetchPolls();

	return (
		<div className="App">
			<h1>Planning Poker</h1>

			<section>
				<h2>These are the current polls: </h2>
				{isLoading && <p>Loading...</p>}
				{polls.length > 0 &&
					polls.map((poll, index) => <Poll key={index} pollData={poll} />)}
			</section>
		</div>
	);
}

export default App;
