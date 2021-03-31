import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import PagerNavigation from "./__internal__/pager-navigation.component";
import Option from "../select/option/option.component";
import {
  StyledPagerContainer,
  StyledPagerSizeOptions,
  StyledPagerSummary,
  StyledPagerSizeOptionsInner,
  StyledSelect,
} from "./pager.style";
import Events from "../../utils/helpers/events/events";

const Pager = ({
  currentPage = 1,
  pageSizeSelectionOptions = [
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
  pageSize = 10,
  showPageSizeSelection = false,
  totalRecords = 0,
  onPagination,
  onNext,
  onFirst,
  onPrevious,
  onLast,
  showPageSizeLabelBefore = true,
  showPageSizeLabelAfter = true,
  showTotalRecords = true,
  showFirstAndLastButtons = true,
  showPreviousAndNextButtons = true,
  showPageCount = true,
  variant = "default",
  ...rest
}) => {
  const [page, setPage] = useState(currentPage);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [value, setValue] = useState(pageSize);

  const getPageCount = useCallback(() => {
    if (Number(totalRecords) < 0 || Number.isNaN(Number(totalRecords))) {
      return 1;
    }
    return Math.ceil(totalRecords / currentPageSize);
  }, [totalRecords, currentPageSize]);

  const [pageCount, setPageCount] = useState(getPageCount());

  useEffect(() => {
    setCurrentPageSize(Number(pageSize));
  }, [pageSize]);

  useEffect(() => {
    const maxPage = getPageCount();
    setPageCount(maxPage);

    if (Number(currentPage) > maxPage) {
      setPage(maxPage);
    } else {
      setPage(Number(currentPage));
    }
  }, [currentPageSize, pageCount, currentPage, totalRecords, getPageCount]);

  /** Term used to describe table data */
  const records = (count) =>
    I18n.t("pager.records", {
      count: Number(count),
      defaultValue: {
        one: "item",
        other: "items",
      },
    });

  const handleOnFirst = useCallback(
    (e) => {
      setPage(1);

      if (onFirst) {
        onFirst(e);
      }
    },
    [onFirst]
  );

  const handleOnLast = useCallback(
    (e) => {
      setPage(pageCount);

      if (onLast) {
        onLast(e);
      }
    },
    [pageCount, onLast]
  );

  const handleOnNext = useCallback(
    (e) => {
      const nextPage = page + 1;
      setPage(nextPage);

      if (onNext) {
        onNext(e);
      }
    },
    [onNext, page]
  );

  const handleOnPrevious = useCallback(
    (e) => {
      const previousPage = page - 1;
      setPage(previousPage);

      if (onPrevious) {
        onPrevious(e);
      }
    },
    [page, onPrevious]
  );

  const handleOnPagination = useCallback(
    (e) => {
      setValue(e.target.value);
      setCurrentPageSize(Number(e.target.value));
      onPagination(1, Number(e.target.value), "page-select");
    },
    [onPagination]
  );

  const handleKeyDown = useCallback(
    (e) => Events.isEnterKey(e) && handleOnPagination(e),
    [handleOnPagination]
  );

  const sizeSelector = () => {
    return (
      <StyledSelect
        value={String(value)}
        onChange={(ev) => setValue(ev.target.value)}
        onBlur={() => setValue(currentPageSize)}
        onKeyDown={handleKeyDown}
        data-element="page-select"
        id="page-select"
      >
        {pageSizeSelectionOptions.map((sizeOption) => (
          <Option
            key={sizeOption.id}
            text={sizeOption.id}
            value={String(sizeOption.name)}
            onClick={handleOnPagination}
          />
        ))}
      </StyledSelect>
    );
  };

  const renderPageSizeOptions = () => {
    const show = I18n.t("pager.show", { defaultValue: "Show" });

    return (
      showPageSizeSelection && (
        <StyledPagerSizeOptionsInner>
          {showPageSizeLabelBefore && <span>{show}</span>}
          {sizeSelector()}
          {showPageSizeLabelAfter && <span>{records(currentPageSize)}</span>}
        </StyledPagerSizeOptionsInner>
      )
    );
  };

  const renderTotalRecords = () =>
    showTotalRecords && (
      <>
        {totalRecords} {records(totalRecords)}
      </>
    );

  return (
    <StyledPagerContainer data-component="pager" variant={variant} {...rest}>
      <StyledPagerSizeOptions>{renderPageSizeOptions()}</StyledPagerSizeOptions>
      <PagerNavigation
        pageSize={currentPageSize}
        currentPage={page}
        setCurrentPage={setPage}
        onNext={handleOnNext}
        onPrevious={handleOnPrevious}
        onFirst={handleOnFirst}
        onLast={handleOnLast}
        onPagination={onPagination}
        pageCount={pageCount}
        showFirstAndLastButtons={showFirstAndLastButtons}
        showPreviousAndNextButtons={showPreviousAndNextButtons}
        showPageCount={showPageCount}
      />
      <StyledPagerSummary>{renderTotalRecords()}</StyledPagerSummary>
    </StyledPagerContainer>
  );
};

Pager.propTypes = {
  /** Function called when pager changes (PageSize, Current Page) */
  onPagination: PropTypes.func.isRequired,
  /** Callback function for next link */
  onNext: PropTypes.func,
  /** Callback function for first link */
  onFirst: PropTypes.func,
  /** Callback function for previous link */
  onPrevious: PropTypes.func,
  /** Callback function for last link */
  onLast: PropTypes.func,
  /** Current visible page */
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Total number of records */
  totalRecords: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Pagination page size */
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Set of page size options */
  pageSizeSelectionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  /** Should the page size selection dropdown be shown */
  showPageSizeSelection: PropTypes.bool,
  /** Should the label before the page size selection dropdown be shown */
  showPageSizeLabelBefore: PropTypes.bool,
  /** Should the label after the page size selection dropdown be shown */
  showPageSizeLabelAfter: PropTypes.bool,
  /** Should the total records label be shown */
  showTotalRecords: PropTypes.bool,
  /** Should the `First` and `Last` navigation button be shown */
  showFirstAndLastButtons: PropTypes.bool,
  /** Should the `Previous` and `Next` navigation button be shown */
  showPreviousAndNextButtons: PropTypes.bool,
  /** Should the page count input be shown */
  showPageCount: PropTypes.bool,
  /** What variant the Pager background should be */
  variant: PropTypes.oneOf(["default", "alternate"]),
};

export default Pager;
