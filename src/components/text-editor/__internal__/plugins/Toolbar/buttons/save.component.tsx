import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import React from "react";

import { SerializeLexical } from "../../../helpers";
import Button from "../../../../../button";
import useLocale from "../../../../../../hooks/__internal__/useLocale";

interface SaveObjectProps {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
}

interface SaveProps {
  children: SaveObjectProps[];
}

export interface EditorFormattedValues {
  htmlString?: string;
  json?: {
    root: {
      children: SaveProps[];
      direction: string;
      format: string;
      indent: number;
      type: string;
      version: string;
    };
  };
}

interface SaveButtonProps {
  /** The namespace of the editor that this button belongs to */
  namespace: string;
  /** The callback to call when the save button is clicked */
  onSave: (value: EditorFormattedValues) => void;
}

// The `SaveButton` component is a button that saves the current state of the editor
const SaveButton = ({ namespace, onSave }: SaveButtonProps) => {
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
    >
      {locale.textEditor.saveButton()}
    </Button>
  );
};

export default SaveButton;
