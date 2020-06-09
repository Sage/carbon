import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledToolbar, StyledEditorStyleControls, StyledEditorFormControls } from './toolbar.style';
import ToolbarButton from './toolbar-button/toolbar-button.component';
import Button from '../../button';
import Events from '../../../utils/helpers/events';

const Toolbar = ({
  activeControls, isDisabled, onCancel, onSubmit, setBlockStyle, setInlineStyle, updateActiveControls
}) => {
  const [showTooltip, setShowTooltip] = useState('');

  const handleInlineStyleChange = useCallback((ev, inlineType) => {
    setInlineStyle(inlineType);
    setShowTooltip('');
    updateActiveControls(inlineType);
    ev.preventDefault();
  }, [updateActiveControls, setInlineStyle]);

  const handleBlockType = useCallback((ev, blockType) => {
    setBlockStyle(blockType);
    setShowTooltip('');
    updateActiveControls(blockType);
    ev.preventDefault();
  }, [updateActiveControls, setBlockStyle]);

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
      <StyledEditorStyleControls>
        <ToolbarButton
          onKeyDown={ ev => handleKeyDown(ev, 'BOLD') }
          onMouseDown={ ev => handleInlineStyleChange(ev, 'BOLD') }
          activated={ activeControls.BOLD }
          { ...tooltipProps('Bold', showTooltip, setShowTooltip) }
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onKeyDown={ ev => handleKeyDown(ev, 'ITALIC') }
          onMouseDown={ ev => handleInlineStyleChange(ev, 'ITALIC') }
          activated={ activeControls.ITALIC }
          { ...tooltipProps('Italic', showTooltip, setShowTooltip) }
        >
          I
        </ToolbarButton>
        <ToolbarButton
          onKeyDown={ ev => handleKeyDown(ev, 'unordered-list-item') }
          onMouseDown={ ev => handleBlockType(ev, 'unordered-list-item') }
          activated={ activeControls['unordered-list-item'] }
          { ...tooltipProps('Bulleted List', showTooltip, setShowTooltip) }
        >
          *
        </ToolbarButton>
        <ToolbarButton
          onKeyDown={ ev => handleKeyDown(ev, 'ordered-list-item') }
          onMouseDown={ ev => handleBlockType(ev, 'ordered-list-item') }
          activated={ activeControls['ordered-list-item'] }
          { ...tooltipProps('Numbered List', showTooltip, setShowTooltip) }
        >
          1
        </ToolbarButton>
      </StyledEditorStyleControls>

      { onSubmit && (
        <StyledEditorFormControls>
          <Button onClick={ ev => onCancel(ev) } buttonType='tertiary'>Cancel</Button>
          <Button
            buttonType='primary'
            onSubmit={ onSubmit }
            disabled={ isDisabled }
          >
            Save
          </Button>
        </StyledEditorFormControls>
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
  activeControls: PropTypes.object,
  isDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  setInlineStyle: PropTypes.func.isRequired,
  setBlockStyle: PropTypes.func.isRequired,
  updateActiveControls: PropTypes.func
};

Toolbar.defaultProps = {
  activeControls: {},
  updateActiveControls: () => {}
};

export default Toolbar;
