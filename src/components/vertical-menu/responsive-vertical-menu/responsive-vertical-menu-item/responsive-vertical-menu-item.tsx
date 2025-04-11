/* eslint-disable no-lonely-if */
import React, { useContext, useEffect, useRef, useState } from "react";

import {
  StyledIcon,
  StyledMenuItemContent,
  StyledNestedMenu,
  StyledResponsiveMenuAction,
  StyledResponsiveMenuItem,
} from "./responsive-vertical-menu-item.style";
import { useResponsiveVerticalMenu } from "../responsive-vertical-menu.context";
import Icon, { IconType } from "../../../icon";

import { IncreaseDepth, useDepth } from "../__internal__/depth.context";
import { useMenuFocus } from "../__internal__/focus.context";

export interface ResponsiveVerticalMenuItemProps {
  /** The content of the menu item. This will render the menu item as a parent menu. */
  children?: React.ReactNode;
  /** Custom icon to be displayed. Takes precedence over `icon` if both are specified. */
  customIcon?: React.ReactNode;
  /** If no icon is set, spacing will be applied to align the text correctly with other items. Set this property to `true` to prevent this from happening. */
  disableIconSpacing?: boolean;
  /** The destination URL. Providing this will render the menu item as an anchor link. */
  href?: string;
  /** The Carbon icon to be displayed. Defers to `customIcon` if both are defined. */
  icon?: IconType;
  /** The unique identifier for the menu item. */
  id: string;
  /** The label for the menu item. */
  label: string;
}

// Context to hold the parent item ID
const ParentItemContext = React.createContext<string | undefined>(undefined);

type BaseMenuItemContentProps = Pick<
  ResponsiveVerticalMenuItemProps,
  "customIcon" | "disableIconSpacing" | "icon" | "label"
>;
interface MenuItemContentProps extends BaseMenuItemContentProps {
  depth: number;
  responsive?: boolean;
}

// Renders the actual content of the menu item
const MenuItemContent = ({
  customIcon,
  depth,
  disableIconSpacing,
  icon,
  label,
  responsive,
}: MenuItemContentProps) => {
  // If a custom icon is provided, render it with the label
  // Otherwise, render the provided icon with the label.
  // If no icon is provided, render the label only; spacing
  // is adjusted based on the `disableIconSpacing` prop.
  return customIcon ? (
    <StyledMenuItemContent
      data-component="responsive-vertical-menu-custom-icon"
      data-role="responsive-vertical-menu-custom-icon"
      depth={depth}
      icon
      responsive={responsive}
    >
      {customIcon}
      {label}
    </StyledMenuItemContent>
  ) : (
    <StyledMenuItemContent
      data-component="responsive-vertical-menu-icon"
      data-role="responsive-vertical-menu-icon"
      depth={depth}
      disableIconSpacing={disableIconSpacing}
      icon={!!icon}
      responsive={responsive}
    >
      {icon && <Icon type={icon} />}
      {label}
    </StyledMenuItemContent>
  );
};

