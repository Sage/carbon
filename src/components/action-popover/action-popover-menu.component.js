import React, {
  useState, useCallback, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { Menu } from './action-popover.style';
import Events from '../../utils/helpers/events';
import ActionPopoverItem from './action-popover-item.component';
import ActionPopoverDivider from './action-popover-divider.component';

const ActionPopoverMenu = ({
  button, buttonID, children, focusIndex, isOpen, items, menuID, setOpen, setFocusIndex, setItems, ...rest
}) => {
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
  }), [button, focusIndex, items, setFocusIndex, setOpen]);

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
  }, [children, setItems]);

  useEffect(() => {
    if (isOpen) {
      items[focusIndex].ref.current.focus();
    } else {
      setFocusIndex(0);
    }
  }, [isOpen, setFocusIndex, items, focusIndex]);

  return (
    <Menu
      data-component='action-popover'
      isOpen={ isOpen }
      onKeyDown={ onKeyDown }
      id={ menuID }
      aria-labelledby={ buttonID }
      role='menu'
      { ...rest }
    >
      {childrenWithRef}
    </Menu>

  );
};

ActionPopoverMenu.propTypes = {
  button: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  buttonID: PropTypes.string,
  children (props, propName, componentName) {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (child === null) { return; }
      if (![ActionPopoverItem.displayName, ActionPopoverDivider.displayName].includes(child.type.displayName)) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${ActionPopoverMenu.displayName}\``
        + ` and \`${ActionPopoverMenu.displayName}\`.`);
      }
    });

    return error;
  },
  focusIndex: PropTypes.number,
  menuID: PropTypes.string,
  isOpen: PropTypes.bool,
  items: PropTypes.array,
  setFocusIndex: PropTypes.func,
  setItems: PropTypes.func,
  setOpen: PropTypes.func
};

ActionPopoverMenu.defaultProps = {
  menuID: null
};

export default ActionPopoverMenu;
