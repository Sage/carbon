import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import ToolbarButtonToggle from "../toolbar-button.component";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { TEXT_EDITOR_ACTION_TYPES } from "../../../__utils__/constants";
import { FormattingButtonProps } from "../../../__utils__/interfaces.types";

// The `BoldButton` component is a button that applies bold formatting to the selected text in the editor.
const BoldButton = ({
  isActive,
  isFirstButton = false,
  namespace,
  size = "medium",
}: FormattingButtonProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();

  // When the button is clicked, dispatch the `FORMAT_TEXT_COMMAND` with the `Bold` action
  const handleClick = () => {
    const isEditable = editor.isEditable();

    /* istanbul ignore else */
    if (isEditable) {
      editor.dispatchCommand(
        FORMAT_TEXT_COMMAND,
        TEXT_EDITOR_ACTION_TYPES.Bold,
      );
    }
  };

  return (
    <ToolbarButtonToggle
      type="button"
      size={size}
      aria-label={locale.textEditor.boldAria()}
      onClick={handleClick}
      buttonIcon="bold"
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault()
      }
      pressed={isActive}
      id={`${namespace}-bold-button`}
      data-role={`${namespace}-bold-button`}
      tabIndex={isFirstButton ? 0 : -1}
      className="toolbar-button"
    />
  );
};

export default BoldButton;
