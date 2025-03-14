import React, { useCallback, useEffect, useRef, useState } from "react";
import invariant from "invariant";

import {
  MenuItemIcon,
  SubMenuItemIcon,
  StyledMenuItem,
  StyledMenuItemInnerText,
  StyledMenuItemWrapper,
} from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import createGuid from "../../../__internal__/utils/helpers/guid";
import {
  Alignment,
  useActionPopoverContext,
} from "../__internal__/action-popover.context";

import { IconType } from "../../icon";
import ActionPopoverMenu, {
  ActionPopoverMenuProps,
} from "../action-popover-menu/action-popover-menu.component";

export interface ActionPopoverItemProps {
  /** The text label to display for this Item */
  children: string;
  /** Flag to indicate if item is disabled */
  disabled?: boolean;
  /** allows to provide download prop that works dependent with href */
  download?: boolean;
  /** allows to provide href prop */
  href?: string;
  /** The name of the icon to display next to the label */
  icon?: IconType;
  /** Callback to run when item is clicked */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Submenu component for item */
  submenu?: React.ReactNode;
  /** @ignore @private */
  placement?: "top" | "bottom";
  /** @ignore @private */
  focusItem?: boolean;
  /** @ignore @private */
  horizontalAlignment?: Alignment;
  /** @ignore @private */
  currentSubmenuPosition?: Alignment;
  /** @ignore @private */
  setCurrentSubmenuPosition?: (value: Alignment) => void;
}

const INTERVAL = 150;

type ContainerPosition = {
  left: string | number;
  top?: string;
  bottom?: string;
  right: string | number;
};

function checkRef(ref: React.RefObject<HTMLElement>) {
  return Boolean(ref && ref.current);
}

function calculateSubmenuPosition(
  ref: React.RefObject<HTMLElement>,
  submenuRef: React.RefObject<HTMLElement>,
  submenuPosition: Alignment,
  currentSubmenuPosition?: Alignment,
) {
  /* istanbul ignore if */

  if (!ref.current || !submenuRef.current)
    return currentSubmenuPosition || submenuPosition;

  const { left, right } = ref.current.getBoundingClientRect();
  const { offsetWidth } = submenuRef.current;
  const windowWidth = document.body.clientWidth;

  if (submenuPosition === "left") {
    return left >= offsetWidth ? "left" : "right";
  }
  return windowWidth >= right + offsetWidth ? "right" : "left";
}

