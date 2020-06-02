import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledToolbar } from './toolbar.style';
import ToolbarButton from './toolbar-button.component';
import Button from '../../button';
import Events from '../../../utils/helpers/events';

const Toolbar = ({
  setBlockStyle, setInlineStyle, onSubmit, isDisabled
}) => {
  const [showTooltip, setShowTooltip] = useState('');

  const handleInlineStyleChange = useCallback((ev, inlineType) => {
    setInlineStyle(inlineType);
    ev.preventDefault();
  }, [setInlineStyle]);

  const handleBlockType = useCallback((ev, blockType) => {
    setBlockStyle(blockType);
    ev.preventDefault();
  }, [setBlockStyle]);

  const handleKeyDown = useCallback((ev, type) => {
    if (Events.isSpaceKey(ev) || Events.isEnterKey(ev)) {
      if (['BOLD', 'ITALIC'].includes(type)) {
        handleInlineStyleChange(ev, type);
      } else {
        handleBlockType(ev, type);
      }
    }
  }, [handleBlockType, handleInlineStyleChange]);

  return (
    <StyledToolbar data-component='editor-toolbar'>
      <ToolbarButton
        onKeyDown={ ev => handleKeyDown(ev, 'BOLD') }
        onMouseDown={ ev => handleInlineStyleChange(ev, 'BOLD') }
        { ...tooltipProps('Bold', showTooltip, setShowTooltip) }
      >
        B
      </ToolbarButton>
      <ToolbarButton
        onKeyDown={ ev => handleKeyDown(ev, 'ITALIC') }
        onMouseDown={ ev => handleInlineStyleChange(ev, 'ITALIC') }
        { ...tooltipProps('Italic', showTooltip, setShowTooltip) }
      >
        I
      </ToolbarButton>
      <ToolbarButton
        onKeyDown={ ev => handleKeyDown(ev, 'unordered-list-item') }
        onMouseDown={ ev => handleBlockType(ev, 'unordered-list-item') }
        { ...tooltipProps('Link', showTooltip, setShowTooltip) }
      >
        L
      </ToolbarButton>
      <ToolbarButton
        onKeyDown={ ev => handleKeyDown(ev, 'unordered-list-item') }
        onMouseDown={ ev => handleBlockType(ev, 'unordered-list-item') }
        { ...tooltipProps('Bulleted List', showTooltip, setShowTooltip) }
      >
        *
      </ToolbarButton>
      <ToolbarButton
        onKeyDown={ ev => handleKeyDown(ev, 'ordered-list-item') }
        onMouseDown={ ev => handleBlockType(ev, 'ordered-list-item') }
        { ...tooltipProps('Numbered List', showTooltip, setShowTooltip) }
      >
        1
      </ToolbarButton>

      { onSubmit && (
        <>
          <Button buttonType='tertiary'>Cancel</Button>
          <Button
            buttonType='primary'
            type='submit'
            onSubmit={ onSubmit }
            disabled={ isDisabled }
          >
            Save
          </Button>
        </>
      ) }
    </StyledToolbar>
  );
};

function tooltipProps(id, showTooltip, setShowTooltip) {
  return {
    tooltipMessage: id,
    tooltipPosition: 'top',
    tooltipAlign: 'center',
    tooltipVisible: showTooltip === id,
    onMouseOver: () => setShowTooltip(id),
    onMouseLeave: () => setShowTooltip('')
  };
}

Toolbar.propTypes = {
  isDisabled: PropTypes.bool,
  setInlineStyle: PropTypes.func.isRequired,
  setBlockStyle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

export default Toolbar;
