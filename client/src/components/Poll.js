import React from 'react';

const Poll = ({pollData}) => {
	let { task, choices, _id } = pollData;
	
	function submitVote(choice) {
		console.log(choice, `/api/poll/${_id}/vote`);
		fetch(`/api/poll/${_id}/vote`, {
			method: 'POST',
			body: JSON.stringify({ choice }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.status === 200) {
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch(err => {
				console.error(err);
				// alert(err);
			});
	}

  return (
		<div className="Poll">
			<h3>Task name: {task} </h3>
			<div className="Poll__choices">
				{choices.map((choice) => (
					<div key={choice._id}>
						<span>Points: {choice.value}</span>
						<span>Votes: {choice.votes}</span>
						<button onClick={(e) => submitVote(choice)}>Vote</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Poll;


