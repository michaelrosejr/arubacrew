// import adapter from '@sveltejs/adapter-auto';
import adapter from "amplify-adapter";

import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex } from "mdsvex";
import mdsvexOptions from "./mdsvex.config.js";

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
  },
};

export default config;
