import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost, getAllPosts } from "../features/posts/postSlice";

export const EditPost = ({ setFalse, id, title, description }) => {
  const [postData, setPostData] = useState({
    title: title,
    description: description,
  });
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-2 absolute bg-gray-500 p-2 rounded-2xl z-10 bottom-1 w-full">
      <i
        className="fa-solid fa-xmark text-white text-lg text-right cursor-pointer"
        onClick={setFalse}
      ></i>
      <input
        type="text"
        className="border-black border-2 p-2 rounded-lg text-black"
        placeholder="Title of post"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <textarea
        name=""
        id=""
        cols="40"
        rows="3"
        className="border-black border-2 p-2 rounded-lg text-black"
        placeholder="Description of post"
        value={postData.description}
        onChange={(e) =>
          setPostData({ ...postData, description: e.target.value })
        }
      ></textarea>

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 self-center"
        onClick={() => {
          dispatch(editPost({ postData, id }));
          setFalse();
          dispatch(getAllPosts());
        }}
      >
        Edit
      </button>
    </div>
  );
};
