import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import { FormattingButton } from "../toolbar.style";
import { FormattingButtonProps } from "./common";

import { TextEditorActionTypes } from "../../../constants";
import useLocale from "../../../../../../hooks/__internal__/useLocale";

// The `ItalicButton` component is a button that applies italic formatting to the selected text in the editor.
const ItalicButton = ({ isActive, namespace }: FormattingButtonProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();

  // When the button is clicked, dispatch the `FORMAT_TEXT_COMMAND` with the `Italic` action
  const handleClick = () => {
    const isEditable = editor.isEditable();

    /* istanbul ignore else */
    if (isEditable)
      // Focus the editor before dispatching the command
      editor.focus();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, TextEditorActionTypes.Italic);
  };

  return (
    <FormattingButton
      size="small"
      aria-label={locale.textEditor.italicAria()}
      onClick={() => handleClick()}
      iconType="italic"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
      aria-pressed={isActive}
      data-role={`${namespace}-italic-button`}
      tabIndex={-1}
    />
  );
};

export default ItalicButton;
