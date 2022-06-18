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
  const {
    user: { following },
  } = useSelector((state) => state.auth);

  const followingsPosts = posts.filter((post) =>
    following?.includes(post.userId)
  );

  const selectCategoryHandler = (value) => {
    setCurrentCategory(value);
  };

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
    dispatch(getAllComments());
  }, []);

  let filteredPosts = FilterHandler(currentCategory, followingsPosts);

  return (
    <div className="flex justify-center gap-4 text-gray-900 m-10">
      <div className="w-full m-4">
        <div className="create-post">
          <CreatePost />
        </div>
        <CategoriesFilter
          currentCategory={currentCategory}
          selectCategoryHandler={selectCategoryHandler}
        />
        <div className="flex flex-col-reverse gap-4 mb-8">
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
