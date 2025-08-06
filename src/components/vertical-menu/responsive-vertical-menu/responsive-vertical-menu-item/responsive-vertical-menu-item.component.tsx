import React, {
  createContext,
  forwardRef,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MarginProps, PaddingProps } from "styled-system";

import {
  StyledIcon,
  StyledMenuItemContent,
  StyledNestedMenu,
  StyledNestedMenuWrapper,
  StyledResponsiveMenuAction,
  StyledResponsiveMenuItem,
  StyledResponsiveMenuListItem,
} from "./responsive-vertical-menu-item.style";
import { IncreaseDepth, useDepth } from "../__internal__/depth.context";
import { useMenuFocus } from "../__internal__/focus.context";
import { useResponsiveVerticalMenu } from "../responsive-vertical-menu.context";

import Icon, { IconType } from "../../../icon";
import guid from "../../../../__internal__/utils/helpers/guid";

interface BaseItemProps extends MarginProps, PaddingProps {
  /** The content of the menu item. This will render the menu item as a parent menu. */
  children?: ReactNode;
  /** Custom icon to be displayed. Takes precedence over `icon` if both are specified. */
  customIcon?: ReactNode;
  /** External URL or anchor link for standard HTML navigation. Providing this will render the menu item as an anchor link. */
  href?: string;
  /** The Carbon icon to be displayed. Defers to `customIcon` if both are defined. */
  icon?: IconType;
  /** The unique identifier for the menu item. */
  id: string;
  /** The label for the menu item. */
  label: React.ReactNode;
  /** A custom click handler to run when an anchor link is clicked */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** The rel attribute to be used for the underlying <a> tag */
  rel?: string;
  /** The target to use for the menu item. */
  target?: string;
}

// Standard TS pattern for overriding props
export interface ResponsiveVerticalMenuItemProps
  extends Omit<BaseItemProps, "id"> {
  /** The unique identifier for the menu item. */
  id?: string;
}

// Context to hold the parent item ID
const ParentItemContext = createContext<string | undefined>(undefined);

interface MenuItemContentProps
  extends Pick<
    ResponsiveVerticalMenuItemProps,
    "customIcon" | "icon" | "label"
  > {
  depth: number;
  hasChildren?: boolean;
  responsive?: boolean;
}

// Renders the actual content of the menu item
const MenuItemContent = ({
  customIcon,
  depth,
  hasChildren,
  icon,
  label,
  responsive,
}: MenuItemContentProps) => {
  // If a custom icon is provided, render it with the label
  // Otherwise, render the provided icon with the label.
  // If no icon is provided, render the label only.
  return customIcon ? (
    <StyledMenuItemContent
      data-component="responsive-vertical-menu-custom-icon"
      data-role="responsive-vertical-menu-custom-icon"
      depth={depth}
      hasChildren={hasChildren}
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
      hasChildren={hasChildren}
      icon={!!icon}
      responsive={responsive}
    >
      {icon && <Icon type={icon} />}
      {label}
    </StyledMenuItemContent>
  );
};

