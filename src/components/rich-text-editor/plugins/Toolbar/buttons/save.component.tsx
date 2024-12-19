import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

import { SerializeLexical } from "../../../helpers";

import { componentPrefix } from "../../../constants";
import Button from "../../../../button";

interface SaveButtonProps {
  onSave: (value: any) => void;
}

const SaveButton = ({ onSave }: SaveButtonProps) => {
  const [editor] = useLexicalComposerContext();

  return (
    <Button
      data-role={`${componentPrefix}-save-button"`}
      buttonType="primary"
      aria-label="Save"
      onClick={() => {
        const values = SerializeLexical(editor);
        onSave?.(values);
      }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
