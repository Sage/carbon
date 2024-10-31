import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { isFragment } from "react-is";
import invariant from "invariant";
import throttle from "lodash/throttle";

import { TagProps } from "../../__internal__/utils/helpers/tags";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";
import Event from "../../__internal__/utils/helpers/events";
import {
  StyledAnchorNavigation,
  StyledNavigation,
  StyledContent,
} from "./anchor-navigation.style";
import AnchorNavigationItem, {
  AnchorNavigationItemProps,
} from "./anchor-navigation-item/anchor-navigation-item.component";

export interface AnchorNavigationProps
  extends Omit<TagProps, "data-component"> {
  /** Child elements */
  children?: React.ReactNode;
  /** The AnchorNavigationItems components to be rendered in the sticky navigation.
  It is important to maintain proper structure.
  List of AnchorNavigationItems has to be wrapped in React.Fragment */
  stickyNavigation?: React.ReactNode;
}

const SECTION_VISIBILITY_OFFSET = 200;
const SCROLL_THROTTLE = 100;

const AnchorNavigation = ({
  children,
  stickyNavigation,
  "data-element": dataElement,
  "data-role": dataRole,
}: AnchorNavigationProps): JSX.Element => {
  invariant(
    isFragment(stickyNavigation),
    "`stickyNavigation` prop in `AnchorNavigation` should be a React Fragment.",
  );

  const hasCorrectItemStructure = useMemo(() => {
    const incorrectChild = React.Children.toArray(
      stickyNavigation.props.children,
    ).find((child: React.ReactNode) => {
      return (
        !React.isValidElement(child) ||
        (child.type as React.FunctionComponent).displayName !==
          AnchorNavigationItem.displayName
      );
    });

    return !incorrectChild;
  }, [stickyNavigation]);

  invariant(
    hasCorrectItemStructure,
    `\`stickyNavigation\` prop in \`AnchorNavigation\` should be a React Fragment that only contains children of type \`${AnchorNavigationItem.displayName}\``,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionRefs = useRef<React.RefObject<HTMLElement>[]>(
    React.Children.map(
      stickyNavigation.props.children,
      (
        child: React.ReactElement<
          AnchorNavigationItemProps,
          typeof AnchorNavigationItem
        >,
      ) => child.props.target,
    ),
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const navigationRef = useRef<HTMLUListElement>(null);

  const isUserScroll = useRef(true);

  const isUserScrollTimer = useRef<NodeJS.Timeout>();

  const setSelectedAnchorBasedOnScroll = useCallback(() => {
    // istanbul ignore if
    // function is called only after component is rendered, so ref cannot hold a null value
    if (navigationRef.current === null) return;

    const offsetsWithIndexes = sectionRefs.current
      .map(({ current }, index) => [
        index,
        current?.getBoundingClientRect().top,
      ])
      .filter(
        (offsetWithIndex): offsetWithIndex is [number, number] =>
          offsetWithIndex[1] !== undefined,
      );

    const { top: navTopOffset } = navigationRef.current.getBoundingClientRect();

    const indexOfSmallestNegativeTopOffset = offsetsWithIndexes.reduce(
      (currentTopIndex, offsetWithIndex) => {
        const [index, offset] = offsetWithIndex;

        if (offset - SECTION_VISIBILITY_OFFSET > navTopOffset)
          return currentTopIndex;
        return offset > offsetsWithIndexes[currentTopIndex][1]
          ? index
          : currentTopIndex;
      },
      offsetsWithIndexes[0][0],
    );

    setSelectedIndex(indexOfSmallestNegativeTopOffset);
  }, []);

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

  const focusSection = (section: HTMLElement) => {
    if (!section.matches(defaultFocusableSelectors)) {
      section.setAttribute("tabindex", "-1");
    }

    section.focus({ preventScroll: true });
  };

  const scrollToSection = (index: number): void => {
    const sectionToScroll = sectionRefs.current[index].current;

    // istanbul ignore if
    // function is called only after component is rendered, so ref cannot hold a null value
    if (sectionToScroll === null) return;

    // ensure section has the appropriate element to remove the default focus styles.
    // Can ignore else branch because there's no harm in setting this to "true" twice (it can't hold any other value),
    // but it's probably more efficient not to.
    // istanbul ignore else
    if (!sectionToScroll.dataset.carbonAnchornavRef) {
      sectionToScroll.dataset.carbonAnchornavRef = "true";
    }

    focusSection(sectionToScroll);

    // workaround due to preventScroll focus method option on firefox not working consistently
    window.setTimeout(() => {
      isUserScroll.current = false;
      sectionToScroll.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      });
      setSelectedIndex(index);
    }, 10);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ): void => {
    event.preventDefault();
    scrollToSection(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ): void => {
    if (Event.isEnterKey(event)) {
      scrollToSection(index);
    }
  };

  return (
    <StyledAnchorNavigation
      ref={contentRef}
      data-component="anchor-navigation"
      data-element={dataElement}
      data-role={dataRole}
    >
      <StyledNavigation
        ref={navigationRef}
        data-element="anchor-sticky-navigation"
      >
        {React.Children.map(stickyNavigation.props.children, (child, index) =>
          React.cloneElement(child, {
            href: child.props.href || "#", // need to pass an href to ensure the link is tabbable by default
            isSelected: index === selectedIndex,
            onClick: (event: React.MouseEvent<HTMLAnchorElement>) =>
              handleClick(event, index),
            onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) =>
              handleKeyDown(event, index),
          }),
        )}
      </StyledNavigation>
      <StyledContent>{children}</StyledContent>
    </StyledAnchorNavigation>
  );
};

AnchorNavigation.displayName = "AnchorNavigation";
export default AnchorNavigation;
