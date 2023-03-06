import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const gardensSlice = createSlice({
  name: 'gardens',
  initialState: [],
  reducers: {
    setGardens: (state, action) => action.payload,
    addGarden: (state, action) => {
      state.push(action.payload);
    },
    updateGarden: (state, action) => {
      const gardenIndex = state.findIndex((garden) => garden.id === action.payload.id);
      if (gardenIndex !== -1) {
        state[gardenIndex] = action.payload;
      }
    },
    deleteGarden: (state, action) => {
      return state.filter((garden) => garden.id !== action.payload.id);
    },
  },
});

export const { setGardens, addGarden, updateGarden, deleteGarden } = gardensSlice.actions;


export const getGardens = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.get('http://localhost:3001/gardens/', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(setGardens(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const getPodGardens = (pod_id) => async (dispatch, getState) => {
  try {
    console.log(getState())
    const { auth } = getState();
    const response = await axios.get(`http://localhost:3001/gardens/${pod_id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(setGardens(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const createGarden = (body) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.post('/api/gardens', { body }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(addGarden(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const updateGardenById = (id, name) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.put(`/api/gardens/${id}`, { name }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(updateGarden(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteGardenById = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const response = await axios.delete(`/api/gardens/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(deleteGarden(response.data));
  } catch (error) {
    console.error(error);
  }
};