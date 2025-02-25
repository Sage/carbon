/* istanbul ignore file */
/**
 * Owing to the nature of how this plugin runs, it is not possible to test it in isolation.
 * It is tested as part of the TextEditor Playwright tests.
 *
 * The purpose of this plugin is to monitor the editor for any changes that result in the
 * creation of AutoLinkNodes, and report these changes to the customer (e.g. to then
 * generate link previews).
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode } from "@lexical/link";

import { useContext, useEffect } from "react";

import { validateUrl } from "../../helpers";
import TextEditorContext from "../../../text-editor.context";

const LinkMonitorPlugin = () => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the onLinkAdded function from the context
  const { onLinkAdded } = useContext(TextEditorContext);

  useEffect(() => {
    // Register a mutation listener for AutoLinkNodes
    const removeAutoLinkMutationListener = editor.registerMutationListener(
      AutoLinkNode,
      (mutatedNodes, { prevEditorState }) => {
        const isEditable = editor.isEditable();
        if (!isEditable) return;

        // For each AutoLinkNode, check if the text content is present and also a valid URL
        for (const [nodeKey, mutation] of mutatedNodes) {
          const node = editor.getElementByKey(nodeKey);
          const textContent = node?.innerText;

          if (textContent) {
            const linkValid = validateUrl(textContent);
            if (linkValid) {
              // Assume link has been created, notify user
              onLinkAdded?.(textContent, mutation);
            }
          } else {
            // Assume link has been destroyed, notify user
            const deletedData = prevEditorState?._nodeMap.get(
              nodeKey,
            ) as AutoLinkNode;
            if (deletedData) {
              const { __url } = deletedData;
              onLinkAdded?.(__url, mutation);
            }
          }
        }
      },
      { skipInitialization: false },
    );

    // Remove the mutation listener when the component is unmounted
    return () => {
      removeAutoLinkMutationListener();
    };
  }, [editor, onLinkAdded]);

  return null;
};

export default LinkMonitorPlugin;
