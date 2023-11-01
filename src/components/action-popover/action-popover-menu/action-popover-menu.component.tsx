import React, {
  useCallback,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";
import invariant from "invariant";

import { Menu } from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import ActionPopoverItem, {
  ActionPopoverItemProps,
} from "../action-popover-item/action-popover-item.component";
import ActionPopoverDivider from "../action-popover-divider/action-popover-divider.component";
import ActionPopoverContext, { Alignment } from "../action-popover-context";

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
      isASubmenu,
      ...rest
    }: ActionPopoverMenuBaseProps,
    ref
  ) => {
    const context = useContext(ActionPopoverContext);
    invariant(
      context,
      "ActionPopoverMenu must be used within an ActionPopover component"
    );
    const { focusButton, submenuPosition } = context;

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
            (child.type as React.FunctionComponent).displayName !==
              ActionPopoverItem.displayName &&
            (child.type as React.FunctionComponent).displayName !==
              ActionPopoverDivider.displayName
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

    const isItemDisabled = useCallback(
      (value: number) => {
        const item = items[value];
        // The invariant will be triggered before this else path can be explored, hence the ignore else.
        // istanbul ignore else
        return React.isValidElement(item) && item.props.disabled;
      },
      [items]
    );

    const firstFocusableItem = items.findIndex(
      (_, index) => !isItemDisabled(index)
    );

    // FIX-ME: FE-6248
    // Once we no longer support Node 16, this function can be removed and `findLastIndex()` can be used in it's place.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex
    function findLastFocusableItem() {
      let lastFocusableItem = -1;
      for (let i = items.length - 1; i >= 0; i--) {
        if (!isItemDisabled(i)) {
          lastFocusableItem = i;
          break;
        }
      }
      return lastFocusableItem;
    }

    const lastFocusableItem = findLastFocusableItem();

    useEffect(() => {
      if (isOpen && firstFocusableItem !== -1)
        setFocusIndex(firstFocusableItem);
    }, [isOpen, firstFocusableItem, setFocusIndex]);

    const onKeyDown = useCallback(
      (e) => {
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
          while (indexValue < items.length && isItemDisabled(indexValue)) {
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
            isItemDisabled(indexValue)
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
              !isItemDisabled(index) &&
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
        isItemDisabled,
        setFocusIndex,
        firstFocusableItem,
        lastFocusableItem,
      ]
    );

    const [childHasSubmenu, setChildHasSubmenu] = useState(false);
    const [childHasIcon, setChildHasIcon] = useState(false);
    const [
      currentSubmenuPosition,
      setCurrentSubmenuPosition,
    ] = useState<Alignment>(submenuPosition);

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
            }
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
