import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import { FormattingButton } from "../toolbar.style";
import { FormattingButtonProps } from "./common";

import { RichTextEditorActionTypes } from "../../../constants";

const ItalicButton = ({ isActive }: FormattingButtonProps) => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(
      FORMAT_TEXT_COMMAND,
      RichTextEditorActionTypes.Italic,
    );
  };

  return (
    <FormattingButton
      size="small"
      aria-label="Italic"
      onClick={() => handleClick()}
      iconType="italic"
      buttonType={isActive ? "primary" : "tertiary"}
      isActive={isActive}
    />
  );
};

export default ItalicButton;
