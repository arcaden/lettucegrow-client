import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from '../constants'

export const recordsSlice = createSlice({
  name: 'records',
  initialState: [],
  reducers: {
    setRecords: (state, action) => action.payload,
    addRecord: (state, action) => {
      state.push(action.payload);
    },
    updateRecord: (state, action) => {
      const recordIndex = state.findIndex((record) => record.id === action.payload.id);
      if (recordIndex !== -1) {
        state[recordIndex] = action.payload;
      }
    },
    deleteRecord: (state, action) => {
      return state.filter((record) => record.id !== action.payload.id);
    },
  },
});

export const { setRecords, addRecord, updateRecord, deleteRecord } = recordsSlice.actions;


export const getRecords = () => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(Constants.NGROK_URL + '/records/1', {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(setRecords(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const getPodRecords = (pod_id) => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(Constants.NGROK_URL + `/records/${pod_id}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(setRecords(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const createRecord = (record, pod_id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const { pods } = getState();
    const response = await axios.post(Constants.NGROK_URL + `/records/${pods.activePodId}`, { record }, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(addRecord(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const updateRecordById = (id, record) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.put(`/api/records/${id}`, { record }, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(updateRecord(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecordById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.delete(`/api/records/${id}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(deleteRecord(response.data));
  } catch (error) {
    console.error(error);
  }
};