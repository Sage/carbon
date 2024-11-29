import React, { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
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

import StyledToolbar from "./toolbar.plugin.style";
import Button from "../../../../../components/button";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
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
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
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

  const handleHistoryClick = (action: "undo" | "redo") => {
    editor.dispatchCommand(
      action === "undo" ? UNDO_COMMAND : REDO_COMMAND,
      undefined,
    );
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
      <Button
        buttonType={isBold ? "primary" : "tertiary"}
        size="small"
        aria-label="Bold"
        onClick={() => handleTextFormatClick("bold")}
      >
        Bold
      </Button>
      <Button
        buttonType={isStrikethrough ? "primary" : "tertiary"}
        size="small"
        aria-label="Strikethrough"
        onClick={() => handleTextFormatClick("strikethrough")}
      >
        Strikethrough
      </Button>
      <Button
        buttonType={isItalic ? "primary" : "tertiary"}
        size="small"
        aria-label="Italic"
        onClick={() => handleTextFormatClick("italic")}
      >
        Italic
      </Button>
      <Button
        buttonType={isUnderline ? "primary" : "tertiary"}
        size="small"
        aria-label="Underline"
        onClick={() => handleTextFormatClick("underline")}
      >
        Underline
      </Button>
      <Button
        buttonType="tertiary"
        size="small"
        aria-label="Undo"
        onClick={() => handleHistoryClick("undo")}
      >
        Undo
      </Button>
      <Button
        buttonType="tertiary"
        size="small"
        aria-label="Redo"
        onClick={() => handleHistoryClick("redo")}
      >
        Redo
      </Button>
      <Button
        buttonType={isOrderedList ? "primary" : "tertiary"}
        size="small"
        aria-label="Ordered List"
        onClick={() => handleListClick("ordered")}
      >
        Ordered List
      </Button>
      <Button
        buttonType={isUnorderedList ? "primary" : "tertiary"}
        size="small"
        aria-label="Unordered List"
        onClick={() => handleListClick("unordered")}
      >
        Unordered List
      </Button>
    </StyledToolbar>
  );
};

export default ToolbarPlugin;
