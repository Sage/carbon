/* istanbul ignore file */
/**
 * Owing to the nature of how this plugin runs, it is not possible to test it in isolation.
 * It is tested as part of the TextEditor Playwright tests.
 *
 * The StyledSpanEnterPlugin component is designed to ensure that, when using custom
 * text styling as specified in the Typography dropdown, any Enter key presses
 * reset the dropdown back to "paragraph" mode, akin to how industry-standard
 * WYSIWYG editors behave.
 */
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from "lexical";
import { $isStyledSpanNode } from "../../__nodes__/styled-span.node";

const StyledSpanEnterPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();

          nodes.forEach((node) => {
            if ($isStyledSpanNode(node)) {
              const { offset } = selection.anchor;
              node.splitText(offset);
            }
          });
        }

        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
};

export default StyledSpanEnterPlugin;
