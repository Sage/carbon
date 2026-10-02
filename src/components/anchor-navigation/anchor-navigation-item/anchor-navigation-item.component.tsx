import React, { useContext, useRef } from "react";
import Typography from "../../typography";
import { getWindow } from "../../../__internal__/dom/globals";
import Event from "../../../__internal__/utils/helpers/events";
import AnchorNavigationContext from "../anchor-navigation.context";
import StyledNavigationItem from "./anchor-navigation-item.style";

export interface AnchorNavigationItemProps {
  /** Reference to the section html element meant to be shown   */
  target?: React.RefObject<HTMLElement>;
  /** href to be passed to the anchor element, can be linked with id passed to the scrollable section */
  href?: string;
  /** Marks this item as initially selected inside AnchorNavigation, including during server rendering. Only one item in a navigation should use this prop. */
  initiallySelected?: boolean;
  /** Indicates selection when this item is rendered without an AnchorNavigation parent. */
  isSelected?: boolean;
  /** Called when the item is clicked. Prevent the default event to cancel navigation activation. */
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Called when a key is pressed on the item. Prevent the default event to cancel navigation activation. */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLAnchorElement>) => void;
  /** tabIndex passed to the anchor element */
  tabIndex?: number;
  /** Children elements */
  children?: React.ReactNode;
}

const AnchorNavigationItem = React.forwardRef<
  HTMLAnchorElement,
  AnchorNavigationItemProps
>(({ target, ...props }: AnchorNavigationItemProps, ref) => {
  const context = useContext(AnchorNavigationContext);
  const registerItem = context?.registerItem;
  const {
    children,
    onKeyDown,
    onClick,
    href,
    tabIndex,
    isSelected,
    initiallySelected,
  } = props;
  const itemId = useRef<symbol>();

  if (!itemId.current) itemId.current = Symbol("anchor-navigation-item");

  const useIsomorphicLayoutEffect = getWindow()
    ? React.useLayoutEffect
    : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    if (!registerItem || !itemId.current) return undefined;

    return registerItem({
      id: itemId.current,
      target,
      initiallySelected,
    });
  }, [initiallySelected, registerItem, target]);
  const selected = context
    ? context.selectedItemId === itemId.current ||
      (context.selectedItemId === undefined && initiallySelected)
    : isSelected;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (!context || !itemId.current || event.defaultPrevented) return;

    event.preventDefault();
    context.activateItem(itemId.current);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    onKeyDown?.(event);

    if (!context || !itemId.current || event.defaultPrevented) return;

    if (Event.isEnterKey(event)) context.activateItem(itemId.current);
  };

  return (
    <StyledNavigationItem isSelected={selected}>
      <a
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        tabIndex={tabIndex}
        ref={ref}
        href={context ? href || "#" : href}
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
