import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import PagerNavigation from "./pager-navigation.component";
import Option from "../../select/option/option.component";
import {
  StyledPagerContainer,
  StyledPagerSizeOptions,
  StyledPagerSummary,
  StyledPagerSizeOptionsInner,
  StyledSelect,
} from "./pager.style";

const Pager = ({
  currentPage,
  pageSizeSelectionOptions,
  pageSize,
  showPageSizeSelection,
  totalRecords,
  onPagination,
  onNext,
  onFirst,
  onPrevious,
  onLast,
  ...props
}) => {
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState("");
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  useEffect(() => {
    setCurrentPageSize(Number(pageSize));
  }, [pageSize]);

  useEffect(() => {
    let maxPage;

    if (Number(totalRecords) < 0 || Number.isNaN(Number(totalRecords))) {
      maxPage = 1;
    } else {
      maxPage = Math.ceil(totalRecords / currentPageSize);
    }

    setPageCount(maxPage);

    if (Number(currentPage) > maxPage) {
      setPage(maxPage);
    } else {
      setPage(Number(currentPage));
    }
  }, [currentPageSize, pageCount, currentPage, totalRecords]);

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
      setCurrentPageSize(Number(e.target.value));
      onPagination(1, Number(e.target.value), "page-select");
    },
    [onPagination]
  );

  const sizeSelector = () => {
    return (
      <StyledSelect
        value={String(currentPageSize)}
        onChange={(ev) => {
          handleOnPagination(ev);
        }}
        data-element="page-select"
        id="page-select"
      >
        {pageSizeSelectionOptions.map((sizeOption) => (
          <Option
            key={sizeOption.id}
            text={sizeOption.id}
            value={String(sizeOption.name)}
          />
        ))}
      </StyledSelect>
    );
  };

  const pageSizeOptions = () => {
    const show = I18n.t("pager.show", { defaultValue: "Show" });
    const elem = (
      <StyledPagerSizeOptionsInner>
        <span>{show}</span>
        {sizeSelector()}
        <span>{records(currentPageSize)}</span>
      </StyledPagerSizeOptionsInner>
    );

    return showPageSizeSelection ? elem : null;
  };

  return (
    <StyledPagerContainer data-component="pager">
      <StyledPagerSizeOptions>{pageSizeOptions()}</StyledPagerSizeOptions>
      <PagerNavigation
        {...props}
        pageSize={currentPageSize}
        currentPage={page}
        setCurrentPage={setPage}
        onNext={handleOnNext}
        onPrevious={handleOnPrevious}
        onFirst={handleOnFirst}
        onLast={handleOnLast}
        onPagination={onPagination}
        pageCount={pageCount}
      />
      <StyledPagerSummary>
        {totalRecords} {records(totalRecords)}
      </StyledPagerSummary>
    </StyledPagerContainer>
  );
};

Pager.propTypes = {
  /** Function called when pager changes (PageSize, Current Page) */
  onPagination: PropTypes.func.isRequired,
  /** Callback function for next link  */
  onNext: PropTypes.func,
  /** Callback function for first link  */
  onFirst: PropTypes.func,
  /** Callback function for previous link  */
  onPrevious: PropTypes.func,
  /** Callback function for last link  */
  onLast: PropTypes.func,
  /** Current visible page */
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Total number of records */
  totalRecords: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Pagination page size */
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Should the page size selection dropdown be shown */
  showPageSizeSelection: PropTypes.bool,
  /** Set of page size options */
  pageSizeSelectionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

Pager.defaultProps = {
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  showPageSizeSelection: false,
  pageSizeSelectionOptions: [
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
};

export default Pager;
