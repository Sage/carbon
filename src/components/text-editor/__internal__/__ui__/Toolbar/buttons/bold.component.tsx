import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import { FormattingButton } from "../toolbar.style";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { TEXT_EDITOR_ACTION_TYPES } from "../../../__utils__/constants";
import { FormattingButtonProps } from "../../../__utils__/interfaces.types";

// The `BoldButton` component is a button that applies bold formatting to the selected text in the editor.
const BoldButton = React.forwardRef<HTMLButtonElement, FormattingButtonProps>(
  (
    { isActive, isFirstButton = false, namespace, size }: FormattingButtonProps,
    ref,
  ) => {
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
      <FormattingButton
        size={size}
        aria-label={locale.textEditor.boldAria()}
        onClick={() => handleClick()}
        iconType="bold"
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
        buttonType={isActive ? "primary" : "tertiary"}
        isActive={isActive}
        aria-pressed={isActive}
        id={`${namespace}-bold-button`}
        data-role={`${namespace}-bold-button`}
        tabIndex={isFirstButton ? 0 : -1}
        className="toolbar-button"
        ref={ref}
      />
    );
  },
);

export default BoldButton;
