import React from 'react';
import Layout from '../components/Layout';
import { StyledContainer } from '../styles/StyledContainer';


const Index = () => (
	<Layout>
		<StyledContainer display="flex" justifyContent="center" height="80vh">
			<h1>Welcome to planning poker</h1>
		</StyledContainer>
	</Layout>
);

export default Index;
