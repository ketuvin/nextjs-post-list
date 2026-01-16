"use client";

import { useState, useEffect, useCallback } from "react";
import type { Post } from "@/types/post";
import { fetchPosts } from "@/lib/api";
import { filterPostsByTitle } from "@/lib/filterPosts";
import { POSTS_LIMIT } from "@/constants";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import SearchBar from "./SearchBar";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPosts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPosts(POSTS_LIMIT, signal);
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError("Failed to load posts. Please try again.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    loadPosts(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [loadPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setFilteredPosts(filterPostsByTitle(posts, searchQuery));
  }, [searchQuery, posts]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => loadPosts()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-orange-500 transition-colors"
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Posts List</h1>
        
        <SearchBar onSearch={handleSearch} />

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery ? "No posts found matching your search." : "No posts available."}
            </p>
          </div>
        ) : (
          <ul className="space-y-4 list-none">
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <PostCard
                  post={post}
                  onClick={() => handlePostClick(post)}
                />
              </li>
            ))}
          </ul>
        )}

        <PostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
