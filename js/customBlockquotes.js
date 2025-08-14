import { visit } from "unist-util-visit";

const blockquoteTypes = {
  ":>TIP": "tip-blockquote",
  "!WARNING": "warning-blockquote",
  ":>IMPORTANT": "important-blockquote",
  ":>CAUTION": "caution-blockquote",
  ":>NOTE": "note-blockquote",
  // ... other types
};

function customBlockquotes() {
  return (tree) => {
    visit(tree, "text", (node) => {
      const type = Object.keys(blockquoteTypes).find((key) =>
        node.value.startsWith(key)
      );
      if (type) {
        // Logic to transform the node
      }
    });
  };
}

export default customBlockquotes;
