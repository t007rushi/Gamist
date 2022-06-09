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
    <div className="mb-8 mt-20">
      <h1 className="text-black text-4xl m-4 text-center">My Bookmarks</h1>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-8">
          {mybookmarked?.map((post) => {
            return (
              <PostCard {...post} postUser={post.firstName} key={post.postId} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
