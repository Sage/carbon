import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import StyledFlatTableRowHeader from "./flat-table-row-header.style";
import Icon from "../../icon";

const FlatTableRowHeader = ({
  align,
  children,
  width,
  py,
  px,
  expandable = false,
  onClick,
  ...rest
}) => {
  return (
    <StyledFlatTableRowHeader
      align={align}
      data-element="flat-table-row-header"
      colWidth={width}
      py={py || "10px"}
      px={px || 3}
      onClick={expandable && onClick ? () => onClick() : undefined}
      {...rest}
    >
      <div>
        {expandable && <Icon type="chevron_down_thick" />}
        {children}
      </div>
    </StyledFlatTableRowHeader>
  );
};

FlatTableRowHeader.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Content alignment */
  align: PropTypes.oneOf(["center", "left", "right"]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Column width, pass a number to set a fixed width in pixels */
  width: PropTypes.number,
  /**
   * @private
   * @ignore
   */
  expandable: PropTypes.bool,
  /**
   * @private
   * @ignore
   */
  onClick: PropTypes.func,
};

FlatTableRowHeader.defaultProps = {
  align: "left",
};

export default FlatTableRowHeader;
