import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import authActions from '../store/actions/authActions'
import userActions from '../store/actions/userActions'
import { connect } from 'react-redux'
import { StyledContainer } from '../styles/StyledContainer'
import { StyledForm, StyledInput, StyledSubmit, StyledError } from '../styles/StyledForm'

const Home = props => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  let { authenticate, authFail, setUser, authentication, user } = props

  async function handleSubmit(e) {
		e.preventDefault();
		const createNewUser = props.authentication.error && props.authentication.error.newUser;
		const url =  createNewUser ? '/api/register' : '/api/authenticate';

    try {
			authFail(null);
      let response = await fetch(url, {
        method: 'POST',
        body: createNewUser ? JSON.stringify({ userName, email, password }) : JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        let user = await response.json()
        authenticate();
        setUser(user);
        return history.push('/polls');
      } else {
        let error = await response.json()
        authFail(error)
      }
    } catch (error) {
      console.error(error)
    }
	}
	
  return (
    <StyledContainer display='flex' justifyContent='center'>
      {authentication.authenticated ? (
        <h1>Welcome, {user.userName} </h1>
      ) : (
        <StyledContainer
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <h1>Welcome to Planning Poker</h1>
          <p style={{ marginTop: 0 }}>Please log in or create an account.</p>
          <StyledForm onSubmit={handleSubmit}>
            {authentication.error && authentication.error.newUser ? (
              <>
								<StyledError>Create an account</StyledError>
                <StyledInput
                  type='text'
                  name='username'
                  placeholder='Enter a user name'
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  required
                />
                <StyledInput
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <StyledInput
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <StyledSubmit type='submit' value='Create account' />
              </>
            ) : (
              <>
								{ authentication.error && authentication.error.message && <StyledError>{authentication.error.message}</StyledError> }
                <StyledInput
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <StyledInput
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <StyledSubmit type='submit' value='Log In' />
              </>
            )}
          </StyledForm>
        </StyledContainer>
      )}
    </StyledContainer>
  )
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authActions.authenticate()),
  authFail: error => dispatch(authActions.authFail(error)),
  setUser: user => dispatch(userActions.setUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
