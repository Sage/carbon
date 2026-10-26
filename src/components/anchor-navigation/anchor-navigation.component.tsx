import React, {
  type AriaAttributes,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import throttle from "lodash/throttle";

import { TagProps } from "../../__internal__/utils/helpers/tags";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";
import { getWindow } from "../../__internal__/dom/globals";
import {
  StyledAnchorNavigation,
  StyledNavigationWrapper,
  StyledNavigation,
  StyledContent,
} from "./anchor-navigation.style";
import {
  AnchorNavigationProvider,
  AnchorNavigationItemEntry,
} from "./__internal__/anchor-navigation.context";

export interface AnchorNavigationProps
  extends TagProps,
    Pick<AriaAttributes, "aria-label" | "aria-labelledby"> {
  /** Child elements */
  children?: React.ReactNode;
  /** The AnchorNavigationItems components to be rendered in the sticky navigation.
  Items can be rendered conditionally or from within other components. */
  stickyNavigation?: React.ReactNode;
}

const SECTION_VISIBILITY_OFFSET = 200;
const SCROLL_THROTTLE = 100;

const useIsomorphicLayoutEffect = getWindow() ? useLayoutEffect : useEffect;

const AnchorNavigation = ({
  children,
  stickyNavigation,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "data-element": dataElement,
  "data-role": dataRole,
}: AnchorNavigationProps): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<HTMLAnchorElement | null>(
    null,
  );

  const [registryVersion, setRegistryVersion] = useState(0);

  const itemsByElement = useRef(
    new Map<HTMLAnchorElement, AnchorNavigationItemEntry>(),
  );

  const navigationRef = useRef<HTMLUListElement>(null);

  const isUserScroll = useRef(true);

  const isUserScrollTimer = useRef<NodeJS.Timeout>();

  // Items are ordered by their position in the DOM rather than by registration order,
  // so conditionally added or reordered items follow the rendered order.
  const getOrderedItems = useCallback(
    () =>
      Array.from(itemsByElement.current).sort(([a], [b]) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    [],
  );

  const registerItem = useCallback(
    (element: HTMLAnchorElement, entry: AnchorNavigationItemEntry) => {
      itemsByElement.current.set(element, entry);
      setRegistryVersion((version) => version + 1);

      return () => {
        itemsByElement.current.delete(element);
        setRegistryVersion((version) => version + 1);
      };
    },
    [],
  );

  // Keep the current selection while its item is rendered, otherwise fall back to the first item.
  useIsomorphicLayoutEffect(() => {
    setSelectedItem((current) =>
      current && itemsByElement.current.has(current)
        ? current
        : (getOrderedItems()[0]?.[0] ?? null),
    );
  }, [registryVersion, getOrderedItems]);

  const setSelectedAnchorBasedOnScroll = useCallback(() => {
    // istanbul ignore if
    // function is called only after component is rendered, so ref cannot hold a null value
    if (navigationRef.current === null) return;

    const offsetsWithItems = getOrderedItems()
      .map(([element, entry]) => [
        element,
        entry.getTarget()?.current?.getBoundingClientRect().top,
      ])
      .filter(
        (offsetWithItem): offsetWithItem is [HTMLAnchorElement, number] =>
          offsetWithItem[1] !== undefined,
      );

    if (offsetsWithItems.length === 0) return;

    const { top: navTopOffset } = navigationRef.current.getBoundingClientRect();

    const [itemOfSmallestNegativeTopOffset] = offsetsWithItems.reduce(
      (currentTop, offsetWithItem) => {
        const [, offset] = offsetWithItem;

        if (offset - SECTION_VISIBILITY_OFFSET > navTopOffset)
          return currentTop;
        return offset > currentTop[1] ? offsetWithItem : currentTop;
      },
      offsetsWithItems[0],
    );

    setSelectedItem(itemOfSmallestNegativeTopOffset);
  }, [getOrderedItems]);

  const scrollHandler = useMemo(
    () =>
      throttle(() => {
        /* istanbul ignore else */
        if (isUserScroll.current) {
          setSelectedAnchorBasedOnScroll();
        } else {
          if (isUserScrollTimer.current !== undefined) {
            window.clearTimeout(isUserScrollTimer.current);
          }
          isUserScrollTimer.current = setTimeout(() => {
            isUserScroll.current = true;
          }, SCROLL_THROTTLE + 50);
        }
      }, SCROLL_THROTTLE),
    [setSelectedAnchorBasedOnScroll],
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => window.removeEventListener("scroll", scrollHandler, true);
  }, [scrollHandler]);

  const focusSectionHeading = (section: HTMLElement) => {
    const heading = section.querySelector<HTMLElement>(
      "h1, h2, h3, h4, h5, h6",
    );
    const focusTarget = heading ?? section;

    if (!focusTarget.matches(defaultFocusableSelectors)) {
      focusTarget.setAttribute("tabindex", "-1");
    }

    if (!focusTarget.dataset.carbonAnchornavRef) {
      focusTarget.dataset.carbonAnchornavRef = "true";
    }

    focusTarget.focus({ preventScroll: true });
  };

  const activateItem = useCallback(
    (element: HTMLAnchorElement, target?: React.RefObject<HTMLElement>) => {
      const sectionToScroll = target?.current;

      if (!sectionToScroll) return;

      focusSectionHeading(sectionToScroll);

      // workaround due to preventScroll focus method option on firefox not working consistently
      window.setTimeout(() => {
        if (!itemsByElement.current.has(element)) return;

        isUserScroll.current = false;
        sectionToScroll.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth",
        });
        setSelectedItem(element);
      }, 10);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      isInAnchorNavigation: true,
      selectedItem,
      registerItem,
      activateItem,
    }),
    [selectedItem, registerItem, activateItem],
  );

  return (
    <StyledAnchorNavigation
      data-component="anchor-navigation"
      data-element={dataElement}
      data-role={dataRole}
    >
      <StyledNavigationWrapper
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {/* role="list" is explicit to restore list semantics in VoiceOver when list-style: none is applied */}
        <StyledNavigation
          ref={navigationRef}
          role="list"
          data-element="anchor-sticky-navigation"
        >
          <AnchorNavigationProvider value={contextValue}>
            {stickyNavigation}
          </AnchorNavigationProvider>
        </StyledNavigation>
      </StyledNavigationWrapper>
      <StyledContent>{children}</StyledContent>
    </StyledAnchorNavigation>
  );
};

AnchorNavigation.displayName = "AnchorNavigation";
export default AnchorNavigation;
