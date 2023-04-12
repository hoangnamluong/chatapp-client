import apiSlice from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: {
          ...credentials,
        },
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { access_token } = data;

          if (data) {
            dispatch(setCredentials({ access_token }));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          ...credentials,
        },
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { access_token } = data;

          if (data) {
            dispatch(setCredentials({ access_token }));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { access_token } = data;

          dispatch(setCredentials({ access_token }));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(logout());

          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 500);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;
