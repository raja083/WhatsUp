// src/redux/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  messages: [],  // ✅ Add this to store messages for the selected chat
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.messages = []; // ✅ Also clear messages when deselecting user
    },
    setMessages: (state, action) => {
      state.messages = action.payload; // ✅ Used when fetching from backend
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // ✅ Used for real-time messages
    },
  },
});

export const {
  setSelectedUser,
  clearSelectedUser,
  setMessages,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
