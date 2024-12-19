import { createHeadlessEditor } from "@lexical/headless";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

import { $getRoot, $getSelection } from "lexical";

import { markdownNodes, theme } from "./constants";

/**
 * This helper takes the current state of the editor and serializes it into two formats:
 * 1. HTML
 * 2. JSON
 * This allows the editor state to be saved and restored at a later time, in a format suitable
 * for the majority of customers' use cases.
 */
const SerializeLexical = (editor: any) => {
  let htmlString = null;
  let json = null;

  editor.update(() => {
    const editorState = editor.getEditorState();
    json = editorState.toJSON();
    htmlString = $generateHtmlFromNodes(editor, null);
  });

  return { htmlString, json };
};

/**
 * This helper takes an HTML string and deserializes it into the editor.
 * This allows the editor to be restored from a previously saved state.
 */
const DeserializeHTML = (html: string) => {
  const editor = createHeadlessEditor({
    namespace: "html-to-json",
    onError: console.error,
    theme,
    nodes: markdownNodes,
  });
  let parsingError;

  editor.update(
    () => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().select();
      const selection = $getSelection();
      if (selection) {
        try {
          selection.insertNodes(nodes);
        } catch (err) {
          parsingError = err;
        }
      }
    },
    { discrete: true },
  );

  if (parsingError) {
    throw parsingError;
  }

  const json = editor.getEditorState().toJSON();
  return JSON.stringify(json);
};

export { DeserializeHTML, SerializeLexical };
