import React, { useRef } from "react";
import Event from "../../../__internal__/utils/helpers/events";
import Icon from "../../icon";
import { StyledSort, StyledSpaceHolder } from "./sort.style";
import guid from "../../../__internal__/utils/helpers/guid";

export interface SortProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending" | false;
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick?: () => void;
  /** Sets the content of `FlatTableSortHeader` */
  children?: React.ReactNode;
}

const Sort = ({ children, onClick, sortType }: SortProps) => {
  const id = useRef(guid());
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick?.();
    }

    return null;
  };

  return (
    <>
      <span hidden id={id.current}>
        {children}
        {sortType ? `, sort type ${sortType}` : ", sortable"}
      </span>
      <StyledSort
        role="button"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={onClick}
        sortType={sortType}
        aria-labelledby={id.current}
      >
        {children}
        {sortType && (
          <Icon
            type={sortType === "ascending" ? "sort_up" : "sort_down"}
            color="--colorsUtilityMajor200"
          />
        )}
      </StyledSort>
      {!sortType && <StyledSpaceHolder />}
    </>
  );
};

Sort.displayName = "Sort";

export default Sort;
