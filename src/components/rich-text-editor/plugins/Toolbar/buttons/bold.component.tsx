import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { FORMAT_TEXT_COMMAND } from "lexical";

import React from "react";

import { FormattingButton } from "../toolbar.style";
import { RichTextEditorActionTypes } from "../../../constants";
import useLocale from "../../../../../hooks/__internal__/useLocale";

import { FormattingButtonProps } from "./common";

// The `BoldButton` component is a button that applies bold formatting to the selected text in the editor.
const BoldButton = ({ isActive, namespace }: FormattingButtonProps) => {
  // Get the locale to enable translations
  const locale = useLocale();
  // Get the editor instance
  const [editor] = useLexicalComposerContext();

  // When the button is clicked, dispatch the `FORMAT_TEXT_COMMAND` with the `Bold` action
  const handleClick = () => {
    const isEditable = editor.isEditable();
    /* istanbul ignore else */
    if (isEditable)
      editor.dispatchCommand(
        FORMAT_TEXT_COMMAND,
        RichTextEditorActionTypes.Bold,
      );
  };

  return (
    <FormattingButton
      size="small"
      aria-label={locale.richTextEditor.boldAria()}
      onClick={() => handleClick()}
      iconType="bold"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
      data-role={`${namespace}-bold-button`}
    />
  );
};

export default BoldButton;
