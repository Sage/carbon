import React, {
  useCallback, useEffect, useState, useReducer, useRef
} from 'react';
import PropTypes from 'prop-types';
import {
  EditorState,
  Editor,
  RichUtils
} from 'draft-js';
import { computeBlockType, resetBlockType } from './utils';
import decorators from './decorators';
import { StyledEditorWrapper, StyledEditorContainer } from './text-editor.style';
import Toolbar from './toolbar';
import Counter from './editor-counter';

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// return mutated editorState with decorators added
const getDecoratedValue = value => EditorState.set(value, { decorator: decorators });

function activeControlsReducer(activeControls, controlId) {
  if (activeControls[controlId] || !['unordered-list-item', 'ordered-list-item'].includes(controlId)) {
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
  onChange,
  onCancel,
  onSubmit,
  placeholder,
  value
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hadText, setHadText] = useState(false);
  const [activeControls, setActiveControls] = useReducer(activeControlsReducer, {});
  const [inlineStyles, setInlineStyles] = useState([]);
  const editor = ref || useRef();

  useEffect(() => {
    // iterate over the list of inlineStyles and apply them
    inlineStyles.forEach((inlineStyle) => {
      onChange(RichUtils.toggleInlineStyle(value, inlineStyle));
      // clean up style so it isn't toggled again with next onChange event
      setInlineStyles([...inlineStyles.filter(style => style !== inlineStyle)]);
    });
  }, [value, onChange, inlineStyles]);

  const updateActiveControls = useCallback((controlId) => {
    setActiveControls(controlId);
  }, []);

  function handleKeyCommand(command) {
    // if the backspace or enter is pressed get block type and text
    if (command.includes('backspace') || command.includes('split-block')) {
      const selection = value.getSelection();
      const content = value.getCurrentContent();
      const currentBlock = content.getBlockForKey(selection.getStartKey());
      const blockType = currentBlock.getType();
      const blockLength = currentBlock.getText();

      // if a block control is active and there is no text, deactivate it
      if (['unordered-list-item', 'ordered-list-item'].includes(blockType) && !blockLength) {
        setActiveControls({ ...activeControls, [blockType]: false });
      }
    }

    const newState = RichUtils.handleKeyCommand(value, command);

    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  function handleBeforeInput(str) {
    // short circuit if str does not match expected chars
    if (!['.', '*'].includes(str)) {
      return false;
    }

    const selection = value.getSelection();
    const content = value.getCurrentContent();
    const currentBlock = content.getBlockForKey(selection.getStartKey());
    const blockType = currentBlock.getType();
    const blockLength = currentBlock.getLength();
    const text = currentBlock.getText();

    if ((blockLength === 1 && NUMBERS.includes(text)) || (blockLength === 0 && str === '*')) {
      onChange(resetBlockType(value, computeBlockType(str, blockType)));
      return true;
    }
    return false;
  }

  const handleInlineStyleChange = (inlineStyle) => {
    editor.current.focus();
    setInlineStyles([...inlineStyles, inlineStyle]);
  };

  const handleBlockStyleChange = (blockType) => {
    editor.current.focus();
    const newState = RichUtils.toggleBlockType(value, blockType);

    if (newState) {
      onChange(newState);
    }
  };

  useEffect(() => {
    if (value.getCurrentContent().getPlainText().length && !hadText) {
      setHadText(true);
    }
  }, [hadText, value]);

  useEffect(() => {
    if (!value.getCurrentContent().getPlainText().length && hadText) {
      setHadText(false);

      Object.keys(activeControls)
        .filter(id => !['unordered-list-item', 'ordered-list-item'].includes(id))
        .forEach(style => onChange(RichUtils.toggleInlineStyle(value, style)));
    }
  }, [activeControls, hadText, onChange, value]);

  const contentLength = value.getCurrentContent().getPlainText('').length;
  const showPlaceholder = (
    !activeControls['unordered-list-item'] && !activeControls['ordered-list-item'] && contentLength === 0
  );

  return (
    <StyledEditorWrapper>
      <StyledEditorContainer
        data-component='text-editor-container'
        onClick={ () => {
          setIsFocused(true);
          editor.current.focus();
        } }
        isFocused={ isFocused }
        showPlaceholder={ showPlaceholder }
      >
        <Counter limit={ charLimit } contentLength={ contentLength } />

        <Editor
          ref={ editor }
          onFocus={ () => setIsFocused(true) }
          onBlur={ () => setIsFocused(false) }
          editorState={ getDecoratedValue(value) }
          onChange={ onChange }
          placeholder={ showPlaceholder ? placeholder : undefined }
          handleBeforeInput={ handleBeforeInput }
          handleKeyCommand={ handleKeyCommand }
        />
        <Toolbar
          onSubmit={ onSubmit }
          onCancel={ onCancel }
          setBlockStyle={ blockType => handleBlockStyleChange(blockType) }
          setInlineStyle={ inlineStyle => handleInlineStyleChange(inlineStyle) }
          isDisabled={ value.getCurrentContent().getPlainText().length === 0 }
          activeControls={ activeControls }
          updateActiveControls={ updateActiveControls }
        />
      </StyledEditorContainer>
    </StyledEditorWrapper>
  );
});

TextEditor.propTypes = {
  charLimit: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.object.isRequired
};

TextEditor.defaultProps = {
  placeholder: 'Leave a comment...'
};

export const TextEditorState = EditorState;

export default TextEditor;
