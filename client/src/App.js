import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory
} from 'react-router-dom';
import authActions from './store/actions/authActions';
import userActions from './store/actions/userActions';
import { connect } from 'react-redux';
import Home from './components/Home';
import Polls from './components/Polls';
import PrivateRoute from './components/PrivateRoute';
import GlobalStyles from './styles/GlobalStyles';
import { StyledNav, StyledNavList } from './styles/StyledNav';

const App = props => {
	const history = useHistory();
	let { authenticate, setUser, authentication } = props;

	async function restoreSession() {
		// check for auth token and restore auth session
		try {
			let response = await fetch('/api/checktoken');
			if (response.ok) {
				let user = await response.json()
				authenticate();
				setUser(user);
			} else {
				console.log('User must be logged in!');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleLogout() {
		try {
			let response = await fetch('/api/logout');
			if (response.ok) {
				setUser({});
				return history.push('/');
			} else {
				console.log('Error logging out');
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		restoreSession();
	}, []);

	return (
		<>
			<GlobalStyles/>
			<StyledNav className="App__nav">
				<StyledNavList>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/polls">Tasks</Link>
					</li>
					{authentication.authenticated  && <li>
						<a onClick={handleLogout}>Log out</a>
					</li>}
				</StyledNavList>
			</StyledNav>

			<Switch>
				<PrivateRoute path="/polls">
					<Polls />
				</PrivateRoute>
				<Route path="/login">
					<Home />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</>
	);
};

const mapStateToProps = state => ({
	authentication: state.authentication,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	authenticate: () => dispatch(authActions.authenticate()),
	signOut: () => dispatch(authActions.signOut()),
	setUser: user => dispatch(userActions.setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
