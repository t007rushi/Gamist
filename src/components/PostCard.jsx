import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/onClickOutside";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../firbaseConfig";
import { useSelector } from "react-redux";

export const PostCard = ({ user, title, description, id }) => {
  const {user:{firstName}} = useSelector((state) => state.auth);
  const [postModal, setPostModal] = useState(false);
  const optionref = useRef();
  useOnClickOutside(optionref, () => setPostModal(false));

  const deleteHandler = () => {
    const docRef = doc(database, "posts", id);
    deleteDoc(docRef).then(() => setPostModal(false));
  };

  return (
    <div className="p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between text-gray-900 border-b relative">
        <div className="flex items-center user">
          <i className="fa-solid fa-user p-2 m-1 rounded-2xl border border-slate-900"></i>
          <p>{user}</p>
        </div>
        {firstName === user &&
         <div
          className="text-2xl cursor-pointer"
          onClick={() => setPostModal((prev) => !prev)}
        >
          ...
        </div>
         } 
        {postModal && (
          <div
            ref={optionref}
            className="w-24 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute right-0"
          >
            <button
              type="button"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              <i className="fa-solid fa-pen-to-square"></i>
              Edit
            </button>
            <button
              type="button"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={deleteHandler}
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
        <i className="fa-regular fa-heart"></i>
        <i className="fa-regular fa-comment"></i>
        <i className="fa-solid fa-share"></i>
        <i className="fa-regular fa-bookmark"></i>
      </div>
    </div>
  );
};
