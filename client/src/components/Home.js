import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import actions from '../store/actions/authActions';
import { connect } from 'react-redux';

const Home = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	let { authenticate } = props;

	function handleSubmit(e) {
		e.preventDefault();

		fetch('/api/authenticate', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.status === 200) {
					authenticate();
					return history.push('/polls');
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch(err => {
				console.error(err);
				alert(err);
			});
	}

	return (
		<div className="Home">
			<h1>Welcome to Planning Poker</h1>
			{props.authentication.authenticated ? (
				<p></p>
			) : (
				<form onSubmit={handleSubmit} className="Form">
					<h2>Please log in to see the tasks</h2>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<input type="submit" value="Log In" />
				</form>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
	authenticate: () => dispatch(actions.authenticate()),
	signOut: () => dispatch(actions.signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
