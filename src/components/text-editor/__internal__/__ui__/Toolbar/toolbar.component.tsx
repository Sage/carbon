import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
} from "lexical";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  StyledToolbar,
  CommandButtons,
  StyledToolbarWrapper,
} from "./toolbar.style";
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
import ButtonGroup from "./button-group/button-group.component";
import { ToolbarProps } from "../../__utils__/interfaces.types";
import { TEXT_EDITOR_ACTION_TYPES } from "../../__utils__/constants";
import Textbox from "../../../../textbox";
import { $createLinkNode } from "@lexical/link";
import Dialog from "../../../../dialog";
import Form from "../../../../form";

const Toolbar = ({
  contentEditorRef,
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
    "unordered-list",
    "ordered-list",
    "link",
  ],
}: ToolbarProps) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();

  const isEditable = editor.isEditable();

  const toolbarRef = useRef<HTMLDivElement>(null);

  // Set the initial state of the formatting buttons
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [hyperlinkDialogOpen, setHyperlinkDialogOpen] = useState(false);

  const [typographyDropdownOpen, setTypographyDropdownOpen] = useState(false);
  const [typographyDropdownFocusedIndex, setTypographyDropdownFocusedIndex] =
    useState(-1);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Get the locale to enable translations
  const locale = useLocale();

  const showTypographyFormattingSection =
    toolbarControls.includes("typography");
  const showTextFormattingSection =
    toolbarControls.includes("bold") ||
    toolbarControls.includes("italic") ||
    toolbarControls.includes("underline");
  const showListFormattingSection =
    toolbarControls.includes("unordered-list") ||
    toolbarControls.includes("ordered-list");
  const showHyperlinkFormattingSection = toolbarControls.includes("link");

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
    if (toolbarControls.length === 0 || !toolbarRef.current) return;

    const currentButtons: HTMLButtonElement[] = Array.from(
      toolbarRef.current?.querySelectorAll("button.toolbar-button"),
    );

    /* istanbul ignore if */
    if (!currentButtons.length) return;

    const currentIndex = currentButtons.findIndex(
      (button) => button.id === document.activeElement?.id,
    );

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        /* istanbul ignore else */
        if (!typographyDropdownOpen) {
          nextIndex =
            currentIndex < currentButtons.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        /* istanbul ignore else */
        if (!typographyDropdownOpen) {
          nextIndex =
            currentIndex > 0 ? currentIndex - 1 : currentButtons.length - 1;
        }
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
      button.tabIndex = index === nextIndex ? 0 : -1;
    });

    /* istanbul ignore else */
    if (nextIndex > -1) currentButtons[nextIndex]?.focus();
  };

  /** Omitted from coverage, tested in hyperlink button */
  /* istanbul ignore next */
  const resetDialog = () => {
    setLinkText("");
    setLinkUrl("");
    setHyperlinkDialogOpen(false);
  };

  /** Omitted from coverage, tested in hyperlink button */
  /* istanbul ignore next */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isEditable = editor.isEditable();
    /* istanbul ignore else */
    if (isEditable) {
      // Create a link node with the provided text and URL
      editor.update(() => {
        const root = $getRoot();
        const numberOfChildren = root.getChildrenSize();
        const selection = $getSelection();
        const linkNode = $createLinkNode(linkUrl);
        linkNode.append($createTextNode(linkText));

        if (numberOfChildren === 0) {
          // If there are no children, create a paragraph and append the link
          const paragraphNode = $createParagraphNode();
          paragraphNode.append(linkNode);
          root.append(paragraphNode);
          paragraphNode.selectEnd(); // move cursor after the inserted link
        } else {
          // If there are children, insert link at the current cursor position
          if ($isRangeSelection(selection)) {
            selection.insertNodes([linkNode]);
          } else {
            // Fallback: append to the last paragraph if selection is not available
            const last = root.getLastChild();
            if ($isParagraphNode(last)) {
              last.append(linkNode);
            }
          }
        }
      });

      resetDialog();
    }
  };

  if (!isEditable) return null;

  /* istanbul ignore next */
  const dialogSaveButtonEnabled = linkText.length && linkUrl.length;

  return (
    <StyledToolbarWrapper
      data-role={`${namespace}-toolbar-wrapper`}
      hasHeader={hasHeader}
      id={`${namespace}-toolbar-wrapper`}
      size={size}
    >
      <StyledToolbar
        role="toolbar"
        aria-label={locale.textEditor.toolbarAriaLabel()}
        data-role={`${namespace}-toolbar`}
        id={`${namespace}-toolbar`}
        ref={toolbarRef}
        onKeyDown={handleToolbarKeyDown}
        tabIndex={-1}
      >
        <>
          {showTypographyFormattingSection && (
            <ButtonGroup
              name={`typography-formatting-buttons`}
              namespace={namespace}
              showDivider={
                showTextFormattingSection ||
                showListFormattingSection ||
                showHyperlinkFormattingSection
              }
            >
              <TypographySelector
                contentEditorRef={contentEditorRef}
                namespace={namespace}
                isFirstButton
                isOpen={typographyDropdownOpen}
                setIsOpen={setTypographyDropdownOpen}
                focusedIndex={typographyDropdownFocusedIndex}
                setFocusedIndex={setTypographyDropdownFocusedIndex}
                size={size}
              />
            </ButtonGroup>
          )}
          {showTextFormattingSection && (
            <ButtonGroup
              name={`text-formatting-buttons`}
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
                  size={size}
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
                  size={size}
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
                  size={size}
                />
              )}
            </ButtonGroup>
          )}
          {showListFormattingSection && (
            <ButtonGroup
              name={`list-formatting-buttons`}
              namespace={namespace}
              showDivider={showHyperlinkFormattingSection}
            >
              <ListControls
                namespace={namespace}
                olIsFirstButton={
                  !showTypographyFormattingSection &&
                  !showTextFormattingSection &&
                  !toolbarControls.includes("unordered-list")
                }
                showOL={toolbarControls.includes("ordered-list")}
                showUL={toolbarControls.includes("unordered-list")}
                ulIsFirstButton={
                  !showTypographyFormattingSection && !showTextFormattingSection
                }
                size={size}
              />
            </ButtonGroup>
          )}
          {showHyperlinkFormattingSection && (
            <ButtonGroup
              name={`hyperlink-formatting-buttons`}
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
                setDialogOpen={setHyperlinkDialogOpen}
                size={size}
              />
            </ButtonGroup>
          )}
        </>

        <Dialog
          open={hyperlinkDialogOpen}
          onCancel={
            /* istanbul ignore next */ () => {
              resetDialog();
            }
          }
          title={locale.textEditor.hyperlink.dialogTitle()}
          data-role={`${namespace}-hyperlink-dialog`}
          aria-label={locale.textEditor.hyperlink.dialogTitle()}
          size="small"
        >
          <Form
            leftSideButtons={
              <Button
                data-role={`${namespace}-hyperlink-cancel-button`}
                onClick={
                  /* istanbul ignore next */ () => {
                    resetDialog();
                  }
                }
              >
                Cancel
              </Button>
            }
            saveButton={
              <Button
                buttonType="primary"
                type="submit"
                disabled={!dialogSaveButtonEnabled}
                data-role={`${namespace}-hyperlink-save-button`}
              >
                Save
              </Button>
            }
            onSubmit={handleSubmit}
          >
            <Textbox
              label={locale.textEditor.hyperlink.textFieldLabel()}
              name="text"
              required
              data-role={`${namespace}-hyperlink-text-field`}
              value={linkText}
              onChange={
                /* istanbul ignore next */ (e) => setLinkText(e.target.value)
              }
            />
            <Textbox
              label={locale.textEditor.hyperlink.linkFieldLabel()}
              name="link"
              required
              data-role={`${namespace}-hyperlink-link-field`}
              value={linkUrl}
              onChange={
                /* istanbul ignore next */ (e) => setLinkUrl(e.target.value)
              }
            />
          </Form>
        </Dialog>
      </StyledToolbar>

      <CommandButtons data-role={`${namespace}-command-buttons`}>
        {onCancel && (
          <Button
            buttonType="tertiary"
            data-role={`${namespace}-cancel-button`}
            aria-label={locale.textEditor.cancelButtonAria()}
            onClick={() => onCancel?.(editor)}
            size={size}
            className="command-button"
          >
            {locale.textEditor.cancelButton()}
          </Button>
        )}

        {onSave && (
          <SaveButton namespace={namespace} onSave={onSave} size={size} />
        )}
      </CommandButtons>
    </StyledToolbarWrapper>
  );
};

export default Toolbar;
