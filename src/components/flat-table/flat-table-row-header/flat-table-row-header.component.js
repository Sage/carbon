import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import StyledFlatTableRowHeader from "./flat-table-row-header.style";
import Icon from "../../icon";

const FlatTableRowHeader = ({
  align = "left",
  children,
  width,
  py,
  px,
  expandable = false,
  onClick,
  onKeyDown,
  leftPosition,
  truncate,
  title,
  ...rest
}) => {
  return (
    <StyledFlatTableRowHeader
      leftPosition={leftPosition || 0}
      align={align}
      data-element="flat-table-row-header"
      colWidth={width}
      py={py || "10px"}
      px={px || 3}
      onClick={expandable && onClick ? onClick : undefined}
      tabIndex={expandable && onClick ? 0 : undefined}
      onKeyDown={expandable && onKeyDown ? onKeyDown : undefined}
      isTruncated={truncate}
      expandable={expandable}
      {...rest}
    >
      <div
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
      >
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
  /** Truncate cell content and add ellipsis to any text that overflows */
  truncate: PropTypes.bool,
  /** Title text to display if cell content truncates */
  title: PropTypes.string,
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
  /**
   * @private
   * @ignore
   */
  onKeyDown: PropTypes.func,
};

export default FlatTableRowHeader;
