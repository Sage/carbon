import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import StyledFlatTableHeader from "./flat-table-header.style";

const FlatTableHeader = ({
  align,
  children,
  colspan,
  rowspan,
  width,
  py,
  px,
  reportCellWidth,
  cellIndex,
  leftPosition,
  ...rest
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  return (
    <StyledFlatTableHeader
      ref={ref}
      leftPosition={leftPosition || 0}
      makeCellSticky={!!reportCellWidth}
      align={align}
      data-element="flat-table-header"
      colSpan={colspan}
      rowSpan={rowspan}
      colWidth={width}
      py={py}
      px={px}
      {...rest}
    >
      <div>{children}</div>
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Content alignment */
  align: PropTypes.oneOf(["center", "left", "right"]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Number of columns that a header cell should span */
  colspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Number of rows that a header cell should span */
  rowspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Column width, pass a number to set a fixed width in pixels */
  width: PropTypes.number,
  /**
   * @private
   * @ignore
   * Sets the left position when sticky column found
   */
  leftPosition: PropTypes.number,
  /**
   * @private
   * @ignore
   * Index of cell within row
   */
  cellIndex: PropTypes.number,
  /**
   * @private
   * @ignore
   * Callback to report the offsetWidth
   */
  reportCellWidth: PropTypes.func,
};

FlatTableHeader.defaultProps = {
  align: "left",
};

export default FlatTableHeader;
