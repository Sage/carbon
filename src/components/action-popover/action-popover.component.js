import React, {
  useState, useCallback, useEffect, useRef
} from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {
  Menu, MenuButton, ButtonIcon
} from './action-popover.style';
import Events from '../../utils/helpers/events';
import createGuid from '../../utils/helpers/guid';
import ActionPopoverItem from './action-popover-item.component';
import ActionPopoverDivider from './action-popover-divider.component';

const ActionPopover = ({
  children, id, onOpen, onClose
}) => {
  const [isOpen, setOpenState] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [childrenWithRef, setChildrenWithRef] = useState();
  const [items, setItems] = useState();
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
  }, [isOpen, onOpen, onClose, setOpenState]);

  const onButtonClick = useCallback((e) => {
    e.stopPropagation();
    const isOpening = !isOpen;
    setOpen(isOpening);
    if (isOpening) {
      // Opening the menu should focus the first MenuItem
      setFocusIndex(0);
    } else {
      // Closing the menu should focus the MenuButton
      button.current.focus();
    }
  }, [setOpen, isOpen]);

  // Keyboard commands implemented as reccomended by WAI-ARIA best practices
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

  const onKeyDown = useCallback(((e) => {
    if (Events.isTabKey(e) && Events.isShiftKey(e)) {
      // SHIFT+TAB: close menu and allow focus to change to the previous focusable element, but not the button
      // allow the event to propegate before re-rendering, this will prevent the button from gaining focus
      setTimeout(() => {
        setOpen(false);
      }, 0);
    } else if (Events.isTabKey(e)) {
      // TAB: close menu and allow focus to change to next focusable element
      setOpen(false);
    } else if (Events.isEscKey(e)) {
      // ESC: close menu and focus menu button
      e.preventDefault();
      setOpen(false);
      button.current.focus();
    } else if (Events.isDownKey(e)) {
      // DOWN: focus next item or first
      e.preventDefault();
      e.stopPropagation();
      setFocusIndex(focusIndex < items.length - 1 ? focusIndex + 1 : 0);
    } else if (Events.isUpKey(e)) {
      // UP: focus previous item or last
      e.preventDefault();
      e.stopPropagation();
      setFocusIndex(focusIndex > 0 ? focusIndex - 1 : items.length - 1);
    } else if (Events.isHomeKey(e)) {
      // HOME: focus first item
      e.preventDefault();
      setFocusIndex(0);
    } else if (Events.isEndKey(e)) {
      // END: focus last item
      e.preventDefault();
      setFocusIndex(items.length - 1);
    } else if (Events.isAlphabetKey(e)) {
      // A-Za-z: focus the next item on the list that starts with the pressed key
      // selection should wrap to the start of the list
      e.stopPropagation();
      let firstMatch;
      let lastMatch;
      React.Children.forEach(items, ({ props: { children: text } }, index) => {
        if (text && text.toLowerCase().startsWith(e.key.toLowerCase())) {
          if (!firstMatch) {
            firstMatch = index;
          }
          if (index > focusIndex && !lastMatch) {
            lastMatch = index;
          }
        }
      });

      if (lastMatch !== undefined) {
        setFocusIndex(lastMatch);
      } else if (firstMatch !== undefined) {
        setFocusIndex(firstMatch);
      }
    }
  }), [focusIndex, items, setOpen]);

  useEffect(() => {
    const handler = (e) => {
      // If the event came from part of this component, close the menu.
      // There will be multiple document click listeners but we cant prevent propegation because it will interfere with
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

  useEffect(() => {
    const itemsWithRef = [];
    // childrenWith a clone of children with refs added so we can focus the dom element
    setChildrenWithRef(React.Children.toArray(children).map((child) => {
      if (child.type === ActionPopoverItem) {
        const itemWithRef = React.cloneElement(child, { ref: React.createRef() });
        itemsWithRef.push(itemWithRef);
        return itemWithRef;
      }
      return child;
    }));
    // items is used to manage focus, we don't want the focus index to count items that are not focusable
    // so we use a smaller array which makes keyboard navigation easier as we don't have to filter it on every
    // keypress
    setItems(itemsWithRef);
  }, [children]);

  useEffect(() => {
    if (isOpen) {
      items[focusIndex].ref.current.focus();
    }
  }, [items, focusIndex, isOpen]);

  const buttonID = id || `ActionPopoverButton_${guid}`;
  const menuID = `ActionPopoverMenu_${guid}`;

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
      <Menu
        data-component='action-popover'
        isOpen={ isOpen }
        onKeyDown={ onKeyDown }
        id={ menuID }
        aria-labelledby={ buttonID }
        role='menu'
      >
        {childrenWithRef}
      </Menu>
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
