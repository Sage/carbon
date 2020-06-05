import React, {
  useEffect, useState, useRef
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

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// return mutated editorState with decorators added
const getDecoratedValue = value => EditorState.set(value, { decorator: decorators });

const TextEditor = React.forwardRef(({
  onChange,
  placeholder,
  value
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderBlockedBy, setPlaceholderBlockedBy] = useState('');
  const [inlineStyles, setInlineStyles] = useState([]);
  const editor = ref || useRef();

  function handleKeyCommand(command) {
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
    if (blockType === placeholderBlockedBy) {
      setPlaceholderBlockedBy('');
    } else {
      setPlaceholderBlockedBy(blockType);
    }
    editor.current.focus();
    const newState = RichUtils.toggleBlockType(value, blockType);
    onChange(newState);
  };

  useEffect(() => {
    // iterate over the list of inlineStyles and apply them
    inlineStyles.forEach((inlineStyle) => {
      onChange(RichUtils.toggleInlineStyle(value, inlineStyle));
      // clean up style so it isn't toggled again with next onChange event
      setInlineStyles([...inlineStyles.filter(style => style !== inlineStyle)]);
    });
  }, [value, onChange, inlineStyles]);

  return (
    <StyledEditorWrapper>
      <StyledEditorContainer
        data-component='text-editor-container'
        onClick={ () => {
          setIsFocused(true);
          editor.current.focus();
        } }
        isFocused={ isFocused }
      >
        <Editor
          ref={ editor }
          onFocus={ () => setIsFocused(true) }
          onBlur={ () => setIsFocused(false) }
          editorState={ getDecoratedValue(value) }
          onChange={ onChange }
          placeholder={ !placeholderBlockedBy.length ? placeholder : undefined }
          // blockStyleFn={blockStyleFn}
          // blockRenderMap={blockRenderMap}
          // blockRendererFn={blockRendererFn}
          handleBeforeInput={ handleBeforeInput }
          handleKeyCommand={ handleKeyCommand }
        />
        <Toolbar
          setBlockStyle={ blockType => handleBlockStyleChange(blockType) }
          setInlineStyle={ inlineStyle => handleInlineStyleChange(inlineStyle) }
          isDisabled={ value.getCurrentContent().getPlainText().length === 0 }
        />
      </StyledEditorContainer>
    </StyledEditorWrapper>
  );
});

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object.isRequired
};

TextEditor.defaultProps = {
  placeholder: 'Leave a comment...'
};

export const TextEditorState = EditorState;

export default TextEditor;
