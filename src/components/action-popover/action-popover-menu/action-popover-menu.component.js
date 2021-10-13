import React, { useCallback, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { Menu } from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import ActionPopoverItem from "../action-popover-item/action-popover-item.component";
import ActionPopoverDivider from "../action-popover-divider/action-popover-divider.component";
import ActionPopoverContext from "../action-popover-context";

const ActionPopoverMenu = React.forwardRef(
  (
    {
      parentID,
      children,
      focusIndex,
      isOpen,
      menuID,
      onClick,
      setOpen,
      setFocusIndex,
      placement = "bottom",
      horizontalAlignment,
      ...rest
    },
    ref
  ) => {
    const { focusButton } = useContext(ActionPopoverContext);

    const items = useMemo(
      () =>
        React.Children.toArray(children).filter(
          (child) => child && child.type === ActionPopoverItem
        ),
      [children]
    );

    const onKeyDown = useCallback(
      (e) => {
        if (Events.isTabKey(e)) {
          e.preventDefault();
          // TAB: close menu and allow focus to change to next focusable element
          focusButton();
          setOpen(false);
        } else if (Events.isDownKey(e)) {
          // DOWN: focus next item or first
          e.preventDefault();
          e.stopPropagation();
          const indexValue = focusIndex < items.length - 1 ? focusIndex + 1 : 0;
          setFocusIndex(indexValue);
        } else if (Events.isUpKey(e)) {
          // UP: focus previous item or last
          e.preventDefault();
          e.stopPropagation();
          const indexValue = focusIndex > 0 ? focusIndex - 1 : items.length - 1;
          setFocusIndex(indexValue);
        } else if (Events.isHomeKey(e)) {
          // HOME: focus first item
          e.preventDefault();
          e.stopPropagation();
          setFocusIndex(0);
        } else if (Events.isEndKey(e)) {
          // END: focus last item
          e.preventDefault();
          e.stopPropagation();
          setFocusIndex(items.length - 1);
        } else if (Events.isAlphabetKey(e)) {
          // A-Za-z: focus the next item on the list that starts with the pressed key
          // selection should wrap to the start of the list
          e.stopPropagation();
          let firstMatch;
          let nextMatch;
          React.Children.forEach(
            items,
            ({ props: { children: text } }, index) => {
              if (text && text.toLowerCase().startsWith(e.key.toLowerCase())) {
                if (firstMatch === undefined) {
                  firstMatch = index;
                }
                if (index > focusIndex && nextMatch === undefined) {
                  nextMatch = index;
                }
              }
            }
          );

          if (nextMatch !== undefined) {
            setFocusIndex(nextMatch);
          } else if (firstMatch !== undefined) {
            setFocusIndex(firstMatch);
          }
        }
      },
      [focusButton, setOpen, focusIndex, items, setFocusIndex]
    );

    const clonedChildren = useMemo(() => {
      let index = 0;
      return React.Children.map(children, (child) => {
        if (child && child.type === ActionPopoverItem) {
          index += 1;
          return React.cloneElement(child, {
            focusItem: isOpen && focusIndex === index - 1,
            placement: child.props.submenu ? placement : undefined,
            horizontalAlignment,
          });
        }

        return child;
      });
    }, [children, focusIndex, isOpen, placement, horizontalAlignment]);

    return (
      <Menu
        data-component="action-popover"
        isOpen={isOpen}
        onKeyDown={onKeyDown}
        id={menuID}
        aria-labelledby={parentID}
        role="menu"
        ref={ref}
        {...rest}
      >
        {clonedChildren}
      </Menu>
    );
  }
);

ActionPopoverMenu.propTypes = {
  /** Unique ID for the menu's parent */
  parentID: PropTypes.string,
  /** Children for the menu */
  children(props, propName, componentName) {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (child === null) {
        return;
      }
      if (
        ![
          ActionPopoverItem.displayName,
          ActionPopoverDivider.displayName,
        ].includes(child.type.displayName)
      ) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${ActionPopoverItem.displayName}\`` +
            ` and \`${ActionPopoverDivider.displayName}\`.`
        );
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
  /** Callback to set the index of the focused item */
  setFocusIndex: PropTypes.func,
  /** Callback to set the isOpen flag */
  setOpen: PropTypes.func,
  /** Callback called on click event */
  onClick: PropTypes.func,
  /** @ignore @private */
  placement: PropTypes.oneOf(["bottom", "top"]),
  /** @ignore @private */
  horizontalAlignment: PropTypes.oneOf(["left", "right"]),
};

ActionPopoverMenu.displayName = "ActionPopoverMenu";

export default ActionPopoverMenu;
