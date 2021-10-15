import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Page from "./page/page.component";
import { PagesWrapperStyle, PagesContent } from "./pages.style";

const NEXT = "next";
const PREVIOUS = "previous";
const TRANSITION_TIME = 500;

const Pages = ({
  pageIndex: incomingPageIndex,
  initialpageIndex = 0,
  transition = "slide",
  children,
  ...props
}) => {
  const [pageIndex, setPageIndex] = useState(
    Number(incomingPageIndex) || Number(initialpageIndex)
  );

  const transitionDirection = useRef(NEXT);

  const transitionName = () => {
    if (transition === "slide") {
      return `slide-${transitionDirection.current}`;
    }

    return `carousel-transition-${transition}`;
  };

  const handleVisiblePage = () => {
    let index = pageIndex;

    const visiblePage = React.Children.toArray(children)[index];

    index = visiblePage.props.id || index;

    const additionalProps = {
      transitionName,
      timeout: TRANSITION_TIME,
      "data-element": "visible-page",
      key: `carbon-page-${visiblePage.props.id || pageIndex}`,
      className: visiblePage.props.className,
    };

    return React.cloneElement(visiblePage, {
      ...visiblePage.props,
      ...additionalProps,
    });
  };

  const numOfPages = useCallback(() => {
    return Array.isArray(children) ? children.length : 1;
  }, [children]);

  const verifyNewIndex = useCallback(
    (newIndex) => {
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
    [numOfPages]
  );

  useEffect(() => {
    if (typeof incomingPageIndex === "undefined") return;
    const newIndex = verifyNewIndex(incomingPageIndex); // 2
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
    <PagesWrapperStyle {...tagComponent("carousel", props)}>
      <PagesContent className="carbon-carousel__content">
        <TransitionGroup>{handleVisiblePage()}</TransitionGroup>
      </PagesContent>
    </PagesWrapperStyle>
  );
};

Pages.propTypes = {
  /** [legacy] Custom className */
  className: PropTypes.string,
  /** The selected tab on page load */
  initialpageIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Individual tabs */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Controls which transition to use. */
  transition: PropTypes.string,
};

export default Pages;

export { Page };
