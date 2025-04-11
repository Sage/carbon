import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection } from "lexical";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  StyledToolbar,
  FormattingButtons,
  CommandButtons,
} from "./toolbar.style";
import { TextEditorActionTypes } from "../../constants";
import Button from "../../../../button";
import useLocale from "../../../../../hooks/__internal__/useLocale";

import { BoldButton, ItalicButton, ListControls } from "./buttons";

import SaveButton, { EditorFormattedValues } from "./buttons/save.component";

interface ToolbarProps {
  /** The namespace of the editor that this toolbar belongs to */
  namespace: string;
  /** Determines if the Text Editor has a header */
  hasHeader?: boolean;
  /** The callback to call when the cancel button is clicked */
  onCancel?: () => void;
  /** The callback to call when the save button is clicked */
  onSave?: (value: EditorFormattedValues) => void;
}

const Toolbar = ({ namespace, hasHeader, onCancel, onSave }: ToolbarProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();

  const toolbarRef = useRef<HTMLDivElement>(null);

  // Set the initial state of the formatting buttons
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [buttons, setButtons] = useState<HTMLButtonElement[]>([]);

  // If the UI updates, re-fetch the formatting buttons
  useLayoutEffect(() => {
    const formattingButtons = document.querySelectorAll(
      `[data-role="${namespace}-formatting-buttons"] button`,
    );
    setButtons(Array.from(formattingButtons) as HTMLButtonElement[]);
  }, [namespace]);

  // Get the locale to enable translations
  const locale = useLocale();

  // Update the toolbar based on the current selection
  const updateToolbar = useCallback(() => {
    // Get the current selection
    const selection = $getSelection();
    // If the selection is a range selection, update the formatting buttons
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat(TextEditorActionTypes.Bold));
      setIsItalic(selection.hasFormat(TextEditorActionTypes.Italic));
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

  // Register a keydown listener to enable keyboard navigation
  useEffect(() => {
    const tbRef = toolbarRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      // Get the current index of the active button
      const currentIndex = buttons.findIndex(
        (button) => button === document.activeElement,
      );

      // If the key pressed is the right arrow key, focus the next button
      /* istanbul ignore next */
      if (event.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex].focus();
        // If the key pressed is the left arrow key, focus the previous button
      } else if (event.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
      }
    };

    toolbarRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      tbRef?.removeEventListener("keydown", handleKeyDown);
    };
  }, [buttons]);

  return (
    <StyledToolbar
      role="toolbar"
      hasHeader={hasHeader}
      aria-label={locale.textEditor.toolbarAriaLabel()}
      data-role={`${namespace}-toolbar`}
      id={`${namespace}-toolbar`}
      onFocus={(e) => e.stopPropagation()}
      ref={toolbarRef}
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
            aria-label={locale.textEditor.cancelButtonAria()}
            onClick={() => onCancel?.()}
          >
            {locale.textEditor.cancelButton()}
          </Button>
        )}

        {onSave && <SaveButton namespace={namespace} onSave={onSave} />}
      </CommandButtons>
    </StyledToolbar>
  );
};

export default Toolbar;
