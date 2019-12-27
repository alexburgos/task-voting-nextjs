import React, { useEffect } from 'react';
import Poll from './Poll';
import { useFetchPolls } from '../hooks/index';

const Polls = props => {
	let [polls, isLoading, isError] = useFetchPolls();
	

	function createNewPoll() {}

	return (
		<div className="Polls">
			{isLoading && <p className="Polls__loading">Loading tasks...</p>}

			{isError && (
				<p className="Polls__error">There was an error loading tasks :(</p>
			)}

			{polls.length > 0 && !isLoading && (
				<section>
					<h2>These are the current polls: </h2>
					{polls.length > 0 &&
						polls.map((poll) => <Poll key={poll._id} pollData={poll} />)}
				</section>
			)}

			{polls.length === 0 && !isError && (
				<>
					<p>There are no tasks to vote on, good job :)</p>
					<button onClick={createNewPoll}>Create a new task</button>
				</>
			)}
		</div>
	);
};

export default Polls;
