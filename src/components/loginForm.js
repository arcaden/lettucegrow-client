import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../services/authSlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm