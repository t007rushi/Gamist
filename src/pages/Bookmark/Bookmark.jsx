import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components/index";

export const Bookmark = () => {
  const {
    user: { bookmarks },
  } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const mybookmarked = posts?.filter((post) =>
    bookmarks?.includes(post?.postId)
  );
  return (
    <div className="m-10">
      <h1 className="text-black text-4xl m-4 text-center">My Bookmarks</h1>
      <div className="flex flex-col gap-4 sm:w-full">
        {mybookmarked?.map((post) => {
          return (
            <PostCard {...post} postUser={post.firstName} key={post.postId} />
          );
        })}
      </div>
    </div>
  );
};
