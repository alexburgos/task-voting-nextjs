import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { StyledContainer } from '../styles/StyledContainer';


const Index = () => (
	<Layout>
		<StyledContainer
			display="flex"
			alignItems="center"
			margin="50px 0 0 0"
			height="80vh"
			flexDirection="column"
		>
			<h1>Welcome to planning poker</h1>
			<p style={{ textAlign: 'center', padding: '0 20px' }}>
				In this app a developer can cast their vote to rank how complex a task is. <br/> The
				votes are updated in real time. It's built using Next.js and its built-in API routes <br/> while Github provides simple user authentication with session cookies.
			</p>
			<p>
				<em>
					NOTE: In order to vote you have to log in. A developer can vote once but
					can change their votes.
				</em>
			</p>
		</StyledContainer>
	</Layout>
);

export default Index;
