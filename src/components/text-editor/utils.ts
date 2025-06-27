import { DeserializeHTML } from "./__internal__/helpers";

interface LexicalNode {
  type: string;
  direction?: string | null;
  children?: LexicalNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other properties we don't need to specify
}

interface LexicalEditorState {
  root: LexicalNode;
}

const createFromHTML = (html: string) => {
  const editorState = DeserializeHTML(html);

  const parsed: LexicalEditorState = JSON.parse(editorState);

  const normalizeNode = (node: LexicalNode): void => {
    // Lexical consistently serialises the direction property as either 'ltr','rtl' or null.
    if (node.type === "paragraph" && node.direction === null) {
      // Setting the direction to 'ltr' for paragraphs without a specified direction,
      // as Lexical defaults to 'ltr' when the user interacts with the editor.
      node.direction = "ltr";
    }
    if (node.children) {
      node.children.forEach(normalizeNode);
    }
  };

  normalizeNode(parsed.root);

  return JSON.stringify(parsed);
};

/** Creates and returns a string representation of an empty editor */
const createEmpty = () => {
  // Create a default empty state that matches Lexical's natural behavior
  // Use "ltr" instead of null to match what Lexical sets during user interaction
  const value =
    '{"root":{"children":[{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  return value;
};

export { createEmpty, createFromHTML };
