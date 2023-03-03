import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const measurementsSlice = createSlice({
  name: 'pods',
  initialState: [],
  reducers: {
    setMeasurements: (state, action) => action.payload,
    addMeasurement: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { setMeasurements, addMeasurement } = measurementsSlice.actions;


export const getMeasurements = () => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get('http://localhost:3001/measurements/1', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(setMeasurements(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const getPodMeasurements = (pod_id) => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(`http://localhost:3001/measurements/${pod_id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(setMeasurements(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const createMeasurement = (name) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.post('/api/measurements', { name }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(addMeasurement(response.data));
  } catch (error) {
    console.error(error);
  }
};