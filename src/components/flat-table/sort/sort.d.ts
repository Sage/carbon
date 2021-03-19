import * as React from "react";

export interface SortProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending" | false;
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick?: () => void;
  /** Sets the content of `FlatTableSortHeader` */
  children?: React.ReactNode | string;
}

declare const Sort: React.FunctionComponent<SortProps>;

export default Sort;
