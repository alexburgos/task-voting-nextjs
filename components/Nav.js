import React from 'react';
import Link from 'next/link';
import {
	StyledNav,
	StyledNavList,
	StyledNavListItem
} from '../styles/StyledNav';
import { logout } from '../utils/login';

const Nav = props => (
	<StyledNav>
		<StyledNavList>
			<StyledNavListItem>
				<Link href="/">
					<a>Home</a>
				</Link>
			</StyledNavListItem>
			<StyledNavListItem>
				<Link href="/polls">
					<a>Polls</a>
				</Link>
			</StyledNavListItem>
			<StyledNavListItem>
				<Link href="/createPoll">
					<a>Create New Poll</a>
				</Link>
			</StyledNavListItem>
			{props.token && (
				<StyledNavListItem className="log-out">
					<a onClick={logout}>Logout</a>
				</StyledNavListItem>
			)}
		</StyledNavList>
	</StyledNav>
);

export default Nav;
