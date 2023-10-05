import React, { useCallback, useMemo, useContext, useState, useRef, useEffect } from "react";
import invariant from "invariant";

import { Menu } from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import ActionPopoverItem, {
  ActionPopoverItemProps,
  ActionPopoverItemContext
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
  // menuID?: string;
  // /** Callback to set the index of the focused item */
  // setFocusIndex?: (args: number) => void;
  // /** Callback to set the isOpen flag */
  // setOpen?: (args: boolean) => void;
  // /** Unique ID for the menu's parent */
  // parentID?: string;
  // /** Horizontal alignment of menu items content */
  // horizontalAlignment?: Alignment;
  // /** Set whether the menu should open above or below the button */
  placement?: "bottom" | "top";
  // /** @ignore @private */
  // role?: string;
  // /** @ignore @private */
  // isASubmenu?: boolean;
  // /** @ignore @private */
  // "data-element"?: string;
  // /** @ignore @private */
  // style?: {
  //   left: string | number;
  //   top?: string;
  //   bottom?: string;
  //   right: string | number;
  // };
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
      // parentID,
      focusIndex,
      // isOpen,
      // menuID,
      // setOpen,
      // setFocusIndex,
      placement = "bottom",
      // horizontalAlignment,
      // isASubmenu,
      ...rest
    }: ActionPopoverMenuBaseProps,
    ref
  ) => {
    let menuRef = useRef<HTMLDivElement | null>(null);

    if (ref) {
      menuRef = ref as React.MutableRefObject<HTMLTableRowElement | null>;
    }

    const context = useContext(ActionPopoverContext);
    const {
      isSubmenu,
      setOpen,
      parentID,
      menuID,
      // "data-element": "action-popover-submenu",
    isOpen,
    // ref: submenuRef,
    // style: containerPosition,
    // setFocusIndex,
    // focusIndex,
    // isSubmenu: true,
    // horizontalAlignment,
  } = useContext(ActionPopoverItemContext);

    invariant(
      context,
      "ActionPopoverMenu must be used within an ActionPopover component"
    );
    const { focusButton, submenuPosition } = context;

    // invariant(
    //   setOpen && setFocusIndex && typeof focusIndex !== "undefined",
    //   "ActionPopoverMenu must be used within an ActionPopover or ActionPopoverItem component"
    // );

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

    const getElements = useCallback(() => {
      if (menuRef.current) {
        console.log(isSubmenu)
        const domQuery = isSubmenu ? "[data-component='submenu-item']" : "[data-component='menu-item']"
        const elements: Element[] = Array.from(menuRef.current.querySelectorAll(domQuery) || []);

        return elements.filter((el) => el.getAttribute("aria-disabled") !== "true") as HTMLElement[];
      }

      return [];
    }, [isSubmenu]);

    useEffect(() => {
      if (isOpen) {
        const elements = getElements();
        elements[0]?.focus();
      }
    }, [isOpen, getElements])

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
          const elements = getElements();
          const currentIndex = elements.findIndex(el => el === document.activeElement);

          if (currentIndex < items.length - 1) {
            elements[currentIndex + 1]?.focus();
          } else {
            elements[0]?.focus();
          }
        } else if (Events.isUpKey(e)) {
          // UP: focus previous item or last
          e.preventDefault();
          e.stopPropagation();
          const elements = getElements();
          const currentIndex = elements.findIndex(el => el === document.activeElement);

          if (currentIndex > 0) {
            elements[currentIndex - 1]?.focus();
          } else {
            elements[items.length - 1]?.focus();
          }
        } else if (Events.isHomeKey(e)) {
          // HOME: focus first item
          e.preventDefault();
          e.stopPropagation();
          const elements = getElements();
          elements[0]?.focus();
        } else if (Events.isEndKey(e)) {
          // END: focus last item
          e.preventDefault();
          e.stopPropagation();
          const elements = getElements();
          elements[items.length - 1]?.focus();
        } else if (e.key.length === 1) {
          // any printable character: focus the next item on the list that starts with that character
          // selection should wrap to the start of the list
          e.stopPropagation();
          let firstMatch: number | undefined;
          let nextMatch: number | undefined;

          const elements = getElements();
          const currentIndex = elements.findIndex(el => el === document.activeElement);

          elements.forEach((el, index) => {
            if (el?.textContent?.toLowerCase()?.startsWith(e.key.toLowerCase())) {
              if (firstMatch === undefined) {
                firstMatch = index;
              }
              if (index > currentIndex && nextMatch === undefined) {
                nextMatch = index;
              }
            }
          })

          if (nextMatch !== undefined) {
            elements[nextMatch]?.focus();
          } else if (firstMatch !== undefined) {
            elements[firstMatch]?.focus();
          }
        }
      },
      [focusButton, setOpen, items, getElements]
    );

    const [childHasSubmenu, setChildHasSubmenu] = useState(false);
    const [childHasIcon, setChildHasIcon] = useState(false);
    const [
      currentSubmenuPosition,
      setCurrentSubmenuPosition,
    ] = useState<Alignment>(submenuPosition);

    // const clonedChildren = useMemo(() => {
    //   let index = 0;
    //   return React.Children.map(children, (child) => {
    //     if (React.isValidElement(child) && child.type === ActionPopoverItem) {
    //       index += 1;
    //       return React.cloneElement(
    //         child as React.ReactElement<ActionPopoverItemProps>,
    //         {
    //           placement: child.props.submenu ? placement : undefined,
    //           horizontalAlignment,
    //           childHasSubmenu,
    //           setChildHasSubmenu,
    //           childHasIcon,
    //           setChildHasIcon,
    //           currentSubmenuPosition,
    //           setCurrentSubmenuPosition,
    //           isASubmenu,
    //         }
    //       );
    //     }

    //     return child;
    //   });
    // }, [
    //   children,
    //   // focusIndex,
    //   // isOpen,
    //   placement,
    //   horizontalAlignment,
    //   childHasSubmenu,
    //   childHasIcon,
    //   currentSubmenuPosition,
    //   isASubmenu,
    // ]);

    return (
      <Menu
        data-component="action-popover"
        isOpen={isOpen}
        onKeyDown={onKeyDown}
        id={menuID}
        aria-labelledby={parentID}
        role="menu"
        ref={menuRef}
        {...rest}
      >
        {children}
      </Menu>
    );
  }
);

ActionPopoverMenu.displayName = "ActionPopoverMenu";

export default ActionPopoverMenu;
