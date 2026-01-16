import type { Post } from "@/types/post";

export function filterPostsByTitle(posts: Post[], searchQuery: string): Post[] {
  if (searchQuery.trim() === "") {
    return posts;
  }
  return posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
