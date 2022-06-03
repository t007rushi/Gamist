import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { app, database } from "../../firbaseConfig";
const auth = getAuth();
const initialState = {
  username: null,
  email: null,
  isLoggedIn: false,
  user: {},
  otherUserDetails: {},
  users: [],
  error: null,
  signUpStatus: "idle",
  signInStatus: "idle",
  signOutStatus: "idle",
  getUserStatus: "idle",
};

//signin
export const SignIn = createAsyncThunk(
  "auth/SignIn",
  async ({ email, password }) => {
    try {
      const auth = getAuth(app);
      const data = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(database, "users", data.user.uid));
      return userDoc.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//google auth
export const handleGLogin = createAsyncThunk("auth/GoogleSignIn", async () => {
  const Gprovider = new GoogleAuthProvider();
  try {
    const userdata = { firstName: "", email: "" };
    await signInWithPopup(auth, Gprovider).then((userCred) => {
      userdata.firstName = userCred.user.displayName;
      userdata.email = userCred.user.email;
    });
    return userdata;
  } catch (error) {
    console.log(error.message);
  }
});

//twitter auth
export const handleTLogin = createAsyncThunk("auth/TwitterSignIn", async () => {
  try {
    const Tprovider = new TwitterAuthProvider();
    await signInWithPopup(auth, Tprovider).then((userCred) => {});
  } catch (error) {
    console.log(error.message);
  }
});

//facebook auth
export const handleFLogin = createAsyncThunk(
  "auth/FacebookSignIn",
  async () => {
    try {
      const Fprovider = new FacebookAuthProvider();
      await signInWithPopup(auth, Fprovider).then((userCred) => {});
    } catch (error) {
      console.log(error.message);
    }
  }
);

//signup
export const SignUp = createAsyncThunk(
  "auth/SignUp",
  async ({ firstName, lastName, email, password }) => {
    try {
      const auth = getAuth(app);
      const data = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(database, "users", data.user.uid), {
        firstName,
        lastName,
        email,
        id: data.user.uid,
      });
      return {
        firstName,
        lastName,
        email,
        id: data.user.uid,
      };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//signout
export const SignOut = createAsyncThunk("auth/SignOut", () => {
  try {
    const auth = getAuth(app);
    signOut(auth).then(() => {});
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

//getAllUsers
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (arg, { getState }) => {
    try {
      const userstate = getState();
      const user = userstate.auth.user;
      const userRef = collection(database, "users");

      const userQuery = query(userRef, where("email", "!=", user.email));
      const userquerySnapshot = await getDocs(userQuery);
      const users = userquerySnapshot.docs.map((userdocument) => ({
        ...userdocument.data(),
        id: userdocument.id,
      }));
      return users;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//getUserProfile
export const getUserProfileDetails = createAsyncThunk(
  "auth/getUserProfileDetails",
  async (userId) => {
    try {
      const userRef = doc(database, "users", userId);
      const userData = await getDoc(userRef);
      return userData.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//updateUserDetails
export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async (userData, { getState }) => {
    const userstate = getState();
    const userId = userstate.auth.user.id;

    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, userData);
      const newUserData = await getDoc(userRef);
      return newUserData.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [SignUp.pending]: (state, action) => {
      state.signUpStatus = "loading";
    },
    [SignUp.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.signUpStatus = "succeed";
    },
    [SignUp.rejected]: (state, action) => {
      state.error = action.error.message;
      state.signUpStatus = "failed";
    },
    [SignIn.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.signInStatus = "succeed";
    },
    [SignIn.rejected]: (state, action) => {
      state.error = action.error.message;
      state.signInStatus = "failed";
    },
    [SignIn.pending]: (state, action) => {
      state.signInStatus = "pending";
    },
    [handleGLogin.pending]: (state, action) => {
      state.signInStatus = "pending";
    },
    [handleGLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.signInStatus = "succeed";
    },
    [handleGLogin.rejected]: (state, action) => {
      state.error = action.error.message;
      state.signInStatus = "failed";
    },
    [handleTLogin.pending]: (state, action) => {
      state.signInStatus = "pending";
    },
    [handleTLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.signInStatus = "succeed";
    },
    [handleTLogin.rejected]: (state, action) => {
      state.error = action.error.message;
      state.signInStatus = "failed";
    },
    [handleFLogin.pending]: (state, action) => {
      state.signInStatus = "pending";
    },
    [handleFLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.signInStatus = "succeed";
    },
    [handleFLogin.rejected]: (state, action) => {
      state.error = action.error.message;
      state.signInStatus = "failed";
    },
    [SignOut.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.signOutStatus = "succeed";
    },
    [getAllUsers.pending]: (state, action) => {
      state.getUserStatus = "pending";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.getUserStatus = "succeed";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.getUserStatus = "failed";
    },
    [getAllUsers.pending]: (state, action) => {
      state.getUserStatus = "pending";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.getUserStatus = "succeed";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.getUserStatus = "failed";
    },
  },
});

export const authReducers = authSlice.reducer;
