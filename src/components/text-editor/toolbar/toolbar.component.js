import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledToolbar, StyledEditorStyleControls, StyledEditorActionControls } from './toolbar.style';
import ToolbarButton from './toolbar-button/toolbar-button.component';
import Button from '../../button';
import Events from '../../../utils/helpers/events';
import Icon from '../../icon';

const Toolbar = ({
  activeControls, isDisabled, onCancel, onSubmit, setBlockStyle, setInlineStyle
}) => {
  const [showTooltip, setShowTooltip] = useState('');

  const handleInlineStyleChange = useCallback((ev, inlineType) => {
    setInlineStyle(inlineType);
    setShowTooltip('');
    ev.preventDefault();
  }, [setInlineStyle]);

  const handleBlockType = useCallback((ev, blockType) => {
    setBlockStyle(blockType);
    setShowTooltip('');
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
      <StyledEditorStyleControls>
        <ToolbarButton
          ariaLabel='bold'
          onKeyDown={ ev => handleKeyDown(ev, 'BOLD') }
          onMouseDown={ ev => handleInlineStyleChange(ev, 'BOLD') }
          activated={ activeControls.BOLD }
          { ...tooltipProps('Bold', showTooltip, setShowTooltip) }
        >
          <Icon type='bold' />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel='italic'
          onKeyDown={ ev => handleKeyDown(ev, 'ITALIC') }
          onMouseDown={ ev => handleInlineStyleChange(ev, 'ITALIC') }
          activated={ activeControls.ITALIC }
          { ...tooltipProps('Italic', showTooltip, setShowTooltip) }
        >
          <Icon type='italic' />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel='bullet-list'
          onKeyDown={ ev => handleKeyDown(ev, 'unordered-list-item') }
          onMouseDown={ ev => handleBlockType(ev, 'unordered-list-item') }
          activated={ activeControls['unordered-list-item'] }
          { ...tooltipProps('Bulleted List', showTooltip, setShowTooltip) }
        >
          <Icon type='bullet_list_dotted' />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel='number-list'
          onKeyDown={ ev => handleKeyDown(ev, 'ordered-list-item') }
          onMouseDown={ ev => handleBlockType(ev, 'ordered-list-item') }
          activated={ activeControls['ordered-list-item'] }
          { ...tooltipProps('Numbered List', showTooltip, setShowTooltip) }
        >
          <Icon type='bullet_list_numbers' />
        </ToolbarButton>
      </StyledEditorStyleControls>

      { onSubmit && (
        <StyledEditorActionControls>
          <Button onClick={ onCancel ? ev => onCancel(ev) : undefined } buttonType='tertiary'>Cancel</Button>
          <Button
            buttonType='primary'
            onSubmit={ onSubmit }
            disabled={ isDisabled }
          >
            Save
          </Button>
        </StyledEditorActionControls>
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
  setBlockStyle: PropTypes.func.isRequired
};

Toolbar.defaultProps = {
  activeControls: {}
};

export default Toolbar;
