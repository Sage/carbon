import {
  INSERT_UNORDERED_LIST_COMMAND,
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
import { RichTextEditorActionTypes } from "../../../constants";

import { ListFormattingButtonProps } from "./common";

const BulletListButton = ({
  isActive,
  setPairedButtonState,
}: ListFormattingButtonProps) => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    INSERT_UNORDERED_LIST_COMMAND,
    () => {
      insertList(editor, RichTextEditorActionTypes.UnorderedList);
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
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <FormattingButton
      size="small"
      aria-label="Unordered List"
      onClick={() => handleClick()}
      iconType="bullet_list_dotted"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
    />
  );
};

export default BulletListButton;
