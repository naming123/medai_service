"use client";

//test

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // useParams를 사용하여 URL 파라미터 가져오기

type Post = {
  title: string;
  content: string;
};

export default function PostPage() {
  const params = useParams(); // URL에서 'id'를 가져옴
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // params와 params.id가 존재하는지 확인
    if (!params || !params.id) return;

    const storedPosts = localStorage.getItem("posts");
    const posts: Post[] = storedPosts ? JSON.parse(storedPosts) : [];

    // postId가 문자열일 가능성을 고려해 parseInt 사용
    const postId = parseInt(params.id as string, 10);

    if (isNaN(postId) || postId < 0 || postId >= posts.length) {
      console.error("Invalid post ID");
      return;
    }

    const post = posts[postId];
    setPost(post);
  }, [params]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
