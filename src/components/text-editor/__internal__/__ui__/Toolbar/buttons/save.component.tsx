import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import React from "react";

import Button from "../../../../../button";
import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { SaveButtonProps } from "../../../__utils__/interfaces.types";
import { SerializeLexical } from "../../../__utils__/helpers";

// The `SaveButton` component is a button that saves the current state of the editor
const SaveButton = ({ namespace, onSave, size }: SaveButtonProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();

  return (
    <Button
      data-role={`${namespace}-save-button`}
      buttonType="primary"
      aria-label={locale.textEditor.saveButtonAria()}
      onClick={() => {
        const isEditable = editor.isEditable();
        /* istanbul ignore if */
        if (!isEditable) return;

        const values = SerializeLexical(editor);
        onSave?.(values);
      }}
      size={size}
      className="command-button"
    >
      {locale.textEditor.saveButton()}
    </Button>
  );
};

export default SaveButton;
