import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import { StyledContainer } from '../styles/StyledContainer'
import { StyledPollItem } from '../styles/StyledPoll';

const Polls = props => (
  <Layout>
    <StyledContainer
      display='flex'
      alignItems='center'
      flexDirection='column'
      minHeight='80vh'
    >
      {props.polls.length > 0 ? (
        <>
          <h1>You can vote on the following polls: </h1>
          {props.polls.length > 0 && (
            <StyledContainer
              display='flex'
              alignItems='center'
              flexDirection='column'
              marginTop='50px'
              minHeight='0'
            >
              {props.polls.map(poll => (
                <Link key={poll._id} href={`/poll/${poll._id}`}>
                  <StyledPollItem>{poll.taskName}</StyledPollItem>
                </Link>
              ))}
            </StyledContainer>
          )}
        </>
      ) : (
        <p>There are no polls to vote on. </p>
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
