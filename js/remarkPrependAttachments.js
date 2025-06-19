import { visit } from "unist-util-visit";

/**
 * Remark plugin that prepends "./attachments/" to image URLs containing "Pasted"
 * but ignores images that already contain "HHHH" in their URL
 */
function remarkPrependAttachments(options = {}) {
  const prefix = options.prefix || "./attachments/";
  const skipPattern = options.skipPattern || "HHHH";
  const targetPattern = options.targetPattern || "Pasted";

  return function transformer(tree, file) {
    visit(tree, "image", (node) => {
      // Check if the URL exists and contains the target pattern
      if (node.url && node.url.includes(targetPattern)) {
        // Skip if the URL contains the skip pattern
        if (skipPattern && node.url.includes(skipPattern)) {
          return;
        }

        // Prepend the prefix to the URL
        if (!node.url.startsWith(prefix)) {
          node.url = prefix + node.url;
        }
      }
    });
  };
}

export default remarkPrependAttachments;
