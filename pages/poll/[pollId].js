import React from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { StyledButton } from '../../styles/StyledForm'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledPollVoteButton, StyledPollChoice } from '../../styles/StyledPoll'

const Poll = props => {
  const router = useRouter()

  async function deletePoll() {
    try {
      await fetch('/api/deletePoll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: props.poll._id })
      })
      router.push('/polls')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleVote(choice) {
    try {
      await fetch('/api/pollVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pollId: props.poll._id, voteValue: choice.value })
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <StyledContainer
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <p>{props.poll.taskName}</p>
        {props.poll.taskDescription && <p>{props.poll.taskDescription}</p>}

        <StyledContainer
          display='flex'
          flexDirection='column'
          justifyContent='space-evenly'
          minHeight='0'
          marginTop='50px'
        >
          <p>How complex is this task?</p>
          <StyledContainer
            display='flex'
            flexDirection='row'
            justifyContent='space-evenly'
            minHeight='0'
          >
            {props.poll.choices.map(choice => (
              <StyledPollChoice
                key={choice._id}
                display='flex'
                flexDirection='column'
              >
                <p>{choice.value}</p>
                <StyledPollVoteButton onClick={() => handleVote(choice)}>Vote</StyledPollVoteButton>
                <p>{choice.votes} Votes </p>
              </StyledPollChoice>
            ))}
          </StyledContainer>
        </StyledContainer>

        <StyledButton onClick={deletePoll}>Delete Poll</StyledButton>
      </StyledContainer>
    </Layout>
  )
}

Poll.getInitialProps = async props => {
  // const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  // const res = await fetch(`${baseURL}/api/polls`);
  console.log(props.query)
  let { pollId } = props.query
  const res = await fetch(`http://localhost:3000/api/poll/${pollId}`)
  const data = await res.json()

  return { poll: data }
}

export default Poll
