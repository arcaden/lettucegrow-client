import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from '../constants';
import { setMeasurements } from './measurementSlice';
import { setPods } from './podSlice';

export const gardensSlice = createSlice({
    name: 'gardens',
    initialState: {
        activeGardenId: null,
        gardens: []
    },
    reducers: {
        setGardens: (state, action) => {
            state.gardens = action.payload
            if (state.activeGardenId = null) {
                state.activeGardenId = state.gardens[0].id
            }
        },

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
        const response = await axios.get(Constants.NGROK_URL + '/gardens', {
            headers: {
                Authorization: `${auth.token}`,
            },
        });
        dispatch(setGardens(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const loadInitalState = () => async (dispatch, getState) => {
    try {
        const { auth } = getState();

        const garden_response = await axios.get(Constants.NGROK_URL + '/gardens', {
            headers: {
                Authorization: `${auth.token}`,
            },
        });

        const pod_response = await axios.get(Constants.NGROK_URL + `/pod/${garden_response.data[0].id}`, {
            headers: {
                Authorization: `${auth.token}`,
            },
        });

        const measurement_response = await axios.get(Constants.NGROK_URL + `/measurement/latest/${pod_response.data[0].id}`, {
            headers: {
                Authorization: `${auth.token}`,
            },
        });

        dispatch(setGardens(garden_response.data));
        dispatch(setPods(pod_response.data));
        dispatch(setMeasurements(measurement_response.data));
    } catch (error) {
        console.error(error);
    }
};

export const getPodGardens = (pod_id) => async (dispatch, getState) => {
    try {
        console.log(getState())
        const { auth } = getState();
        const response = await axios.get(Constants.NGROK_URL + `/gardens/${pod_id}`, {
            headers: {
                Authorization: `${auth.token}`,
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
                Authorization: `${auth.token}`,
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
                Authorization: `${auth.token}`,
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
                Authorization: `${auth.token}`,
            },
        });
        dispatch(deleteGarden(response.data));
    } catch (error) {
        console.error(error);
    }
};