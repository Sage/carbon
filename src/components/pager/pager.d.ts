import * as React from 'react';

export interface PagerPropTypes {
  onPagination: () => void;
  onNext?: () => void;
  onFirst?: () => void;
  onPrevious?: () => void;
  onLast?: () => void;
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
