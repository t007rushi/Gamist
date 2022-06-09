import React from 'react'
import { useSelector } from 'react-redux';
import { PostCard } from '../../components/PostCard';

export const Bookmark = () => {
    const {user:{bookmarks}} = useSelector(state => state.auth)
    const {posts} = useSelector(state => state.posts)
    const mybookmarked = posts?.filter(post => bookmarks?.includes(post?.postId))
  return (
         <div className="flex flex-col-reverse m-auto gap-4 w-96 mb-8 mt-20">
        {mybookmarked?.map((post) => {
          return (
            <PostCard {...post} postUser={post.firstName} key={post.postId} />
          );
        })}
      </div>
  )
}
