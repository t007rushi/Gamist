import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components/index";

export const Explore = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <div className="m-6">
      <h1 className="text-black text-4xl m-4 text-center">Explore ALL posts</h1>
      <div className="flex flex-col justify-center gap-4 m-2">
        {posts.map((post) => {
          return (
            <PostCard {...post} postUser={post.firstName} key={post.postId} />
          );
        })}
      </div>
    </div>
  );
};
