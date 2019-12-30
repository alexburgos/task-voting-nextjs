import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { StyledContainer } from '../styles/StyledContainer'
import { StyledForm, StyledSubmit, StyledInput } from '../styles/StyledForm'

const CreatePoll = () => {
  const [taskName, setTaskName] = useState('')
  const router = useRouter()

  async function createTask (e) {
    e.preventDefault()
    try {
      await fetch('/api/createPoll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskName })
      })
      router.push('/polls')
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
        <h1> Create New Task: </h1>{' '}
        <StyledForm onSubmit={createTask}>
          <StyledInput
            type='text'
            name='taskName'
            placeholder='Enter a task'
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            required
          />
          <StyledSubmit type='submit' value='Create task' />
        </StyledForm>{' '}
      </StyledContainer>{' '}
    </Layout>
  )
}

export default CreatePoll
