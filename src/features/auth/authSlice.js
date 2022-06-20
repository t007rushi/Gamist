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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { app, database } from "../../firbaseConfig";
import { toast } from "react-toastify";

const auth = getAuth();
const initialState = {
  isLoggedIn: false,
  user: {},
  users: [],
  error: null,
  signUpStatus: "idle",
  signInStatus: "idle",
  signOutStatus: "idle",
  getUserStatus: "idle",
  updateUserDetailsStatus: "idle",
  UserDetailsStatus: "idle",
  BookmarkStatus: "idle",
};

//signin
export const SignIn = createAsyncThunk(
  "auth/SignIn",
  async ({ email, password }) => {
    try {
      const auth = getAuth(app);
      const data = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(database, "users", data.user.uid));
      toast.success("Sign In Sucessfully");
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
    const userdata = {
      firstName: "",
      email: "",
      userId: "",
      portfolioLink: null,
    };
    await signInWithPopup(auth, Gprovider).then((userCred) => {
      userdata.firstName = userCred.user.displayName;
      userdata.email = userCred.user.email;
      userdata.userId = userCred.user.uid;
      userdata.portfolioLink = "";
      setDoc(doc(database, "users", userCred.user.uid), {
        firstName: userCred.user.displayName,
        email: userCred.user.email,
        userId: userCred.user.uid,
        portfolioLink: null,
        bookmarks: [],
      });
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
        userId: data.user.uid,
        portfolioLink: null,
        followers: [],
        following: [],
      });
      toast.success("Sign Up Sucessfully");
      return {
        firstName,
        lastName,
        email,
        userId: data.user.uid,
        followers: [],
        following: [],
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
    toast.success("Sign out Sucessfully");
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

//updateUserDetails
export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async (userData, { getState }) => {
    const userstate = getState();
    const userId = userstate.auth.user.userId;
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { ...userData });
      const newUserData = await getDoc(userRef);
      toast.success("User Details updated");
      return newUserData.data();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//add a bookmark
export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (postId, { getState }) => {
    const userState = getState();
    const uId = userState.auth.user.userId;
    try {
      const postDocumentRef = doc(database, "users", uId);
      await updateDoc(postDocumentRef, {
        bookmarks: arrayUnion(postId),
      });
      toast.success("Post Bookmarked");
      return { PostId: postId, userId: uId };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//delete a bookmark
export const removeBookmark = createAsyncThunk(
  "bookmark/removeBookmark",
  async (postId, { getState }) => {
    const userState = getState();
    const uId = userState.auth.user.userId;
    try {
      const postDocumentRef = doc(database, "users", uId);
      await updateDoc(postDocumentRef, {
        bookmarks: arrayRemove(postId),
      });
      toast.success("Removed From Bookmarks");
      return { PostId: postId, userId: uId };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//follow a user
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (followuserId, { getState }) => {
    const userstate = getState();
    const currentUserId = userstate.auth.user.userId;
    try {
      const userRef = doc(database, "users", currentUserId);
       await updateDoc(userRef, {
        following: arrayUnion(followuserId),
      });

      const followrUserRef = doc(database, "users", followuserId);
      await updateDoc(followrUserRef, {
        followers: arrayUnion(currentUserId),
      });
      return { followuserId, userId: currentUserId };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

// unfollow a user
export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (followuserId, { getState }) => {
    const userstate = getState();
    const currentUserId = userstate.auth.user.userId;
    try {
      const userDataRef = doc(database, "users", currentUserId);
      await updateDoc(userDataRef, {
        following: arrayRemove(followuserId),
      });
      const followerUserRef = doc(database, "users", followuserId);
       await updateDoc(followerUserRef, {
        followers: arrayRemove(currentUserId),
      });
      return { followuserId, userId: currentUserId };
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
    [updateUserDetails.pending]: (state, action) => {
      state.updateUserDetailsStatus = "pending";
    },
    [updateUserDetails.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.updateUserDetailsStatus = "succeed";
    },
    [updateUserDetails.rejected]: (state, action) => {
      state.updateUserDetailsStatus = "failed";
    },

    [addBookmark.pending]: (state, action) => {
      state.BookmarkStatus = "pending";
    },
    [addBookmark.fulfilled]: (state, action) => {
      state.user.bookmarks = [...state.user.bookmarks, action.payload.PostId];
      state.BookmarkStatus = "succeed";
    },
    [addBookmark.rejected]: (state, action) => {
      state.BookmarkStatus = "failed";
    },
    [removeBookmark.pending]: (state, action) => {
      state.BookmarkStatus = "pending";
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.user.bookmarks = state.user.bookmarks.filter(
        (bm) => bm !== action.payload.PostId
      );
      state.BookmarkStatus = "succeed";
    },
    [removeBookmark.rejected]: (state, action) => {
      state.BookmarkStatus = "failed";
    },
    [followUser.fulfilled]: (state, action) => {
      state.user.following = state.user.following.concat(
        action.payload.followuserId
      );
      state.users = state.users.map((user) =>
        user.userId === action.payload.followuserId
          ? { ...user, followers: [user.followers, action.payload.userId] }
          : user
      );
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.user = {
        ...state.user,
        following: state.user.following.filter(
          (id) => id !== action.payload.followuserId
        ),
      };
      state.users = state.users.map((user) =>
        user.userId === action.payload.followuserId
          ? {
              ...user,
              followers: user.followers.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : user
      );
    },
  },
});

export const authReducers = authSlice.reducer;
