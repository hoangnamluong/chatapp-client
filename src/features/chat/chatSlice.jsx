import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  actionIsOpen: false,
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

    toggleAction: (state, action) => {
      state.actionIsOpen = !state.actionIsOpen;
    },
  },
});

export const { setChat, clearChat, toggleAction } = chatSlice.actions;

export const selectChat = (state) => state.chat.selectedChat;
export const selectIsOpen = (state) => state.chat.actionIsOpen;

export default chatSlice.reducer;
