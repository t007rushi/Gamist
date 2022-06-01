import React from "react";

export const PostCard = () => {
  return (
    <div className="p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* profile + name + dot options */}
      <div className="flex justify-between text-gray-900 border-b">
        <div className="flex items-center user">
          <i className="fa-solid fa-user p-2 m-1 rounded-2xl border border-slate-900"></i>
          <p>Rushikesh Tarapure</p>
        </div>
        <div className="dots">...</div>
      </div>
      {/*  */}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      {/*  */}
      <div className="flex align-center gap-4">
        <i className="fa-regular fa-heart"></i>
        <i className="fa-regular fa-comment"></i>
        <i className="fa-solid fa-share"></i>
        <i className="fa-regular fa-bookmark"></i>
      </div>
    </div>
  );
};
