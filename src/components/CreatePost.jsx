import React, { useState } from "react";
import { database } from "../firbaseConfig";
import { collection, addDoc } from "firebase/firestore";
// import store from "../app/store"

export const CreatePost = () => {
  const [postData, setPostData] = useState({
    content: "",
  });

  const collectionRef = collection(database, "user");
// console.log(store.getState())
  const handleSubmit = () => {
    addDoc(collectionRef, {
      content: postData.content,
    })
      .then(() => alert("Data Added"))
      .catch((err) => console.log(err));
      setPostData({ ...postData, content: "" });
  };
  return (
    <div className="flex flex-col gap-4">
      <textarea
        name=""
        id=""
        cols="50"
        rows="5"
        value={postData.content}
        onChange={(e) => setPostData({ ...postData, content: e.target.value })}
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
