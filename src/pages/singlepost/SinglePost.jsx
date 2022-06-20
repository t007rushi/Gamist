import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard } from "../../components";

export const SinglePost = () => {
  const params = useParams();
  console.log(params.postid);
  const { posts } = useSelector((state) => state.posts);
  const currentPost = posts.find((post) => post.postId === params.postid);
  const { comments } = useSelector((state) => state.posts);
  const currentPostcomments = comments.filter(
    (com) => com.postId === currentPost.postId
  );
  return (
    <div className="bg-neutral-100 m-10 p-2">
      <PostCard {...currentPost} />
      <div className="flex flex-col justify-between pt-4 max-h-72 overflow-x-hidden overflow-y-scroll">
        <div className="flex gap-4">
          <h1 className="text-black text-2xl">
            {currentPost.likes.length} Likes
          </h1>
          <h1 className="text-black text-2xl">
            {currentPostcomments.length}comments
          </h1>
        </div>
        <h1 className="text-black text-2xl bold ml-4">All comments...</h1>
        {currentPostcomments?.map((comnt) => {
          return (
            <div className="border-t border-gray-300 p-2" key={comnt.id}>
              <span className="text-black">
                <span className="font-2xl font-bold">
                  {comnt.userData.firstName}
                </span>
                {" " + comnt.comment}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
