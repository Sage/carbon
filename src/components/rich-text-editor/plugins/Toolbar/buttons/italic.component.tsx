import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import { FormattingButton } from "../toolbar.style";
import { FormattingButtonProps } from "./common";

import { RichTextEditorActionTypes } from "../../../constants";
import useLocale from "../../../../../hooks/__internal__/useLocale";

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
      editor.dispatchCommand(
        FORMAT_TEXT_COMMAND,
        RichTextEditorActionTypes.Italic,
      );
  };

  return (
    <FormattingButton
      size="small"
      aria-label={locale.richTextEditor.italicAria()}
      onClick={() => handleClick()}
      iconType="italic"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
      data-role={`${namespace}-italic-button`}
    />
  );
};

export default ItalicButton;
