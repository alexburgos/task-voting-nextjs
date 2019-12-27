import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				rest.authentication.authenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

const mapStateToProps = state => ({
	authentication: state.authentication
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
