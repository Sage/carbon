import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import { FormattingButtonProps } from "./common.types";
import { FormattingButton } from "../toolbar.style";
import { TextEditorActionTypes } from "../../../constants";
import useLocale from "../../../../../../hooks/__internal__/useLocale";

// The `UnderlineButton` component is a button that applies underline formatting to the selected text in the editor.
const UnderlineButton = ({ isActive, namespace }: FormattingButtonProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();

  // When the button is clicked, dispatch the `FORMAT_TEXT_COMMAND` with the `Underline` action
  const handleClick = () => {
    const isEditable = editor.isEditable();

    /* istanbul ignore else */
    if (isEditable) {
      // Focus the editor before dispatching the command
      editor.focus();
      editor.dispatchCommand(
        FORMAT_TEXT_COMMAND,
        TextEditorActionTypes.Underline,
      );
    }
  };

  return (
    <FormattingButton
      size="small"
      aria-label={locale.textEditor.underlineAria()}
      onClick={() => handleClick()}
      iconType="construction"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
      aria-pressed={isActive}
      data-role={`${namespace}-underline-button`}
      tabIndex={-1}
      className="toolbar-button"
    />
  );
};

export default UnderlineButton;