// Base component for the menu item
const BaseItem = forwardRef<HTMLElement, BaseItemProps>(
  (
    {
      children,
      customIcon,
      icon,
      id,
      href,
      label,
      onClick,
      rel,
      target,
      ...rest
    }: BaseItemProps,
    ref,
  ) => {
    const {
      activeMenuItem,
      containerRef,
      responsiveMode,
      setActive,
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
    const responsiveDisplay = useMemo(
      () => responsiveMode && depth === 0,
      [depth, responsiveMode],
    );
    const [expanded, setExpanded] = useState(
      (responsiveDisplay && hasChildren) || depth >= 2,
    );

    // Register the menu item with the focus context
    // We can do this here as well as in the wrapping component to ensure
    // that the item is registered even if it is used as-is (as opposed to
    // via ResponsiveVerticalMenuItem).
    useEffect(() => {
      registerMenuItem(id, ref as RefObject<HTMLElement>, parentId);
    }, [id, parentId, ref, registerMenuItem]);

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
          if (depth === 0 && hasChildren && activeMenuItem?.id === id) {
            e.preventDefault();
            // If the item is active and has children, move focus to the first/last child, based on whether the Shift key is pressed or not
            moveFocus(!e.shiftKey ? "firstChild" : "lastChild");
          }

          // Secondary-level menu items
          if (depth === 1) {
            const currentIndex = siblings.findIndex((el) => el.id === id);
            const isLastSibling = currentIndex === siblings.length - 1;
            const isFirstSibling = currentIndex === 0;

            // If the item is the last sibling and has no children (or it does but isn't expanded), move focus to the parent when forward-tabbing
            /* istanbul ignore else */
            if (isLastSibling && (!hasChildren || (hasChildren && !expanded))) {
              if (!e.shiftKey) {
                e.preventDefault();
                moveFocus("parent");
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

          // If in responsive mode, do not toggle the menu
          /* istanbul ignore if */
          if (responsiveDisplay) return;

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
          } else if (href && e.key === "Enter") {
            // If no children, navigate to the href. Can only be activated with Enter key,
            // as per accessibility guidelines.
            window.location.href = href;
          }
          break;

        default:
          break;
      }
    };

    const handleClick = () => {
      // If in responsive mode, do not toggle the menu
      if (responsiveDisplay) return;

      // Mimic the behavior of the Enter key as defined in the handleKeyDown function
      if (depth === 0 && !responsiveMode) {
        const itemToggled = activeMenuItem?.id === id;
        const newActiveMenuItem = itemToggled ? null : { id, label, children };
        setActiveMenuItem(newActiveMenuItem);
      } else {
        setExpanded(!expanded);
        expandItem(id, !expanded);
      }
      // Focus the clicked item
      focusItem(id);
    };

    const handleActionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      setActive(false);
    };

    return (
      <StyledResponsiveMenuListItem>
        {hasChildren ? (
          <>
            <StyledResponsiveMenuItem
              active={isActive}
              aria-expanded={isActive || expanded}
              data-component={`responsive-vertical-menu-item-${id}`}
              data-depth={depth}
              data-role={`responsive-vertical-menu-item-${id}`}
              depth={depth}
              hasIcon={!!icon || !!customIcon}
              id={id}
              onClick={handleClick}
              onKeyDown={(e) => {
                /* istanbul ignore else */
                if (!responsiveMode) {
                  handleKeyDown(e);
                }
              }}
              onFocus={() => focusItem(id)}
              ref={ref as RefObject<HTMLButtonElement>}
              responsive={responsiveMode}
              tabIndex={responsiveDisplay ? -1 : 0}
              type="button"
              {...rest}
            >
              <MenuItemContent
                customIcon={customIcon}
                depth={depth}
                hasChildren
                icon={icon}
                label={label}
                responsive={responsiveMode}
              />
              {!responsiveDisplay && (
                <StyledIcon
                  data-component="responsive-vertical-menu-expander-icon"
                  data-role="responsive-vertical-menu-expander-icon"
                  depth={depth}
                  expanded={expanded || isActive}
                  reduceMotion={!!reducedMotion}
                  type={
                    depth >= 1 ? "chevron_down_thick" : "chevron_right_thick"
                  }
                />
              )}
            </StyledResponsiveMenuItem>
            {expanded && (
              <StyledNestedMenuWrapper
                data-component={`${id}-nested-menu-wrapper`}
                data-role={`${id}-nested-menu-wrapper`}
                depth={depth}
                hasIcon={!!icon || !!customIcon}
                responsive={responsiveMode}
              >
                <StyledNestedMenu
                  data-component={`${id}-nested-menu`}
                  data-role={`${id}-nested-menu`}
                  depth={depth}
                  hasIcon={!!icon || !!customIcon}
                  id={`${id}-nested-menu`}
                  responsive={responsiveMode}
                >
                  <ParentItemContext.Provider value={id}>
                    {children}
                  </ParentItemContext.Provider>
                </StyledNestedMenu>
              </StyledNestedMenuWrapper>
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
            onClick={handleActionClick}
            onFocus={() => focusItem(id)}
            onKeyDown={(e) => {
              /* istanbul ignore else */
              if (!responsiveMode) {
                handleKeyDown(e);
              }
            }}
            ref={ref as RefObject<HTMLAnchorElement>}
            rel={rel}
            responsive={responsiveMode}
            tabIndex={0}
            target={target}
            {...rest}
          >
            <MenuItemContent
              customIcon={customIcon}
              depth={depth}
              hasChildren={false}
              icon={icon}
              label={label}
              responsive={responsiveMode}
            />
          </StyledResponsiveMenuAction>
        )}
      </StyledResponsiveMenuListItem>
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

  const uniqueId = useRef(id || guid());

  // Register the menu item with the focus context
  useEffect(() => {
    const currentId = uniqueId.current;

    registerMenuItem(currentId, itemRef, parentId);
  }, [parentId, registerMenuItem]);

  return (
    <BaseItem
      id={uniqueId.current}
      label={label}
      {...props}
      data-depth={depth}
      ref={itemRef}
    >
      {children && (
        <ParentItemContext.Provider value={id}>
          <IncreaseDepth>{children}</IncreaseDepth>
        </ParentItemContext.Provider>
      )}
    </BaseItem>
  );
};

export default ResponsiveVerticalMenuItem;
