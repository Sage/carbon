import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  MenuItemFactory, MenuItemIcon
} from './action-popover.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import Events from '../../utils/helpers/events';

const MenuItem = React.forwardRef(({
  children, icon, disabled, onClick: onClickProp, ...rest
}, ref) => {
  const onClick = useCallback((e) => {
    if (!disabled) {
      onClickProp();
    } else {
      e.stopPropagation();
    }
  }, [disabled, onClickProp]);

  const onKeyDown = useCallback((e) => {
    if (Events.isEnterKey(e)) {
      onClick(e);
    } else if (Events.isSpaceKey(e)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, [onClick]);

  return (
    <div
      { ...rest }
      { ...{ ref, onClick, onKeyDown } }
      { ...disabled && { 'aria-disabled': true } }
      type='button'
      tabIndex='0'
      role='menuitem'
    >
      <MenuItemIcon type={ icon } />{children}
    </div>
  );
});

const ActionPopoverItem = MenuItemFactory(MenuItem);
ActionPopoverItem.displayName = 'ActionPopoverItem';
ActionPopoverItem.propTypes = {
  /** The name of the icon to display next to the label */
  icon: PropTypes.oneOf(OptionsHelper.icons).isRequired,
  /** The text label to display for this Item */
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

ActionPopoverItem.defaultProps = {
  disabled: false
};

export default ActionPopoverItem;
