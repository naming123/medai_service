// src/app/posts/[slug]/page.tsx

"use client";

import { supabase } from "../../../../lib/supabaseClient";
import "../../../styles/style.css";

type Post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
};

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  console.log(id);
  const { data, error } = await supabase
    .from("post")
    .select("id, title, content, user_id, created_at")
    .eq("id", id);

  if (!data || data.length === 0) {
    return <div>No post found</div>;
  }
  const post = data[0];

  return <PostDetail post={post} />;
}

const PostDetail = ({ post }: { post: Post }) => {
  if (!post) {
    return <div>Loading.....</div>; // 데이터가 없으면 로딩 메시지 표시
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>User ID:</strong> {post.user_id}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
};
