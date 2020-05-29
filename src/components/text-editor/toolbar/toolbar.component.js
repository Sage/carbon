import React from 'react';
import PropTypes from 'prop-types';
import { StyledToolbar, StyledToolbarButton } from './toolbar.style';
import Button from '../../button';

const Toolbar = ({
  setBlockStyle, setInlineStyle, hasSaveButton, onSubmit
}) => {
  const handleInlineStyleChange = (ev, inlineType) => {
    setInlineStyle(inlineType);
    ev.preventDefault();
  };

  const handleBlockType = (ev, blockType) => {
    setBlockStyle(blockType);
    ev.preventDefault();
  };

  return (
    <StyledToolbar>
      <StyledToolbarButton onMouseDown={ ev => handleInlineStyleChange(ev, 'BOLD') }>B</StyledToolbarButton>
      <StyledToolbarButton onMouseDown={ ev => handleInlineStyleChange(ev, 'ITALIC') }>I</StyledToolbarButton>
      <StyledToolbarButton onMouseDown={ ev => handleBlockType(ev, 'unordered-list-item') }>L</StyledToolbarButton>
      <StyledToolbarButton onMouseDown={ ev => handleBlockType(ev, 'unordered-list-item') }>*</StyledToolbarButton>
      <StyledToolbarButton onMouseDown={ ev => handleBlockType(ev, 'ordered-list-item') }>1</StyledToolbarButton>
      { hasSaveButton && (
        <>
          <Button>Cancel</Button>
          <Button type='submit' onSubmit={ onSubmit }>Save</Button>
        </>
      ) }
    </StyledToolbar>
  );
};

Toolbar.propTypes = {
  hasSaveButton: PropTypes.bool,
  setInlineStyle: PropTypes.func.isRequired,
  setBlockStyle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

export default Toolbar;
