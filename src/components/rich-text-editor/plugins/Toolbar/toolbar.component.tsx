import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection, $getRoot } from "lexical";
import React, { useCallback, useEffect, useState } from "react";

import {
  StyledToolbar,
  FormattingButtons,
  CommandButtons,
} from "./toolbar.style";
import { RichTextEditorActionTypes } from "../../constants";
import Button from "../../../button";
import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnorderedListButton,
} from "./buttons";

interface ToolbarProps {
  onCancel?: () => void;
  onSave?: (value: string) => void;
}

const Toolbar = ({ onCancel, onSave }: ToolbarProps) => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat(RichTextEditorActionTypes.Bold));
      setIsItalic(selection.hasFormat(RichTextEditorActionTypes.Italic));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  return (
    <StyledToolbar>
      <FormattingButtons>
        <BoldButton isActive={isBold} />
        <ItalicButton isActive={isItalic} />
        <OrderedListButton
          isActive={isOrderedList}
          setPairedButtonState={() => {
            setIsOrderedList(!isOrderedList);
            setIsUnorderedList(false);
          }}
        />
        <UnorderedListButton
          isActive={isUnorderedList}
          setPairedButtonState={() => {
            setIsOrderedList(false);
            setIsUnorderedList(!isUnorderedList);
          }}
        />
      </FormattingButtons>
      <CommandButtons id="carbon-rich-text-editor-toolbar-command-buttons">
        {onCancel && (
          <Button
            id="carbon-rich-text-editor-toolbar-command-buttons-cancel"
            buttonType="tertiary"
            data-role="rte-cancel-button"
            aria-label="Cancel"
            onClick={() => onCancel?.()}
          >
            Cancel
          </Button>
        )}

        {onSave && (
          <Button
            id="carbon-rich-text-editor-toolbar-command-buttons-save"
            data-role="rte-save-button"
            buttonType="primary"
            aria-label="Save"
            onClick={() => {
              const currentTextContent = editor.read(() =>
                $getRoot().getTextContent(),
              );
              onSave?.(currentTextContent);
            }}
          >
            Save
          </Button>
        )}
      </CommandButtons>
    </StyledToolbar>
  );
};

export default Toolbar;