// Base component for the menu item
const BaseItem = React.forwardRef<HTMLElement, ResponsiveVerticalMenuItemProps>(
  (
    {
      children,
      disableIconSpacing = false,
      customIcon,
      icon,
      id,
      href,
      label,
      ...rest
    }: ResponsiveVerticalMenuItemProps,
    ref,
  ) => {
    const {
      activeMenuItem,
      containerRef,
      responsiveMode,
      setActiveMenuItem,
      reducedMotion,
    } = useResponsiveVerticalMenu();

    const {
      expandItem,
      focusItem,
      getRegisteredItems,
      moveFocus,
      registerMenuItem,
    } = useMenuFocus();

    const depth = useDepth();
    const isActive = activeMenuItem?.id === id;
    const hasChildren = React.Children.count(children) > 0;
    const parentId = useContext(ParentItemContext);
    const [expanded, setExpanded] = useState(false);

    // Register the menu item with the focus context
    // We can do this here as well as in the wrapping component to ensure
    // that the item is registered even if it is used as-is (as opposed to
    // via ResponsiveVerticalMenuItem).
    useEffect(() => {
      registerMenuItem(id, ref as React.RefObject<HTMLElement>, parentId);
    }, [id, registerMenuItem, parentId, ref]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Store a list of siblings
      let siblings;
      let siblingsAtDepth;

      switch (e.key) {
        case "Tab":
          siblingsAtDepth =
            containerRef.current?.querySelectorAll(`[data-depth="${depth}"]`) ||
            /* istanbul ignore next */ [];
          siblings = Array.from(siblingsAtDepth);

          // Primary-level menu items
          if (depth === 0) {
            if (hasChildren && activeMenuItem?.id === id) {
              // If the item is active and has children, move focus to the first child if the Shift key is not pressed
              if (!e.shiftKey) {
                e.preventDefault();
                moveFocus("firstChild");
              } else {
                // If the item is active and has children, move focus to the last child if the Shift key is pressed
                e.preventDefault();
                moveFocus("lastChild");
              }
            }
          }

          // Secondary-level menu items
          if (depth === 1) {
            const currentIndex = siblings.findIndex((el) => el.id === id);
            const isLastSibling = currentIndex === siblings.length - 1;
            const isFirstSibling = currentIndex === 0;

            // If the item is the last sibling and has no children (or it does but isn't expanded), move focus to the parent when forward-tabbing
            /* istanbul ignore else */
            if (isLastSibling) {
              if (!hasChildren || (hasChildren && !expanded)) {
                if (!e.shiftKey) {
                  e.preventDefault();
                  moveFocus("parent");
                }
              }
            }

            // If the item is the first sibling and shift is pressed, move focus to the parent
            if (isFirstSibling && e.shiftKey) {
              e.preventDefault();
              moveFocus("parent");
            }
          }

          // Tertiary-level menu items
          if (depth === 2) {
            const currentIndex = siblings.findIndex((el) => el.id === id);
            const isLastSibling = currentIndex === siblings.length - 1;

            /* istanbul ignore else */
            if (isLastSibling) {
              // If the item is the last sibling, find the grand-parent in the menu hierarchy
              const allMenuItems = getRegisteredItems();
              const parent = allMenuItems.find((item) => item.id === parentId);
              const grandParent = allMenuItems.find(
                (item) => item.id === parent?.parentId,
              );

              /* istanbul ignore else */
              if (grandParent) {
                // Check if the parent is the last sibling under the grand-parent
                const parentSiblings = Array.from(
                  containerRef.current?.querySelectorAll(
                    `[data-depth="${depth - 1}"]`,
                  ) || /* istanbul ignore next */ [],
                );
                const parentIsLastSibling =
                  parentSiblings.findIndex((el) => el.id === parentId) ===
                  parentSiblings.length - 1;

                // If the parent is the last sibling and shift is not pressed, move focus to the grand-parent
                if (parentIsLastSibling && !e.shiftKey) {
                  e.preventDefault();
                  focusItem(grandParent.id);
                }
              }
            }
          }
          break;

        // Handle activation keys
        case "Enter":
        case " ":
          e.preventDefault();
          /* istanbul ignore else */
          if (hasChildren) {
            // Toggle expanded state if not in responsive mode
            if (depth === 0 && !responsiveMode) {
              const itemToggled = activeMenuItem?.id === id;
              const newActiveMenuItem = itemToggled
                ? null
                : { id, label, children };
              // Set the active menu item
              setActiveMenuItem(newActiveMenuItem);
            } else {
              // Expand the menu
              setExpanded(!expanded);
              expandItem(id, !expanded);
            }
          } else if (href) {
            // If no children, navigate to the href
            window.location.href = href;
          }
          break;

        default:
          break;
      }
    };

    return (
      <>
        {hasChildren ? (
          <>
            <StyledResponsiveMenuItem
              active={isActive}
              aria-expanded={isActive || expanded}
              data-component={`responsive-vertical-menu-item-${id}`}
              data-depth={depth}
              data-role={`responsive-vertical-menu-item-${id}`}
              depth={depth}
              id={id}
              onClick={() => {
                // Mimic the behavior of the Enter key as defined in the handleKeyDown function
                if (depth === 0 && !responsiveMode) {
                  const itemToggled = activeMenuItem?.id === id;
                  const newActiveMenuItem = itemToggled
                    ? null
                    : { id, label, children };
                  setActiveMenuItem(newActiveMenuItem);
                } else {
                  setExpanded(!expanded);
                  expandItem(id, !expanded);
                }
                // Focus the clicked item
                focusItem(id);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => focusItem(id)}
              ref={ref as React.RefObject<HTMLButtonElement>}
              responsive={responsiveMode}
              tabIndex={0}
              type="button"
              {...rest}
            >
              <MenuItemContent
                customIcon={customIcon}
                depth={depth}
                disableIconSpacing={disableIconSpacing}
                icon={icon}
                label={label}
                responsive={responsiveMode}
              />
              <StyledIcon
                data-component="responsive-vertical-menu-expander-icon"
                data-role="responsive-vertical-menu-expander-icon"
                depth={depth}
                expanded={expanded || isActive}
                reduceMotion={reducedMotion || false}
                responsive={responsiveMode || false}
                type={depth >= 1 ? "chevron_down_thick" : "chevron_right_thick"}
              />
            </StyledResponsiveMenuItem>
            {expanded && (
              <StyledNestedMenu
                data-component={`${id}-nested-menu`}
                data-role={`${id}-nested-menu`}
                depth={depth}
                id={`${id}-nested-menu`}
                responsive={responsiveMode}
              >
                <ParentItemContext.Provider value={id}>
                  {children}
                </ParentItemContext.Provider>
              </StyledNestedMenu>
            )}
          </>
        ) : (
          <StyledResponsiveMenuAction
            data-component={`responsive-vertical-menu-item-${id}`}
            data-depth={depth}
            data-role={`responsive-vertical-menu-item-${id}`}
            depth={depth}
            href={href}
            id={id}
            onFocus={() => focusItem(id)}
            onKeyDown={handleKeyDown}
            ref={ref as React.RefObject<HTMLAnchorElement>}
            responsive={responsiveMode}
            tabIndex={0}
            {...rest}
          >
            <MenuItemContent
              customIcon={customIcon}
              depth={depth}
              disableIconSpacing={disableIconSpacing}
              icon={icon}
              label={label}
              responsive={responsiveMode}
            />
          </StyledResponsiveMenuAction>
        )}
      </>
    );
  },
);

// Main component for the responsive vertical menu item
export const ResponsiveVerticalMenuItem = ({
  children,
  id,
  label,
  ...props
}: ResponsiveVerticalMenuItemProps) => {
  const depth = useDepth();
  const itemRef = useRef<HTMLElement>(null);
  const { registerMenuItem } = useMenuFocus();
  const parentId = useContext(ParentItemContext);

  // Register the menu item with the focus context
  useEffect(() => {
    registerMenuItem(id, itemRef, parentId);
  }, [id, registerMenuItem, parentId]);

  return (
    <BaseItem id={id} label={label} {...props} data-depth={depth} ref={itemRef}>
      {children && (
        <ParentItemContext.Provider value={id}>
          <IncreaseDepth>{children}</IncreaseDepth>
        </ParentItemContext.Provider>
      )}
    </BaseItem>
  );
};

export default ResponsiveVerticalMenuItem;
