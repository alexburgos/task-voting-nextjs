import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledInput = styled.input`
  border: 1px solid var(--cool-gray);
  border-radius: 4px;
  font-size: 16px;
  height: 35px;
  margin: 10px auto;
  padding: 5px 10px;
  outline-color: ghostwhite;
  width: 60%;

  &::placeholder {
    color: #999
  }
`;

export const StyledSubmit = styled.input`
  background: var(--cool-gray);
  border: 1px solid var(--cool-gray);
  border-radius: 4px;
  font-size: 16px;
  font-family: 'Fira Code', monospace;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  margin: 20px auto 0;
  outline-color: ghostwhite;
  width: 60%;
  height: 50px;
`;

export const StyledError = styled.span`
  color: var(--salmon);
  text-align: center;
`;