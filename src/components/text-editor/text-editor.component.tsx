import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { MarginProps } from "styled-system";
import {
  ContentState,
  EditorState,
  EditorCommand,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  Editor,
  DraftHandleValue,
} from "draft-js";
import {
  computeBlockType,
  getContent,
  getContentInfo,
  getDecoratedValue,
  getSelectedLength,
  moveSelectionToEnd,
  resetBlockType,
  isASCIIChar,
  replaceText,
  hasInlineStyle,
  hasBlockStyle,
  blockStyleFn,
} from "./__internal__/utils";
import {
  StyledEditorWrapper,
  StyledEditorOutline,
  StyledEditorContainer,
} from "./text-editor.style";
import ValidationWrapper from "./__internal__/editor-validation-wrapper";
import Toolbar from "./__internal__/toolbar";
import Label from "../../__internal__/label";
import Events from "../../__internal__/utils/helpers/events";
import guid from "../../__internal__/utils/helpers/guid";
import LabelWrapper from "./__internal__/label-wrapper";
import {
  BOLD,
  ITALIC,
  UNORDERED_LIST,
  ORDERED_LIST,
  InlineStyleType,
  BlockType,
} from "./types";
import { LinkPreviewProps } from "../link-preview";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import { ErrorBorder, StyledHintText } from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import Box from "../box";
import useCharacterCount from "../../hooks/__internal__/useCharacterCount";
import EditorContext from "./__internal__/editor.context";

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const INLINE_STYLES = [BOLD, ITALIC] as const;

export interface TextEditorProps extends MarginProps {
  /** The maximum characters that the input will accept */
  characterLimit?: number;
  /** The text for the editor's label */
  labelText: string;
  /** onChange callback to control value updates */
  onChange: (event: EditorState) => void;
  /** Additional elements to be rendered in the Editor Toolbar, e.g. Save and Cancel Button */
  toolbarElements?: React.ReactNode;
  /** The value of the input, this is an EditorState immutable object */
  value: EditorState;
  /** Flag to configure component as mandatory. */
  required?: boolean;
  /** Flag to configure component as optional. */
  isOptional?: boolean;
  /** Message to be displayed when there is an error */
  error?: string;
  /** Message to be displayed when there is a warning */
  warning?: string;
  /** [Legacy] Message to be displayed when there is an info */
  info?: string;
  /** Number greater than 2 multiplied by line-height (21px) to override the default min-height of the editor */
  rows?: number;
  /** The previews to display of any links added to the Editor */
  previews?: React.ReactNode;
  /** Callback to report a url when a link is added */
  onLinkAdded?: (url: string) => void;
  /** Hint text to be rendered when validationRedesignOptIn flag is set */
  inputHint?: string;
}

