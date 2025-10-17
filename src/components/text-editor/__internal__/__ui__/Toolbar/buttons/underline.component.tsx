import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import { FormattingButton } from "../toolbar.style";
import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { FormattingButtonProps } from "../../../__utils__/interfaces.types";
import { TEXT_EDITOR_ACTION_TYPES } from "../../../__utils__/constants";

// The `UnderlineButton` component is a button that applies underline formatting to the selected text in the editor.
const UnderlineButton = React.forwardRef<
  HTMLButtonElement,
  FormattingButtonProps
>(
  (
    { isActive, isFirstButton = false, namespace, size }: FormattingButtonProps,
    ref,
  ) => {
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
      <FormattingButton
        size={size}
        aria-label={locale.textEditor.underlineAria()}
        onClick={() => handleClick()}
        iconType="underline"
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
        buttonType={isActive ? "primary" : "tertiary"}
        isActive={isActive}
        aria-pressed={isActive}
        data-role={`${namespace}-underline-button`}
        id={`${namespace}-underline-button`}
        tabIndex={isFirstButton ? 0 : -1}
        className="toolbar-button"
        ref={ref}
      />
    );
  },
);

export default UnderlineButton;
