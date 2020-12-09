import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StyledColumn from "./column.style";

const Column = ({
  columnAlign,
  columns,
  columnSpan,
  columnOffset,
  columnClasses,
  className,
  ...props
}) => (
  <StyledColumn
    columnAlign={columnAlign}
    className={classNames(className, columnClasses)}
    columns={columns}
    columnSpan={columnSpan}
    columnOffset={columnOffset}
    data-component="column"
  >
    {props.children}
  </StyledColumn>
);

Column.defaultProps = {
  columnOffset: "0",
  columnSpan: "1",
  columnAlign: "left",
};

/* eslint-disable react/no-unused-prop-types */
Column.propTypes = {
  /** Content. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /**
   * @private
   * @ignore
   */
  /** Total column count */
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @private
   * @ignore
   */
  /** Classes applied by row component to affect all rows */
  columnClasses: PropTypes.string,
  /** Alignment of content within column. */
  columnAlign: PropTypes.oneOf(["left", "center", "middle", "right"]),
  /** Offset this column by a certain number of columns. */
  columnOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Span this column by a certain number of columns. */
  columnSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Column;
