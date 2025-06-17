import { json } from "@sveltejs/kit";
import type { Post } from "$lib/types";

async function getPosts() {
  let posts: Post[] = [];

  const paths = import.meta.glob("/src/content/*/*.md", { eager: true });

  for (const path in paths) {
    const file = paths[path];
    // console.log("Processing file:", file);
    // console.log("File path:", path);
    // console.log("Folder name:", path.split("/")[3]);
    const folder = path.split("/")[3];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      // console.log("Metadata:", file.metadata);
      (file.metadata as Record<string, any>).folder = folder;
      const metadata = file.metadata as Omit<Post, "slug">;

      const post: Post = {
        ...metadata,
        slug,
        folder,
        title: metadata.title || "",
        description: metadata.description || "",
        date: metadata.date || "",
        categories: metadata.categories || [],
        published: metadata.published || false,
      };
      post.published && posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );
  // console.log("Posts found:", posts.length);
  // console.log("Posts:", posts);
  return posts;
}

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
