import styled from 'styled-components';
export const StyledNav = styled.nav`
  background-color: #2E3440;
  color: #ddd;
  display: flex;
  align-items: center;
  min-height: 64px;
  margin-bottom: 20px;
`;

export const StyledNavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;
