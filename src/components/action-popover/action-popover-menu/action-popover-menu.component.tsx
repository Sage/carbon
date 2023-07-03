import React, { useCallback, useMemo, useContext } from "react";
import invariant from "invariant";

import { Menu } from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import ActionPopoverItem, {
  ActionPopoverItemProps,
} from "../action-popover-item/action-popover-item.component";
import ActionPopoverDivider from "../action-popover-divider/action-popover-divider.component";
import ActionPopoverContext from "../action-popover-context";

export interface ActionPopoverMenuBaseProps {
  /** Children for the menu */
  children?: React.ReactNode;
  /** Index to control which item is focused */
  focusIndex?: number;
  /** Flag to indicate whether a menu should open */
  isOpen?: boolean;
  /** A unique ID for the menu */
  menuID?: string;
  /** Callback to set the index of the focused item */
  setFocusIndex?: (args: number) => void;
  /** Callback to set the isOpen flag */
  setOpen?: (args: boolean) => void;
  /** Unique ID for the menu's parent */
  parentID?: string;
  /** Horizontal alignment of menu items content */
  horizontalAlignment?: "left" | "right";
  /** Set whether the menu should open above or below the button */
  placement?: "bottom" | "top";
  /** @ignore @private */
  role?: string;
  /** @ignore @private */
  "data-element"?: string;
  /** @ignore @private */
  style?: {
    left: number;
    top?: string;
    bottom?: string;
    right: "auto";
  };
}

export interface ActionPopoverMenuProps
  extends ActionPopoverMenuBaseProps,
    React.RefAttributes<HTMLDivElement> {}

const ActionPopoverMenu = React.forwardRef<
  HTMLDivElement,
  ActionPopoverMenuBaseProps
>(
  (
    {
      children,
      parentID,
      focusIndex,
      isOpen,
      menuID,
      setOpen,
      setFocusIndex,
      placement = "bottom",
      horizontalAlignment,
      ...rest
    }: ActionPopoverMenuBaseProps,
    ref
  ) => {
    const context = useContext(ActionPopoverContext);
    invariant(
      context,
      "ActionPopoverMenu must be used within an ActionPopover component"
    );
    const { focusButton } = context;

    invariant(
      setOpen && setFocusIndex && typeof focusIndex !== "undefined",
      "ActionPopoverMenu must be used within an ActionPopover or ActionPopoverItem component"
    );

    const hasProperChildren = useMemo(() => {
      const incorrectChild = React.Children.toArray(children).find(
        (child: React.ReactNode) => {
          if (!React.isValidElement(child)) {
            return true;
          }

          return (
            child.type !== ActionPopoverItem &&
            child.type !== ActionPopoverDivider
          );
        }
      );

      return !incorrectChild;
    }, [children]);

    invariant(
      hasProperChildren,
      `ActionPopoverMenu only accepts children of type \`${ActionPopoverItem.displayName}\`` +
        ` and \`${ActionPopoverDivider.displayName}\`.`
    );

    const items = useMemo(() => {
      return React.Children.toArray(children).filter((child) => {
        return React.isValidElement(child) && child.type === ActionPopoverItem;
      });
    }, [children]);

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
        } else if (e.key.length === 1) {
          // any printable character: focus the next item on the list that starts with that character
          // selection should wrap to the start of the list
          e.stopPropagation();
          let firstMatch: number | undefined;
          let nextMatch: number | undefined;
          React.Children.forEach(items, (child, index) => {
            if (
              React.isValidElement(child) &&
              child.props.children.toLowerCase().startsWith(e.key.toLowerCase())
            ) {
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
      },
      [focusButton, setOpen, focusIndex, items, setFocusIndex]
    );

    const clonedChildren = useMemo(() => {
      let index = 0;
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ActionPopoverItem) {
          index += 1;
          return React.cloneElement(
            child as React.ReactElement<ActionPopoverItemProps>,
            {
              focusItem: isOpen && focusIndex === index - 1,
              placement: child.props.submenu ? placement : undefined,
              horizontalAlignment,
            }
          );
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

ActionPopoverMenu.displayName = "ActionPopoverMenu";

export default ActionPopoverMenu;
