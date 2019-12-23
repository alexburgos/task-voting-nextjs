import React from 'react';

const Poll = ({pollData}) => {
  let { task, choices } = pollData;

  return (
		<div className="Poll">
			<h3>Task name: {task} </h3>
			<h3>Votes:</h3>
			<ul>
				{choices.map( (choice, index) => (
					<li key={index}>
						{choice.value}: {choice.votes}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Poll;


