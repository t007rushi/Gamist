import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "../features/auth/authSlice";
import { postReducers } from "../features/posts/postSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    posts: postReducers,
  },
});

export default store;
