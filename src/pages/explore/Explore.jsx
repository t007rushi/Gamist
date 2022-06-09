import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components/index";

export const Explore = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <div className="mt-20">
      <h1 className="text-black text-4xl m-4 text-center">Explore ALL posts</h1>
      <div className="flex justify-center gap-4 text-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-8">
          {posts.map((post) => {
            return (
              <PostCard {...post} postUser={post.firstName} key={post.postId} />
            );
          })}
        </div>
      </div>
      </div>
  );
};