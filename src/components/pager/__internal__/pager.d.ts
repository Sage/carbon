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
  variant?: "default" | "alternate";
}

declare const Pager: React.FunctionComponent<PagerPropTypes>;

export default Pager;
