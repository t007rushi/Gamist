import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/onClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { EditPost } from "./EditPost";
import {
  addComments,
  deleteComments,
  deletePost,
  getAllPosts,
  likedUserPost,
  unLikedUserPost,
} from "../features/posts/postSlice";
import { addBookmark, removeBookmark } from "../features/auth/authSlice";

export const PostCard = ({ postUser, title, description, postId, likes }) => {
  const {
    user: { firstName, userId, bookmarks },
  } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.posts);
  const [postModal, setPostModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState("");
  const optionref = useRef();
  const dispatch = useDispatch();
  useOnClickOutside(optionref, () => setPostModal(false));
  const currentPostcomments = comments.filter((com) => com.postId === postId);

  return (
    <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative w-full">
      <div className="flex justify-between text-gray-900 border-b relative">
        <div className="flex items-center user">
          <i className="fa-solid fa-user p-2 m-1 rounded-2xl border border-slate-900"></i>
          <p>{postUser}</p>
        </div>
        {firstName === postUser && (
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setPostModal((prev) => !prev)}
          >
            ...
          </div>
        )}
        {postModal && (
          <div
            ref={optionref}
            className="w-24 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute right-0"
          >
            <button
              type="button"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => setEdit(true)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
              Edit
            </button>
            <button
              type="button"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => {
                setPostModal(false);
                dispatch(deletePost(postId));
                dispatch(getAllPosts());
              }}
            >
              <i className="fa-solid fa-trash"></i>
              Delete
            </button>
          </div>
        )}
      </div>
      {/*  */}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      {/*  */}
      <div className="flex justify-around align-center gap-4">
        {!likes?.includes(userId) ? (
          <i
            className="fa-regular fa-heart cursor-pointer text-black"
            onClick={() => dispatch(likedUserPost(postId))}
          >
            {likes?.length}
          </i>
        ) : (
          <i
            className="fa-solid fa-heart cursor-pointer text-black"
            onClick={() => dispatch(unLikedUserPost(postId))}
          >
            {likes?.length}
          </i>
        )}
        <i className="fa-regular fa-comment cursor-pointer text-black"></i>
        <i className="fa-solid fa-share cursor-pointer text-black"></i>
        {!bookmarks?.includes(postId) ? (
          <i
            className="fa-regular fa-bookmark cursor-pointer text-black"
            onClick={() => dispatch(addBookmark(postId))}
          ></i>
        ) : (
          <i
            className="fa-solid fa-bookmark cursor-pointer text-black"
            onClick={() => dispatch(removeBookmark(postId))}
          ></i>
        )}
      </div>

      {edit && (
        <EditPost
          setFalse={() => setEdit(false)}
          id={postId}
          title={title}
          description={description}
        />
      )}
      <div className="pt-4">
        {currentPostcomments?.splice(0, 3).map((comnt) => {
          return (
            <div className="flex justify-between items-center" key={comnt.id}>
              <span className="text-black">
                <span className="font-2xl font-bold">
                  {comnt.userData.firstName}
                </span>
                {" " + comnt.comment}
              </span>
              {comnt.userData.firstName === firstName && (
                <i
                  className="fa-solid fa-trash cursor-pointer text-black"
                  onClick={() => dispatch(deleteComments(comnt.id))}
                ></i>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between border-gray-400 border-t mt-2 gap-1">
        <textarea
          type="text"
          rows="1"
          value={comment}
          className="outline-none text-gray-800 w-full p-0 overflow-x-hidden"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.length !== 0 && (
          <button
            className="text-blue-700"
            onClick={() => {
              dispatch(addComments({ postId, comment }));
              setComment("");
            }}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};
