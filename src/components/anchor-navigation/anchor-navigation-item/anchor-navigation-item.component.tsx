import React from "react";
import Typography from "../../typography";
import StyledNavigationItem from "./anchor-navigation-item.style";

export interface AnchorNavigationItemProps {
  /** Reference to the section html element meant to be shown   */
  // eslint-disable-next-line react/no-unused-prop-types -- consumed by AnchorNavigation via child.props.target to scroll to the target section
  target?: React.RefObject<HTMLElement>;
  /** href to be passed to the anchor element, can be linked with id passed to the scrollable section */
  href?: string;
  /** Indicates if a component is selected */
  isSelected?: boolean;
  /** onClick handler */
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
  /** OnKeyDown handler */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLAnchorElement>) => void;
  /** tabIndex passed to the anchor element */
  tabIndex?: number;
  /** Children elements */
  children?: React.ReactNode;
}

const AnchorNavigationItem = React.forwardRef<
  HTMLAnchorElement,
  AnchorNavigationItemProps
>(
  (
    {
      children,
      onKeyDown,
      onClick,
      href,
      tabIndex,
      isSelected,
    }: AnchorNavigationItemProps,
    ref,
  ) => (
    <StyledNavigationItem isSelected={isSelected}>
      <a
        onKeyDown={onKeyDown}
        onClick={onClick}
        tabIndex={tabIndex}
        ref={ref}
        href={href}
        aria-current={isSelected ? "location" : undefined}
        data-element="anchor-navigation-item"
      >
        <Typography
          as="span"
          data-element="anchor-navigation-item-label"
          mb={0} // suppress default paragraph margin inside the nav item
          variant="p"
          size="M"
          weight="medium"
        >
          {children}
        </Typography>
      </a>
    </StyledNavigationItem>
  ),
);

AnchorNavigationItem.displayName = "AnchorNavigationItem";
export default AnchorNavigationItem;
