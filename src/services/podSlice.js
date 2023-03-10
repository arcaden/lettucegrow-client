import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from '../constants'

export const podsSlice = createSlice({
  name: 'pods',
  initialState: {
    activePodId: null,
    pods: [],
  },
  reducers: {
    setPods: (state, action) => {
      state.pods = action.payload
      if (state.activePodId = null) {
        state.activePodId = state.pods[0].id
      }
    },
    addPod: (state, action) => {
      state.pods.push(action.payload);
    },
    toggleActive: (state, action) => {
      state.activePodId = action.payload
    },
    updatePod: (state, action) => {
      const podIndex = state.pods.findIndex((pod) => pod.id === action.payload.id);
      if (podIndex !== -1) {
        state[podIndex] = action.payload;
      }
    },
    deletePod: (state, action) => {
      return state.pods.filter((pod) => pod.id !== action.payload.id);
    },
  },
});

export const { setPods, addPod, updatePod, deletePod, toggleActive } = podsSlice.actions;


export const getPods = () => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(Constants.NGROK_URL + '/pods/', {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(setPods(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const getGardenPods = (garden_id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const { gardens } = getState();
    const response = await axios.get(Constants.NGROK_URL + `pods/${gardens.id}`, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(setPods(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const createPod = (body) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.post('/api/pods', { body }, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(addPod(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const updatePodById = (id, name) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.put(`/api/pods/${id}`, { name }, {
      headers: {
        Authorization: `${auth.token}`,
      },
    });
    dispatch(updatePod(response.data));
  } catch (error) {
    console.error(error);
  }
};
