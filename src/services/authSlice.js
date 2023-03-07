import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NzQ4MjhhNy1hOTc1LTQ4MzYtYjFmNS1hYjIyN2ExZTU4M2UiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE2NzgwNjA1NjUsImV4cCI6MTY3ODA2NDE2NSwianRpIjoiYzRlZWFiMDMtODNkZC00MTJkLWIxN2QtNzEwYzkwODIyYWM3In0.NnxcSFtNOPf9qs3c06zAEDb1Kz6ZXT1bmaPIcA86e54",
    loading: false,
    error: null
  },
  reducers: {
    loginStart: state => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.token = action.payload
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions

export const login = credentials => async dispatch => {
  dispatch(loginStart())
  let body = {
    user: {
      email: credentials.username,
      password: credentials.password
    }
  }
  try {
    const response = await axios.post('http://localhost:3001/users/sign_in', body)
    const token = response.headers.authorization
    dispatch(loginSuccess(token))
  } catch (error) {
    dispatch(loginFailure(error.message))
  }
}