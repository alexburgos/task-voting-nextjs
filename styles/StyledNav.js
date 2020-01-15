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
    margin: 0 15px;
  }

  li.log-out {
    margin-left: auto;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;

export const StyledNavListItem = styled.li`
  align-self: ${props => props.alignSelf}
`;