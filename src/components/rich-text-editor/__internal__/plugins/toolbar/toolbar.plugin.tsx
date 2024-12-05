import React, { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  insertList,
  removeList,
  $isListNode,
  $isListItemNode,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  StyledToolbar,
  FormattingButtons,
  CommandButtons,
  FormattingButton,
} from "./toolbar.plugin.style";
import Button from "../../../../../components/button";

interface ToolbarPluginProps {
  /** Whether to show the command buttons */
  showCommandButtons?: boolean;
  /** Callback function to be called when the editor is saved via command button */
  onSave?: () => void;
  /** Callback function to be called when the editor is saved via command button */
  onCancel?: () => void;
}

const ToolbarPlugin = ({
  showCommandButtons = false,
  onSave = undefined,
  onCancel = undefined,
}: ToolbarPluginProps) => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  editor.registerCommand(
    INSERT_UNORDERED_LIST_COMMAND,
    () => {
      insertList(editor, "bullet");
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  editor.registerCommand(
    INSERT_ORDERED_LIST_COMMAND,
    () => {
      insertList(editor, "number");
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

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  const handleTextFormatClick = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const handleListClick = (action: "unordered" | "ordered") => {
    let removeItems = false;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isListNode(node) || $isListItemNode(node)) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            removeItems = true;

            setIsUnorderedList(false);
            setIsOrderedList(false);
          }
        });
      }
    });

    if (!removeItems) {
      if (action === "unordered") {
        setIsUnorderedList(true);
        setIsOrderedList(false);
      } else {
        setIsUnorderedList(false);
        setIsOrderedList(true);
      }

      editor.dispatchCommand(
        action === "ordered"
          ? INSERT_ORDERED_LIST_COMMAND
          : INSERT_UNORDERED_LIST_COMMAND,
        undefined,
      );
    }
  };

  return (
    <StyledToolbar>
      <FormattingButtons>
        <FormattingButton
          size="small"
          aria-label="Bold"
          onClick={() => handleTextFormatClick("bold")}
          iconType="bold"
          buttonType={isBold ? "primary" : "tertiary"}
          isActive={isBold}
        />
        <FormattingButton
          size="small"
          aria-label="Italic"
          onClick={() => handleTextFormatClick("italic")}
          iconType="italic"
          buttonType={isItalic ? "primary" : "tertiary"}
          isActive={isItalic}
        />
        <FormattingButton
          size="small"
          aria-label="Ordered List"
          onClick={() => handleListClick("ordered")}
          iconType="bullet_list_numbers"
          buttonType={isOrderedList ? "primary" : "tertiary"}
          isActive={isOrderedList}
        />
        <FormattingButton
          size="small"
          aria-label="Unordered List"
          onClick={() => handleListClick("ordered")}
          iconType="bullet_list_dotted"
          buttonType={isUnorderedList ? "primary" : "tertiary"}
          isActive={isUnorderedList}
        />
      </FormattingButtons>
      {showCommandButtons && (
        <CommandButtons>
          <Button
            buttonType="tertiary"
            aria-label="Cancel"
            onClick={() => onCancel?.()}
          >
            Cancel
          </Button>

          <Button
            buttonType="primary"
            aria-label="Save"
            onClick={() => onSave?.()}
          >
            Save
          </Button>
        </CommandButtons>
      )}
    </StyledToolbar>
  );
};

export default ToolbarPlugin;
