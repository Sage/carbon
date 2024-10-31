import React, { useRef } from "react";

import {
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerNoSelect,
  StyledPagerNavLabel,
} from "../pager.style";
import NumberInput from "../../number";
import Events from "../../../__internal__/utils/helpers/events";
import createGuid from "../../../__internal__/utils/helpers/guid";
import PagerNavigationLink from "./pager-navigation-link.component";
import useLocale from "../../../hooks/__internal__/useLocale";

export interface PagerNavigationProps {
  /** Current visible page */
  currentPage: number;
  /** Pagination page size */
  pageSize: number;
  /* Count of all of the pages */
  pageCount: number;
  /** Sets the current page being shown */
  setCurrentPage: (page: number) => void;
  /** Callback function for next link */
  onNext?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for first link */
  onFirst?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for previous link */
  onPrevious?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for last link */
  onLast?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** onPagination Callback triggered when a change is triggered */
  onPagination: (currentPage: number, pageSize: number, origin: string) => void;
  /** Should the `First` and `Last` navigation buttons be shown */
  showFirstAndLastButtons?: boolean;
  /** Should the `Next` and `Previous` navigation buttons be shown */
  showPreviousAndNextButtons?: boolean;
  /** Should the page count input be shown */
  showPageCount?: boolean;
  /** If true, page number navigation will be changed to a non-interactive label */
  interactivePageNumber?: boolean;
  /** If true, sets css property visibility: hidden on all disabled elements  */
  hideDisabledElements?: boolean;
}

const PagerNavigation = ({
  pageSize,
  currentPage,
  setCurrentPage,
  onNext,
  onPrevious,
  onFirst,
  onLast,
  onPagination,
  pageCount,
  showFirstAndLastButtons = true,
  showPreviousAndNextButtons = true,
  showPageCount = true,
  interactivePageNumber = true,
  hideDisabledElements = false,
}: PagerNavigationProps) => {
  const l = useLocale();
  const guid = useRef(createGuid());
  const currentPageId = `Pager_${guid.current}`;
  const navLabelString = `${l.pager.pageX()} ${currentPage.toString()} ${l.pager.ofY(
    pageCount,
  )}`;
  const hasOnePage = pageCount <= 1;
  const hasTwoPages = pageCount === 2;
  const pagerNavigationProps = {
    currentPage,
    pageSize,
    pageCount,
    onPagination,
  };

  const handlePageInputChange = (
    ev:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    const pageNumber = +(ev.target as HTMLInputElement).value;
    if (pageCount === 0) {
      setCurrentPage(0);
      onPagination(0, pageSize, "input");
      return 0;
    }

    if (pageNumber <= 0 || Number.isNaN(pageNumber)) {
      setCurrentPage(1);
      onPagination(1, pageSize, "input");
      return 1;
    }

    if (pageNumber > pageCount) {
      setCurrentPage(pageCount);
      onPagination(pageCount, pageSize, "input");
      return pageCount;
    }

    setCurrentPage(pageNumber);
    onPagination(pageNumber, pageSize, "input");
    return pageNumber;
  };

  const handleCurrentPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(+e.target.value);
  };

  const renderButtonsBeforeCount = () => (
    <>
      {!hasTwoPages && showFirstAndLastButtons && (
        <PagerNavigationLink
          type="first"
          hideDisabledElements={hideDisabledElements}
          onClick={onFirst}
          {...pagerNavigationProps}
        />
      )}
      {showPreviousAndNextButtons && (
        <PagerNavigationLink
          type="previous"
          hideDisabledElements={hideDisabledElements}
          onClick={onPrevious}
          {...pagerNavigationProps}
        />
      )}
    </>
  );

  const renderButtonsAfterCount = () => (
    <>
      {showPreviousAndNextButtons && (
        <PagerNavigationLink
          type="next"
          hideDisabledElements={hideDisabledElements}
          onClick={onNext}
          {...pagerNavigationProps}
        />
      )}
      {!hasTwoPages && showFirstAndLastButtons && (
        <PagerNavigationLink
          type="last"
          hideDisabledElements={hideDisabledElements}
          onClick={onLast}
          {...pagerNavigationProps}
        />
      )}
    </>
  );

  return (
    <StyledPagerNavigation>
      {!hasOnePage && renderButtonsBeforeCount()}
      {showPageCount &&
        (interactivePageNumber ? (
          <StyledPagerNavInner>
            <label htmlFor={currentPageId}>
              <StyledPagerNoSelect>{l.pager.pageX()}</StyledPagerNoSelect>
            </label>
            <NumberInput
              value={currentPage.toString()}
              data-element="current-page"
              onChange={handleCurrentPageChange}
              onBlur={handlePageInputChange}
              id={currentPageId}
              onKeyUp={(ev) =>
                Events.isEnterKey(ev) ? handlePageInputChange(ev) : false
              }
            />
            <StyledPagerNoSelect>{l.pager.ofY(pageCount)}</StyledPagerNoSelect>
          </StyledPagerNavInner>
        ) : (
          <StyledPagerNavLabel
            data-element="current-page-label"
            data-role="current-page-label"
            id={currentPageId}
            aria-live="polite"
          >
            {navLabelString}
          </StyledPagerNavLabel>
        ))}
      {!hasOnePage && renderButtonsAfterCount()}
    </StyledPagerNavigation>
  );
};

export default PagerNavigation;
