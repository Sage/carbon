import React, { useEffect, useLayoutEffect, useRef } from "react";
import Typography from "../../typography";
import { getWindow } from "../../../__internal__/dom/globals";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";
import { useAnchorNavigationContext } from "../__internal__/anchor-navigation.context";
import StyledNavigationItem from "./anchor-navigation-item.style";

export interface AnchorNavigationItemProps {
  /** Reference to the section html element meant to be shown   */
  target?: React.RefObject<HTMLElement>;
  /** href to be passed to the anchor element, can be linked with id passed to the scrollable section */
  href?: string;
  /** Indicates if a component is selected. Inside AnchorNavigation the selection is managed by AnchorNavigation and this prop is ignored. */
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

const useIsomorphicLayoutEffect = getWindow() ? useLayoutEffect : useEffect;

const AnchorNavigationItem = React.forwardRef<
  HTMLAnchorElement,
  AnchorNavigationItemProps
>(({ target, ...props }: AnchorNavigationItemProps, ref) => {
  const { children, onKeyDown, onClick, href, tabIndex, isSelected } = props;
  const { isInAnchorNavigation, selectedItem, registerItem, activateItem } =
    useAnchorNavigationContext();
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  // Read the latest target on scroll, so a new ref object does not re-register the item.
  const targetRef = useRef(target);
  targetRef.current = target;

  useIsomorphicLayoutEffect(() => {
    // istanbul ignore if
    // effect runs after the anchor is rendered, so ref cannot hold a null value
    if (!anchorRef.current) return undefined;

    return registerItem(anchorRef.current, {
      getTarget: () => targetRef.current,
    });
  }, [registerItem]);

  // Inside AnchorNavigation the selection is managed by the navigation, as before.
  const selected = isInAnchorNavigation
    ? selectedItem !== null && selectedItem === anchorRef.current
    : isSelected;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (!isInAnchorNavigation) return;

    event.preventDefault();
    activateItem(event.currentTarget, target);
  };

  return (
    <StyledNavigationItem isSelected={selected}>
      <a
        onKeyDown={onKeyDown}
        onClick={handleClick}
        tabIndex={tabIndex}
        ref={combineRefs(anchorRef, ref)}
        // need to pass an href to ensure the link is tabbable by default
        href={isInAnchorNavigation ? href || "#" : href}
        aria-current={selected ? "location" : undefined}
        data-element="anchor-navigation-item"
      >
        <span
          aria-hidden="true"
          data-element="anchor-navigation-item-indicator"
          data-role="anchor-navigation-item-indicator"
        />
        <Typography
          as="span"
          data-element="anchor-navigation-item-label"
          mb={0}
        >
          {children}
        </Typography>
      </a>
    </StyledNavigationItem>
  );
});

AnchorNavigationItem.displayName = "AnchorNavigationItem";
export default AnchorNavigationItem;
