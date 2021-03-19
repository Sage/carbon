import * as React from "react";

export interface PagerPropTypes {
  onPagination: (pageSize: number, currentPage: number) => void;
  onNext?: (ev: React.MouseEvent<HTMLElement>) => void;
  onFirst?: (ev: React.MouseEvent<HTMLElement>) => void;
  onPrevious?: (ev: React.MouseEvent<HTMLElement>) => void;
  onLast?: (ev: React.MouseEvent<HTMLElement>) => void;
  currentPage?: number | string;
  totalRecords?: number | string;
  pageSize?: number | string;
  showPageSizeSelection?: boolean;
  pageSizeSelectionOptions?: object;
  showPageSizeLabelBefore?: boolean;
  showPageSizeLabelAfter?: boolean;
  showTotalRecords?: boolean;
  showFirstAndLastButtons?: boolean;
  showPreviousAndNextButtons?: boolean;
  showPageCount?: boolean;
  variant?: "default" | "alternate";
}

declare const Pager: React.FunctionComponent<PagerPropTypes>;

export default Pager;
