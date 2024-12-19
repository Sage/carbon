import {
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  insertList,
  removeList,
  $isListNode,
  $isListItemNode,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import React from "react";

import { FormattingButton } from "../toolbar.style";
import { ListFormattingButtonProps } from "./common";

import { componentPrefix, RichTextEditorActionTypes } from "../../../constants";

const NumberListButton = ({
  isActive,
  setPairedButtonState,
}: ListFormattingButtonProps) => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    INSERT_ORDERED_LIST_COMMAND,
    () => {
      insertList(editor, RichTextEditorActionTypes.OrderedList);
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );

  editor.registerCommand(
    REMOVE_LIST_COMMAND,
    () => {
      removeList(editor);
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );

  const handleClick = () => {
    let removeItems = false;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isListNode(node) || $isListItemNode(node)) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            removeItems = true;
          }
        });
      }
    });

    if (!removeItems) {
      setPairedButtonState();
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <FormattingButton
      size="small"
      aria-label="Ordered List"
      onClick={() => handleClick()}
      iconType="bullet_list_numbers"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
      data-role={`${componentPrefix}-ordered-list-button`}
    />
  );
};

export default NumberListButton;
