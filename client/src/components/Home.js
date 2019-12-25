import React from 'react';
import Poll from './Poll';
import { useFetchPolls } from '../hooks/index';

const Home = () => {
  let [polls, isLoading, isError] = useFetchPolls();


  return (
    <div className='Home'>
      <h1>Welcome to Planning Poker</h1>

      {polls.length === 0 && (
        <>
          <p>There are no tasks to vote on, good job :)</p>
          {/* <button onClick={createNewPoll}>Create a new task</button> */}
        </>
      )}

      {isLoading && <p className='Home__loading'>Loading tasks...</p>}

      {isError && (
        <p className='Home__error'>There was an error loading tasks :(</p>
      )}

      {polls.length > 0 && !isLoading && (
        <section className="Home__polls">
          <h2>These are the current polls: </h2>
          {polls.length > 0 &&
            polls.map((poll, index) => <Poll key={index} pollData={poll} />)}
        </section>
      )}
    </div>
  )
}

export default Home
