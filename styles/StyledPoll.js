import styled from 'styled-components';


export const StyledPollName = styled.h3`
  
`;

export const StyledPollItem = styled.span`
  margin: 10px 0;
  border: 1px solid var(--cool-gray);
  border-radius: 4px;
  cursor: pointer;
  color: var(--cool-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: transform 0.15s ease-in;
  height: 35px;
  width: 60%;

  &:hover {
    transform: scale(1.05);
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
  background: #fff;
  border: 1px solid var(--cool-gray);
  border-radius: 4px;
  box-shadow: 1px 1px 3px #000;
  color: var(--cool-gray);
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  outline-color: ghostwhite;
  padding: 10px;
  width: 110px;
  height: 165px;
  position: relative;
  &:disabled {
    background-color: #eee;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export const StyledCardHeart = styled.span`
  position: absolute;
  top: 5px;
  left: 10px;
`;

