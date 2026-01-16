import type { Post } from "@/types/post";
import { filterPostsByTitle } from "./filterPosts";

function testSearchFilter() {
  const mockPosts: Post[] = [
    { id: 1, title: "First Post", body: "Body 1", userId: 1 },
    { id: 2, title: "Second Post", body: "Body 2", userId: 1 },
    { id: 3, title: "Third Article", body: "Body 3", userId: 2 },
    { id: 4, title: "Fourth Post", body: "Body 4", userId: 2 },
  ];

  const tests = [
    { name: "Empty search returns all posts", query: "", expected: 4 },
    { name: "Search 'post' returns matching posts", query: "post", expected: 3 },
    { name: "Search 'First' returns one post", query: "First", expected: 1 },
    { name: "Search 'ARTICLE' returns matching post", query: "ARTICLE", expected: 1 },
    { name: "Search 'nonexistent' returns no posts", query: "nonexistent", expected: 0 },
    { name: "Search with spaces returns all posts", query: "   ", expected: 4 },
  ];

  let passed = 0;
  let failed = 0;

  console.log("Running search filter tests...\n");

  for (const test of tests) {
    const result = filterPostsByTitle(mockPosts, test.query);
    const success = result.length === test.expected;

    if (success) {
      passed++;
      console.log(`PASS: ${test.name}`);
    } else {
      failed++;
      console.error(`FAIL: ${test.name}`);
      console.error(`  Expected: ${test.expected}, Got: ${result.length}`);
    }
  }

  console.log(`\nTests passed: ${passed}/${tests.length}`);
  
  if (failed === 0) {
    console.log("All tests passed!");
    process.exit(0);
  } else {
    console.error(`${failed} test(s) failed`);
    process.exit(1);
  }
}

if (require.main === module) {
  testSearchFilter();
}

export { testSearchFilter };
