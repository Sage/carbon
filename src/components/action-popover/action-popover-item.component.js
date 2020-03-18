import React, {
  useCallback, useEffect, useLayoutEffect, useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { withTheme } from 'styled-components';
import {
  MenuItemFactory, MenuItemIcon, SubMenuItemIcon
} from './action-popover.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import Events from '../../utils/helpers/events';
import createGuid from '../../utils/helpers/guid';

const INTERVAL = 150;

const MenuItem = React.forwardRef(({
  canOpenSubmenu, children, icon, disabled, itemIndex, onClick: onClickProp,
  submenu, theme, updateItemIndex, ...rest
}, ref) => {
  const [containerPosition, setContainerPosition] = useState(null);
  const [guid] = useState(createGuid());
  const [isOpen, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [isLeftAligned, setIsLeftAligned] = useState(true);
  const submenuRef = useRef();
  const { spacing } = theme;

  const alignSubmenu = useCallback(() => {
    if (checkRef(ref)) {
      const align = submenu && checkRef(ref) && leftAlignSubmenu(ref, submenuRef);
      setIsLeftAligned(align);
      setContainerPosition(getContainerPosition(ref, submenuRef, spacing));
    }
  }, [ref, submenu, spacing]);

  useLayoutEffect(() => {
    if (!canOpenSubmenu) {
      setOpen(false);
    }
    alignSubmenu();
  }, [canOpenSubmenu, alignSubmenu]);

  useEffect(() => {
    const event = 'resize';
    window.addEventListener(event, alignSubmenu);

    return function cleanup() {
      window.removeEventListener(event, alignSubmenu);
    };
  }, [alignSubmenu]);

  const onClick = useCallback((e) => {
    if (!disabled) {
      onClickProp();
      setOpen(false);
    } else {
      e.stopPropagation();
    }
  }, [disabled, onClickProp, setOpen]);

  const onKeyDown = useCallback((e) => {
    if (Events.isEnterKey(e)) {
      if (!submenu) {
        onClick(e);
      }
      setOpen(false);
    } else if (Events.isSpaceKey(e)) {
      e.preventDefault();
      e.stopPropagation();
    } else if (!disabled && submenu && Events.isLeftKey(e)) {
      // LEFT: open if has submenu and left aligned otherwise close submenu
      if (isLeftAligned) {
        setOpen(true);
        setFocusIndex(focusIndex);
      } else {
        setOpen(false);
        updateItemIndex(itemIndex);
        ref.current.focus();
        setFocusIndex(focusIndex);
      }
      e.preventDefault();
    } else if (!disabled && submenu && Events.isRightKey(e)) {
      // RIGHT: open if has submenu and right aligned otherwise close submenu
      if (!isLeftAligned) {
        setOpen(true);
        setFocusIndex(focusIndex);
      } else {
        setOpen(false);
        updateItemIndex(itemIndex);
        ref.current.focus();
        setFocusIndex(focusIndex);
      }
      e.preventDefault();
    }
  }, [disabled, focusIndex, isLeftAligned, itemIndex, onClick, ref, submenu, updateItemIndex]);

  let timer;
  const itemSubmenuProps = {
    ...(!disabled && {
      onMouseEnter: (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => { setOpen(true); }, INTERVAL);
        e.stopPropagation();
      },
      onMouseLeave: (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => { setOpen(false); }, INTERVAL);
        e.stopPropagation();
      },
      onClick: () => {}
    }),
    'aria-haspopup': 'true',
    'aria-label': I18n.t('actionpopover.aria-label', { defaultValue: 'actions' }),
    'aria-controls': `ActionPopoverMenu_${guid}`,
    'aria-expanded': isOpen
  };

  return (
    <div
      { ...rest }
      { ...{ ref, onClick, onKeyDown } }
      { ...disabled && { 'aria-disabled': true } }
      type='button'
      tabIndex='0'
      role='menuitem'
      { ...(submenu && itemSubmenuProps) }
    >
      { submenu && (
        React.cloneElement(submenu, {
          parentID: `ActionPopoverItem_${guid}`,
          menuID: `ActionPopoverMenu_${guid}`,
          'data-element': 'action-popover-submenu',
          isOpen,
          onClick: () => setOpen(!isOpen),
          ref: submenuRef,
          style: containerPosition,
          setOpen,
          setFocusIndex,
          focusIndex,
          items,
          setItems
        })
      ) }
      { submenu && checkRef(ref) && isLeftAligned && (
        <SubMenuItemIcon type='chevron_left' />
      ) }
      { icon && <MenuItemIcon type={ icon } /> }
      { children }
      { submenu && checkRef(ref) && !isLeftAligned && (
        <SubMenuItemIcon type='chevron_right' />
      ) }
    </div>
  );
});

function checkRef(ref) {
  return ref && ref.current;
}

function leftAlignSubmenu(ref, submenuRef) {
  const parentRect = ref.current.getBoundingClientRect();
  const { offsetWidth } = submenuRef.current;
  return parentRect.left >= offsetWidth;
}

function getContainerPosition(ref, submenuRef, spacing) {
  if (!checkRef(ref) || !checkRef(submenuRef)) {
    return {};
  }
  const parentRect = ref.current.getBoundingClientRect();
  const { left, right } = parentRect;
  const { offsetWidth } = submenuRef.current;
  const position = leftAlignSubmenu(ref, submenuRef) ? -offsetWidth : right - left;
  return {
    left: position,
    top: -spacing,
    right: 'auto'
  };
}

const StyledActionPopoverItem = MenuItemFactory(MenuItem);
StyledActionPopoverItem.displayName = 'ActionPopoverItem';
const ActionPopoverItem = withTheme(StyledActionPopoverItem);

const propTypes = {
  /** The text label to display for this Item */
  children: PropTypes.string.isRequired,
  /** Flag to indicate if item is disabled */
  disabled: PropTypes.bool,
  /** The name of the icon to display next to the label */
  icon: PropTypes.oneOf(OptionsHelper.icons),
  /** Callback to run when item is clicked */
  onClick: PropTypes.func.isRequired,
  /** Submenu component for item */
  submenu (props, propName, componentName) {
    let error;
    if (props[propName] && props[propName].type.displayName !== 'ActionPopoverMenu') {
      error = new Error(`\`${componentName}\` only accepts submenu of type \`ActionPopoverMenu\``);
    }
    return error;
  }
};

ActionPopoverItem.propTypes = { ...propTypes };

ActionPopoverItem.defaultProps = {
  disabled: false
};

// needed to export MenuItem to create prop tables in storybook
MenuItem.propTypes = { ...propTypes };
MenuItem.displayName = 'ActionPopoverItem';
export { MenuItem };

export default ActionPopoverItem;
