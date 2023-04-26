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
  StyledMenuItemWrapper,
} from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import createGuid from "../../../__internal__/utils/helpers/guid";
import ActionPopoverContext from "../action-popover-context";
import useLocale from "../../../hooks/__internal__/useLocale";

import { IconType } from "../../icon";
import ActionPopoverMenu from "../action-popover-menu/action-popover-menu.component";

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
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** Submenu component for item */
  submenu?: React.ReactNode;
  /** @ignore @private */
  placement?: "top" | "bottom";
  /** @ignore @private */
  focusItem?: boolean;
  /** @ignore @private */
  horizontalAlignment?: "left" | "right";
}

const INTERVAL = 150;

type ContainerPosition = {
  left: number;
  top?: string;
  bottom?: string;
  right: "auto";
};

function checkRef(ref: React.RefObject<HTMLElement>) {
  return Boolean(ref && ref.current);
}

function leftAlignSubmenu(
  ref: React.RefObject<HTMLElement>,
  submenuRef: React.RefObject<HTMLElement>
) {
  /* istanbul ignore if */
  if (!ref.current || !submenuRef.current) return true;

  const { left } = ref.current.getBoundingClientRect();
  const { offsetWidth } = submenuRef.current;

  return left >= offsetWidth;
}

function getContainerPosition(
  itemRef: React.RefObject<HTMLElement>,
  submenuRef: React.RefObject<HTMLElement>,
  placement: "bottom" | "top"
): ContainerPosition | undefined {
  /* istanbul ignore if */
  if (!itemRef.current || !submenuRef.current) return undefined;

  const { offsetWidth: parentWidth } = itemRef.current;
  const { offsetWidth: submenuWidth } = submenuRef.current;
  const xPositionValue = leftAlignSubmenu(itemRef, submenuRef)
    ? -submenuWidth
    : parentWidth;
  const yPositionName = placement === "top" ? "bottom" : "top";

  return {
    left: xPositionValue,
    [yPositionName]: "calc(-1 * var(--spacing100))",
    right: "auto",
  };
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
  ...rest
}: ActionPopoverItemProps) => {
  const l = useLocale();
  const context = useContext(ActionPopoverContext);

  invariant(
    context,
    "ActionPopoverItem must be used within an ActionPopover component"
  );

  invariant(
    React.isValidElement(submenu) ? submenu.type === ActionPopoverMenu : true,
    "ActionPopoverItem only accepts submenu of type `ActionPopoverMenu`"
  );

  const { setOpenPopover, isOpenPopover, focusButton } = context;
  const isHref = !!href;
  const [containerPosition, setContainerPosition] = useState<
    ContainerPosition | undefined
  >(undefined);
  const [guid] = useState(createGuid());
  const [isOpen, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [isLeftAligned, setIsLeftAligned] = useState(true);

  const submenuRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);
  const mouseLeaveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpenPopover) {
      setOpen(false);
    }
  }, [isOpenPopover]);

  const alignSubmenu = useCallback(() => {
    if (checkRef(ref) && checkRef(submenuRef) && submenu) {
      const align = leftAlignSubmenu(ref, submenuRef);
      setIsLeftAligned(align);
      setContainerPosition(getContainerPosition(ref, submenuRef, placement));
    }
  }, [submenu, placement]);

  useEffect(() => {
    alignSubmenu();

    if (focusItem) {
      ref.current?.focus();
    }
  }, [alignSubmenu, focusItem]);

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
        | React.KeyboardEvent<HTMLButtonElement>
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
    [disabled, focusButton, onClickProp, setOpenPopover]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (Events.isSpaceKey(e)) {
        e.preventDefault();
        e.stopPropagation();
      } else if (!disabled) {
        if (submenu) {
          if (isLeftAligned) {
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
    [disabled, download, isHref, isLeftAligned, onClick, submenu]
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
    "aria-label": l.actionPopover.ariaLabel(),
    "aria-controls": `ActionPopoverMenu_${guid}`,
    "aria-expanded": isOpen,
  };

  const wrapperDivProps = {
    ...(!disabled && {
      onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
        if (mouseEnterTimer.current) clearTimeout(mouseEnterTimer.current);

        setFocusIndex(-1);
        mouseEnterTimer.current = setTimeout(() => {
          setOpen(true);
        }, INTERVAL);
        e.stopPropagation();
      },
      onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
        if (mouseLeaveTimer.current) clearTimeout(mouseLeaveTimer.current);

        mouseLeaveTimer.current = setTimeout(() => {
          setOpen(false);
        }, INTERVAL);
        e.stopPropagation();
      },
    }),
  };

  const renderMenuItemIcon = () => {
    return icon && <MenuItemIcon as={undefined} type={icon} />;
  };

  return (
    <StyledMenuItemWrapper {...(submenu && wrapperDivProps)}>
      <div onKeyDown={onKeyDown} role="presentation">
        <StyledMenuItem
          {...rest}
          ref={ref}
          onClick={onClick}
          type="button"
          role="menuitem"
          tabIndex={0}
          isDisabled={disabled}
          horizontalAlignment={horizontalAlignment}
          {...(disabled && { "aria-disabled": true })}
          {...(isHref && { as: ("a" as unknown) as undefined, download, href })}
          {...(submenu && itemSubmenuProps)}
        >
          {submenu && checkRef(ref) && isLeftAligned ? (
            <SubMenuItemIcon type="chevron_left" />
          ) : null}
          {horizontalAlignment === "left" ? renderMenuItemIcon() : null}
          {children}
          {horizontalAlignment === "right" ? renderMenuItemIcon() : null}
          {submenu && checkRef(ref) && !isLeftAligned ? (
            <SubMenuItemIcon type="chevron_right" />
          ) : null}
        </StyledMenuItem>
        {React.isValidElement(submenu)
          ? React.cloneElement(submenu, {
              parentID: `ActionPopoverItem_${guid}`,
              menuID: `ActionPopoverMenu_${guid}`,
              "data-element": "action-popover-submenu",
              isOpen,
              ref: submenuRef,
              style: containerPosition,
              setOpen,
              setFocusIndex,
              focusIndex,
            })
          : null}
      </div>
    </StyledMenuItemWrapper>
  );
};

ActionPopoverItem.displayName = "ActionPopoverItem";

export default ActionPopoverItem;
