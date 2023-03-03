import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxYTA0Y2NhNS1lZDJjLTQ1OTgtOTQ0Yi1mYWFmYzFmY2IyYzQiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE2Nzc3MzQ4MTUsImV4cCI6MTY3NzczODQxNSwianRpIjoiMTNjZjhkZTAtMjdhMC00ZjMxLWI5MzAtMTAzNGRmZjRjOTlkIn0.WyAHP7CoS42wXC_sxuE3vWMxZ_eBHHM5vNPNOBxBQEs",
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