import React from "react";
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
  ...rest
}) => {
  return (
    <StyledFlatTableHeader
      align={align}
      data-element="flat-table-header"
      colSpan={colspan}
      rowSpan={rowspan}
      colWidth={width}
      py={py || 1}
      px={px || 3}
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
};

FlatTableHeader.defaultProps = {
  align: "left",
};

export default FlatTableHeader;
