import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const { messages } = action.payload;

      if (messages) {
        state.messages = messages;
      }
    },

    appendMessage: (state, action) => {
      const { message } = action.payload;

      if (message) {
        state.messages.push(message);
      }
    },

    clearMessages: (state, action) => {
      state.messages = null;
    },
  },
});

export const { setMessages, appendMessage, clearMessages } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.access_token;

export default authSlice.reducer;
