import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $getSelection, LexicalEditor } from "lexical";

import { MARKDOWN_NODES } from "./constants";
import { getTheme } from "./theme";

import Logger from "../../../../__internal__/utils/logger";

const fontFamily = "font-family: 'Sage UI', sans-serif;";
const linkStyles = `color: #007e45ff; cursor: pointer; text-decoration: underline; ${fontFamily}`;

const classToStyleMap: Record<string, string> = {
  textBold: "font-weight: bold;",
  textItalic: "font-style: italic;",
  textUnderline: "text-decoration: underline;",
};

/**
 * Post-processes HTML serialized from the Lexical editor, converting class-based
 * text formatting to inline styles and applying brand-consistent defaults to all elements.
 *
 * Specifically:
 * - Converts Lexical's text format classes (textBold, textItalic, textUnderline)
 *   to their inline style equivalents
 * - Applies the Sage UI font family to all elements
 * - Applies link styles (color, cursor, underline) to anchor elements
 * - Preserves any existing inline styles set by Lexical (e.g. white-space: pre-wrap)
 *
 * This ensures the output HTML is portable and renders correctly in contexts where
 * the Lexical stylesheet is not present, such as email templates or external consumers.
 */
const generateHTMLWithInlineStyles = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.body.querySelectorAll("*").forEach((el) => {
    const element = el as HTMLElement;

    // Accumulate new inline styles
    const newStyles: string[] = [];

    // Map class names to inline styles
    const classList = Array.from(element.classList);
    classList.forEach((className) => {
      const mappedStyle = classToStyleMap[className];
      if (mappedStyle) {
        newStyles.push(mappedStyle);
        element.classList.remove(className);
      }
    });

    // Apply link styles
    if (element.tagName === "A") {
      newStyles.push(linkStyles);
    } else {
      // Apply font family to all non-link elements (links get it via linkStyles)
      newStyles.push(fontFamily);
    }

    // Merge with any existing inline styles
    const existingStyle = element.getAttribute("style") ?? "";
    const mergedStyle = [existingStyle, ...newStyles].filter(Boolean).join(" ");

    element.setAttribute("style", mergedStyle);

    // Remove class attribute if now empty
    if (element.classList.length === 0) {
      element.removeAttribute("class");
    }
  });

  return doc.body.innerHTML;
};

/**
 * This helper takes the current state of the editor and serializes it into three formats:
 * 1. HTML
 * 2. HTML with inline styles (for use in email templates and contexts without stylesheets)
 * 3. JSON
 * This allows the editor state to be saved and restored at a later time, in a format suitable
 * for the majority of customers' use cases.
 */

const SerializeLexical = (editor: LexicalEditor) => {
  let htmlString: string | undefined;
  let htmlWithInlineStyles: string | undefined;
  let json;

  editor.read(() => {
    // Get the current editor state
    const editorState = editor.getEditorState();
    // Serialize the editor state to JSON
    json = editorState.toJSON();
    // Generate HTML from the editor state
    htmlString = $generateHtmlFromNodes(editor, null);
    // Generate HTML with inline styles for portable use
    htmlWithInlineStyles = generateHTMLWithInlineStyles(htmlString);
  });

  return { htmlString, htmlWithInlineStyles, json };
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
    theme: getTheme(),
    nodes: MARKDOWN_NODES,
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

const createFromHTML = (html: string) => {
  // DeserializeHTML is tested as part of the helper tests
  /* istanbul ignore next */
  return DeserializeHTML(html);
};

/** Creates and returns a string representation of an empty editor */
const createEmpty = () => {
  // Create a default empty state
  const value =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  return value;
};

export {
  generateHTMLWithInlineStyles,
  createEmpty,
  createFromHTML,
  DeserializeHTML,
  SerializeLexical,
  validateUrl,
};
