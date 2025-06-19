import { visit } from "unist-util-visit";

/**
 * @typedef {import('mdast').Root} Root
 */

/**
 * Fix Obsidian image paths to append "./attachments/" to image URLs
 * that do not already start with "./attachments/".
 * Also converts Obsidian-style [[image]] syntax to standard markdown.
 *
 * @param {object} options - Plugin options
 * @returns {function} Remark transformer function
 */
export default function fixObsidianImagePaths(options = {}) {
  const prefix = options.prefix || "./attachments/";

  return function transformer(tree, file) {
    // First, handle Obsidian-style [[image]] syntax in text nodes
    visit(tree, "text", (node, index, parent) => {
      if (node.value && node.value.includes("![[")) {
        // Split the text by Obsidian image syntax
        const parts = node.value.split(
          /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp))\]\]/gi
        );

        if (parts.length > 1) {
          const newNodes = [];

          for (let i = 0; i < parts.length; i++) {
            if (i % 3 === 0) {
              // Regular text part
              if (parts[i]) {
                newNodes.push({
                  type: "text",
                  value: parts[i],
                });
              }
            } else if (i % 3 === 1) {
              // Image filename part
              const filename = parts[i];
              newNodes.push({
                type: "image",
                url: prefix + filename,
                alt: filename,
                title: null,
              });
            }
            // Skip the file extension capture group (i % 3 === 2)
          }

          // Replace the current node with the new nodes
          if (parent && typeof index === "number") {
            parent.children.splice(index, 1, ...newNodes);
          }
        }
      }
    });

    // Then handle regular markdown images
    visit(tree, "image", (node) => {
      // Check if the URL exists and doesn't already start with the prefix
      if (node.url && !node.url.startsWith(prefix)) {
        // Only prepend if it's not already an absolute URL or relative path starting with ./
        if (!node.url.startsWith("http") && !node.url.startsWith("./")) {
          node.url = prefix + node.url;
        }
      }
    });
  };
}
