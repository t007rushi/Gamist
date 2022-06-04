import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firbaseConfig";

export const initialState = {
  posts: [],
  statusAddPost: "idle",
  statusEditPost: "idle",
  statusDeletePost: "idle",
  statusAllPost: "idle",
  error: null,
};

//Create POST
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    try {
      const postRef = await addDoc(collection(database, "posts"), {
        ...postData,
      });
      await updateDoc(postRef, { postId: postRef.id });
      const postSnap = await getDoc(postRef);
      const post = postSnap.data();
      return { ...post, postId: post.userId };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//DELETE POST
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const postRef = doc(database, "posts", postId);
    try {
      await deleteDoc(postRef);
      return postRef.id;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//EDIT POST
export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postData, id }) => {
    try {
      const postDataRef = doc(database, "posts", id);
      await updateDoc(postDataRef, { ...postData });
      const docRef = await getDoc(postDataRef);
      const editedData = { ...docRef.data(), postId: postDataRef.postId };
      return editedData;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//GET ALL POSTS
export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const allPostsSnap = await getDocs(collection(database, "posts"));
    let posts = [];
    allPostsSnap?.docs?.forEach((doc) => {
      posts.push({ ...doc.data(), postId: doc.id });
    });
    return posts;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.statusAddPost = "succeed";
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusAddPost = "failed";
    },
    [createPost.pending]: (state, action) => {
      state.statusAddPost = "pending";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.statusAllPost = "fulfilled";
    },
    [getAllPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusAllPost = "failed";
    },
    [getAllPosts.pending]: (state, action) => {
      state.statusAllPost = "pending";
    },
    [editPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, ...action.payload }
          : post
      );
      state.statusEditPost = "fulfilled";
    },
    [editPost.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusEditPost = "failed";
    },
    [editPost.pending]: (state, action) => {
      state.statusEditPost = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.statusDeletePost = "fulfilled";
    },
    [deletePost.rejected]: (state, action) => {
      state.error = action.error.message;
      state.statusDeletePost = "rejected";
    },
    [deletePost.pending]: (state, action) => {
      state.statusDeletePost = "pending";
    },
  },
});

export const postReducers = postSlice.reducer;
