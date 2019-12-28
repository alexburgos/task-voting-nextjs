import React from 'react'

const Poll = ({ pollData }) => {
  let { task, choices, _id } = pollData

  const submitVote = async choice => {
    try {
      await fetch('/api/vote', {
        method: 'POST',
        body: JSON.stringify({ pollId: _id, choice }),
        headers: {
          'Content-Type': 'application/json'
        }
			})
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='Poll'>
      <h3>Task name: {task} </h3>
      <div className='Poll__choices'>
        {choices.map(choice => (
          <div key={choice._id}>
            <span>Points: {choice.value}</span>
            <span>Votes: {choice.votes}</span>
            <button onClick={e => submitVote(choice)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Poll
