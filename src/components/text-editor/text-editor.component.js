import React, {
  useEffect, useState, useRef
} from 'react';
import PropTypes from 'prop-types';
import {
  Editor,
  RichUtils
} from 'draft-js';
import { StyledEditorWrapper, StyledEditorContainer } from './text-editor.style';
import Toolbar from './toolbar';

// needs forwardRef for editor ref
const TextEditor = React.forwardRef(({
  onChange,
  value
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
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


  const handleInlineStyleChange = (inlineStyle) => {
    ref.current.focus();
    setInlineStyles([...inlineStyles, inlineStyle]);
  };

  const handleBlockStyleChange = (blockType) => {
    ref.current.focus();
    const newState = RichUtils.toggleBlockType(value, blockType);
    onChange(newState);
  };

  useEffect(() => {
    inlineStyles.forEach((inlineStyle) => {
      onChange(RichUtils.toggleInlineStyle(value, inlineStyle));
      // clean up style so it isn't toggled again with onChange event
      setInlineStyles([...inlineStyles.filter(style => style !== inlineStyle)]);
    });
  }, [onChange, inlineStyles, value]);

  return (
    <StyledEditorWrapper>
      <StyledEditorContainer isFocused={ isFocused }>
        <Editor
          ref={ editor }
          onFocus={ () => setIsFocused(true) }
          onBlur={ () => setIsFocused(false) }
          editorState={ value }
          onChange={ onChange }
          // blockStyleFn={blockStyleFn}
          // blockRenderMap={blockRenderMap}
          // blockRendererFn={blockRendererFn}
          // handleBeforeInput={handleBeforeInput}
          handleKeyCommand={ handleKeyCommand }
        />
      </StyledEditorContainer>
      <Toolbar
        setBlockStyle={ blockType => handleBlockStyleChange(blockType) }
        setInlineStyle={ inlineStyle => handleInlineStyleChange(inlineStyle) }
      />
    </StyledEditorWrapper>
  );
});

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};

export default TextEditor;
