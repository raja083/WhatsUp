import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import chatReducer from "../features/chatSlice.js"
import { authApi } from "@/features/api/authApi.js";
import { messageApi } from "@/features/api/messageApi.js";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  auth: authReducer,
  chat: chatReducer
});

export default rootReducer;
