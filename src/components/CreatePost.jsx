import React, { useState } from "react";
import { database } from "../firbaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export const CreatePost = () => {
  const [postData, setPostData] = useState({
    title:"",
    description: "",
  });
  const { username } = useSelector((state) => state.auth);

  const collectionRef = collection(database, "posts");
  const handleSubmit = () => {
    addDoc(collectionRef, {
      description: postData.description,
      title: postData.title,
      user:username,
    })
      .then(() => {})
      .catch((err) => console.log(err));
    setPostData({  title:"", description: "" });
  };
  return (
    <div className="flex flex-col gap-4">
      <input type="text" className="border-black border-2 p-2 rounded-lg" placeholder="Title of post"
      value={postData.title}
      onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <textarea
        name=""
        id=""
        cols="40"
        rows="3"
        className="border-black border-2 p-2 rounded-lg"
        placeholder="Description of post"
        value={postData.description}
        onChange={(e) => setPostData({ ...postData, description: e.target.value })}
      ></textarea>

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};
