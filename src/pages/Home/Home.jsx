/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PostCard,
  CreatePost,
  SuggestToFollow,
  CategoriesFilter,
} from "../../components/index";
import { getAllUsers } from "../../features/auth/authSlice";
import { getAllComments, getAllPosts } from "../../features/posts/postSlice";
import { FilterHandler } from "../../utility/categoryFilterUtil";

export const Home = () => {
  const [currentCategory, setCurrentCategory] = useState("✨Latest");
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const selectCategoryHandler = (value) => {
    setCurrentCategory(value);
  };
  let filteredPosts = FilterHandler(currentCategory, [...posts]);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
    dispatch(getAllComments());
  }, []);

  return (
    <div className="flex justify-center gap-4 text-gray-900">
      <div className="m-4 flex-1">
        <div className="border-2 border-gray-300 rounded-2xl p-2">
          <CreatePost />
        </div>
        <CategoriesFilter
          currentCategory={currentCategory}
          selectCategoryHandler={selectCategoryHandler}
        />
        <div className="flex flex-col-reverse gap-4 mb-8 w-full">
          {filteredPosts.map((post) => {
            return (
              <PostCard {...post} postUser={post.firstName} key={post.postId} />
            );
          })}
        </div>
      </div>
      <SuggestToFollow />
    </div>
  );
};