export const ActionPopoverItem = ({
  children,
  icon,
  disabled = false,
  onClick: onClickProp,
  submenu,
  placement = "bottom",
  focusItem,
  download,
  href,
  horizontalAlignment,
  currentSubmenuPosition,
  setCurrentSubmenuPosition,
  ...rest
}: ActionPopoverItemProps) => {
  invariant(
    React.isValidElement(submenu) ? submenu.type === ActionPopoverMenu : true,
    "ActionPopoverItem only accepts submenu of type `ActionPopoverMenu`",
  );

  const { setOpenPopover, focusButton, submenuPosition } =
    useActionPopoverContext();
  const isHref = !!href;
  const [containerPosition, setContainerPosition] = useState<
    ContainerPosition | undefined
  >(undefined);
  const [guid] = useState(createGuid());
  const [isOpen, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number>(0);

  const submenuRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);
  const mouseLeaveTimer = useRef<NodeJS.Timeout | null>(null);

  const alignSubmenu = useCallback(() => {
    const checkCalculatedSubmenuPosition = calculateSubmenuPosition(
      ref,
      submenuRef,
      submenuPosition,
      currentSubmenuPosition,
    );

    setCurrentSubmenuPosition?.(checkCalculatedSubmenuPosition);

    return checkRef(ref) && checkRef(submenuRef) && submenu;
  }, [
    submenu,
    setCurrentSubmenuPosition,
    submenuPosition,
    currentSubmenuPosition,
  ]);

  useEffect(() => {
    const getContainerPosition = () => {
      /* istanbul ignore if */
      if (!ref.current || !submenuRef.current) return undefined;

      const { offsetWidth: submenuWidth } = submenuRef.current;

      const leftAlignedSubmenu = currentSubmenuPosition === "left";
      const leftValue = leftAlignedSubmenu ? -submenuWidth : "auto";
      const rightValue = leftAlignedSubmenu ? "auto" : -submenuWidth;
      const yPositionName =
        placement === "top"
          ? /* istanbul ignore next - tested in Playwright */ "bottom"
          : "top";

      return {
        left: leftValue,
        [yPositionName]: "calc(-1 * var(--spacing100))",
        right: rightValue,
      };
    };
    setContainerPosition(getContainerPosition);
  }, [submenu, currentSubmenuPosition, placement]);

  useEffect(() => {
    if (submenu) {
      alignSubmenu();
    }
  }, [alignSubmenu, submenu]);

  // Focuses item on opening of actionPopover submenu, but we want to do this once the Popover has finished opening
  // We always want the focused item to be in the user's view for accessibility purposes, and without the initial unexpected scroll to top of page when used in a table.
  useEffect(() => {
    if (focusItem) {
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
  }, [focusItem]);

  useEffect(() => {
    return function cleanup() {
      if (mouseEnterTimer.current) clearTimeout(mouseEnterTimer.current);
      if (mouseLeaveTimer.current) clearTimeout(mouseLeaveTimer.current);
    };
  }, []);

  useEffect(() => {
    const event = "resize";
    window.addEventListener(event, alignSubmenu);

    return function cleanup() {
      window.removeEventListener(event, alignSubmenu);
    };
  }, [alignSubmenu]);

  const onClick = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      e.stopPropagation();
      if (!disabled) {
        setOpenPopover(false);
        focusButton();
        if (onClickProp) {
          onClickProp(e);
        }
      } else {
        ref.current?.focus();
        e.preventDefault();
      }
    },
    [disabled, focusButton, onClickProp, setOpenPopover],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (Events.isSpaceKey(e)) {
        e.preventDefault();
        e.stopPropagation();
      } else if (!disabled) {
        if (submenu) {
          if (currentSubmenuPosition === "left") {
            // LEFT: open if has submenu and left aligned otherwise close submenu
            if (Events.isLeftKey(e) || Events.isEnterKey(e)) {
              setOpen(true);
              setFocusIndex(0);
              e.stopPropagation();
            } else if (Events.isRightKey(e)) {
              setOpen(false);
              ref.current?.focus();
              e.stopPropagation();
            }
          } else {
            // RIGHT: open if has submenu and right aligned otherwise close submenu
            if (Events.isRightKey(e) || Events.isEnterKey(e)) {
              setOpen(true);
              setFocusIndex(0);
              e.stopPropagation();
            }
            if (Events.isLeftKey(e)) {
              setOpen(false);
              ref.current?.focus();
              e.stopPropagation();
            }
          }
          e.preventDefault();
        } else if (Events.isEnterKey(e)) {
          if (isHref && download) {
            ref.current?.click();
          }
          e.preventDefault();
          // this type assertion should be safe as the onclick handler is designed to catch events propagating from the inner buttons
          onClick(e as React.KeyboardEvent<HTMLButtonElement>);
        }
      } else if (Events.isEnterKey(e)) {
        e.stopPropagation();
      }
    },
    [disabled, download, isHref, onClick, submenu, currentSubmenuPosition],
  );

  const itemSubmenuProps = {
    ...(!disabled && {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        ref.current?.focus();
        e.preventDefault();
        e.stopPropagation();
      },
    }),
    "aria-haspopup": "true",
    "aria-controls": `ActionPopoverMenu_${guid}`,
    "aria-expanded": isOpen,
  };

  const wrapperProps = {
    ...(!disabled && {
      onMouseEnter: (e: React.MouseEvent<HTMLLIElement>) => {
        if (mouseEnterTimer.current) clearTimeout(mouseEnterTimer.current);

        setFocusIndex(-1);
        mouseEnterTimer.current = setTimeout(() => {
          setOpen(true);
        }, INTERVAL);
        e.stopPropagation();
      },
      onMouseLeave: (e: React.MouseEvent<HTMLLIElement>) => {
        if (mouseLeaveTimer.current) clearTimeout(mouseLeaveTimer.current);

        mouseLeaveTimer.current = setTimeout(() => {
          setOpen(false);
        }, INTERVAL);
        e.stopPropagation();
      },
    }),
  };

  return (
    <StyledMenuItemWrapper onKeyDown={onKeyDown} {...(submenu && wrapperProps)}>
      <StyledMenuItem
        {...rest}
        ref={ref}
        onClick={onClick}
        type="button"
        tabIndex={0}
        isDisabled={disabled}
        {...(disabled && { "aria-disabled": true })}
        {...(isHref && { as: "a" as unknown as undefined, download, href })}
        {...(submenu && itemSubmenuProps)}
      >
        {submenu && checkRef(ref) && (
          <SubMenuItemIcon
            aria-hidden
            data-element="action-popover-menu-item-chevron"
            data-role="chevron-icon"
            type={
              currentSubmenuPosition === "left"
                ? "chevron_left_thick"
                : "chevron_right_thick"
            }
          />
        )}
        {icon && (
          <MenuItemIcon
            aria-hidden
            type={icon}
            data-element="action-popover-menu-item-icon"
            data-role="item-icon"
          />
        )}
        <StyledMenuItemInnerText data-element="action-popover-menu-item-inner-text">
          {children}
        </StyledMenuItemInnerText>
      </StyledMenuItem>
      {React.isValidElement(submenu)
        ? React.cloneElement<ActionPopoverMenuProps>(
            submenu as React.ReactElement<ActionPopoverMenuProps>,
            {
              parentID: `ActionPopoverItem_${guid}`,
              menuID: `ActionPopoverMenu_${guid}`,
              "data-element": "action-popover-submenu",
              isOpen,
              ref: submenuRef,
              style: containerPosition,
              setOpen,
              setFocusIndex,
              focusIndex,
              horizontalAlignment,
            },
          )
        : null}
    </StyledMenuItemWrapper>
  );
};

ActionPopoverItem.displayName = "ActionPopoverItem";

export default ActionPopoverItem;
