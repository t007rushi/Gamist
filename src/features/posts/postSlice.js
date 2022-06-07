import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
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
        likes: [],
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

//likes a post
export const likedUserPost = createAsyncThunk(
  "post/likedUserPost",
  async (postId, { getState }) => {
    const userState = getState();
    const userData = userState.auth.user;

    try {
      const postDocumentRef = doc(database, "posts", postId);
      await updateDoc(postDocumentRef, {
        likes: arrayUnion(userData.userId),
      });
      return { PostId: postId, userId: userData.userId };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

//unlike post
export const unLikedUserPost = createAsyncThunk(
  "post/unLikedUserPost",
  async (postId, { getState }) => {
    const userState = getState();
    const userData = userState.auth.user;
    try {
      const postDocumentRef = doc(database, "posts", postId);
      await updateDoc(postDocumentRef, {
        likes: arrayRemove(userData.userId),
      });

      return { PostId: postId, userId: userData.userId, isLiked: false };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
);

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

    [likedUserPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.postId === action.payload.PostId
          ? { ...post, likes: [...post.likes, action.payload.userId] }
          : post
      );
      state.LikePostStatus = "succeed";
    },
    [likedUserPost.pending]: (state, action) => {
      state.LikePostStatus = "pending";
    },
    [unLikedUserPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.postId === action.payload.PostId
          ? {
              ...post,
              likes: post.likes.filter((id) => id !== action.payload.userId),
            }
          : post
      );
      state.unlikePostStatus = "succeed";
    },
    [unLikedUserPost.pending]: (state, action) => {
      state.unlikePostStatus = "pending";
    },
  },
});

export const postReducers = postSlice.reducer;
