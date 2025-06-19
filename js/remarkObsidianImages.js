/**
 * Remark plugin to convert Obsidian-style image syntax ![[image.png]]
 * to standard markdown syntax ![image.png](./attachments/image.png)
 * This works as a preprocessor before remark parsing
 */
export default function remarkObsidianImages(options = {}) {
  const prefix = options.prefix || "./attachments/";

  // Return a preprocessor function that works on the raw markdown string
  return function preprocessor() {
    return function transformer(tree, file) {
      // This plugin should be used as a preprocessor
      // The actual transformation happens in mdsvex preprocessing
      return tree;
    };
  };
}

// Export a string preprocessor function for use in mdsvex
export function preprocessObsidianImages(content, options = {}) {
  const prefix = options.prefix || "./attachments/";

  // Convert Obsidian-style image links to standard markdown
  return content.replace(
    /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp))\]\]/gi,
    (match, filename) => {
      // Convert to standard markdown image syntax with attachments path
      return `![${filename}](${prefix}${filename})`;
    }
  );
}
