import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token } = action.payload;

      if (access_token) {
        state.access_token = access_token;
      }
    },

    logout: (state, action) => {
      state.access_token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.access_token;

export default authSlice.reducer;
