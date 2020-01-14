// The following code is taken from Next.JS examples
// github.com/zeit/next.js/tree/canary/examples/with-cookie-auth/

import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({ token, user }) => {
	cookie.set('token', token, { expires: 1 });
	cookie.set('user', user, { expires: 1});
	Router.push('/polls');
};

export const auth = ctx => {
	const { token, user } = nextCookie(ctx);

	// If there's no token, it means the user is not logged in.
	if (!token) {
		if (typeof window === 'undefined') {
			ctx.res.writeHead(302, { Location: '/login' });
			ctx.res.end();
		} else {
			Router.push('/login');
		}
	}

	return { token, user };
};

export const logout = () => {
	cookie.remove('token');
	cookie.remove('user');
	window.localStorage.setItem('logout', Date.now());
	Router.push('/login');
};

export const withAuthSync = WrappedComponent => {
	const Wrapper = props => {
		const syncLogout = event => {
			if (event.key === 'logout') {
				console.log('logged out from storage!');
				Router.push('/login');
			}
		};

		useEffect(() => {
			window.addEventListener('storage', syncLogout);

			return () => {
				window.removeEventListener('storage', syncLogout);
				window.localStorage.removeItem('logout');
			};
		}, []);

		return <WrappedComponent {...props} />;
	};

	Wrapper.getInitialProps = async ctx => {
		const { token, user } = auth(ctx);

		const componentProps =
			WrappedComponent.getInitialProps &&
			(await WrappedComponent.getInitialProps(ctx));

		return { ...componentProps, token, user };
	};

	return Wrapper;
};

// This is not production ready, (except with providers that ensure a secure host, like Now)
// For production consider the usage of environment variables and NODE_ENV

export const getHost = (req) => {
  if (!req) return '';

	const { host } = req.headers;

	if (host.startsWith('localhost')) {
		return `http://${host}`;
	}
	return `https://${host}`;
}
