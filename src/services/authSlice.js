import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from '../constants'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("token"),
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
    const response = await axios.post(Constants.NGROK_URL + '/users/sign_in', body)
    const token = response.headers.authorization
    if (token) {
      localStorage.setItem('token', token)
    }
    dispatch(loginSuccess(token))
  } catch (error) {
    dispatch(loginFailure(error.message))
  }
}