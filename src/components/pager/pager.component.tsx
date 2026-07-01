import React, { useState, useCallback, useEffect, useRef } from "react";

import { Select, Option } from "../select";
import PaginationNavigation from "./__internal__/pagination-navigation.component";
import useLocale from "../../hooks/__internal__/useLocale";
import createGuid from "../../__internal__/utils/helpers/guid";
import { StyledPagination, StyledPageSizeSelect } from "./pager.style";
import Events from "../../__internal__/utils/helpers/events";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

type PageSizeOption = {
  id: string;
  name: number;
};

// TODO update to PaginationProps when public export is updated to Pagination
export interface PagerProps extends TagProps {
  /** Function called when pager changes (Current page, Page size, Origin component). */
  onPagination: (currentPage: number, pageSize: number, origin: string) => void;
  /** Callback function for the Next button. */
  onNext?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for the First button. */
  onFirst?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for the Previous button. */
  onPrevious?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for the Last button. */
  onLast?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Current visible page. */
  currentPage?: number | string;
  /** Flag to set if the current page number renders as an input. */
  interactivePageNumber?: boolean;
  /** Total number of records, used to calculate the total number of pages. */
  totalRecords?: number | string;
  /** Number of records per page. */
  pageSize?: number | string;
  /** Flag to render the page size selection input. */
  showPageSizeSelection?: boolean;
  /** List of page size options. */
  pageSizeSelectionOptions?: PageSizeOption[];
  /** Flag to render "First" and "Last" navigation buttons. */
  showFirstAndLastButtons?: boolean;
  /** The component's variant. */
  variant?: "default" | "alternate";
  /** Size of the component. */
  size?: "small" | "medium" | "large";
  /** Set an accessible label for the Pagination nav */
  "aria-label"?: string;
  /**
   * If true, sets css property visibility: hidden on all disabled elements.
   * @deprecated Support to disable elements has been removed.
   */
  hideDisabledElements?: boolean;
  /**
   * Should the label before the page size selection dropdown be shown.
   * @deprecated Support for this prop has been removed. Labels for page size selection are always shown.
   */
  showPageSizeLabelBefore?: boolean;
  /**
   * Should the label after the page size selection dropdown be shown.
   * @deprecated Support for this prop has been removed. Labels for page size selection are always shown.
   */
  showPageSizeLabelAfter?: boolean;
  /**
   * Should the total records label be shown.
   * @deprecated Support to render total records has been removed.
   */
  showTotalRecords?: boolean;
  /**
   * Should the `Previous` and `Next` navigation buttons be shown.
   * @deprecated Support to show or hide "Previous" and "Next" buttons has been removed. Their visibility is managed internally.
   */
  showPreviousAndNextButtons?: boolean;
  /**
   * Should the page count input be shown
   * @deprecated Support to show or hide page count input has been removed. The page count is always shown.
   */
  showPageCount?: boolean;
  /**
   * Breakpoint for small screen styling to be applied.
   * @deprecated This component is now responsive by default and support for this prop has been removed.
   */
  smallScreenBreakpoint?: string;
}

export const Pagination = ({
  currentPage = 1,
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
  showFirstAndLastButtons = true,
  variant = "default",
  size = "medium",
  "aria-label": ariaLabel,
  ...rest
}: PagerProps) => {
  const locale = useLocale();

  const guid = useRef(createGuid());
  const pageSizeSelectId = `Pager_size_selector_${guid.current}`;

  const [internalCurrentPage, setInternalCurrentPage] =
    useState<number>(+currentPage);
  const [internalPageSize, setInternalPageSize] = useState<number>(+pageSize);
  const [pageSelectValue, setPageSelectValue] = useState<number>(+pageSize);

  const getTotalPages = useCallback(() => {
    if (+totalRecords < 0 || Number.isNaN(+totalRecords)) {
      return 1;
    }
    return Math.ceil(+totalRecords / internalPageSize);
  }, [totalRecords, internalPageSize]);

  const [totalPages, setTotalPages] = useState(getTotalPages());

  useEffect(() => {
    setInternalPageSize(+pageSize);
    setPageSelectValue(+pageSize);
  }, [pageSize]);

  useEffect(() => {
    const lastPage = getTotalPages();
    setTotalPages(lastPage);

    if (+currentPage > lastPage) {
      setInternalCurrentPage(lastPage);
    } else {
      setInternalCurrentPage(+currentPage);
    }
  }, [internalPageSize, totalPages, currentPage, totalRecords, getTotalPages]);

  const handleOptionClick = useCallback(
    (selectedValue: string | Record<string, unknown>) => {
      setPageSelectValue(+selectedValue);
      setInternalPageSize(+selectedValue);
      setInternalCurrentPage(1);
      onPagination(1, +selectedValue, "page-select");
    },
    [onPagination],
  );

  const handleSelectKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) =>
      Events.isEnterKey(e) &&
      handleOptionClick((e.target as HTMLInputElement).value),
    [handleOptionClick],
  );

  const renderPageSizeSelect = () => {
    return (
      <StyledPageSizeSelect>
        <label htmlFor={pageSizeSelectId}>
          {locale.pager.itemsPerPage?.()}
        </label>
        <Select
          value={String(pageSelectValue)}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setPageSelectValue(+ev.target.value)
          }
          // resets value to previous if selection is not completed
          onBlur={() => setPageSelectValue(internalPageSize)}
          onKeyDown={handleSelectKeyDown}
          id={pageSizeSelectId}
          size={size}
        >
          {pageSizeSelectionOptions.map((sizeOption) => (
            <Option
              key={sizeOption.id}
              text={sizeOption.id}
              value={String(sizeOption.name)}
              onClick={handleOptionClick}
            />
          ))}
        </Select>
      </StyledPageSizeSelect>
    );
  };

  return (
    <StyledPagination
      aria-label={ariaLabel || locale.pager.ariaLabel?.()}
      $variant={variant}
      $size={size}
      {...rest}
      {...tagComponent("pager", rest)}
    >
      <PaginationNavigation
        currentPage={internalCurrentPage}
        pageSize={internalPageSize}
        totalPages={totalPages}
        interactivePageNumber={interactivePageNumber}
        setCurrentPage={setInternalCurrentPage}
        onNext={onNext}
        onPrevious={onPrevious}
        onFirst={onFirst}
        onLast={onLast}
        onPagination={onPagination}
        showFirstAndLastButtons={showFirstAndLastButtons}
        size={size}
      />
      {showPageSizeSelection && renderPageSizeSelect()}
    </StyledPagination>
  );
};

export default Pagination;