export const TextEditor = React.forwardRef<Editor, TextEditorProps>(
  (
    {
      characterLimit = 3000,
      labelText,
      onChange,
      value,
      required,
      error,
      warning,
      info,
      toolbarElements,
      rows,
      previews,
      onLinkAdded,
      inputHint,
      isOptional,
      ...rest
    }: TextEditorProps,
    ref
  ) => {
    const { validationRedesignOptIn } = useContext(NewValidationContext);
    const [isFocused, setIsFocused] = useState(false);
    const [inlines, setInlines] = useState<InlineStyleType[]>([]);
    const [activeInlines, setActiveInlines] = useState<
      Partial<Record<InlineStyleType, boolean>>
    >({});
    const [focusToolbar, setFocusToolbar] = useState(false);

    const editorRef = useRef<Editor>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const editor = ref || editorRef;
    const contentLength = getContent(value).getPlainText("").length;
    const moveCursor = useRef(contentLength > 0);
    const lastKeyPressed = useRef<null | string>();
    const inputHintId = useRef(`${guid()}-hint`);
    const { current: id } = useRef(guid());

    const { labelId, validationId, ariaDescribedBy } = useInputAccessibility({
      id,
      validationRedesignOptIn,
      error,
      warning,
      info,
      label: labelText,
    });

    const [characterCount, visuallyHiddenHintId] = useCharacterCount(
      getContent(value).getPlainText(""),
      characterLimit,
      isFocused ? "polite" : "off"
    );

    const combinedAriaDescribedBy = [
      ariaDescribedBy,
      inputHint ? inputHintId.current : undefined,
      visuallyHiddenHintId,
    ]
      .filter(Boolean)
      .join(" ");

    if (rows && (typeof rows !== "number" || rows < 2)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Prop rows must be a number value that is 2 or greater to override the min-height of the \`${TextEditor.displayName}\``
      );
    }

    const keyBindingFn = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (Events.isTabKey(ev) && !Events.isShiftKey(ev)) {
        setFocusToolbar(true);
      }

      return getDefaultKeyBinding(ev);
    };

    const BLOCK_TYPES = ["unordered-list-item", "ordered-list-item"];

    const handleKeyCommand = (command: EditorCommand) => {
      // bail out if the enter is pressed and limit has been reached
      if (command.includes("split-block") && contentLength === characterLimit) {
        return "handled";
      }

      // if the backspace or enter is pressed get block type and text
      if (command.includes("backspace") || command.includes("split-block")) {
        const { blockLength, blockType } = getContentInfo(value);

        // if a block control is active and there is no text, deactivate it and reset the block
        if (BLOCK_TYPES.includes(blockType) && !blockLength) {
          onChange(resetBlockType(value, "unstyled"));

          return "handled";
        }
      }

      const style = command.toUpperCase();

      // if formatting shortcut used eg. command is "bold" or "italic"
      if (style === BOLD || style === ITALIC) {
        const update = RichUtils.handleKeyCommand(value, command);

        // istanbul ignore else
        if (update) {
          onChange(update);
          setActiveInlines({
            ...activeInlines,
            [style]: !hasInlineStyle(value, style),
          });

          return "handled";
        }
      }

      return "not-handled";
    };

    const handleBeforeInput = (str: string, newState: EditorState) => {
      // short circuit if exceeds character limit
      if (contentLength >= characterLimit) {
        return "handled";
      }

      setActiveInlines({});

      // there is a bug in how DraftJS handles the macOS double-space-period feature, this is added to catch this and
      // prevent the editor from crashing until a fix can be added to their codebase
      if (lastKeyPressed.current === " " && !isASCIIChar(str)) {
        lastKeyPressed.current = null;
        onChange(replaceText(newState, " ", newState.getCurrentInlineStyle()));

        return "handled";
      }

      if (str === " ") {
        lastKeyPressed.current = str;

        return "not-handled";
      }

      lastKeyPressed.current = null;
      // short circuit if str does not match expected chars
      if (![".", "*"].includes(str)) {
        return "not-handled";
      }

      const { blockType, blockLength, blockText } = getContentInfo(value);

      if (
        (blockLength === 1 && NUMBERS.includes(blockText) && str === ".") ||
        (blockLength === 0 && str === "*")
      ) {
        const newBlockType = computeBlockType(str, blockType);
        const hasNumberList = hasBlockStyle(value, ORDERED_LIST);
        const hasBulletList = hasBlockStyle(value, UNORDERED_LIST);

        if (
          BLOCK_TYPES.includes(newBlockType) &&
          !hasNumberList &&
          !hasBulletList
        ) {
          onChange(resetBlockType(value, newBlockType));
          setActiveInlines({
            BOLD: hasInlineStyle(value, BOLD),
            ITALIC: hasInlineStyle(value, ITALIC),
          });

          return "handled";
        }
      }
      onChange(value);

      return "not-handled";
    };

    const handlePastedText = (pastedText: string) => {
      const selectedTextLength = getSelectedLength(value);
      const newLength = contentLength + pastedText?.length - selectedTextLength;
      // if the pastedText will exceed the limit trim the excess
      if (newLength > characterLimit) {
        const newContentState = Modifier.insertText(
          getContent(value),
          value.getSelection(),
          pastedText.substring(0, characterLimit - contentLength)
        );
        const newState = EditorState.push(
          value,
          newContentState,
          "insert-fragment"
        );

        onChange(newState);

        return "handled";
      }

      setActiveInlines({});

      return "not-handled";
    };

    const getEditorState = () => {
      let editorState = getDecoratedValue(value);

      // should the cursor position be forced to the end of the content
      if (contentLength > 0 && moveCursor.current && isFocused) {
        editorState = moveSelectionToEnd(editorState);
        moveCursor.current = false;
      }

      return editorState;
    };

    const editorState = getEditorState();

    const activeControls = {
      BOLD:
        activeInlines.BOLD !== undefined
          ? activeInlines.BOLD
          : hasInlineStyle(editorState, BOLD),
      ITALIC:
        activeInlines.ITALIC !== undefined
          ? activeInlines.ITALIC
          : hasInlineStyle(editorState, ITALIC),
      "unordered-list-item": hasBlockStyle(editorState, UNORDERED_LIST),
      "ordered-list-item": hasBlockStyle(editorState, ORDERED_LIST),
    };

    const handleEditorFocus = useCallback(
      (focusValue: boolean) => {
        moveCursor.current = true;

        if (
          focusValue &&
          typeof editor === "object" &&
          editor.current !== document.activeElement
        ) {
          editor.current?.focus();
          setFocusToolbar(false);
        }
        setIsFocused(focusValue);
      },
      [editor]
    );

    const handleInlineStyleChange = (
      ev:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
      style: InlineStyleType
    ) => {
      ev.preventDefault();
      setActiveInlines({
        ...activeInlines,
        [style]: !hasInlineStyle(value, style),
      });
      handleEditorFocus(true);
      setInlines([...inlines, style]);
    };

    const handleBlockStyleChange = (
      ev:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.KeyboardEvent<HTMLButtonElement>,
      newBlockType: BlockType
    ) => {
      ev.preventDefault();
      handleEditorFocus(true);
      onChange(RichUtils.toggleBlockType(value, newBlockType));
      const temp: InlineStyleType[] = [];
      INLINE_STYLES.forEach((style) => {
        if (activeInlines[style] !== undefined) {
          temp.push(style);
        }
      });
      setInlines(temp);
    };

    useEffect(() => {
      // apply the inline styling, having it run in as an effect ensures that styles can be added
      // even when the editor is not focused
      INLINE_STYLES.forEach((style) => {
        const preserveStyle =
          activeInlines[style] !== undefined &&
          activeInlines[style] !== hasInlineStyle(value, style);

        if (
          (preserveStyle && value.getSelection().isCollapsed()) ||
          (isFocused && inlines.includes(style))
        ) {
          onChange(RichUtils.toggleInlineStyle(value, style));
          setInlines(inlines.filter((inline) => inline !== style));
        }
        if (preserveStyle && !value.getSelection().isCollapsed()) {
          setActiveInlines({ ...activeInlines, [style]: undefined });
        }
      });
    }, [
      activeInlines,
      contentLength,
      editorState,
      inlines,
      isFocused,
      onChange,
      value,
    ]);

    const handlePreviewClose = (
      onClose: (url: string) => void,
      url?: string
    ) => {
      // istanbul ignore else
      if (url) onClose(url);

      // istanbul ignore else
      if (typeof editor === "object") {
        editor.current?.focus();
      }
    };

    useEffect(() => {
      if (required) {
        const editableElement = wrapper.current?.querySelector(
          "div[contenteditable='true']"
        );
        editableElement?.setAttribute("required", "");
        editableElement?.setAttribute("aria-required", "true");
      }
    }, [required]);

    return (
      <EditorContext.Provider value={{ onLinkAdded, editMode: true }}>
        <StyledEditorWrapper
          ref={wrapper}
          data-role="text-editor-wrapper"
          {...rest}
        >
          <LabelWrapper onClick={() => handleEditorFocus(true)}>
            <Label
              labelId={labelId}
              isRequired={required}
              optional={isOptional}
            >
              {labelText}
            </Label>
          </LabelWrapper>
          {inputHint && (
            <StyledHintText id={inputHintId.current}>
              {inputHint}
            </StyledHintText>
          )}
          <Box position="relative">
            {validationRedesignOptIn && (
              <>
                <ValidationMessage
                  error={error}
                  validationId={validationId}
                  warning={warning}
                />
                {(error || warning) && (
                  <ErrorBorder warning={!!(!error && warning)} />
                )}
              </>
            )}
            <StyledEditorOutline
              isFocused={isFocused}
              hasError={!!error}
              data-role="editor-outline"
            >
              <StyledEditorContainer
                data-component="text-editor-container"
                hasError={!!error}
                rows={rows}
                hasPreview={!!React.Children.count(previews)}
              >
                {!validationRedesignOptIn && (error || warning || info) && (
                  <ValidationWrapper
                    error={error}
                    warning={warning}
                    info={info}
                  />
                )}
                <Editor
                  ref={editor}
                  onFocus={() => handleEditorFocus(true)}
                  onBlur={() => handleEditorFocus(false)}
                  editorState={editorState}
                  onChange={onChange}
                  handleBeforeInput={
                    handleBeforeInput as (
                      chars: string,
                      state: EditorState
                    ) => DraftHandleValue
                  }
                  handlePastedText={handlePastedText}
                  handleKeyCommand={
                    handleKeyCommand as (
                      command: EditorCommand
                    ) => DraftHandleValue
                  }
                  ariaLabelledBy={labelId}
                  ariaDescribedBy={combinedAriaDescribedBy}
                  blockStyleFn={blockStyleFn}
                  keyBindingFn={keyBindingFn}
                  tabIndex={0}
                />
                {React.Children.map(previews, (preview) => {
                  if (React.isValidElement<LinkPreviewProps>(preview)) {
                    const { onClose } = preview?.props;
                    return React.cloneElement(preview, {
                      as: "div",
                      onClose: onClose
                        ? (url?: string) => handlePreviewClose(onClose, url)
                        : undefined,
                    });
                  }
                  return null;
                })}
                <Toolbar
                  setBlockStyle={(ev, newBlockType) =>
                    handleBlockStyleChange(ev, newBlockType)
                  }
                  setInlineStyle={(ev, inlineStyle) =>
                    handleInlineStyleChange(ev, inlineStyle)
                  }
                  activeControls={activeControls}
                  canFocus={focusToolbar}
                  toolbarElements={toolbarElements}
                />
              </StyledEditorContainer>
            </StyledEditorOutline>
            {characterCount}
          </Box>
        </StyledEditorWrapper>
      </EditorContext.Provider>
    );
  }
);

export const TextEditorState = EditorState;
export const TextEditorContentState = ContentState;

export default TextEditor;
