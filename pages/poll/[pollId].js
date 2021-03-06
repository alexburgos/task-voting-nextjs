import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';
import Layout from '../../components/Layout';
import { StyledButton } from '../../styles/StyledForm';
import { StyledContainer } from '../../styles/StyledContainer';
import {
	StyledPollVoteButton,
	StyledPollChoice,
	StyledCardHeart
} from '../../styles/StyledPoll';
import { withAuthSync, getHost } from '../../utils/login';

async function fetchPollData(props) {
	//Load initial poll data and reuse function to refresh it after a vote
	const apiUrl = getHost(props.req) + '/api/poll/' + props.query.pollId;
	const response = await fetch(apiUrl);
	const allCookies = nextCookies(props);
	const { user } = allCookies;
	let hasExistingVote = false;

	if (response.ok) {
		const data = await response.json();

		if (user) {
			//if current user has voted on this poll based on cookie session set a flag to disable voting on first load
			const currentPoll = user.votes.find(
				vote => vote.pollId === props.query.pollId
			);

			hasExistingVote = currentPoll ? true : false;
		}

		return { poll: data, hasExistingVote };
	} else {
		throw Error;
	}
}

const Poll = props => {
	const [poll, setPollData] = useState(props.poll);
	const [editingPollVote, setEditingPollVote] = useState(false);
	const [user, setUser] = useState(props.user);
	const [hasExistingVote, setExistingVote] = useState(props.hasExistingVote);
	const { pusherChannel } = props;

	useEffect(() => {
		if (pusherChannel) {
			pusherChannel.bind('new-vote', data => {
				if (data.voted) refreshPollData();
			});
		}
	}, [pusherChannel]);

	async function refreshPollData() {
		// Simulating the network request object from initial fetch (TODO: maybe there's a better way to do this?)
		const refreshedProps = await fetchPollData({
			req: { headers: { host: window.location.host } },
			query: { pollId: poll._id }
		});
		setPollData(refreshedProps.poll);
	}

	//Logic to handle first vote and when an user decides to change their votes
	async function handleVote(choice) {
		const voteBody = editingPollVote
			? {
					pollId: props.poll._id,
					editingPollVote,
					oldIndex: parseInt(
						user.votes.find(vote => vote.pollId === props.poll._id).pointValueIndex
					),
					newIndex: choice.index,
					userToken: props.token
			  }
			: {
					pollId: props.poll._id,
					editingPollVote,
					newIndex: choice.index,
					userToken: props.token
			  };

		try {
			const response = await fetch('/api/pollVote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(voteBody)
			});

			const { user } = await response.json();

			cookie.set('user', JSON.stringify(user), { expires: 1 });
			setExistingVote(true);
			setEditingPollVote(false);
			setUser(user);

			await refreshPollData();
		} catch (error) {
			console.error(error);
		}
	}

	function handleChangeVote() {
		setExistingVote(false);
		setEditingPollVote(true);
	}

	return (
		<Layout {...props}>
			<StyledContainer
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				margin="50px 0 0 0"
				textAlign="center"
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
					margin="50px 0 0 0"
				>
					<p>How complex is this task? (The higher the number vote the more complex)</p>
					<StyledContainer
						display="flex"
						flexDirection="row"
						flexWrap="wrap"
						justifyContent="space-evenly"
						minHeight="0"
						margin="20px 0 0 0"
					>	
						{poll.choices.map(choice => (
							<StyledPollChoice
								key={choice.index}
								display="flex"
								flexDirection="column"
							>
								<StyledPollVoteButton
									disabled={hasExistingVote}
									onClick={() => handleVote(choice)}
									width="50px"
								>
								<StyledCardHeart>🖤</StyledCardHeart>
									{choice.points}
								</StyledPollVoteButton>
								<p>{choice.votes}</p>
							</StyledPollChoice>
						))}
					</StyledContainer>
				</StyledContainer>
				<StyledContainer display="flex" margin="20px 0 0 0" minHeight="0">
					{hasExistingVote && (
						<StyledButton onClick={handleChangeVote}>
							Change your Vote
						</StyledButton>
					)}
				</StyledContainer>
			</StyledContainer>
		</Layout>
	);
};

Poll.getInitialProps = fetchPollData;

export default withAuthSync(Poll);
