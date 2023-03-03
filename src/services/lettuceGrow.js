import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const lettuceGrowApi = createApi({
  reducerPath: 'lettuceGrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'localhost:3000/' }),
  endpoints: (builder) => ({
    getPodById: builder.query({
      query: (id) => `pod/${id}`,
    }),
    createNewAuth: builder.mutation({
        query: (payload) => ({
          url: '/login',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
  }),   
})})
