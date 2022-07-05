import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  createRef,
} from "react";
import { isFragment } from "react-is";
import invariant from "invariant";
import throttle from "lodash/throttle";

import Event from "../../__internal__/utils/helpers/events";
import {
  StyledAnchorNavigation,
  StyledNavigation,
  StyledContent,
} from "./anchor-navigation.style";
import AnchorNavigationItem, {
  AnchorNavigationItemProps,
} from "./anchor-navigation-item/anchor-navigation-item.component";

export interface AnchorNavigationProps {
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
}: AnchorNavigationProps): JSX.Element => {
  invariant(
    isFragment(stickyNavigation),
    "`stickyNavigation` prop in `AnchorNavigation` should be a React Fragment."
  );

  const hasCorrectItemStructure = useMemo(() => {
    const incorrectChild = React.Children.toArray(
      stickyNavigation.props.children
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
    `\`stickyNavigation\` prop in \`AnchorNavigation\` should be a React Fragment that only contains children of type \`${AnchorNavigationItem.displayName}\``
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionRefs = useRef<React.RefObject<HTMLElement>[]>(
    React.Children.map(
      stickyNavigation.props.children,
      (
        child: React.ReactElement<
          AnchorNavigationItemProps,
          typeof AnchorNavigationItem
        >
      ) => child.props.target
    )
  );

  const anchorRefs = useRef(
    Array.from(
      {
        length: React.Children.count(stickyNavigation.props.children),
      },
      () => createRef<HTMLAnchorElement>()
    )
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
          offsetWithIndex[1] !== undefined
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
      offsetsWithIndexes[0][0]
    );

    setSelectedIndex(indexOfSmallestNegativeTopOffset);
  }, []);

  const scrollHandler = useMemo(
    () =>
      throttle(() => {
        if (isUserScroll.current) {
          setSelectedAnchorBasedOnScroll();
        } else {
          if (isUserScrollTimer.current !== undefined)
            window.clearTimeout(isUserScrollTimer.current);

          isUserScrollTimer.current = setTimeout(() => {
            isUserScroll.current = true;
          }, SCROLL_THROTTLE + 50);
        }
      }, SCROLL_THROTTLE),
    [setSelectedAnchorBasedOnScroll]
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => window.removeEventListener("scroll", scrollHandler, true);
  }, [scrollHandler]);

  const focusFirstFocusableChild = (section: HTMLElement) => {
    const defaultFocusableSelectors =
      'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = section.querySelector<HTMLElement>(
      defaultFocusableSelectors
    );
    if (firstFocusableElement) {
      firstFocusableElement.focus({ preventScroll: true });
    }
  };

  const scrollToSection = (index: number): void => {
    const sectionToScroll = sectionRefs.current[index].current;

    // istanbul ignore if
    // function is called only after component is rendered, so ref cannot hold a null value
    if (sectionToScroll === null) return;

    focusFirstFocusableChild(sectionToScroll);

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

  const focusNavItem = (index: number): void => {
    const noOfRefs = anchorRefs.current.length;
    anchorRefs.current[
      ((index % noOfRefs) + noOfRefs) % noOfRefs
    ].current?.focus();
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ): void => {
    event.preventDefault();
    scrollToSection(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ): void => {
    event.preventDefault();
    if (Event.isUpKey(event)) {
      focusNavItem(index - 1);
    } else if (Event.isDownKey(event)) {
      focusNavItem(index + 1);
    } else if (Event.isEnterKey(event) || Event.isSpaceKey(event)) {
      scrollToSection(index);
    }
  };

  return (
    <StyledAnchorNavigation ref={contentRef} data-component="anchor-navigation">
      <StyledNavigation
        ref={navigationRef}
        data-element="anchor-sticky-navigation"
      >
        {React.Children.map(stickyNavigation.props.children, (child, index) =>
          React.cloneElement(child, {
            isSelected: index === selectedIndex,
            tabIndex: index === selectedIndex ? 0 : -1,
            onClick: (event: React.MouseEvent<HTMLAnchorElement>) =>
              handleClick(event, index),
            onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) =>
              handleKeyDown(event, index),
            ref: anchorRefs.current[index],
          })
        )}
      </StyledNavigation>
      <StyledContent>{children}</StyledContent>
    </StyledAnchorNavigation>
  );
};

AnchorNavigation.displayName = "AnchorNavigation";
export default AnchorNavigation;
