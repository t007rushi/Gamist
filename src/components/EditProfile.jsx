import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../features/auth/authSlice";

export const EditProfile = ({ closeEdit, name, portfolioLink }) => {
  const [inputData, setInputData] = useState({
    firstName: name,
    portfolioLink: portfolioLink,
  });
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2 items-center pb-2 bg-slate-600 border-gray-200 rounded-lg border shadow-md w-96 absolute top-14">
      <i
        className="fa-solid fa-xmark text-lg self-end cursor-pointer p-2 mr-2"
        onClick={closeEdit}
      ></i>
      <input
        value={inputData?.firstName}
        className="mb-1 text-lg font-medium text-gray-900 dark:text-white border-2 border-gray-200"
        onChange={(e) =>
          setInputData({ ...inputData, firstName: e.target.value })
        }
      />
      <input
        placeholder={
          portfolioLink === null
            ? "add a portfolio linkby clicking Edit"
            : portfolioLink
        }
        className="mb-1 text-lg font-medium text-gray-900 dark:text-white border-2 border-gray-200"
        onChange={(e) =>
          setInputData({ ...inputData, portfolioLink: e.target.value })
        }
      />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          dispatch(updateUserDetails(inputData));
          closeEdit();
        }}
      >
        Edit
      </button>
    </div>
  );
};
