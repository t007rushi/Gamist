import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //logout action
    userLogout: (state) => {
      state.username = null;
      state.email = null;
      state.isLoggedIn =  false;
    },
    // login
    userLogin: (state, action) => {
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn =  true;
    },
    //signup
    userSignup: (state, action) => {
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn =  true;
    },
  },
});

export const authReducers = authSlice.reducer;
export const { userLogout, userLogin, userSignup } = authSlice.actions;
