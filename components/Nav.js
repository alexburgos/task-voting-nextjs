import React from 'react';
import Link from 'next/link';
import {
	StyledNav,
	StyledNavList,
	StyledNavListItem
} from '../styles/StyledNav';

const Nav = () => (
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
			<StyledNavListItem alignSelf="flex-end">
				<Link href="/login">
					<a>Login</a>
				</Link>
			</StyledNavListItem>
		</StyledNavList>
	</StyledNav>
);

export default Nav;
