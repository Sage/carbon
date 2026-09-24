/* istanbul ignore file */
import React from "react";

export interface ActionPopoverMenuBaseProps {
  /** Children for the menu */
  children?: React.ReactNode;
  /** Flag to indicate whether a menu should open */
  isOpen?: boolean;
  /** A unique ID for the menu */
  menuID?: string;
  /** Callback to set the isOpen flag */
  setOpen?: (args: boolean) => void;
  /** Unique ID for the menu's parent */
  parentID?: string;
  /** Set whether the menu should open above or below the button */
  placement?: "bottom" | "top";
}

export interface ActionPopoverMenuProps
  extends ActionPopoverMenuBaseProps,
    React.RefAttributes<HTMLUListElement> {}

/**
 * @deprecated This has been kept for backward compatibility.
 * Wrap ActionPopoverItems in a fragment and pass to `submenu` directly
 * */
const ActionPopoverMenu = React.forwardRef<
  HTMLUListElement,
  ActionPopoverMenuBaseProps
>(({ children, ...rest }, ref) => {
  void ref;
  void rest;

  return <>{children}</>;
});

ActionPopoverMenu.displayName = "ActionPopoverMenu";

export default ActionPopoverMenu;
