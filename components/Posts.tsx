import React, { useEffect, useState } from "react";
import Post from "./Post";

import PostSkeleton from "./Skeleton/Skeleton";
import {fetchPosts, fetchPublicPosts} from "../pages/api/postApi";
import {useRecoilValue} from "recoil";
import {backendUserState} from "../utils/atoms";

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const user = useRecoilValue(backendUserState)
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPost = async () => {
    try {
      setLoading(true);

      const response = user ? await fetchPosts(page, 2) : await fetchPublicPosts(page, 2); // 테스트용으로 작게 요청
      if (response.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response]);
      } else {
        setHasMore(false);
      }

      setLoading(false);

    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userId={post.userId}
          username={post.username}
          userImage={post.profileImage}
          images={post.images}
          caption={post.caption}
        />
      ))}
      { loading &&
          [...Array(5)].map((_, i) => (
            <PostSkeleton key={i} loading={true} />
          ))
      }
    </div>
  );
};
export default Posts;
