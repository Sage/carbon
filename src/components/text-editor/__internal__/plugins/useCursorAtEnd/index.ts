/* istanbul ignore file */
// Ignore this file in coverage reports because it's a plugin and not part of the main logic.
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useEffect } from "react";
import {
  COMMAND_PRIORITY_NORMAL,
  createCommand,
  $getRoot,
  $createRangeSelection,
  $getSelection,
  $setSelection,
  ParagraphNode,
  $createTextNode,
} from "lexical";

const FOCUS_COMMAND = createCommand("FOCUS_COMMAND");

interface FocusCommandPayload {
  defaultToEnd: boolean;
}

// This hook sets the cursor at the end of the editor when it receives focus
// via keyboard, or at the relevant position when it receives focus via mouse
function useCursorAtEnd() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      FOCUS_COMMAND,
      (payload: FocusCommandPayload) => {
        editor.update(() => {
          if (!payload.defaultToEnd) {
            const currentSelection = $getSelection();
            if (currentSelection) {
              $setSelection(currentSelection);
              return;
            }
          }

          const root = $getRoot();
          const numberOfChildren = root.getChildrenSize();
          const selection = $createRangeSelection();

          if (numberOfChildren === 1) {
            const firstNode = root.getFirstChild();
            if (firstNode) {
              if (firstNode && firstNode.getType() === "paragraph") {
                const firstNodeChildren = (
                  firstNode as ParagraphNode
                ).getChildrenSize();
                if (
                  firstNode.getType() === "paragraph" &&
                  firstNodeChildren === 0
                ) {
                  const emptyTextNode = $createTextNode("");
                  (firstNode as ParagraphNode).append(emptyTextNode);
                  selection.anchor.set(emptyTextNode.getKey(), 0, "text");
                  selection.focus.set(emptyTextNode.getKey(), 0, "text");
                } else {
                  const lastNode = (firstNode as ParagraphNode).getLastChild();
                  if (lastNode && lastNode.getType() === "text") {
                    const contentSize = lastNode.getTextContentSize();
                    const lastNodeKey = lastNode.getKey();
                    selection.anchor.set(lastNodeKey, contentSize, "text");
                    selection.focus.set(lastNodeKey, contentSize, "text");
                  }
                }

                $setSelection(selection);
              }
            }
          } else {
            const allTextNodes = root.getAllTextNodes();
            if (allTextNodes.length === 0) return;

            const lastNode = allTextNodes[allTextNodes.length - 1];
            if (lastNode) {
              const offset = lastNode.getTextContentSize();

              selection.anchor.set(lastNode.getKey(), offset, "text");
              selection.focus.set(lastNode.getKey(), offset, "text");

              $setSelection(selection);
            }
          }
        });
        return true;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor]);

  const handleFocus = (e: React.FocusEvent) => {
    // Check if the focus was triggered by a mouse click
    // relatedTarget is null for mouse clicks, but set for keyboard navigation
    const defaultToEnd = e.relatedTarget !== null;
    editor.dispatchCommand(FOCUS_COMMAND, { defaultToEnd });
  };

  return handleFocus;
}

export default useCursorAtEnd;
