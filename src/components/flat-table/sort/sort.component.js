import React, { useRef } from "react";
import PropTypes from "prop-types";
import Event from "../../../__internal__/utils/helpers/events";
import Icon from "../../icon";
import { StyledSort, StyledSpaceHolder } from "./sort.style";
import guid from "../../../__internal__/utils/helpers/guid";

const Sort = ({ children, onClick, sortType }) => {
  const id = useRef(guid());
  const onKeyDown = (e) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick();
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
        type="button"
        role="button"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={onClick}
        sortType={sortType}
        aria-labelledby={id.current}
      >
        {children}
        {sortType && (
          <Icon type={sortType === "ascending" ? "sort_up" : "sort_down"} />
        )}
      </StyledSort>
      {!sortType && <StyledSpaceHolder />}
    </>
  );
};

Sort.propTypes = {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType: PropTypes.oneOf(["ascending", "descending", false]),
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick: PropTypes.func,
  /** The content of `FlatTableSortHeader` */
  children: PropTypes.node,
};

export default Sort;
