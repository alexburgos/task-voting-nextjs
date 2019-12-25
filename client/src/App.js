import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import Polls from './components/Polls';

const App = () => {
  return (
		<Router>
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
				<Route path="/view-polls">
					<Polls />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App
