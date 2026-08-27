import React from "react";

export interface ActionPopoverMenuBaseProps {
  /** Children for the menu */
  children?: React.ReactNode;
  /** @deprecated No longer used, focus is managed by the underlying PopoverMenu */
  focusIndex?: number;
  /** @deprecated No longer used, open state is managed by the parent ActionPopoverItem */
  isOpen?: boolean;
  /** A unique ID for the menu */
  menuID?: string;
  /** @deprecated No longer used, focus is managed by the underlying PopoverMenu */
  setFocusIndex?: (args: number) => void;
  /** @deprecated No longer used, open state is managed by the parent ActionPopoverItem */
  setOpen?: (args: boolean) => void;
  /** Unique ID for the menu's parent */
  parentID?: string;
  /**
   * @deprecated Submenus now open to the right and flip automatically when space is
   * constrained. This prop will be removed in a future major release.
   */
  placement?: "bottom" | "top";
  /** @ignore @private */
  role?: string;
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

/**
 * ActionPopoverMenu is now a transparent container. The list element, positioning and
 * keyboard behaviour are all owned by the PopoverMenu that renders the submenu, and the
 * children are validated eagerly by ActionPopoverItem, so this passes them through.
 */
const ActionPopoverMenu = React.forwardRef<
  HTMLUListElement,
  ActionPopoverMenuBaseProps
>(
  (
    { children }: ActionPopoverMenuBaseProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    return <>{children}</>;
  },
);

ActionPopoverMenu.displayName = "ActionPopoverMenu";
(
  ActionPopoverMenu as unknown as { skipMenuItemWrapping: boolean }
).skipMenuItemWrapping = true;

export default ActionPopoverMenu;
