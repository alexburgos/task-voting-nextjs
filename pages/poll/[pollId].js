import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';
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
	const allCookies = nextCookies(props);
	const { userVotes, token } = allCookies;
	let hasExistingVote = false;

	if (response.ok) {
		const data = await response.json();

		if (userVotes) {
			hasExistingVote = userVotes.userToken === token && userVotes.votes.includes(data._id);
		}

		return { poll: data, hasExistingVote: hasExistingVote };
	} else {
		throw Error;
	}
}

const Poll = (props) => {
	const [poll, setPollData] = useState(props.poll);
	const [hasExistingVote, setExistingVote] = useState(props.hasExistingVote);
	const router = useRouter();
	const { pusherChannel } = props;

	useEffect(() => {
		if (pusherChannel) {
			pusherChannel.bind('new-vote', data => {
				if (data.voted) refreshPollData();
			});
		}
	}, [pusherChannel]);

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
		const voteBody = {
			pollId: props.poll._id,
			voteValue: choice.value,
			userToken: props.token
		};

		try {
			await fetch('/api/pollVote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(voteBody)
			});

			let userVotes = (cookie.get('userVotes')) ? JSON.parse(cookie.get('userVotes')) : { userToken: props.token, votes: [] };
			userVotes.votes.push(voteBody.pollId);
			cookie.set('userVotes', JSON.stringify(userVotes), { expires: 365 });

			setExistingVote(true);

			await refreshPollData();
		} catch (error) {
			console.error(error);
		}
	}

	function handleChangeVote() {
		setExistingVote(false);
		let userVotes = JSON.parse(cookie.get('userVotes'));
		let filteredVotes = userVotes.votes.filter( id => id !== props.poll._id );
		userVotes.votes = filteredVotes;
		
		cookie.set('userVotes', JSON.stringify(userVotes), { expires: 365 });
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
								<StyledPollVoteButton
									disabled={hasExistingVote}
									onClick={() => handleVote(choice)}
								>
									{choice.value}
								</StyledPollVoteButton>
								<p>{choice.votes} Votes </p>
							</StyledPollChoice>
						))}
					</StyledContainer>
				</StyledContainer>
				<StyledContainer display="flex" marginTop="20px" minHeight="0" >
					{hasExistingVote && (
						<StyledButton onClick={handleChangeVote}>
							Change your Vote
						</StyledButton>
					)}
					<StyledButton onClick={deletePoll} margin={'0 0 0 10px'}>Delete Poll</StyledButton>
				</StyledContainer>
			</StyledContainer>
		</Layout>
	);
};

Poll.getInitialProps = fetchPollData;

export default withAuthSync(Poll);
