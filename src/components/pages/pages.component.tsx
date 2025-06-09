import React, { useCallback, useEffect, useRef, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Page from "./page";
import { PagesWrapperStyle, PagesContent } from "./pages.style";
import type { ThemeObject } from "../../style/themes/theme.types";

export interface PagesProps extends TagProps {
  /** The selected tab on page load */
  initialpageIndex?: number | string;
  /** The current page's index */
  pageIndex?: number | string;
  /** Individual Page components */
  children?: React.ReactNode;
  /** Controls which transition to use (fade or slide). */
  transition?: string;
  /** @ignore @private */
  theme?: Partial<ThemeObject>;
}

const NEXT = "next";
const PREVIOUS = "previous";
const TRANSITION_TIME = 500;

const Pages = ({
  pageIndex: incomingPageIndex,
  initialpageIndex = 0,
  transition = "slide",
  children,
  ...props
}: PagesProps) => {
  const [pageIndex, setPageIndex] = useState(
    Number(incomingPageIndex) || Number(initialpageIndex),
  );
  const transitionDirection = useRef(NEXT);

  const transitionName = () => {
    if (transition === "slide") {
      return `slide-${transitionDirection.current}`;
    }

    return `carousel-transition-${transition}`;
  };

  const handleVisiblePage = () => {
    const visiblePage = React.Children.toArray(children)[pageIndex];

    /* istanbul ignore if */
    if (!React.isValidElement(visiblePage)) return visiblePage;

    const additionalProps = {
      transitionName,
      timeout: TRANSITION_TIME,
      "data-element": "visible-page",
      "data-role": "visible-page",
      className: visiblePage.props.className,
    };

    return React.cloneElement(visiblePage, additionalProps);
  };

  const numOfPages = useCallback(() => {
    return Array.isArray(children) ? children.length : 1;
  }, [children]);

  const verifyNewIndex = useCallback(
    (newIndex: number) => {
      if (newIndex < 0) {
        // If the new index is negative, select the last page
        return numOfPages() - 1;
      }

      if (newIndex > numOfPages() - 1) {
        // If the new index is bigger than the number of slides, select the first page
        return 0;
      }

      return newIndex;
    },
    [numOfPages],
  );

  useEffect(() => {
    if (typeof incomingPageIndex === "undefined") return;
    const newIndex = verifyNewIndex(+incomingPageIndex);
    const currentIndex = pageIndex; // 1

    if (newIndex === currentIndex) return;
    if (newIndex > currentIndex) {
      transitionDirection.current = NEXT;
    } else {
      transitionDirection.current = PREVIOUS;
    }

    setPageIndex(newIndex);
  }, [incomingPageIndex, pageIndex, verifyNewIndex]);

  /** Renders the Slide Component */
  return (
    <PagesWrapperStyle {...tagComponent("pages", props)}>
      <PagesContent className="carbon-carousel__content">
        <TransitionGroup>{handleVisiblePage()}</TransitionGroup>
      </PagesContent>
    </PagesWrapperStyle>
  );
};

Pages.displayName = "Pages";

export default Pages;

export { Page };
