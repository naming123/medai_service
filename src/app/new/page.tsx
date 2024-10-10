// components/PostCreator.tsx
"use client";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function PostCreator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("post")
        .insert([{ title, content }]);

      if (error) throw error;
      alert("Post added successfully");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to add post");
    }
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}
