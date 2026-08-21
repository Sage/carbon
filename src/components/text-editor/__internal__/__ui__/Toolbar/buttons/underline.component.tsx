import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import ToolbarButtonToggle from "../toolbar-button.component";
import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { FormattingButtonProps } from "../../../__utils__/interfaces.types";
import { TEXT_EDITOR_ACTION_TYPES } from "../../../__utils__/constants";

// The `UnderlineButton` component is a button that applies underline formatting to the selected text in the editor.
const UnderlineButton = ({
  isActive,
  isFirstButton = false,
  namespace,
  size = "medium",
}: FormattingButtonProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();

  // When the button is clicked, dispatch the `FORMAT_TEXT_COMMAND` with the `Underline` action
  const handleClick = () => {
    const isEditable = editor.isEditable();

    /* istanbul ignore else */
    if (isEditable) {
      editor.dispatchCommand(
        FORMAT_TEXT_COMMAND,
        TEXT_EDITOR_ACTION_TYPES.Underline,
      );
    }
  };

  return (
    <ToolbarButtonToggle
      type="button"
      size={size}
      aria-label={locale.textEditor.underlineAria()}
      onClick={handleClick}
      buttonIcon="underline"
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault()
      }
      pressed={isActive}
      data-role={`${namespace}-underline-button`}
      id={`${namespace}-underline-button`}
      tabIndex={isFirstButton ? 0 : -1}
      className="toolbar-button"
    />
  );
};

export default UnderlineButton;
