import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection } from "lexical";
import React, { useCallback, useEffect, useState } from "react";

import {
  StyledToolbar,
  FormattingButtons,
  CommandButtons,
} from "./toolbar.style";
import { componentPrefix, RichTextEditorActionTypes } from "../../constants";
import Button from "../../../button";
import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnorderedListButton,
} from "./buttons";

import SaveButton from "./buttons/save.component";

interface ToolbarProps {
  onCancel?: () => void;
  onSave?: (value: any) => void;
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
    <StyledToolbar
      data-role={`${componentPrefix}-toolbar`}
      id={`${componentPrefix}-toolbar`}
    >
      <FormattingButtons data-role={`${componentPrefix}-formatting-buttons`}>
        <BoldButton isActive={isBold} />
        <ItalicButton isActive={isItalic} />
        <OrderedListButton
          isActive={isOrderedList}
          setPairedButtonState={() => {
            setIsOrderedList(true);
            setIsUnorderedList(false);
          }}
        />
        <UnorderedListButton
          isActive={isUnorderedList}
          setPairedButtonState={() => {
            setIsOrderedList(false);
            setIsUnorderedList(true);
          }}
        />
      </FormattingButtons>
      <CommandButtons data-role={`${componentPrefix}-command-buttons`}>
        {onCancel && (
          <Button
            buttonType="tertiary"
            data-role={`${componentPrefix}-cancel-button`}
            aria-label="Cancel"
            onClick={() => onCancel?.()}
          >
            Cancel
          </Button>
        )}

        {onSave && <SaveButton onSave={onSave} />}
      </CommandButtons>
    </StyledToolbar>
  );
};

export default Toolbar;
