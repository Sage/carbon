import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
  TextNode,
  RangeSelection,
  LexicalNode,
} from "lexical";
import React, { useEffect, useState } from "react";

import Box from "../../../../../box";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { StyledSpanNode } from "../../../__nodes__/styled-span.node";
import ToolbarDropdown from "./typography-dropdown/dropdown.component";

// Typography keys to aid in styling
export type TypographyKey =
  | "paragraph"
  | "title"
  | "subtitle"
  | "sectionHeader"
  | "sectionSubheader";

export type TypographySelectorProps = {
  /** The namespace of the editor that this dropdown belongs to */
  namespace: string;
  /** Whether the button is the first in a group of buttons */
  isFirstButton?: boolean;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  focusedIndex?: number;
  setFocusedIndex?: (index: number) => void;
};

// Get the StyledSpanNode (if any) from the current selection
function getStyledSpanFromSelection(
  selection: RangeSelection,
): StyledSpanNode | null {
  // This is recursive to ensure that we can always find the StyledSpanNode
  // if it exists in the selection's component heirarchy. There may be
  // instances where the selection is not directly on a StyledSpanNode,
  // but rather on e.g. a TextNode that is wrapped by a StyledSpanNode.
  let current: LexicalNode | null = selection.anchor.getNode();
  while (current) {
    if (current instanceof StyledSpanNode) return current;
    current = current.getParent();
  }
  return null;
}

const TypographySelector = ({
  namespace,
  isFirstButton = false,
  isOpen = false,
  setIsOpen,
  focusedIndex = -1,
  setFocusedIndex,
}: TypographySelectorProps) => {
  const [editor] = useLexicalComposerContext();
  const locale = useLocale();
  // State to manage the selected typography option, default
  // to "paragraph" for initial rendering
  const [selectedOption, setSelectedOption] =
    useState<TypographyKey>("paragraph");

  // Keep dropdown value synch'ed with the current cursor position
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        // Use setTimeout to ensure correct read order
        setTimeout(() => {
          // Read the editor state to get the current selection
          editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              // If a span node is selected, update the dropdown
              // to reflect the typography key of that node,
              // otherwise default to "paragraph"
              const spanNode = getStyledSpanFromSelection(selection);
              setSelectedOption(
                spanNode ? spanNode.getTypographyKey() : "paragraph",
              );
            }
          });
        }, 0);

        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  const handleChange = (value: string) => {
    const key = value as TypographyKey;
    // Update the selected option state
    // This is needed to ensure the dropdown reflects the current selection
    // correctly; not having this would mean the dropdown was always one step behind
    // the actual selected type.
    setSelectedOption(key);

    // Apply the selected typography style to the current selection
    editor.update(() => {
      const selection = $getSelection();

      // If the selection is a range selection, apply the typography style
      // to all nodes in the selection
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();

        // Store the anchor and focus offsets to restore cursor position after applying styles
        const anchorOffset = selection.anchor.offset;
        const focusOffset = selection.focus.offset;

        // Hold information about the first new node created
        let firstNewNode: TextNode | StyledSpanNode | null = null;

        nodes.forEach((node) => {
          if (node instanceof TextNode || node instanceof StyledSpanNode) {
            let newNode: TextNode | StyledSpanNode;

            if (key === "paragraph") {
              // Use a regular TextNode for paragraphs. Doing so ensures that
              // the mentions plugin can still function correctly
              newNode = new TextNode(node.getTextContent());
            } else {
              // Use StyledSpanNode for other typography styles.
              newNode = StyledSpanNode.createFromKey(
                key,
                node.getTextContent(),
              );
            }
            // Replace the current node with the new node
            node.replace(newNode);

            if (!firstNewNode) {
              // If this is the first new node, store it to restore cursor position later
              firstNewNode = newNode;
            }
          }
        });

        // restore cursor position to the correct position
        if (firstNewNode) {
          // Type is irrelevant here, as we know it is either a TextNode or StyledSpanNode,
          // and both have the select method available
          (firstNewNode as StyledSpanNode).select(anchorOffset, focusOffset);
        }
      }
    });
  };

  return (
    <Box minWidth={"150px"} marginRight="spacing05">
      <ToolbarDropdown
        aria-label={locale.textEditor.typography.selectAria()}
        namespace={namespace}
        onChange={(value) => handleChange(value)}
        value={selectedOption}
        isFirstButton={isFirstButton}
        options={(
          [
            "title",
            "subtitle",
            "sectionHeader",
            "sectionSubheader",
            "paragraph",
          ] as TypographyKey[]
        ).map((key) => {
          const ariaLabel = locale.textEditor.typography[key]();
          return {
            ariaLabel,
            id: key,
            label: ariaLabel,
            onClick: () => handleChange(key),
          };
        })}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
      />
    </Box>
  );
};

export default TypographySelector;
