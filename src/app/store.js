import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authSlice } from '../services/authSlice'
import { recordsSlice } from '../services/recordsSlice'
import { measurementsSlice } from '../services/measurementSlice'
import { lettuceGrowApi } from '../services/lettuceGrow'
import { podsSlice } from '../services/podSlice'
import { gardensSlice } from '../services/gardenSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    records: recordsSlice.reducer,
    measurements: measurementsSlice.reducer,
    pods: podsSlice.reducer,
    gardens: gardensSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(lettuceGrowApi.middleware),
})

setupListeners(store.dispatch)
