import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://127.0.0.1:5000";

interface Home {
    users: number
  }

export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Home'],
    baseQuery: fetchBaseQuery({
        baseUrl: URL
    }),
    endpoints: (builder) => ({
        getHome: builder.query <Home, void>({
            query: () => `/`,
            providesTags: ['Home'],
        }),
    }),
});

export const { useGetHomeQuery } = api;