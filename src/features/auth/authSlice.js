import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //logout action
    userLogout: (state) => {
      state.username = null;
      state.email = null;
    },
    // login
    userLogin: (state, action) => {
      state.username = action.payload.name;
      state.email = action.payload.email;
    },
    //signup
    userSignup: (state, action) => {
      state.username = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const authReducers = authSlice.reducer;
export const { userLogout, userLogin, userSignup } = authSlice.actions;
