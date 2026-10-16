import React, { useCallback } from "react";

import Button from "../../button/__next__";
import { IconType } from "../../icon";
import { useActionPopoverContext } from "../__internal__/action-popover.context";

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
  __isSubmenuParent?: boolean;
}

export const ActionPopoverItem = ({
  children,
  icon,
  disabled = false,
  onClick,
  download,
  href,
  __isSubmenuParent,
  ...rest
}: ActionPopoverItemProps) => {
  const { setOpenPopover, focusButton } = useActionPopoverContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (__isSubmenuParent) return;

      setOpenPopover(false);
      focusButton();
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    },
    [__isSubmenuParent, focusButton, onClick, setOpenPopover],
  );

  return (
    <Button
      {...rest}
      disabled={disabled}
      href={href}
      iconType={icon}
      iconPosition="before"
      onClick={handleClick}
      {...(href && download ? { download: true } : {})}
    >
      {children}
    </Button>
  );
};

ActionPopoverItem.displayName = "ActionPopoverItem";

export default ActionPopoverItem;
