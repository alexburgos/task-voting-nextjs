import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/Layout'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledButton } from '../../styles/StyledForm'

const Poll = props => {
  async function deleteTask() {
    try {
      await fetch('/api/deletePoll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: props.poll._id })
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
        {props.poll.choices.map(choice => (
          <p>
            {choice.value}: {choice.votes} Votes{' '}
          </p>
        ))}

        <StyledButton onClick={deleteTask}>Delete Task</StyledButton>
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
