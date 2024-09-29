import React, {useEffect, useRef, useState} from "react";
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
  const [hasNext, setHasNext] = useState<boolean>(true);
  const initialRender = useRef(true); // 초기 렌더링 시 fetchPost() 2연속 실행 해결

  const fetchPost = async () => {
    try {
      setLoading(true);

      const response = user ? await fetchPosts(page, 2) : await fetchPublicPosts(page, 2); // 테스트용으로 작게 요청
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setHasNext(response.hasNext);

      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (hasNext) {
      fetchPost();
    }
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (hasNext && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNext, loading]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userId={post.userId}
          username={post.username as string}
          userImage={post.userImage as string}
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
