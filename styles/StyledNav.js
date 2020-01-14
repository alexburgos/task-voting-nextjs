import styled from 'styled-components';

export const StyledNav = styled.nav`
  background-color: #2E3440;
  color: #ddd;
  display: flex;
  align-items: center;
  min-height: 10vh;
  margin-bottom: 20px;
`;

export const StyledNavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0 15px;
  width: 100%;

  li {
    cursor: pointer;
    list-style: none;
    margin: 0 10px;
  }

  li.log-out {
    margin-left: auto;
  }

  a {
    color: #fff;
    text-decoration: none;
    position: relative;
  }

  a:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: -5px;
		left: 0;
		background-color: #fff;
		visibility: hidden;
		border-radius: 5px;
		transform: scaleX(0);
		transition: 0.15s linear;
	}

	a:hover:before,
	a:focus:before {
		visibility: visible;
		transform: scaleX(1);
	}
`;

export const StyledNavListItem = styled.li`
  align-self: ${props => props.alignSelf}
`;