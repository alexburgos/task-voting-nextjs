import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory
} from 'react-router-dom';
import actions from './store/actions/authActions';
import { connect } from 'react-redux';
import Home from './components/Home';
import Polls from './components/Polls';
import PrivateRoute from './components/PrivateRoute';

const App = props => {
	const history = useHistory();
	let { authenticate } = props;

	useEffect(() => {
		// check for auth token and restore auth session
		fetch('/checkToken')
			.then(res => {
				if (res.status === 200) {
					// authenticate();
					// return history.push('/polls');
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<nav className="App__nav">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/polls">Polls</Link>
					</li>
				</ul>
			</nav>

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
	authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
	authenticate: () => dispatch(actions.authenticate()),
	signOut: () => dispatch(actions.signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
