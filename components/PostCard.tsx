"use client";

import type { Post } from "@/types/post";
import { POST_BODY_PREVIEW_LENGTH } from "@/constants";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const bodyPreview = post.body.length > POST_BODY_PREVIEW_LENGTH 
    ? `${post.body.substring(0, POST_BODY_PREVIEW_LENGTH)}...` 
    : post.body;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all duration-200 bg-white"
      type="button"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm">{bodyPreview}</p>
    </button>
  );
}
