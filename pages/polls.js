import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import Layout from '../components/Layout';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledPollItem } from '../styles/StyledPoll';
import { withAuthSync, getHost } from '../utils/login';

const Polls = props => (
	<Layout {...props}>
		<StyledContainer
			display="flex"
			alignItems="center"
			flexDirection="column"
			minHeight="75vh"
			margin="50px 0 0 0"
		>
			{props.polls.length > 0 ? (
				<>
					{props.polls.length > 0 && (
						<StyledContainer
							display="flex"
							alignItems="center"
							textAlign="center"
							flexDirection="column"
							minHeight="0"
						>
						<h1>You can vote on the following polls: </h1>
							{props.polls.map(poll => (
								<Link key={poll._id} href={`/poll/${poll._id}`}>
									<StyledPollItem>{poll.taskName}</StyledPollItem>
								</Link>
							))}
						</StyledContainer>
					)}
				</>
			) : (
				<>
					<p>There are no polls to vote on. </p>
					<Link href={'/createPoll'}>Create a new poll!</Link>
				</>
			)}
		</StyledContainer>
	</Layout>
);

Polls.getInitialProps = async ctx => {
	// fetch all the polls
	const { token } = nextCookie(ctx);
	const apiUrl = getHost(ctx.req) + '/api/polls';

	const redirectOnError = () =>
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();

	try {
		const response = await fetch(apiUrl, {
			credentials: 'include',
			headers: {
				Authorization: JSON.stringify({ token })
			}
		});

		if (response.ok) {
			const data = await response.json();
			return { polls: data };
		} else {
			return await redirectOnError();
		}
	} catch (error) {
		console.error(error);
		return redirectOnError();
	}
};

export default withAuthSync(Polls);
