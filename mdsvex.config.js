import { defineMDSveXConfig as defineConfig } from "mdsvex";

import { escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
// import relativeImages from "mdsvex-relative-images";
import fixObiImagePaths from "./js/fixObiImagePaths.js"; // Custom relative image plugin
import { preprocessObsidianImages } from "./js/remarkObsidianImages.js"; // Convert Obsidian syntax

import remarkParse from "remark-parse";
import callouts from "rehype-callouts";
// import RemarkFlexibleToc from "remark-flexible-toc";

import { fileURLToPath } from "url";
import { join, dirname } from "path";
import relativeImages from "mdsvex-relative-images";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, "./src/mdlayout.svelte");
const toc = [];

function get_headings() {
  let visit;
  let tree_to_string;
  return async function transformer(tree, vFile) {
    if (!visit) {
      tree_to_string = (await import("mdast-util-to-string")).toString;
      visit = (await import("unist-util-visit")).visit;
    }

    vFile.data.headings = [];

    visit(tree, "heading", (node) => {
      vFile.data.headings.push({
        level: node.depth,
        title: tree_to_string(node),
        sectionId: tree_to_string(node)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(":", ""),
      });
    });

    if (!vFile.data.fm) {
      vFile.data.fm = {};
    }
    vFile.data.fm.headings = vFile.data.headings;
  };
}

// const defineConfig = MdsvexOptions;

// /** @type {import('mdsvex').MdsvexOptions} */
const config = defineConfig({
  //   layout: "./src/mdsvex.svelte",
  layout: {
    // This is the default layout for all markdown files
    _: path_to_layout,
  },
  extensions: [".md"],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await createHighlighter({
        themes: ["poimandres"],
        langs: ["javascript", "typescript"],
      });
      await highlighter.loadLanguage("javascript", "typescript");
      const html = escapeSvelte(
        highlighter.codeToHtml(code, { lang, theme: "poimandres" })
      );
      return `{@html \`${html}\` }`;
    },
  },
  //   remarkPlugins: [gfm, [remarkFlexibleToc, { tocRef: toc }]],
  remarkPlugins: [get_headings, fixObiImagePaths, relativeImages],
  rehypePlugins: [rehypeSlug, callouts],
});

export default config;
