import React, { useState, useCallback, useEffect, useRef } from "react";

import { Select, Option } from "../select";
import PagerNavigation from "./__internal__/pager-navigation.component";
import useLocale from "../../hooks/__internal__/useLocale";
import createGuid from "../../__internal__/utils/helpers/guid";
import {
  StyledPagerContainer,
  StyledPagerSizeOptions,
  StyledPagerSummary,
  StyledPagerSizeOptionsInner,
  StyledSelectContainer,
} from "./pager.style";
import Events from "../../__internal__/utils/helpers/events";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

type PageSizeOption = {
  id: string;
  name: number;
};

export interface PagerProps extends TagProps {
  /** Function called when pager changes (Current page, Page size, Origin component) */
  onPagination: (currentPage: number, pageSize: number, origin: string) => void;
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
  /** Current visible page */
  currentPage?: number | string;
  /** If true, page number navigation will be changed to a non-interactive label */
  interactivePageNumber?: boolean;
  /** If true, sets css property visibility: hidden on all disabled elements  */
  hideDisabledElements?: boolean;
  /** Total number of records */
  totalRecords?: number | string;
  /** Pagination page size */
  pageSize?: number | string;
  /** Should the page size selection dropdown be shown */
  showPageSizeSelection?: boolean;
  /** Set of page size options */
  pageSizeSelectionOptions?: PageSizeOption[];
  /** Should the label before the page size selection dropdown be shown */
  showPageSizeLabelBefore?: boolean;
  /** Should the label after the page size selection dropdown be shown */
  showPageSizeLabelAfter?: boolean;
  /** Should the total records label be shown */
  showTotalRecords?: boolean;
  /** Should the `First` and `Last` navigation button be shown */
  showFirstAndLastButtons?: boolean;
  /** Should the `Previous` and `Next` navigation button be shown */
  showPreviousAndNextButtons?: boolean;
  /** Should the page count input be shown */
  showPageCount?: boolean;
  /** What variant the Pager background should be */
  variant?: "default" | "alternate";
  /** Breakpoint for small screen styling to be applied. */
  smallScreenBreakpoint?: string;
}

const Pager = ({
  currentPage = 1,
  hideDisabledElements = false,
  interactivePageNumber = true,
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
  smallScreenBreakpoint,
  ...rest
}: PagerProps) => {
  const l = useLocale();
  const [page, setPage] = useState<number>(+currentPage);
  const [currentPageSize, setCurrentPageSize] = useState<number>(+pageSize);
  const [value, setValue] = useState<number>(+pageSize);

  const guid = useRef(createGuid());
  const pageSizeSelectId = `Pager_size_selector_${guid.current}`;

  const getPageCount = useCallback(() => {
    if (+totalRecords < 0 || Number.isNaN(+totalRecords)) {
      return 1;
    }
    return Math.ceil(+totalRecords / currentPageSize);
  }, [totalRecords, currentPageSize]);

  const [pageCount, setPageCount] = useState(getPageCount());

  useEffect(() => {
    setCurrentPageSize(+pageSize);
    setValue(+pageSize);
  }, [pageSize]);

  useEffect(() => {
    const maxPage = getPageCount();
    setPageCount(maxPage);

    if (+currentPage > maxPage) {
      setPage(maxPage);
    } else {
      setPage(+currentPage);
    }
  }, [currentPageSize, pageCount, currentPage, totalRecords, getPageCount]);

  const handleOnFirst = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      setPage(1);

      if (onFirst) {
        onFirst(e);
      }
    },
    [onFirst],
  );

  const handleOnLast = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      setPage(pageCount);

      if (onLast) {
        onLast(e);
      }
    },
    [pageCount, onLast],
  );

  const handleOnNext = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      const nextPage = page + 1;
      setPage(nextPage);

      if (onNext) {
        onNext(e);
      }
    },
    [onNext, page],
  );

  const handleOnPrevious = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      const previousPage = page - 1;
      setPage(previousPage);

      if (onPrevious) {
        onPrevious(e);
      }
    },
    [page, onPrevious],
  );

  const handleOnPagination = useCallback(
    (selectedValue: string | Record<string, unknown>) => {
      setValue(+selectedValue);
      setCurrentPageSize(+selectedValue);
      onPagination(1, +selectedValue, "page-select");
    },
    [onPagination],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) =>
      Events.isEnterKey(e) &&
      handleOnPagination((e.target as HTMLInputElement).value),
    [handleOnPagination],
  );

  const sizeSelector = () => {
    return (
      <StyledSelectContainer>
        <Select
          value={String(value)}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setValue(+ev.target.value)
          }
          onBlur={() => setValue(currentPageSize)}
          onKeyDown={handleKeyDown}
          data-element="page-select"
          id={pageSizeSelectId}
          {...(!showPageSizeLabelBefore && !showPageSizeLabelAfter
            ? { ariaLabel: l.pager.show() }
            : {})}
        >
          {pageSizeSelectionOptions.map((sizeOption) => (
            <Option
              key={sizeOption.id}
              text={sizeOption.id}
              value={String(sizeOption.name)}
              onClick={handleOnPagination}
            />
          ))}
        </Select>
      </StyledSelectContainer>
    );
  };

  const renderPageSizeOptions = () => {
    const wrapper = (isLabel: boolean, child: React.ReactNode) =>
      isLabel ? (
        <label htmlFor={pageSizeSelectId}>{child}</label>
      ) : (
        <div>{child}</div>
      );
    return (
      <StyledPagerSizeOptionsInner>
        {showPageSizeLabelBefore &&
          wrapper(showPageSizeLabelBefore, l.pager.show())}
        {sizeSelector()}
        {showPageSizeLabelAfter &&
          wrapper(
            !showPageSizeLabelBefore,
            l.pager.records(currentPageSize, false),
          )}
      </StyledPagerSizeOptionsInner>
    );
  };

  return (
    <StyledPagerContainer
      variant={variant}
      smallScreenBreakpoint={smallScreenBreakpoint}
      showPageSizeSelection={showPageSizeSelection}
      showTotalRecords={showTotalRecords}
      {...rest}
      {...tagComponent("pager", rest)}
    >
      {showPageSizeSelection && (
        <StyledPagerSizeOptions>
          {renderPageSizeOptions()}
        </StyledPagerSizeOptions>
      )}
      <PagerNavigation
        pageSize={currentPageSize}
        currentPage={page}
        interactivePageNumber={interactivePageNumber}
        hideDisabledElements={hideDisabledElements}
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
        smallScreenBreakpoint={smallScreenBreakpoint}
      />
      {showTotalRecords && (
        <StyledPagerSummary smallScreenBreakpoint={smallScreenBreakpoint}>
          {l.pager.records(totalRecords)}
        </StyledPagerSummary>
      )}
    </StyledPagerContainer>
  );
};

export default Pager;
