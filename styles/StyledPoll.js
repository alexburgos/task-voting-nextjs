import styled from 'styled-components';


export const StyledPollName = styled.h3`
  
`;

export const StyledPollItem = styled.span`
  margin: 10px 0;
  background-color: var(--cool-gray);
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: transform 0.15s ease-in;
  height: 35px;
  width: 100%;

  &:hover {
    transform: scale(1.15);
  }
`;


export const StyledPollChoice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
`;

export const StyledPollVotes = styled.span`
  
`;

export const StyledPollVoteButton = styled.button`
  background: var(--cool-gray);
  border: 1px solid var(--cool-gray);
  border-radius: 4px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  outline-color: ghostwhite;
  padding: 10px;
  width: 100%;
  height: auto;
  &:disabled {
    border: 1px solid #666;
    background-color: #666;
    cursor: not-allowed;
  }
`;

