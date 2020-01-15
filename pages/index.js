import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { StyledContainer } from '../styles/StyledContainer';

const Index = () => (
	<Layout>
		<StyledContainer
			display="flex"
			alignItems="center"
			marginTop="50px 0 0 0"
			minHeight="75vh"
			flexDirection="column"
		>
			<h1 style={{ textAlign: 'center' }}>Welcome to planning poker</h1>
			<p style={{ textAlign: 'center', padding: '0 20px', margin: '10px 0' }}>
				In this app a developer can cast their vote to rank how complex a task is using the "planning poker" method. <br/> The
				votes are updated in real time. It's built using Next.js and API routes with isomorphic data fetching and Styled Components for component specific styling. <br/>  Github provides simple user authentication with session cookies and Mongoose connects to our database to store votes and users.
			</p>
			<p style={{ textAlign: 'center', padding: '0 20px', margin: '10px 0' }}>
				<em>
					NOTE: In order to vote you have to log in, so you need a Github account. A developer can vote once but
					can change their votes. <br/>
					You'll need to have Node, Mongodb in order to manipulate data and work with this application locally.
				</em>
			</p>
		</StyledContainer>
	</Layout>
);

export default Index;
