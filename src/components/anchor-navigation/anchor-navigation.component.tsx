import React, {
  type AriaAttributes,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import throttle from "lodash/throttle";

import { TagProps } from "../../__internal__/utils/helpers/tags";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";
import { StyledAnchorNavigation } from "./anchor-navigation.style";
import AnchorNavigationContext, {
  AnchorNavigationItemId,
  AnchorNavigationItemEntry,
} from "./anchor-navigation.context";
import AnchorNavigationLegacyAdapter from "./anchor-navigation-legacy-adapter.component";
export {
  AnchorNavigationContent,
  AnchorNavigationMenu,
} from "./anchor-navigation-menu.component";
export type {
  AnchorNavigationContentProps,
  AnchorNavigationMenuProps,
} from "./anchor-navigation-menu.component";

export interface AnchorNavigationProps
  extends TagProps,
    Pick<AriaAttributes, "aria-label" | "aria-labelledby"> {
  /** Child elements */
  children?: React.ReactNode;
  /**
   * @deprecated Use AnchorNavigationMenu and AnchorNavigationContent.
   * The prop will be removed in the next major version.
   */
  stickyNavigation?: React.ReactNode;
}

const SECTION_VISIBILITY_OFFSET = 200;
const SCROLL_THROTTLE = 100;

const AnchorNavigation = ({
  children,
  stickyNavigation,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "data-element": dataElement,
  "data-role": dataRole,
}: AnchorNavigationProps): JSX.Element => {
  const usesLegacyStickyNavigation = stickyNavigation !== undefined;
  const [selectedItemId, setSelectedItemId] =
    useState<AnchorNavigationItemId>();
  const itemRegistry = useRef(
    new Map<AnchorNavigationItemId, AnchorNavigationItemEntry>(),
  );

  const navigationRef = useRef<HTMLUListElement | null>(null);

  const isScrollSelectionPaused = useRef(false);

  const scrollSelectionResumeTimer = useRef<NodeJS.Timeout>();

  const registerItem = useCallback((item: AnchorNavigationItemEntry) => {
    itemRegistry.current.set(item.id, item);
    setSelectedItemId((current) =>
      item.initiallySelected ? item.id : (current ?? item.id),
    );

    return () => {
      itemRegistry.current.delete(item.id);
      setSelectedItemId((current) =>
        current === item.id
          ? itemRegistry.current.keys().next().value
          : current,
      );
    };
  }, []);

  const setNavigationElement = useCallback(
    (element: HTMLUListElement | null) => {
      navigationRef.current = element;
    },
    [],
  );

  const pauseScrollSelection = useCallback(() => {
    // Ignore scroll events caused by focus or programmatic navigation.
    isScrollSelectionPaused.current = true;

    if (scrollSelectionResumeTimer.current !== undefined) {
      window.clearTimeout(scrollSelectionResumeTimer.current);
    }

    scrollSelectionResumeTimer.current = setTimeout(() => {
      isScrollSelectionPaused.current = false;
    }, SCROLL_THROTTLE + 50);
  }, []);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const focusedItem = Array.from(itemRegistry.current.values()).find(
        (item) => item.target?.current?.contains(event.target),
      );

      if (focusedItem) {
        setSelectedItemId(focusedItem.id);
        pauseScrollSelection();
      }
    },
    [pauseScrollSelection],
  );

  const setSelectedItemBasedOnScroll = useCallback(() => {
    // istanbul ignore if
    // function is called only after component is rendered, so ref cannot hold a null value
    if (navigationRef.current === null) return;

    const offsetsWithIds = Array.from(itemRegistry.current.values())
      .map((item) => [
        item.id,
        item.target?.current?.getBoundingClientRect().top,
      ])
      .filter(
        (offsetWithId): offsetWithId is [AnchorNavigationItemId, number] =>
          offsetWithId[1] !== undefined,
      );

    if (offsetsWithIds.length === 0) return;

    const { top: navTopOffset } = navigationRef.current.getBoundingClientRect();

    const [idOfSmallestNegativeTopOffset] = offsetsWithIds.reduce(
      (currentTop, offsetWithIndex) => {
        const [, offset] = offsetWithIndex;

        if (offset - SECTION_VISIBILITY_OFFSET > navTopOffset)
          return currentTop;
        return offset > currentTop[1] ? offsetWithIndex : currentTop;
      },
      offsetsWithIds[0],
    );

    setSelectedItemId(idOfSmallestNegativeTopOffset);
  }, []);

  const scrollHandler = useMemo(
    () =>
      throttle(() => {
        if (isScrollSelectionPaused.current) {
          pauseScrollSelection();
          return;
        }

        setSelectedItemBasedOnScroll();
      }, SCROLL_THROTTLE),
    [pauseScrollSelection, setSelectedItemBasedOnScroll],
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
    (id: AnchorNavigationItemId): void => {
      const sectionToScroll = itemRegistry.current.get(id)?.target?.current;

      if (!sectionToScroll) return;

      focusSectionHeading(sectionToScroll);

      // workaround due to preventScroll focus method option on firefox not working consistently
      window.setTimeout(() => {
        pauseScrollSelection();
        sectionToScroll.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth",
        });
        setSelectedItemId(id);
      }, 10);
    },
    [pauseScrollSelection],
  );

  const contextValue = useMemo(
    () => ({
      registerItem,
      usesLegacyStickyNavigation,
      selectedItemId,
      activateItem,
      setNavigationElement,
      ariaLabel,
      ariaLabelledby,
    }),
    [
      activateItem,
      ariaLabel,
      ariaLabelledby,
      registerItem,
      usesLegacyStickyNavigation,
      selectedItemId,
      setNavigationElement,
    ],
  );

  return (
    <AnchorNavigationContext.Provider value={contextValue}>
      <StyledAnchorNavigation
        onFocus={handleFocus}
        data-component="anchor-navigation"
        data-element={dataElement}
        data-role={dataRole}
      >
        {usesLegacyStickyNavigation ? (
          <AnchorNavigationLegacyAdapter stickyNavigation={stickyNavigation}>
            {children}
          </AnchorNavigationLegacyAdapter>
        ) : (
          children
        )}
      </StyledAnchorNavigation>
    </AnchorNavigationContext.Provider>
  );
};

export default AnchorNavigation;
