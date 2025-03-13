import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import invariant from "invariant";

import {
  MenuItemIcon,
  SubMenuItemIcon,
  StyledMenuItem,
  StyledMenuItemInnerText,
  StyledMenuItemOuterContainer,
  StyledMenuItemWrapper,
} from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import createGuid from "../../../__internal__/utils/helpers/guid";
import ActionPopoverContext, {
  Alignment,
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
  childHasSubmenu?: boolean;
  /** @ignore @private */
  childHasIcon?: boolean;
  /** @ignore @private */
  currentSubmenuPosition?: Alignment;
  /** @ignore @private */
  setChildHasSubmenu?: (value: boolean) => void;
  /** @ignore @private */
  setChildHasIcon?: (value: boolean) => void;
  /** @ignore @private */
  setCurrentSubmenuPosition?: (value: Alignment) => void;
  /** @ignore @private */
  isASubmenu?: boolean;
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
  childHasSubmenu,
  childHasIcon,
  currentSubmenuPosition,
  setChildHasSubmenu,
  setChildHasIcon,
  setCurrentSubmenuPosition,
  isASubmenu = false,
  ...rest
}: ActionPopoverItemProps) => {
  const context = useContext(ActionPopoverContext);

  invariant(
    context,
    "ActionPopoverItem must be used within an ActionPopover component",
  );

  invariant(
    React.isValidElement(submenu) ? submenu.type === ActionPopoverMenu : true,
    "ActionPopoverItem only accepts submenu of type `ActionPopoverMenu`",
  );

  const { setOpenPopover, isOpenPopover, focusButton, submenuPosition } =
    context;
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

  useEffect(() => {
    /* istanbul ignore if - doesn't seem to actually run as the child item is unmounted before the context updates */
    if (!isOpenPopover) {
      setOpen(false);
    }
  }, [isOpenPopover]);

  useEffect(() => {
    if (icon) {
      setChildHasIcon?.(true);
    }
    if (submenu) {
      setChildHasSubmenu?.(true);
    }
  }, [icon, setChildHasSubmenu, setChildHasIcon, submenu]);

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
    "aria-haspopup": true,
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

  const renderMenuItemIcon = () => {
    return (
      icon && (
        <MenuItemIcon
          type={icon}
          data-element="action-popover-menu-item-icon"
          horizontalAlignment={horizontalAlignment}
          submenuPosition={currentSubmenuPosition}
          childHasIcon={childHasIcon}
          childHasSubmenu={childHasSubmenu}
          hasIcon={!!icon}
          hasSubmenu={!!submenu}
          isASubmenu={isASubmenu}
        />
      )
    );
  };

  return (
    <StyledMenuItemWrapper {...(submenu && wrapperProps)}>
      <div onKeyDown={onKeyDown} role="presentation">
        <StyledMenuItem
          {...rest}
          ref={ref}
          onClick={onClick}
          type="button"
          tabIndex={0}
          isDisabled={disabled}
          horizontalAlignment={horizontalAlignment}
          submenuPosition={currentSubmenuPosition}
          hasSubmenu={!!submenu}
          childHasSubmenu={childHasSubmenu}
          {...(disabled && { "aria-disabled": true })}
          {...(isHref && { as: "a" as unknown as undefined, download, href })}
          {...(submenu && itemSubmenuProps)}
        >
          {submenu && checkRef(ref) && currentSubmenuPosition === "left" ? (
            <SubMenuItemIcon
              data-element="action-popover-menu-item-chevron"
              type="chevron_left_thick"
            />
          ) : null}
          <StyledMenuItemOuterContainer>
            {horizontalAlignment === "left" ? renderMenuItemIcon() : null}
            <StyledMenuItemInnerText
              data-element="action-popover-menu-item-inner-text"
              horizontalAlignment={horizontalAlignment}
              submenuPosition={currentSubmenuPosition}
              isASubmenu={isASubmenu}
              childHasSubmenu={childHasSubmenu}
              childHasIcon={childHasIcon}
              hasIcon={!!icon}
              hasSubmenu={!!submenu}
            >
              {children}
            </StyledMenuItemInnerText>
            {horizontalAlignment === "right" ? renderMenuItemIcon() : null}
          </StyledMenuItemOuterContainer>
          {submenu && checkRef(ref) && currentSubmenuPosition === "right" ? (
            <SubMenuItemIcon
              data-element="action-popover-menu-item-chevron"
              type="chevron_right_thick"
            />
          ) : null}
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
                isASubmenu: true,
                horizontalAlignment,
              },
            )
          : null}
      </div>
    </StyledMenuItemWrapper>
  );
};

ActionPopoverItem.displayName = "ActionPopoverItem";

export default ActionPopoverItem;
