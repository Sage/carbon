import React, { useRef } from "react";

import {
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerNoSelect,
} from "../pager.style";
import NumberInput from "../../number";
import Events from "../../../__internal__/utils/helpers/events";
import createGuid from "../../../__internal__/utils/helpers/guid";
import PagerNavigationLink from "./pager-navigation-link.component";
import Label from "../../../__internal__/label";
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
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** Callback function for first link */
  onFirst?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** Callback function for previous link */
  onPrevious?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** Callback function for last link */
  onLast?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** onPagination Callback triggered when a change is triggered */
  onPagination: (pageSize: number, currentPage: number, origin: string) => void;
  /** Should the `First` and `Last` navigation buttons be shown */
  showFirstAndLastButtons?: boolean;
  /** Should the `Next` and `Previous` navigation buttons be shown */
  showPreviousAndNextButtons?: boolean;
  /** Should the page count input be shown */
  showPageCount?: boolean;
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
}: PagerNavigationProps) => {
  const l = useLocale();
  const guid = useRef(createGuid());
  const currentPageId = `Pager_${guid.current}`;
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
      | React.FocusEvent<HTMLInputElement>
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
          onClick={onFirst}
          {...pagerNavigationProps}
        />
      )}
      {showPreviousAndNextButtons && (
        <PagerNavigationLink
          type="previous"
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
          onClick={onNext}
          {...pagerNavigationProps}
        />
      )}
      {!hasTwoPages && showFirstAndLastButtons && (
        <PagerNavigationLink
          type="last"
          onClick={onLast}
          {...pagerNavigationProps}
        />
      )}
    </>
  );

  return (
    <StyledPagerNavigation>
      {!hasOnePage && renderButtonsBeforeCount()}
      {showPageCount && (
        <StyledPagerNavInner>
          <StyledPagerNoSelect>{l.pager.pageX()}</StyledPagerNoSelect>
          <Label htmlFor={currentPageId}>
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
          </Label>
          <StyledPagerNoSelect>{l.pager.ofY(pageCount)}</StyledPagerNoSelect>
        </StyledPagerNavInner>
      )}
      {!hasOnePage && renderButtonsAfterCount()}
    </StyledPagerNavigation>
  );
};

export default PagerNavigation;
