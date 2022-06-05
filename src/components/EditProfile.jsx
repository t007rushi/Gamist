import React, { useState } from "react";

export const EditProfile = ({ closeEdit, name, email }) => {
  // console.log(name,email)
  const [inputData, setInputData] = useState({
    name: name,
    email: email,
  });
  return (
    <div className="flex flex-col gap-2 items-center pb-2 bg-slate-600 border-gray-200 rounded-lg border shadow-md w-96 absolute top-14">
      <i
        className="fa-solid fa-xmark text-lg self-end cursor-pointer p-2 mr-2"
        onClick={closeEdit}
      ></i>
      {/* <input
        className="mb-2 w-28 h-28 rounded-full shadow-lg"
        src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
        alt="profile"
        type = "file"
      /> */}
      <input
        value={inputData.name}
        className="mb-1 text-lg font-medium text-gray-900 dark:text-white border-2 border-gray-200"
        onChange={(e) => setInputData({...inputData,name:e.target.value})}
      />
      <input
        value={inputData.email}
        className="mb-1 text-lg font-medium text-gray-900 dark:text-white border-2 border-gray-200"
        onChange={(e) => setInputData({...inputData, email: e.target.value})}
      />
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Edit
      </button>
    </div>
  );
};
