import React, { useCallback, useMemo, useContext, useState } from "react";
import invariant from "invariant";

import { Menu } from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import ActionPopoverItem, {
  ActionPopoverItemProps,
} from "../action-popover-item/action-popover-item.component";
import ActionPopoverDivider from "../action-popover-divider/action-popover-divider.component";
import ActionPopoverContext, {
  Alignment,
} from "../__internal__/action-popover.context";
import {
  findFirstFocusableItem,
  findLastFocusableItem,
  getItems,
  isItemDisabled,
} from "../__internal__/action-popover-utils";

export interface ActionPopoverMenuBaseProps {
  /** Children for the menu */
  children?: React.ReactNode;
  /**
   * @ignore
   * @private
   * @internal
   * Index to control which item is focused */
  focusIndex?: number;
  /** Flag to indicate whether a menu should open */
  isOpen?: boolean;
  /** A unique ID for the menu */
  menuID?: string;
  /**
   * @ignore
   * @private
   * @internal
   * Callback to set the index of the focused item */
  setFocusIndex?: (args: number) => void;
  /** Callback to set the isOpen flag */
  setOpen?: (args: boolean) => void;
  /** Unique ID for the menu's parent */
  parentID?: string;
  /** Horizontal alignment of menu items content */
  horizontalAlignment?: Alignment;
  /** Set whether the menu should open above or below the button */
  placement?: "bottom" | "top";
  /** @ignore @private */
  role?: string;
  /** @ignore @private */
  isASubmenu?: boolean;
  /** @ignore @private */
  "data-element"?: string;
  /** @ignore @private */
  style?: {
    left: string | number;
    top?: string;
    bottom?: string;
    right: string | number;
  };
}

export interface ActionPopoverMenuProps
  extends ActionPopoverMenuBaseProps,
    React.RefAttributes<HTMLUListElement> {}

const ActionPopoverMenu = React.forwardRef<
  HTMLUListElement,
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
      isASubmenu,
      ...rest
    }: ActionPopoverMenuBaseProps,
    ref,
  ) => {
    const context = useContext(ActionPopoverContext);
    invariant(
      context,
      "ActionPopoverMenu must be used within an ActionPopover component",
    );
    const { focusButton, submenuPosition } = context;

    invariant(
      setOpen && setFocusIndex && typeof focusIndex !== "undefined",
      "ActionPopoverMenu must be used within an ActionPopover or ActionPopoverItem component",
    );

    const hasProperChildren = useMemo(() => {
      const incorrectChild = React.Children.toArray(children).find(
        (child: React.ReactNode) =>
          !React.isValidElement(child) ||
          (child.type !== ActionPopoverItem &&
            child.type !== ActionPopoverDivider),
      );

      return !incorrectChild;
    }, [children]);

    invariant(
      hasProperChildren,
      `ActionPopoverMenu only accepts children of type \`${ActionPopoverItem.displayName}\`` +
        ` and \`${ActionPopoverDivider.displayName}\`.`,
    );

    const items = useMemo(() => getItems(children), [children]);

    const checkItemDisabled = useCallback(
      (value: number) => isItemDisabled(items[value]),
      [items],
    );

    const firstFocusableItem = findFirstFocusableItem(items);

    const lastFocusableItem = findLastFocusableItem(items);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (Events.isTabKey(e)) {
          e.preventDefault();
          // TAB: close menu and allow focus to change to the next focusable element
          focusButton();
          setOpen(false);
        } else if (Events.isDownKey(e)) {
          // DOWN: focus on the next item or first non-disabled item
          e.preventDefault();
          e.stopPropagation();
          let indexValue = focusIndex + 1;
          while (indexValue < items.length && checkItemDisabled(indexValue)) {
            indexValue += 1;
          }
          if (indexValue >= items.length) {
            indexValue = firstFocusableItem;
          }
          setFocusIndex(indexValue);
        } else if (Events.isUpKey(e)) {
          // UP: focus on the previous item or last non-disabled item
          e.preventDefault();
          e.stopPropagation();
          let indexValue = focusIndex - 1;
          while (
            indexValue >= firstFocusableItem &&
            checkItemDisabled(indexValue)
          ) {
            indexValue -= 1;
          }
          if (indexValue < firstFocusableItem) {
            indexValue = lastFocusableItem;
          }
          setFocusIndex(indexValue);
        } else if (Events.isHomeKey(e)) {
          // HOME: focus on the first non-disabled item
          e.preventDefault();
          e.stopPropagation();
          const indexValue = firstFocusableItem;
          setFocusIndex(indexValue);
        } else if (Events.isEndKey(e)) {
          // END: focus on the last non-disabled item
          e.preventDefault();
          e.stopPropagation();
          const indexValue = lastFocusableItem;
          setFocusIndex(indexValue);
        } else if (e.key.length === 1) {
          // Any printable character: focus on the next non-disabled item on the list that starts with that character
          // Selection should wrap to the start of the list
          e.stopPropagation();
          let firstMatch: number | undefined;
          let nextMatch: number | undefined;
          items.forEach((item, index) => {
            if (
              React.isValidElement(item) &&
              !checkItemDisabled(index) &&
              item.props.children.toLowerCase().startsWith(e.key.toLowerCase())
            ) {
              // istanbul ignore else
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
      [
        focusButton,
        setOpen,
        focusIndex,
        items,
        checkItemDisabled,
        setFocusIndex,
        firstFocusableItem,
        lastFocusableItem,
      ],
    );

    const [childHasSubmenu, setChildHasSubmenu] = useState(false);
    const [childHasIcon, setChildHasIcon] = useState(false);
    const [currentSubmenuPosition, setCurrentSubmenuPosition] =
      useState<Alignment>(submenuPosition);

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
              childHasSubmenu,
              setChildHasSubmenu,
              childHasIcon,
              setChildHasIcon,
              currentSubmenuPosition,
              setCurrentSubmenuPosition,
              isASubmenu,
            },
          );
        }

        return child;
      });
    }, [
      children,
      focusIndex,
      isOpen,
      placement,
      horizontalAlignment,
      childHasSubmenu,
      childHasIcon,
      currentSubmenuPosition,
      isASubmenu,
    ]);

    return (
      <Menu
        data-component="action-popover"
        isOpen={isOpen}
        onKeyDown={onKeyDown}
        id={menuID}
        aria-labelledby={parentID}
        ref={ref}
        role="list"
        {...rest}
      >
        {clonedChildren}
      </Menu>
    );
  },
);

ActionPopoverMenu.displayName = "ActionPopoverMenu";

export default ActionPopoverMenu;
