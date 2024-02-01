import React, { useRef } from "react";
import Event from "../../../__internal__/utils/helpers/events";
import Icon from "../../icon";
import { StyledSort, StyledSpaceHolder } from "./sort.style";
import guid from "../../../__internal__/utils/helpers/guid";

export interface SortProps {
  /** if `ascending` the `sort_up` icon will be displayed by default, if `descending`
   * `sort_down` will be displayed by default. However both icon types can be
   * overridden with the `sortIcon` prop
   */
  sortType?: "ascending" | "descending" | false;
  /** Override the default sort Icon */
  sortIcon?: React.ReactNode;
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick?: () => void;
  /** Sets the content of `FlatTableSortHeader` */
  children?: React.ReactNode;
}

const Sort = ({ children, onClick, sortType, sortIcon }: SortProps) => {
  const id = useRef(guid());
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick?.();
    }

    return null;
  };

  const renderedIcon = sortType ? (
    <Icon
      type={sortType === "ascending" ? "sort_up" : "sort_down"}
      color="--colorsUtilityMajor200"
    />
  ) : null;

  return (
    <>
      {/* FE-6358 has been raised for the below (html hidden attribute used + poor translation support) */}
      <span hidden id={id.current}>
        {children}
        {sortType ? `, sort type ${sortType}` : ", sortable"}
      </span>
      <StyledSort
        role="button"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={onClick}
        aria-labelledby={id.current}
      >
        {children}
        {sortIcon || renderedIcon}
      </StyledSort>
      {!sortType && !sortIcon && <StyledSpaceHolder />}
    </>
  );
};

Sort.displayName = "Sort";

export default Sort;
