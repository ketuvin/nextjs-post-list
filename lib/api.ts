import { POSTS_LIMIT } from "@/constants";
import type { Post } from "@/types/post";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(
  limit: number = POSTS_LIMIT,
  signal?: AbortSignal
): Promise<Post[]> {
  const response = await fetch(`${API_URL}?_limit=${limit}`, {
    signal,
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return response.json();
}
