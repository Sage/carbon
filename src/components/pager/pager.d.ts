import * as React from "react";

export interface PagerPropTypes {
  /** Function called when pager changes (PageSize, Current Page) */
  onPagination: (pageSize: number, currentPage: number, origin: string) => void;
  /** Callback function for next link */
  onNext?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Callback function for first link */
  onFirst?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Callback function for previous link */
  onPrevious?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Callback function for last link */
  onLast?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Current visible page */
  currentPage?: number | string;
  /** Total number of records */
  totalRecords?: number | string;
  /** Pagination page size */
  pageSize?: number | string;
  /** Should the page size selection dropdown be shown */
  showPageSizeSelection?: boolean;
  /** Set of page size options */
  pageSizeSelectionOptions?: object;
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
}

declare function Pager(props: PagerPropTypes): JSX.Element;

export default Pager;
