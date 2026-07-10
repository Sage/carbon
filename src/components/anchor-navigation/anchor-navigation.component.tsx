import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import invariant from "invariant";
import throttle from "lodash/throttle";

import { TagProps } from "../../__internal__/utils/helpers/tags";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";
import Event from "../../__internal__/utils/helpers/events";
import {
  StyledAnchorNavigation,
  StyledNavigationWrapper,
  StyledNavigation,
  StyledContent,
} from "./anchor-navigation.style";
import AnchorNavigationItem, {
  AnchorNavigationItemProps,
} from "./anchor-navigation-item/anchor-navigation-item.component";

export interface AnchorNavigationProps extends TagProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Accessible label for the navigation landmark. */
  "aria-label"?: string;
  /** ID of an element whose text content labels the navigation landmark (alternative to aria-label). */
  "aria-labelledby"?: string;
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "data-element": dataElement,
  "data-role": dataRole,
}: AnchorNavigationProps): JSX.Element => {
  invariant(
    React.isValidElement(stickyNavigation) &&
      stickyNavigation.type === React.Fragment,
    "`stickyNavigation` prop in `AnchorNavigation` should be a React Fragment.",
  );

  const hasCorrectItemStructure = useMemo(() => {
    const incorrectChild = React.Children.toArray(
      stickyNavigation.props.children,
    ).find((child: React.ReactNode) => {
      return (
        !React.isValidElement(child) ||
        (child.type as React.FunctionComponent).displayName !==
          "AnchorNavigationItem"
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

  const scrollToSection = (index: number): void => {
    const sectionToScroll = sectionRefs.current[index].current;

    // istanbul ignore if
    // function is called only after component is rendered, so ref cannot hold a null value
    if (sectionToScroll === null) return;

    focusSectionHeading(sectionToScroll);

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
      </StyledNavigationWrapper>
      <StyledContent>{children}</StyledContent>
    </StyledAnchorNavigation>
  );
};

AnchorNavigation.displayName = "AnchorNavigation";
export default AnchorNavigation;
