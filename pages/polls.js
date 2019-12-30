import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import { StyledContainer } from '../styles/StyledContainer'

const Polls = props => (
  <Layout>
    <StyledContainer
      display='flex'
      alignItems='center'
      flexDirection='column'
      height='80vh'
    >
      <h1>Tasks: </h1>
      {props.polls.length > 0 && (
        <StyledContainer
          display='flex'
          justifyContent='center'
          flexDirection='row'
        >
          {props.polls.map(poll => (
            <Link key={poll._id} href={`/poll/${poll._id}`}>
              <span>{poll.taskName}</span>
            </Link>
          ))}
        </StyledContainer>
      )}
    </StyledContainer>
  </Layout>
)

Polls.getInitialProps = async ({ req }) => {
  // const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  // const res = await fetch(`${baseURL}/api/polls`);
  const res = await fetch(`http://localhost:3000/api/polls`)
  const data = await res.json()

  return { polls: data }
}

export default Polls
