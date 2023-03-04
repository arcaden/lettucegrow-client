import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const podsSlice = createSlice({
  name: 'pods',
  initialState: {
    activePodId: null,
    pods: [],
  },
  reducers: {
    setPods: (state, action) => {
      state.pods = action.payload
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

export const { setPods, addPod, updatePod, deletePod } = podsSlice.actions;


export const getPods = () => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get('http://localhost:3001/pods/', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(setPods(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const getPodPods = (pod_id) => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(`http://localhost:3001/pods/${pod_id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
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
        Authorization: `Bearer ${auth.token}`,
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
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(updatePod(response.data));
  } catch (error) {
    console.error(error);
  }
};
