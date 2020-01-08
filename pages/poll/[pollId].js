import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { StyledButton } from '../../styles/StyledForm';
import { StyledContainer } from '../../styles/StyledContainer';
import {
	StyledPollVoteButton,
	StyledPollChoice
} from '../../styles/StyledPoll';
import { withAuthSync, getHost } from '../../utils/login';

async function fetchPollData(props) {
	const apiUrl = getHost(props.req) + '/api/poll/' + props.query.pollId;
	const response = await fetch(apiUrl);

	if (response.ok) {
		const data = await response.json();
		return { poll: data };
	} else {
		throw Error;
	}
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
		// Simulating the network request object from initial fetch (maybe there's a better way to do this?)
		const refreshedProps = await fetchPollData({
			req: { headers: { host: window.location.host } },
			query: { pollId: poll._id }
		});
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
					voteValue: choice.value,
					userToken: props.token
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
				<p>
					<strong>Title</strong>: {poll.taskName}
				</p>
				{poll.taskDescription && (
					<p>
						<strong>Description</strong>: {poll.taskDescription}
					</p>
				)}

				<StyledContainer
					display="flex"
					flexDirection="column"
					justifyContent="space-evenly"
					minHeight="0"
					flex="0"
					marginTop="50px"
				>
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
								<StyledPollVoteButton onClick={() => handleVote(choice)}>
									{choice.value}
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

export default withAuthSync(Poll);
