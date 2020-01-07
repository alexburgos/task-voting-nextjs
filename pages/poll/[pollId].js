import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Pusher from 'pusher-js';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { StyledButton } from '../../styles/StyledForm';
import { StyledContainer } from '../../styles/StyledContainer';
import {
	StyledPollVoteButton,
	StyledPollChoice
} from '../../styles/StyledPoll';

async function fetchPollData(props) {
	// const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
	// const res = await fetch(`${baseURL}/api/polls`);
	const res = await fetch(
		`http://localhost:3000/api/poll/${props.query.pollId}`
	);
	const data = await res.json();

	return { poll: data };
}

const Poll = props => {
	const [poll, setPollData] = useState(props.poll);
	const router = useRouter();
	const { pusherChannel } = props;

	useEffect(() => {
		if (pusherChannel) {
			pusherChannel.bind('new-vote', data => {
				if (data.voted) refreshPollData();
			});
		}
	}, [pusherChannel])

	async function refreshPollData() {
		const refreshedProps = await fetchPollData({ query: { pollId: poll._id } });
		setPollData(refreshedProps.poll);
  }

	async function deletePoll() {
		try {
			await fetch('/api/deletePoll', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: props.poll._id })
			});
			router.push('/polls');
		} catch (error) {
			console.error(error);
		}
	}

	async function handleVote(choice) {
		try {
			await fetch('/api/pollVote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					pollId: props.poll._id,
					voteValue: choice.value
				})
			});

			await refreshPollData();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Layout>
			<StyledContainer
				display="flex"
				flexDirection="column"
        alignItems="center"
        justifyContent="center"
			>
				<p>{poll.taskName}</p>
				{poll.taskDescription && <p>{poll.taskDescription}</p>}

				<StyledContainer
					display="flex"
					flexDirection="column"
					justifyContent="space-evenly"
					minHeight="0"
					flex="0"
					marginTop="50px"
				>
					<p>How complex is this task?</p>
					<StyledContainer
						display="flex"
						flexDirection="row"
						justifyContent="space-evenly"
						minHeight="0"
					>
						{poll.choices.map(choice => (
							<StyledPollChoice
								key={choice._id}
								display="flex"
								flexDirection="column"
							>
								<p>{choice.value}</p>
								<StyledPollVoteButton onClick={() => handleVote(choice)}>
									Vote
								</StyledPollVoteButton>
								<p>{choice.votes} Votes </p>
							</StyledPollChoice>
						))}
					</StyledContainer>
				</StyledContainer>

				<StyledButton onClick={deletePoll}>Delete Poll</StyledButton>
			</StyledContainer>
		</Layout>
	);
};

Poll.getInitialProps = fetchPollData;

export default Poll;
