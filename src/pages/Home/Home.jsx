/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../../components/CreatePost";
import { PostCard } from "../../components/PostCard";
import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../../features/auth/authSlice";
import { getAllComments, getAllPosts } from "../../features/posts/postSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { users, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
    dispatch(getAllComments());
  }, []);
  return (
    <div className="flex justify-center gap-4 text-gray-900 mt-20">
      <div className="posts">
        <div className="create-post">
          <CreatePost />
        </div>
        <div className="posts-column flex flex-col-reverse gap-4 mb-8">
          {posts.map((post) => {
            return (
              <PostCard {...post} postUser={post.firstName} key={post.postId} />
            );
          })}
        </div>
      </div>
      <div className="suggestions hidden sm:block">
        <div className="p-2 max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 sticky top-14 mt-2">
          <div className="flex justify-between items-center mb-4 gap-1">
            <h5 className=" font-bold leading-none  dark:text-white">
              Suggestions for you
            </h5>
            <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              View all
            </button>
          </div>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((userl) => {
              return (
                <li className="py-2" key={userl.userId}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {userl?.firstName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {userl?.email}
                      </p>
                    </div>
                    {!user?.following?.includes(userl.userId) ? (
                      <div
                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer border-2 rounded-lg p-1"
                        onClick={() => dispatch(followUser(userl.userId))}
                      >
                        Follow
                      </div>
                    ) : (
                      <div
                        className="inline-flex items-center text-base font-semibold bg-gray-800 text-white dark:text-white cursor-pointer border-2 rounded-lg p-1"
                        onClick={() => dispatch(unfollowUser(userl.userId))}
                      >
                        Unfollow
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
