import React, {
  useCallback, useEffect, useReducer, useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import {
  EditorState,
  Editor,
  RichUtils
} from 'draft-js';
import {
  computeBlockType, getContent, getContentInfo, getDecoratedValue, getSelection, resetBlockType
} from './utils';
import { StyledEditorWrapper, StyledEditorContainer } from './text-editor.style';
import Counter from './editor-counter';
import Toolbar from './toolbar';
import Label from '../../__experimental__/components/label';
import createGuid from '../../utils/helpers/guid';

const GUID = createGuid();
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const INLINE_STYLES = ['BOLD', 'ITALIC'];
const BLOCK_TYPES = ['unordered-list-item', 'ordered-list-item'];

function activeControlsReducer(activeControls, controlId) {
  if (activeControls[controlId] || !BLOCK_TYPES.includes(controlId)) {
    return { ...activeControls, [controlId]: !activeControls[controlId] };
  } if (controlId === 'unordered-list-item' && activeControls['ordered-list-item']) {
    return { ...activeControls, [controlId]: !activeControls[controlId], 'ordered-list-item': false };
  } if (controlId === 'ordered-list-item' && activeControls['unordered-list-item']) {
    return { ...activeControls, [controlId]: !activeControls[controlId], 'unordered-list-item': false };
  }

  return { ...activeControls, [controlId]: !activeControls[controlId] };
}

const TextEditor = React.forwardRef(({
  charLimit,
  label,
  onChange,
  onCancel,
  onSubmit,
  value
}, ref) => {
  const [activeControls, setActiveControls] = useReducer(activeControlsReducer, {
    BOLD: false,
    ITALIC: false,
    'unordered-list-item': false,
    'ordered-list-item': false
  });
  const [isFocused, setIsFocused] = useState(false);
  const editor = ref || useRef();
  const contentLength = getContent(value).getPlainText('').length;

  const updateActiveControls = useCallback((controlId) => {
    setActiveControls(controlId);
  }, []);

  function handleKeyCommand(command) {
    // if the backspace or enter is pressed get block type and text
    if (command.includes('backspace') || command.includes('split-block')) {
      const { blockType, blockLength } = getContentInfo(value);

      // if a block control is active and there is no text, deactivate it and reset the block
      if (BLOCK_TYPES.includes(blockType) && !blockLength) {
        updateActiveControls(blockType);
        onChange(resetBlockType(value, 'unstyled'));

        return true;
      }
    }

    // if formatting shortcut used eg. command is "bold" or "italic"
    if (INLINE_STYLES.includes(command.toUpperCase())) {
      updateActiveControls(command.toUpperCase());
      onChange(RichUtils.handleKeyCommand(value, command));

      return true;
    }
    return false;
  }

  function handleBeforeInput(str) {
    // short circuit if str does not match expected chars
    if (!['.', '*'].includes(str)) {
      return false;
    }

    const { blockType, blockLength, blockText } = getContentInfo(value);

    if ((blockLength === 1 && NUMBERS.includes(blockText) && str === '.') || (blockLength === 0 && str === '*')) {
      const newBlockType = computeBlockType(str, blockType);

      if (BLOCK_TYPES.includes(newBlockType) && !activeControls[BLOCK_TYPES[0]] && !activeControls[BLOCK_TYPES[1]]) {
        onChange(resetBlockType(value, newBlockType));
        updateActiveControls(newBlockType);

        return true;
      }
    }
    onChange(value);

    return false;
  }

  const handleInlineStyleChange = (inlineType) => {
    onChange(RichUtils.toggleInlineStyle(value, inlineType));
    updateActiveControls(inlineType);
  };

  const handleBlockStyleChange = (blockType) => {
    onChange(RichUtils.toggleBlockType(value, blockType));
    updateActiveControls(blockType);
  };

  const handleEditorFocus = (focusValue) => {
    setIsFocused(focusValue);
  };

  useEffect(() => {
    function hasNoSelection() {
      const selection = getSelection(value);
      const selectionStart = selection.getStartOffset();
      const selectionEnd = selection.getEndOffset();

      return selectionStart === selectionEnd;
    }

    // add any inline styles that are active
    INLINE_STYLES.forEach((style) => {
      if (hasNoSelection() && value.getCurrentInlineStyle().has(style) !== activeControls[style]) {
        onChange(RichUtils.toggleInlineStyle(value, style));
      }
    });

    function hasBlockStyle(type) {
      const { blockType } = getContentInfo(value);
      return blockType === type;
    }

    // ensures block controls are activated
    BLOCK_TYPES.forEach((type) => {
      if (hasBlockStyle(type) && !activeControls[type]) {
        updateActiveControls(type);
      }
    });
  }, [activeControls, onChange, updateActiveControls, value]);

  const editorState = getDecoratedValue(value);

  // const editorState = isFocused && contentLength ? moveSelectionToEnd(value) : getDecoratedValue(value);

  const editorLabel = label || <Label labelId={ `carbon-text-editor-label-${GUID}` }>{ GUID }</Label>;

  const { labelId } = editorLabel.props;

  return (
    <StyledEditorWrapper hideLabel={ !label } ariaLabelledBy={ labelId }>
      { editorLabel }
      <StyledEditorContainer
        data-component='text-editor-container'
        onClick={ () => {
          handleEditorFocus(true);
          editor.current.focus();
        } }
        isFocused={ isFocused }
        ariaLabelledBy={ labelId }
      >
        <Counter limit={ charLimit } count={ contentLength } />
        <Editor
          ref={ editor }
          onFocus={ () => handleEditorFocus(true) }
          onBlur={ () => handleEditorFocus(false) }
          editorState={ editorState }
          onChange={ onChange }
          handleBeforeInput={ handleBeforeInput }
          handleKeyCommand={ handleKeyCommand }
          ariaLabelledBy={ labelId }
          ariaDescribedBy={ labelId }
        />
        <Toolbar
          onSubmit={ onSubmit }
          onCancel={ onCancel }
          setBlockStyle={ blockType => handleBlockStyleChange(blockType) }
          setInlineStyle={ inlineStyle => handleInlineStyleChange(inlineStyle) }
          isDisabled={ contentLength === 0 }
          activeControls={ activeControls }
          updateActiveControls={ updateActiveControls }
        />
      </StyledEditorContainer>
    </StyledEditorWrapper>
  );
});

TextEditor.propTypes = {
  charLimit: PropTypes.number,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.object.isRequired
};

export const TextEditorState = EditorState;

export default TextEditor;
