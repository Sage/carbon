import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import {
  ContentState,
  EditorState,
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
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
import Counter from "./__internal__/editor-counter";
import Toolbar from "./__internal__/toolbar";
import Label from "../../__internal__/label";
import Events from "../../__internal__/utils/helpers/events";
import createGuid from "../../__internal__/utils/helpers/guid";
import LabelWrapper from "./__internal__/label-wrapper";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const INLINE_STYLES = ["BOLD", "ITALIC"];
const BLOCK_TYPES = ["unordered-list-item", "ordered-list-item"];

export const EditorContext = React.createContext({});

const TextEditor = React.forwardRef(
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
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inlines, setInlines] = useState([]);
    const [activeInlines, setActiveInlines] = useState({});
    const [focusToolbar, setFocusToolbar] = useState(false);

    const editorRef = useRef();
    const editor = ref || editorRef;
    const contentLength = getContent(value).getPlainText("").length;
    const moveCursor = useRef(contentLength > 0);
    const lastKeyPressed = useRef();
    const labelId = useRef(`text-editor-label-${createGuid()}`);

    const keyBindingFn = (ev) => {
      if (Events.isTabKey(ev) && !Events.isShiftKey(ev)) {
        setFocusToolbar(true);
      }

      return getDefaultKeyBinding(ev);
    };

    const handleKeyCommand = (command) => {
      // bail out if the enter is pressed and limit has been reached
      if (command.includes("split-block") && contentLength === characterLimit) {
        return "handled";
      }

      // if the backspace or enter is pressed get block type and text
      if (command.includes("backspace") || command.includes("split-block")) {
        const { blockType, blockLength } = getContentInfo(value);

        // if a block control is active and there is no text, deactivate it and reset the block
        if (BLOCK_TYPES.includes(blockType) && !blockLength) {
          onChange(resetBlockType(value, "unstyled"));

          return true;
        }
      }

      const style = command.toUpperCase();

      // if formatting shortcut used eg. command is "bold" or "italic"
      if (INLINE_STYLES.includes(style)) {
        onChange(RichUtils.handleKeyCommand(value, command));
        setActiveInlines({
          ...activeInlines,
          [style]: !hasInlineStyle(value, style),
        });

        return true;
      }

      return false;
    };

    const handleBeforeInput = (str, newState) => {
      // short circuit if exceeds character limit
      if (contentLength >= characterLimit) {
        return "handled";
      }

      setActiveInlines({});

      // there is a bug in how DraftJS handles the macOS double-space-period feature, this is added to catch this and
      // prevent the editor from crashing until a fix can be added to their codebase
      if (lastKeyPressed.current === " " && !isASCIIChar(str)) {
        lastKeyPressed.current = null;
        onChange(
          replaceText(newState, " ", newState.getCurrentInlineStyle(), true)
        );

        return "handled";
      }

      if (str === " ") {
        lastKeyPressed.current = str;

        return false;
      }

      lastKeyPressed.current = null;
      // short circuit if str does not match expected chars
      if (![".", "*"].includes(str)) {
        return false;
      }

      const { blockType, blockLength, blockText } = getContentInfo(value);

      if (
        (blockLength === 1 && NUMBERS.includes(blockText) && str === ".") ||
        (blockLength === 0 && str === "*")
      ) {
        const newBlockType = computeBlockType(str, blockType);
        const hasNumberList = hasBlockStyle(value, BLOCK_TYPES[0]);
        const hasBulletList = hasBlockStyle(value, BLOCK_TYPES[1]);

        if (
          BLOCK_TYPES.includes(newBlockType) &&
          !hasNumberList &&
          !hasBulletList
        ) {
          onChange(resetBlockType(value, newBlockType));
          setActiveInlines({
            BOLD: hasInlineStyle(value, INLINE_STYLES[0]),
            ITALIC: hasInlineStyle(value, INLINE_STYLES[1]),
          });

          return true;
        }
      }
      onChange(value);

      return false;
    };

    const handlePastedText = (pastedText) => {
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
          : hasInlineStyle(editorState, INLINE_STYLES[0]),
      ITALIC:
        activeInlines.ITALIC !== undefined
          ? activeInlines.ITALIC
          : hasInlineStyle(editorState, INLINE_STYLES[1]),
      "unordered-list-item": hasBlockStyle(editorState, BLOCK_TYPES[0]),
      "ordered-list-item": hasBlockStyle(editorState, BLOCK_TYPES[1]),
    };

    const handleEditorFocus = useCallback(
      (focusValue) => {
        moveCursor.current = true;
        setIsFocused(focusValue);

        if (
          !isFocused &&
          focusValue &&
          editor.current !== document.activeElement
        ) {
          editor.current.focus();
          setFocusToolbar(false);
        }
      },
      [editor, isFocused]
    );

    const handleInlineStyleChange = (ev, style) => {
      ev.preventDefault();
      setActiveInlines({
        ...activeInlines,
        [style]: !hasInlineStyle(value, style),
      });
      handleEditorFocus(true);
      setInlines([...inlines, style]);
    };

    const handleBlockStyleChange = (ev, newBlockType) => {
      ev.preventDefault();
      handleEditorFocus(true);
      onChange(RichUtils.toggleBlockType(value, newBlockType));
      const temp = [];
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

    const handlePreviewClose = (onClose, url) => {
      onClose(url);
      editor.current.focus();
    };

    return (
      <EditorContext.Provider value={{ onLinkAdded, editMode: true }}>
        <StyledEditorWrapper {...rest}>
          <LabelWrapper onClick={() => handleEditorFocus(true)}>
            <Label labelId={labelId.current} isRequired={required}>
              {labelText}
            </Label>
          </LabelWrapper>
          <StyledEditorOutline isFocused={isFocused} hasError={!!error}>
            <StyledEditorContainer
              data-component="text-editor-container"
              ariaLabelledBy={labelId.current}
              hasError={!!error}
              rows={rows}
              hasPreview={!!React.Children.count(previews)}
            >
              <Counter
                limit={characterLimit}
                count={contentLength}
                error={error}
                warning={warning}
                info={info}
              />
              <Editor
                ref={editor}
                onFocus={() => handleEditorFocus(true)}
                onBlur={() => handleEditorFocus(false)}
                editorState={editorState}
                onChange={onChange}
                handleBeforeInput={handleBeforeInput}
                handlePastedText={handlePastedText}
                handleKeyCommand={handleKeyCommand}
                ariaLabelledBy={labelId.current}
                ariaDescribedBy={labelId.current}
                blockStyleFn={blockStyleFn}
                keyBindingFn={keyBindingFn}
              />
              {React.Children.map(previews, (preview) => {
                const { onClose } = preview.props;
                return React.cloneElement(preview, {
                  as: "div",
                  onClose: onClose
                    ? (url) => handlePreviewClose(onClose, url)
                    : undefined,
                });
              })}
              <Toolbar
                setBlockStyle={(ev, newBlockType) =>
                  handleBlockStyleChange(ev, newBlockType)
                }
                setInlineStyle={(ev, inlineStyle, keyboardUsed) =>
                  handleInlineStyleChange(ev, inlineStyle, keyboardUsed)
                }
                editorState={editorState}
                activeControls={activeControls}
                canFocus={focusToolbar}
                toolbarElements={toolbarElements}
              />
            </StyledEditorContainer>
          </StyledEditorOutline>
        </StyledEditorWrapper>
      </EditorContext.Provider>
    );
  }
);

