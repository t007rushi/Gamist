import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/onClickOutside";
import { useSelector } from "react-redux";
import { PostCard } from "../components/PostCard";
import { EditProfile } from "../components/EditProfile";

export const Profile = () => {
  const [options, setOptions] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const optionref = useRef();
  useOnClickOutside(optionref, () => setOptions(false));
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const userPosts = posts.filter((post) => post.userId === user.userId);

  return (
    <div className="flex flex-col justify-center items-center gap-2 relative">
      <div className="w-96 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-2">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={() => setOptions(true)}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>

          <div
            id="dropdown"
            ref={optionref}
            className={
              !options
                ? "absolute hidden z-10 w-40 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                : "absolute z-10 w-40 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            }
          >
            <ul className="p-1">
              <li>
                <button
                  className="w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => {
                    setEditProfile(true);
                    setOptions(false);
                  }}
                >
                  Edit
                </button>
              </li>
              <li>
                <button className="w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-4">
          <img
            className="mb-2 w-28 h-28 rounded-full shadow-lg"
            src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
            alt="profile"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.firstName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          <div className="flex gap-4 mt-4">
            <span className="text-lg text-gray-800 dark:text-gray-400">
              {userPosts?.length} Posts
            </span>
            <span className="text-lg text-gray-800 dark:text-gray-400">
              100 Followers
            </span>
            <span className="text-lg text-gray-800 dark:text-gray-400">
              100 Following
            </span>
          </div>
        </div>
        <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap justify-evenly -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li class="mr-2">
            <button class="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                <svg class="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Posts
            </button>
        </li>
        <li class="mr-2">
            <button class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Bookmark
            </button>
        </li>
        <li class="mr-2">
            <button class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Followers
            </button>
        </li>
    </ul>
</div>
      </div>
      <div className="flex flex-col-reverse gap-4 w-96">
        {userPosts?.map((post) => {
          return <PostCard {...post} key={post.id} />;
        })}
      </div>
      {editProfile && <EditProfile closeEdit={() => setEditProfile(false)} name = {user.firstName} email = {user.email}/>}
    </div>
  );
};
