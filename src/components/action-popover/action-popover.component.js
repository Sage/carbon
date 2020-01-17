import React, {
  useState, useCallback, useEffect, useRef
} from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {
  MenuButton, ButtonIcon
} from './action-popover.style';
import Events from '../../utils/helpers/events';
import createGuid from '../../utils/helpers/guid';
import ActionPopoverMenu from './action-popover-menu.component';
import ActionPopoverItem from './action-popover-item.component';
import ActionPopoverDivider from './action-popover-divider.component';

const ActionPopover = ({
  children, id, onOpen, onClose
}) => {
  const [isOpen, setOpenState] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [guid] = useState(createGuid());
  const button = useRef();

  const setOpen = useCallback((value) => {
    if (value && !isOpen) {
      onOpen();
    }
    if (!value && isOpen) {
      onClose();
    }
    setOpenState(value);
  }, [isOpen, onOpen, onClose]);

  const onButtonClick = useCallback((e) => {
    e.stopPropagation();
    const isOpening = !isOpen;
    setOpen(isOpening);
    if (!isOpening) {
      // Closing the menu should focus the MenuButton
      button.current.focus();
    }
  }, [isOpen, setOpen]);

  // Keyboard commands implemented as recommended by WAI-ARIA best practices
  // https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html

  const onButtonKeyDown = useCallback(((e) => {
    if (Events.isSpaceKey(e) || Events.isDownKey(e) || Events.isEnterKey(e)) {
      e.preventDefault();
      onButtonClick(e);
    } else if (Events.isUpKey(e)) {
      e.preventDefault();
      setFocusIndex(items.length - 1);
      setOpen(true);
    }
  }), [items, onButtonClick, setOpen]);

  useEffect(() => {
    const handler = (e) => {
      // If the event came from part of this component, close the menu.
      // There will be multiple document click listeners but we cant prevent propagation because it will interfere with
      // other instances on the same page
      if (!Events.composedPath(e).includes(button.current)) {
        setOpen(false);
      }
    };
    const event = 'click';
    document.addEventListener(event, handler);

    return function cleanup() {
      document.removeEventListener(event, handler);
    };
  }, [setOpen]);

  const buttonID = id || `ActionPopoverButton_${guid}`;
  const menuID = `ActionPopoverMenu_${guid}`;
  const menuProps = {
    button,
    buttonID,
    setFocusIndex,
    focusIndex,
    setItems,
    items,
    menuID,
    isOpen,
    setOpen
  };

  return (
    <MenuButton
      id={ buttonID }
      data-component='action-popover-button'
      role='button'
      aria-haspopup='true'
      aria-label={ I18n.t('actionpopover.aria-label', { defaultValue: 'actions' }) }
      aria-controls={ menuID }
      aria-expanded={ isOpen }
      tabIndex={ isOpen ? '-1' : '0' }
      { ...{ onKeyDown: onButtonKeyDown, onClick: onButtonClick, isOpen } }
      ref={ button }
    >
      <ButtonIcon type='ellipsis_vertical' />
      <ActionPopoverMenu
        data-component='action-popover'
        role='menu'
        { ...menuProps }
      >
        {children}
      </ActionPopoverMenu>
    </MenuButton>
  );
};

ActionPopover.propTypes = {
  id: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children (props, propName, componentName) {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (child === null) { return; }
      if (![ActionPopoverItem.displayName, ActionPopoverDivider.displayName].includes(child.type.displayName)) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${ActionPopoverItem.displayName}\``
        + ` and \`${ActionPopoverDivider.displayName}\`.`);
      }
    });

    return error;
  }
};

ActionPopover.defaultProps = {
  id: null,
  onOpen: () => {},
  onClose: () => {}
};

export default ActionPopover;
