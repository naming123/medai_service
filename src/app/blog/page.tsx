// components/PostManager.tsx
"use client";
import { useEffect, useState } from "react";
import "../../styles/style.css";
import { supabase } from "../../../lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  description: string;
};

export default function PostManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase.from("post").select();
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const deletePost = async (id: number) => {
    try {
      const { error } = await supabase.from("post").delete().eq("id", id);
      if (error) throw error;
      alert("Post deleted successfully");
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete post");
    }
  };

  const updatePost = async (id: number, newTitle: string) => {
    try {
      const { error } = await supabase
        .from("post")
        .update({ title: newTitle })
        .eq("id", id);

      if (error) throw error;
      alert("Post updated successfully");
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, title: newTitle } : post
        )
      );
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update post");
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Manage Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button
              onClick={() => {
                const newTitle = prompt("Enter new title:", post.title);
                if (newTitle) updatePost(post.id, newTitle);
              }}
            >
              Edit
            </button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
