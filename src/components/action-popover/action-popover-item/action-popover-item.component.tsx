import React, { useCallback, useEffect, useRef } from "react";
import invariant from "invariant";

import {
  MenuItem,
  MenuItemLeading,
  MenuItemLabel,
} from "../../../__internal__/popover-menu";
import Icon, { IconType } from "../../icon";
import createGuid from "../../../__internal__/utils/helpers/guid";
import {
  Alignment,
  useActionPopoverContext,
} from "../__internal__/action-popover.context";
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
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Submenu component for item */
  submenu?: React.ReactNode;
  /** @ignore @private */
  focusItem?: boolean;
  /** @ignore @private */
  currentSubmenuPosition?: Alignment;
  /** @ignore @private */
  setCurrentSubmenuPosition?: (value: Alignment) => void;
}

const INTERVAL = 150;

export const ActionPopoverItem = ({
  children,
  icon,
  disabled = false,
  onClick: onClickProp,
  submenu,
  download,
  href,
  ...rest
}: ActionPopoverItemProps) => {
  invariant(
    React.isValidElement(submenu) ? submenu.type === ActionPopoverMenu : true,
    "ActionPopoverItem only accepts submenu of type `ActionPopoverMenu`",
  );

  // The submenu is only mounted once it opens, so its children are validated here
  // rather than waiting for ActionPopoverMenu to render them.
  const submenuHasProperChildren = React.isValidElement(submenu)
    ? !React.Children.toArray(
        (submenu.props as { children?: React.ReactNode }).children,
      ).find(
        (child) =>
          !React.isValidElement(child) ||
          ((child.type as React.FunctionComponent).displayName !==
            "ActionPopoverItem" &&
            (child.type as React.FunctionComponent).displayName !==
              "ActionPopoverDivider"),
      )
    : true;

  invariant(
    submenuHasProperChildren,
    "ActionPopoverMenu only accepts children of type `ActionPopoverItem`" +
      " and `ActionPopoverDivider`.",
  );

  const { setOpenPopover, focusButton, openSubmenuId, setOpenSubmenuId } =
    useActionPopoverContext();
  const submenuId = useRef(createGuid()).current;
  const submenuOpen = openSubmenuId === submenuId;
  const setSubmenuOpen = useCallback(
    (open: boolean) =>
      setOpenSubmenuId((current) => {
        if (open) return submenuId;
        // only close if this item still owns the open submenu, otherwise a submenu
        // that has just been opened elsewhere would be closed again immediately
        return current === submenuId ? null : current;
      }),
    [setOpenSubmenuId, submenuId],
  );
  const itemRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);
  const mouseLeaveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return function cleanup() {
      if (mouseEnterTimer.current) clearTimeout(mouseEnterTimer.current);
      if (mouseLeaveTimer.current) clearTimeout(mouseLeaveTimer.current);
    };
  }, []);

  const onClick = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      if (disabled) {
        // Keep focus on the disabled item rather than letting it fall back to the
        // menu trigger. Only the default action is suppressed: the event must still
        // reach the PopoverMenu wrapper, which uses it to recognise the click as
        // being inside the menu, otherwise the click-away listener closes the menu.
        itemRef.current?.focus();
        e.preventDefault();
        return;
      }

      // Submenu parents open their submenu rather than performing an action. That is
      // handled by the MenuItem this renders, so the event must be allowed to bubble
      // up to it rather than being stopped here.
      if (submenu) {
        return;
      }

      e.stopPropagation();
      setOpenPopover(false);
      focusButton();
      onClickProp?.(e);
    },
    [disabled, focusButton, onClickProp, setOpenPopover, submenu],
  );

  const onKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    // Space must never activate or scroll, matching the previous implementation
    if (ev.key === " ") {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    if (disabled && ev.key === "Enter") {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  const hoverProps =
    submenu && !disabled
      ? {
          onMouseEnter: () => {
            if (mouseEnterTimer.current) clearTimeout(mouseEnterTimer.current);
            mouseEnterTimer.current = setTimeout(
              () => setSubmenuOpen(true),
              INTERVAL,
            );
          },
          onMouseLeave: () => {
            if (mouseLeaveTimer.current) clearTimeout(mouseLeaveTimer.current);
            mouseLeaveTimer.current = setTimeout(
              () => setSubmenuOpen(false),
              INTERVAL,
            );
          },
        }
      : {};

  const content = (
    <>
      {icon && (
        <MenuItemLeading>
          <Icon
            aria-hidden
            type={icon}
            data-element="action-popover-menu-item-icon"
            data-role="item-icon"
          />
        </MenuItemLeading>
      )}
      <MenuItemLabel>
        <span data-element="action-popover-menu-item-inner-text">
          {children}
        </span>
      </MenuItemLabel>
    </>
  );

  const interactiveElement = href ? (
    <a
      {...rest}
      ref={itemRef}
      href={href}
      download={download}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      {...(disabled && { "aria-disabled": true })}
    >
      {content}
    </a>
  ) : (
    <button
      {...rest}
      ref={itemRef}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...(disabled && { "aria-disabled": true })}
    >
      {content}
    </button>
  );

  return (
    <MenuItem
      disabled={disabled}
      submenu={submenu}
      submenuOpen={submenuOpen}
      onSubmenuOpen={() => setSubmenuOpen(true)}
      onSubmenuClose={() => setSubmenuOpen(false)}
      {...hoverProps}
    >
      {interactiveElement}
    </MenuItem>
  );
};

ActionPopoverItem.displayName = "ActionPopoverItem";
ActionPopoverItem.skipMenuItemWrapping = true;

export default ActionPopoverItem;
