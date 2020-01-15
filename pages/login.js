// The following code is taken from Next.JS examples and modified for this app
// github.com/zeit/next.js/tree/canary/examples/with-cookie-auth/

import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import { login } from '../utils/login';
import {
	StyledForm,
	StyledInput,
	StyledError,
	StyledSubmit
} from '../styles/StyledForm';
import { StyledContainer } from '../styles/StyledContainer';

const Login = () => {
	const [userData, setUserData] = useState({ username: '', error: '' });

	async function handleSubmit(e) {
		e.preventDefault();
		setUserData(Object.assign({}, userData, { error: '' }));

		const username = userData.username;
		const loginUrl = '/api/login';

		try {
			const response = await fetch(loginUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username })
			});
			if (response.status === 200) {
				const { token, user } = await response.json();

				await login({ token, user });
			} else {
				console.log('Login failed.');
				let error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		} catch (error) {
			console.error(
				'You might have an error in your code or there are Network issues.',
				error
			);

			const { response } = error;
			setUserData(
				Object.assign({}, userData, {
					error: response ? response.statusText : error.message
				})
			);
		}
	}

	return (
		<Layout>
			<StyledContainer
				display="flex"
				flexDirection="column"
				alignItems="center"
				flex="1"
				margin="50px 0 0 0"
			>
				<StyledForm onSubmit={handleSubmit}>
					<StyledInput
						type="text"
						id="username"
						name="username"
						placeholder="GitHub username"
						value={userData.username}
						onChange={e =>
							setUserData(
								Object.assign({}, userData, { username: e.target.value })
							)
						}
					/>

					<StyledSubmit type="submit" value="Log In"></StyledSubmit>
					{userData.error && (
						<StyledError className="error">Error: User {userData.error}</StyledError>
					)}
				</StyledForm>
			</StyledContainer>
		</Layout>
	);
}

export default Login;
