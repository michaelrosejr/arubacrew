// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-static";
import relativeImages from "mdsvex-relative-images";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
// import { vFile } from "vFile";
import callouts from "rehype-callouts";
// import RemarkFlexibleToc from "remark-flexible-toc";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, "./src/mdlayout.svelte");
const toc = [];

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
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
  remarkPlugins: [
    get_headings,
    [remarkToc, { tight: true }],
    [rehypeExternalLinks, { target: ["_blank"] }],
    relativeImages,
  ],
  rehypePlugins: [rehypeSlug, callouts],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],

  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  //   preprocess: vitePreprocess(),
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    prerender: {
      handleHttpError: ({ path, message }) => {
        // ignore deliberate link to shiny 404 page
        if (path === "/src/lib/assets/fonts/inter-roman-latin.Di8DUHzh.woff2") {
          return;
        }
        if (path === "/") {
          // if the path is the root, we can ignore it
          return;
        }
        // otherwise fail the build
        throw new Error(message);
      },
    },
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    alias: {
      "@/*": "./src/lib/*",
    },
    paths: {
      base: process.env.NODE_ENV === "production" ? "/arubacrew" : "",
    },
  },
};

export default config;
