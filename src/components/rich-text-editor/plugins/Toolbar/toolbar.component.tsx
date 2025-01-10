import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection } from "lexical";
import React, { useCallback, useEffect, useState } from "react";

import {
  StyledToolbar,
  FormattingButtons,
  CommandButtons,
} from "./toolbar.style";
import { RichTextEditorActionTypes } from "../../constants";
import Button from "../../../button";
import useLocale from "../../../../hooks/__internal__/useLocale";

import { BoldButton, ItalicButton, ListControls } from "./buttons";

import SaveButton, { SaveCallbackProps } from "./buttons/save.component";

interface ToolbarProps {
  /** The namespace of the editor that this toolbar belongs to */
  namespace: string;
  /** The callback to call when the cancel button is clicked */
  onCancel?: () => void;
  /** The callback to call when the save button is clicked */
  onSave?: (value: SaveCallbackProps) => void;
}

const Toolbar = ({ namespace, onCancel, onSave }: ToolbarProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Set the initial state of the formatting buttons
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  // Get the locale to enable translations
  const locale = useLocale();

  // Update the toolbar based on the current selection
  const updateToolbar = useCallback(() => {
    // Get the current selection
    const selection = $getSelection();
    // If the selection is a range selection, update the formatting buttons
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat(RichTextEditorActionTypes.Bold));
      setIsItalic(selection.hasFormat(RichTextEditorActionTypes.Italic));
    }
  }, []);

  // Register an update listener to update the toolbar when the editor state changes
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const isEditable = editor.isEditable();
          /* istanbul ignore else */
          if (isEditable) updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  return (
    <StyledToolbar
      data-role={`${namespace}-toolbar`}
      id={`${namespace}-toolbar`}
      onFocus={(e) => e.stopPropagation()}
    >
      <FormattingButtons data-role={`${namespace}-formatting-buttons`}>
        <BoldButton isActive={isBold} namespace={namespace} />
        <ItalicButton isActive={isItalic} namespace={namespace} />
        <ListControls namespace={namespace} />
      </FormattingButtons>
      <CommandButtons data-role={`${namespace}-command-buttons`}>
        {onCancel && (
          <Button
            buttonType="tertiary"
            data-role={`${namespace}-cancel-button`}
            aria-label={locale.richTextEditor.cancelButtonAria()}
            onClick={() => onCancel?.()}
          >
            {locale.richTextEditor.cancelButton()}
          </Button>
        )}

        {onSave && <SaveButton namespace={namespace} onSave={onSave} />}
      </CommandButtons>
    </StyledToolbar>
  );
};

export default Toolbar;
