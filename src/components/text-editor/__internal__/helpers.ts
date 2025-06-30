import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $getSelection, LexicalEditor } from "lexical";

import { markdownNodes, theme } from "./constants";

import Logger from "../../../__internal__/utils/logger";

/**
 * This helper takes the current state of the editor and serializes it into two formats:
 * 1. HTML
 * 2. JSON
 * This allows the editor state to be saved and restored at a later time, in a format suitable
 * for the majority of customers' use cases.
 */

const SerializeLexical = (editor: LexicalEditor) => {
  let htmlString;
  let json;

  editor.read(() => {
    // Get the current editor state
    const editorState = editor.getEditorState();
    // Serialize the editor state to JSON
    json = editorState.toJSON();
    // Generate HTML from the editor state
    htmlString = $generateHtmlFromNodes(editor, null);
  });

  return { htmlString, json };
};

/**
 * This helper takes an HTML string and deserializes it into the editor.
 * This allows the editor to be restored from a previously saved state.
 */
const DeserializeHTML = (html: string) => {
  // Create a new headless editor instance. This allows us to process the editor state
  // without needing to render the editor itself.
  const editor = createHeadlessEditor({
    namespace: "html-to-json",
    onError: /* istanbul ignore next */ (e) => Logger.error(e.message),
    theme,
    nodes: markdownNodes,
  });
  let parsingError;

  editor.update(
    () => {
      // Parse the HTML string into a DOM
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      // Generate nodes from the DOM
      const nodes = $generateNodesFromDOM(editor, dom);
      // Select the root of the editor
      $getRoot().select();
      // Insert the nodes into the editor
      const selection = $getSelection();
      /* istanbul ignore else */
      if (selection) {
        try {
          selection.insertNodes(nodes);
        } catch (err) {
          /* istanbul ignore next */
          parsingError = err;
        }
      }
    },
    { discrete: true },
  );

  /* istanbul ignore next */
  if (parsingError) {
    throw parsingError;
  }

  // Return the editor instance
  const json = editor.getEditorState().toJSON();
  return JSON.stringify(json);
};

const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);

/** Function to validate a given URL */
function validateUrl(url: string): boolean {
  return url === "https://" || urlRegExp.test(url);
}

export { DeserializeHTML, SerializeLexical, validateUrl };
