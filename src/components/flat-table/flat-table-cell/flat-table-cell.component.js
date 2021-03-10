import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import {
  StyledFlatTableCell,
  StyledCellContent,
} from "./flat-table-cell.style";
import Icon from "../../icon";

const FlatTableCell = ({
  align,
  children,
  colspan,
  rowspan,
  py,
  px,
  expandable = false,
  onClick,
  onKeyDown,
  ...rest
}) => {
  return (
    <StyledFlatTableCell
      align={align}
      data-element="flat-table-cell"
      colSpan={colspan}
      rowSpan={rowspan}
      py={py}
      px={px}
      onClick={expandable && onClick ? onClick : undefined}
      tabIndex={expandable && onClick ? 0 : undefined}
      onKeyDown={expandable && onKeyDown ? onKeyDown : undefined}
      {...rest}
    >
      <StyledCellContent expandable={expandable}>
        {expandable && <Icon type="chevron_down_thick" />}
        {children}
      </StyledCellContent>
    </StyledFlatTableCell>
  );
};

FlatTableCell.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Content alignment */
  align: PropTypes.oneOf(["center", "left", "right"]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Number of columns that a cell should span */
  colspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Number of rows that a cell should span */
  rowspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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

FlatTableCell.defaultProps = {
  align: "left",
};

export default FlatTableCell;