TextEditor.propTypes = {
  ...marginPropTypes,
  /** The maximum characters that the input will accept */
  characterLimit: PropTypes.number,
  /** The text for the editor's label */
  labelText: PropTypes.string.isRequired,
  /** onChange callback to control value updates */
  onChange: PropTypes.func.isRequired,
  /** The value of the input, this is an EditorState immutable object */
  value: PropTypes.object.isRequired,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Message to be displayed when there is an error */
  error: PropTypes.string,
  /** Message to be displayed when there is a warning */
  warning: PropTypes.string,
  /** Message to be displayed when there is an info */
  info: PropTypes.string,
  /** Additional elements to be rendered in the Editor Toolbar, e.g. Save and Cancel Button */
  toolbarElements: PropTypes.node,
  /** Number greater than 2 multiplied by line-height (21px) to override the default min-height of the editor */
  rows: (props, propName, component) => {
    if (
      props[propName] &&
      (typeof props[propName] !== "number" || props[propName] < 2)
    ) {
      return new Error(
        `Prop \`${propName}\` must be a number value greater than 2 to override the min-height of the \`${component}\``
      );
    }

    return null;
  },
  /** The previews to display of any links added to the Editor */
  previews: PropTypes.arrayOf(PropTypes.node),
  /** Callback to report a url when a link is added */
  onLinkAdded: PropTypes.func,
};

export const TextEditorState = EditorState;
export const TextEditorContentState = ContentState;

export default TextEditor;
