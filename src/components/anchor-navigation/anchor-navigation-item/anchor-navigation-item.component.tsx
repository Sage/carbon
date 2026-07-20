import React from "react";
import Typography from "../../typography";
import StyledNavigationItem from "./anchor-navigation-item.style";

export interface AnchorNavigationItemProps {
  /** Reference to the section html element meant to be shown   */
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
>(({ target: _target, ...props }: AnchorNavigationItemProps, ref) => {
  // `target` is consumed by AnchorNavigation via child.props.target to scroll
  // to the target section; it is intentionally omitted from this component.
  const { children, onKeyDown, onClick, href, tabIndex, isSelected } = props;

  return (
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
          weight="medium"
        >
          {children}
        </Typography>
      </a>
    </StyledNavigationItem>
  );
});

AnchorNavigationItem.displayName = "AnchorNavigationItem";
export default AnchorNavigationItem;
