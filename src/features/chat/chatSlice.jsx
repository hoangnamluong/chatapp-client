import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    clearChat: (state, action) => {
      state.selectedChat = null;
    },
  },
});

export const { setChat, clearChat } = chatSlice.actions;

export const selectChat = (state) => state.chat.selectedChat;

export default chatSlice.reducer;
