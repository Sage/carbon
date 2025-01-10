import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  insertList,
  removeList,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_LOW } from "lexical";
import React, { useState } from "react";

import { FormattingButton } from "../toolbar.style";

import { RichTextEditorActionTypes } from "../../../constants";
import useLocale from "../../../../../hooks/__internal__/useLocale";

// The `ListControls` component is a set of buttons that allow the user to insert ordered and unordered lists into the editor.
const ListControls = ({ namespace }: { namespace: string }) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();
  // Set the initial state of the list buttons
  const [isOLActive, setIsOLActive] = useState(false);
  const [isULActive, setIsULActive] = useState(false);

  // Register the commands for inserting and removing lists
  editor.registerCommand(
    INSERT_ORDERED_LIST_COMMAND,
    () => {
      insertList(editor, RichTextEditorActionTypes.OrderedList);
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );

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

  // When the ordered list button is clicked, insert or remove an ordered list
  const handleOLClick = () => {
    const isEditable = editor.isEditable();
    /* istanbul ignore if */
    if (!isEditable) return;

    if (isOLActive) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setIsOLActive(false);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setIsOLActive(true);
    }
    // If the unordered list button is active, deactivate it
    setIsULActive(false);
  };

  // When the unordered list button is clicked, insert or remove an unordered list
  const handleULClick = () => {
    const isEditable = editor.isEditable();
    /* istanbul ignore if */
    if (!isEditable) return;

    if (isULActive) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setIsULActive(false);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setIsULActive(true);
    }
    // If the ordered list button is active, deactivate it
    setIsOLActive(false);
  };

  return (
    <>
      <FormattingButton
        size="small"
        aria-label={locale.richTextEditor.orderedListAria()}
        onClick={() => handleOLClick()}
        iconType="bullet_list_numbers"
        buttonType={isOLActive ? "primary" : "tertiary"}
        isActive={isOLActive}
        data-role={`${namespace}-ordered-list-button`}
      />
      <FormattingButton
        size="small"
        aria-label={locale.richTextEditor.unorderedListAria()}
        onClick={() => handleULClick()}
        iconType="bullet_list_dotted"
        buttonType={isULActive ? "primary" : "tertiary"}
        isActive={isULActive}
        data-role={`${namespace}-unordered-list-button`}
      />
    </>
  );
};

export default ListControls;
