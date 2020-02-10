import React, {
  useCallback, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { Menu } from './action-popover.style';
import Events from '../../utils/helpers/events';
import ActionPopoverItem from './action-popover-item.component';
import ActionPopoverDivider from './action-popover-divider.component';

const ActionPopoverMenu = React.forwardRef(({
  button, parentID, children, focusIndex, isOpen, items, menuID, setOpen, setFocusIndex, setItems, ...rest
}, ref) => {
  const [childrenWithRef, setChildrenWithRef] = useState();
  const onKeyDown = useCallback(((e) => {
    if (Events.isTabKey(e) && Events.isShiftKey(e)) {
      // SHIFT+TAB: close menu and allow focus to change to the previous focusable element, but not the button
      // allow the event to propagate before re-rendering, this will prevent the button from gaining focus
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
      if (button) {
        button.current.focus();
      }
    } else if (Events.isDownKey(e)) {
      // DOWN: focus next item or first
      e.preventDefault();
      e.stopPropagation();
      const indexValue = (focusIndex < items.length - 1) ? focusIndex + 1 : 0;
      setFocusIndex(indexValue);
    } else if (Events.isUpKey(e)) {
      // UP: focus previous item or last
      e.preventDefault();
      e.stopPropagation();
      const indexValue = (focusIndex > 0) ? focusIndex - 1 : items.length - 1;
      setFocusIndex(indexValue);
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
      let nextMatch;
      React.Children.forEach(items, ({ props: { children: text } }, index) => {
        if (text && text.toLowerCase().startsWith(e.key.toLowerCase())) {
          if (firstMatch === undefined) {
            firstMatch = index;
          }
          if (index > focusIndex && nextMatch === undefined) {
            nextMatch = index;
          }
        }
      });

      if (nextMatch !== undefined) {
        setFocusIndex(nextMatch);
      } else if (firstMatch !== undefined) {
        setFocusIndex(firstMatch);
      }
    }
  }), [setOpen, button, focusIndex, items, setFocusIndex]);


  // send a global close to other items with sub whenever updateItemIndex triggered?
  useEffect(() => {
    const itemsWithRef = [];
    // childrenWith a clone of children with refs added so we can focus the dom element
    setChildrenWithRef(React.Children.toArray(children).map((child, itemIndex) => {
      if (child.type === ActionPopoverItem) {
        const canOpenSubmenu = itemIndex === focusIndex && child.props.submenu;
        // callback and index to update focusIndex if item hovered and has submenu
        const submenuProps = child.props.submenu ? { canOpenSubmenu, itemIndex, updateItemIndex: setFocusIndex } : {};
        const itemWithRef = React.cloneElement(child, { ref: React.createRef(), ...submenuProps });
        itemsWithRef.push(itemWithRef);

        return itemWithRef;
      }
      return child;
    }));
    // items is used to manage focus, we don't want the focus index to count items that are not focusable
    // so we use a smaller array which makes keyboard navigation easier as we don't have to filter it on every
    // keypress
    setItems(itemsWithRef);
  }, [children, focusIndex, isOpen, menuID, setFocusIndex, setItems]);

  useEffect(() => {
    if (isOpen) {
      items[focusIndex].ref.current.focus();
    } else {
      setFocusIndex(0);
    }
  }, [isOpen, items, focusIndex, setItems, setFocusIndex]);

  return (
    <Menu
      data-component='action-popover'
      isOpen={ isOpen }
      onKeyDown={ onKeyDown }
      id={ menuID }
      aria-labelledby={ parentID }
      role='menu'
      ref={ ref }
      { ...rest }
    >
      { childrenWithRef }
    </Menu>
  );
});

ActionPopoverMenu.propTypes = {
  /** A ref to the parent popover button */
  button: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  /** Unique ID for the menu's parent */
  parentID: PropTypes.string,
  /** Children for the menu */
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
  },
  /** Index to control which item is focused */
  focusIndex: PropTypes.number,
  /** A unique ID for the menu */
  menuID: PropTypes.string,
  /** Flag to indicate whether a menu should open */
  isOpen: PropTypes.bool,
  /** List of the items in a menu */
  items: PropTypes.array,
  /** Callback to set the index of the focused item */
  setFocusIndex: PropTypes.func,
  /** Callback to register the items in a menu */
  setItems: PropTypes.func,
  /** Callback to set the isOpen flag */
  setOpen: PropTypes.func
};

ActionPopoverMenu.displayName = 'ActionPopoverMenu';

export default ActionPopoverMenu;
