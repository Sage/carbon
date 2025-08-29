import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection } from "lexical";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { StyledToolbar, CommandButtons } from "./toolbar.style";
import Button from "../../../../button";
import useLocale from "../../../../../hooks/__internal__/useLocale";

import {
  BoldButton,
  HyperlinkButton,
  ItalicButton,
  ListControls,
  TypographySelector,
  UnderlineButton,
} from "./buttons";

import SaveButton from "./buttons/save.component";
import ButtonGroup from "./button-group/button-group";
import { ToolbarProps } from "../../__utils__/interfaces";
import { TEXT_EDITOR_ACTION_TYPES } from "../../__utils__/constants";

const Toolbar = ({
  namespace,
  hasHeader,
  onCancel,
  onSave,
  size = "medium",
  toolbarControls = [
    "typography",
    "bold",
    "italic",
    "underline",
    "unordered_list",
    "ordered_list",
    "link",
  ],
}: ToolbarProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();

  const toolbarRef = useRef<HTMLDivElement>(null);

  // Set the initial state of the formatting buttons
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [hyperlinkDialogOpen, setHyperlinkDialogOpen] = useState(false);

  const [typographyDropdownOpen, setTypographyDropdownOpen] = useState(false);
  const [typographyDropdownFocusedIndex, setTypographyDropdownFocusedIndex] =
    useState(-1);

  // Get the locale to enable translations
  const locale = useLocale();

  // Update the toolbar based on the current selection
  const updateToolbar = useCallback(() => {
    // Get the current selection
    const selection = $getSelection();
    // If the selection is a range selection, update the formatting buttons
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat(TEXT_EDITOR_ACTION_TYPES.Bold));
      setIsItalic(selection.hasFormat(TEXT_EDITOR_ACTION_TYPES.Italic));
      setIsUnderline(selection.hasFormat(TEXT_EDITOR_ACTION_TYPES.Underline));
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
  const handleToolbarKeyDown = (event: React.KeyboardEvent) => {
    const currentButtons = Array.from(
      toolbarRef.current?.querySelectorAll(
        'button[role="button"].toolbar-button, button.toolbar-button',
      ) || [],
    ) as HTMLButtonElement[];

    if (!currentButtons.length) return;

    const currentIndex = currentButtons.findIndex(
      (button) => button.id === document.activeElement?.id,
    );

    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        nextIndex =
          currentIndex < currentButtons.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowLeft":
        event.preventDefault();
        nextIndex =
          currentIndex > 0 ? currentIndex - 1 : currentButtons.length - 1;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = currentButtons.length - 1;
        break;
      default:
        return;
    }

    // Update tabIndex and focus
    currentButtons.forEach((button, index) => {
      (button as HTMLButtonElement).tabIndex = index === nextIndex ? 0 : -1;
    });

    (currentButtons[nextIndex] as HTMLButtonElement)?.focus();
  };

  const ControlList = () => {
    const showTypographyFormattingSection =
      toolbarControls.includes("typography");
    const showTextFormattingSection =
      toolbarControls.includes("bold") ||
      toolbarControls.includes("italic") ||
      toolbarControls.includes("underline");
    const showListFormattingSection =
      toolbarControls.includes("unordered_list") ||
      toolbarControls.includes("ordered_list");
    const showHyperlinkFormattingSection = toolbarControls.includes("link");

    return (
      <>
        {showTypographyFormattingSection && (
          <ButtonGroup
            name={`${namespace}-typography-formatting-buttons`}
            namespace={namespace}
            showDivider={
              showTextFormattingSection ||
              showListFormattingSection ||
              showHyperlinkFormattingSection
            }
          >
            <TypographySelector
              namespace={namespace}
              isFirstButton
              isOpen={typographyDropdownOpen}
              setIsOpen={setTypographyDropdownOpen}
              focusedIndex={typographyDropdownFocusedIndex}
              setFocusedIndex={setTypographyDropdownFocusedIndex}
            />
          </ButtonGroup>
        )}
        {showTextFormattingSection && (
          <ButtonGroup
            name={`${namespace}-text-formatting-buttons`}
            namespace={namespace}
            showDivider={
              showListFormattingSection || showHyperlinkFormattingSection
            }
          >
            {toolbarControls.includes("bold") && (
              <BoldButton
                isActive={isBold}
                namespace={namespace}
                isFirstButton={!showTypographyFormattingSection}
              />
            )}
            {toolbarControls.includes("italic") && (
              <ItalicButton
                isActive={isItalic}
                namespace={namespace}
                isFirstButton={
                  !showTypographyFormattingSection &&
                  !toolbarControls.includes("bold")
                }
              />
            )}
            {toolbarControls.includes("underline") && (
              <UnderlineButton
                isActive={isUnderline}
                namespace={namespace}
                isFirstButton={
                  !showTypographyFormattingSection &&
                  !toolbarControls.includes("bold") &&
                  !toolbarControls.includes("italic")
                }
              />
            )}
          </ButtonGroup>
        )}
        {showListFormattingSection && (
          <ButtonGroup
            name={`${namespace}-list-formatting-buttons`}
            namespace={namespace}
            showDivider={showHyperlinkFormattingSection}
          >
            <ListControls
              namespace={namespace}
              olIsFirstButton={
                !showTypographyFormattingSection &&
                !showTextFormattingSection &&
                !toolbarControls.includes("unordered_list")
              }
              showOL={toolbarControls.includes("ordered_list")}
              showUL={toolbarControls.includes("unordered_list")}
              ulIsFirstButton={
                !showTypographyFormattingSection && !showTextFormattingSection
              }
            />
          </ButtonGroup>
        )}
        {showHyperlinkFormattingSection && (
          <ButtonGroup
            name={`${namespace}-hyperlink-formatting-buttons`}
            namespace={namespace}
            showDivider={false}
          >
            <HyperlinkButton
              namespace={namespace}
              isFirstButton={
                !showTypographyFormattingSection &&
                !showTextFormattingSection &&
                !showListFormattingSection
              }
              dialogOpen={hyperlinkDialogOpen}
              setDialogOpen={setHyperlinkDialogOpen}
            />
          </ButtonGroup>
        )}
      </>
    );
  };

  return (
    <StyledToolbar
      role="toolbar"
      hasHeader={hasHeader}
      aria-label={locale.textEditor.toolbarAriaLabel()}
      data-role={`${namespace}-toolbar`}
      id={`${namespace}-toolbar`}
      ref={toolbarRef}
      size={size}
      onKeyDown={handleToolbarKeyDown}
      tabIndex={-1}
    >
      <ControlList />

      <CommandButtons data-role={`${namespace}-command-buttons`}>
        {onCancel && (
          <Button
            buttonType="tertiary"
            data-role={`${namespace}-cancel-button`}
            aria-label={locale.textEditor.cancelButtonAria()}
            onClick={() => onCancel?.(editor)}
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
