import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-omega-indol.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["data"],

  endpoints: () => ({}),
});
