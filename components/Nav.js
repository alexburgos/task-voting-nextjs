import React from 'react';
import Link from 'next/link';
import { StyledNav, StyledNavList } from '../styles/StyledNav';

const Nav = () => (
	<StyledNav>
		<StyledNavList>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<li>
				<Link href="/polls">
					<a>Tasks</a>
				</Link>
			</li>
			<li>
				<Link href="/createPoll">
					<a>Create New Task</a>
				</Link>
			</li>
		</StyledNavList>
	</StyledNav>
);

export default Nav;
