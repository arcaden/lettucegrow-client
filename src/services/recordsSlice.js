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


export const getRecords = (pod_id) => async (dispatch, getState) => {
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

export const getPodRecords = (pod_id) => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(Constants.NGROK_URL + `/records/${pod_id}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    console.log("REPONSE WHEN ")
    console.log(response)
    dispatch(setRecords(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const createRecord = (record, pod_id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const { pods } = getState();
    const response = await axios.post(Constants.NGROK_URL + `/records/${pod_id}`, { ...record }, {
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
    console.log("UPDATING")
    console.log(record)
    console.log("######")
    const response = await axios.patch(Constants.NGROK_URL + `/record/${id}`, { body: {...record }}, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(updateRecord(response.data));
    dispatch(getRecords(Constants.POD_ID));
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecordById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.delete(Constants.NGROK_URL + `/record/${id}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(deleteRecord(response.data));
    dispatch(getRecords(Constants.POD_ID));
  } catch (error) {
    console.error(error);
  }
};