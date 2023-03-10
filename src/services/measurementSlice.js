import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from '../constants'

export const measurementsSlice = createSlice({
  name: 'measurements',
  initialState: [],
  reducers: {
    setMeasurements: (state, action) => action.payload,
  },
});

export const { setMeasurements } = measurementsSlice.actions;


export const getMeasurements = () => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const { pods } = getState();
    const response = await axios.get(Constants.NGROK_URL + `/measurements/${pods.activePodId}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(setMeasurements(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const getLatestMeasurements = (pod_id) => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const { pods } = getState();
    const response = await axios.get(Constants.NGROK_URL + `/measurements/latest/${pods.activePodId}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(setMeasurements(response.data));
  } catch (error) {
    console.error(error);
  }
};