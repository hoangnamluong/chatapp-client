import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import apiSlice from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (kw) => ({
        url: "/user",
        method: "POST",
        body: { kw },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (resData) => {
        const loadedData = resData.map((user) => {
          user.id = user._id;
          return user;
        });

        return userAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return { type: "User", id: "LIST" };
      },
    }),
  }),
});

export const { useLazyGetAllUsersQuery, useGetAllUsersQuery } = userApiSlice;
