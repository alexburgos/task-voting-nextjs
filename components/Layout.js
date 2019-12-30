import { Fragment } from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GlobalStyles from '../styles/GlobalStyles';


const Layout = props => (
	<Fragment>
		<Head>
			<title>Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Nav />
		{props.children}
		<Footer />
		<GlobalStyles />
	</Fragment>
);

export default Layout;
