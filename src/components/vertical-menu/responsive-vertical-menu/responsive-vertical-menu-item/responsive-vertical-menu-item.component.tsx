import React, {
  createContext,
  forwardRef,
  ReactNode,
  RefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import { MarginProps, PaddingProps } from "styled-system";
import { StyledResponsiveMenu } from "../responsive-vertical-menu.style";
import {
  StyledIcon,
  StyledMenuItemContent,
  StyledNestedMenu,
  StyledNestedMenuWrapper,
  StyledResponsiveMenuActionLink,
  StyledResponsiveMenuActionButton,
  StyledResponsiveMenuItem,
  StyledResponsiveMenuListItem,
} from "./responsive-vertical-menu-item.style";
import { filterStyledSystemMarginProps } from "../../../../style/utils";
import { IncreaseDepth, useDepth } from "../__internal__/depth.context";
import { useResponsiveVerticalMenu } from "../responsive-vertical-menu.context";

import Icon, { IconType } from "../../../icon";
import guid from "../../../../__internal__/utils/helpers/guid";
import Events from "../../../../__internal__/utils/helpers/events";

type AriaCurrent = Pick<
  React.HTMLAttributes<HTMLElement>,
  "aria-current"
>["aria-current"];

export type ResponsiveVerticalMenuItemClickEvent =
  | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  | React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>;

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
  onClick?: (event: ResponsiveVerticalMenuItemClickEvent) => void;
  /** The rel attribute to be used for the underlying <a> tag */
  rel?: string;
  /** The target to use for the menu item. */
  target?: string;
  /** Marks the element as the current item within a navigation context. */
  ariaCurrent?: AriaCurrent;
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
      ariaCurrent,
      ...rest
    }: BaseItemProps,
    ref,
  ) => {
    const {
      activeMenuItem,
      responsiveMode,
      setActive,
      setActiveMenuItem,
      reducedMotion,
      left,
      top,
      width,
      height,
    } = useResponsiveVerticalMenu();

    const depth = useDepth();
    const isActive = activeMenuItem?.id === id;
    const hasChildren = React.Children.count(children) > 0;
    const subMenuRef = useRef<HTMLUListElement>(null);
    const responsiveDisplay = useMemo(
      () => responsiveMode && depth === 0,
      [depth, responsiveMode],
    );
    const [expanded, setExpanded] = useState(
      (responsiveDisplay && hasChildren) || depth >= 2,
    );

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        // prevent default if there is children, if there is no children its the final available item and onClick must be triggered
        if (hasChildren) {
          e.preventDefault();
        }

        /*
         * Prevent browser default behaviour for space key which causes a page scroll
         * (similar to page down). This is only observed when space is pressed when the
         * action item is rendered as a link. When rendered as a button the menu will
         * close completely, meaning the behaviour is not observed at all.
         */
        /* istanbul ignore next - testing scroll behaviour in Playwright instead */
        if (!onClick && Events.isSpaceKey(e)) {
          e.preventDefault();
        }

        // If in responsive mode, do not toggle the menu
        /* istanbul ignore if */
        if (responsiveDisplay) return;

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
          }
        }
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
      }
    };

    const handleActionClick = (event: ResponsiveVerticalMenuItemClickEvent) => {
      onClick?.(event);

      setActive(false);
    };

    const ariaControls = (): string | undefined => {
      if (responsiveMode) {
        return depth === 0 ? undefined : `${id}-nested-menu-wrapper`;
      }

      return `responsive-vertical-menu-secondary`;
    };

    const responsiveMenuAction = () => {
      const sharedProps = {
        "data-component": `responsive-vertical-menu-item-${id}`,
        "data-depth": depth,
        "data-role": `responsive-vertical-menu-item-${id}`,
        "aria-current": ariaCurrent,
        depth,
        href,
        id,
        onClick: handleActionClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          /* istanbul ignore else */
          if (!responsiveMode) {
            handleKeyDown(e);
          }
        },
        rel,
        responsive: responsiveMode,
        tabIndex: 0,
        target,
        ...rest,
      };

      const menuItemContent = (
        <MenuItemContent
          customIcon={customIcon}
          depth={depth}
          hasChildren={false}
          icon={icon}
          label={label}
          responsive={responsiveMode}
        />
      );

      // This specific pattern has been used instead of the `as` prop as we want to avoid an over-reliance on styled components
      if (onClick && !href) {
        return (
          <StyledResponsiveMenuActionButton
            ref={ref as RefObject<HTMLButtonElement>}
            {...sharedProps}
          >
            {menuItemContent}
          </StyledResponsiveMenuActionButton>
        );
      }

      return (
        <StyledResponsiveMenuActionLink
          ref={ref as RefObject<HTMLAnchorElement>}
          {...sharedProps}
        >
          {menuItemContent}
        </StyledResponsiveMenuActionLink>
      );
    };

    return (
      <StyledResponsiveMenuListItem {...filterStyledSystemMarginProps(rest)}>
        {hasChildren ? (
          <>
            <StyledResponsiveMenuItem
              active={isActive}
              aria-expanded={
                responsiveMode && depth === 0 ? undefined : isActive || expanded
              }
              aria-controls={isActive || expanded ? ariaControls() : undefined}
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
                id={`${id}-nested-menu-wrapper`}
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

            {isActive && !responsiveMode && (
              <StyledResponsiveMenu
                data-component="responsive-vertical-menu-secondary"
                data-role="responsive-vertical-menu-secondary"
                height={height || "100%"}
                id="responsive-vertical-menu-secondary"
                left={left}
                menu="secondary"
                reduceMotion={false}
                ref={subMenuRef}
                responsive={false}
                tabIndex={-1}
                top={top}
                width={width}
              >
                {activeMenuItem.children}
              </StyledResponsiveMenu>
            )}
          </>
        ) : (
          responsiveMenuAction()
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

  const uniqueId = useRef(id || guid());

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
