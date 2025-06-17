export type Categories = "sveltekit" | "svelte";

export type Post = {
  [x: string]: any;
  slug?: string;
  title: string;
  description: string;
  date: string;
  categories: Categories[];
  published: boolean;
  folder: string;
};
