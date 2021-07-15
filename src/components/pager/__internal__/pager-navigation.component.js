import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerNoSelect,
} from "../pager.style";
import NumberInput from "../../../__experimental__/components/number";
import Events from "../../../utils/helpers/events";
import createGuid from "../../../utils/helpers/guid";
import PagerNavigationLink from "./pager-navigation-link.component";
import Label from "../../../__experimental__/components/label";
import useLocale from "../../../hooks/__internal__/useLocale";

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
}) => {
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

  const handlePageInputChange = (ev) => {
    if (pageCount === 0) {
      setCurrentPage(0);
      onPagination(0, pageSize, "input");
      return "0";
    }

    if (Number(ev.target.value) <= 0 || Number.isNaN(Number(ev.target.value))) {
      setCurrentPage(1);
      onPagination(1, pageSize, "input");
      return "1";
    }

    if (Number(ev.target.value) > pageCount) {
      setCurrentPage(pageCount);
      onPagination(pageCount, pageSize, "input");
      return pageCount;
    }

    setCurrentPage(Number(ev.target.value));
    onPagination(Number(ev.target.value), pageSize, "input");
    return ev.target.value;
  };

  const handleCurrentPageChange = (e) => {
    setCurrentPage(e.target.value);
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
          <StyledPagerNoSelect>{l.pager.pageX}</StyledPagerNoSelect>
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

PagerNavigation.propTypes = {
  /** Current visible page */
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  /** Pagination page size */
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /* Count of all of the pages */
  pageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Sets the current page being shown */
  setCurrentPage: PropTypes.func,
  /** onFirst Callback triggered when first link is triggered */
  onFirst: PropTypes.func,
  /** onPrevious Callback triggered when previous link is triggered */
  onPrevious: PropTypes.func,
  /** onNext Callback triggered when next link is triggered */
  onNext: PropTypes.func,
  /** onLast Callback triggered when last link is triggered */
  onLast: PropTypes.func,
  /** onPagination Callback triggered when a change is triggered */
  onPagination: PropTypes.func,
  /** Should the `First` and `Last` navigation buttons be shown */
  showFirstAndLastButtons: PropTypes.bool,
  /** Should the `Next` and `Previous` navigation buttons be shown */
  showPreviousAndNextButtons: PropTypes.bool,
  /** Should the page count input be shown */
  showPageCount: PropTypes.bool,
};

export default PagerNavigation;
