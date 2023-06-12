import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import {
  StyledFlatTableCell,
  StyledCellContent,
} from "./flat-table-cell.style";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import Icon from "../../icon";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

const FlatTableCell = ({
  align = "left",
  children,
  colspan,
  rowspan,
  pl,
  expandable = false,
  onClick,
  onKeyDown,
  reportCellWidth,
  cellIndex,
  leftPosition,
  rightPosition,
  width,
  truncate = false,
  title,
  ...rest
}) => {
  const ref = useRef(null);
  const id = useRef(guid());
  const [tabIndex, setTabIndex] = useState(-1);
  const { selectedId } = useContext(FlatTableThemeContext);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  useEffect(() => {
    setTabIndex(selectedId === id.current ? 0 : -1);
  }, [selectedId]);

  return (
    <StyledFlatTableCell
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={!!reportCellWidth}
      className={reportCellWidth ? "isSticky" : undefined}
      ref={ref}
      align={align}
      data-element="flat-table-cell"
      colSpan={colspan}
      rowSpan={rowspan}
      pl={pl}
      onClick={expandable && onClick ? onClick : undefined}
      tabIndex={expandable && onClick ? tabIndex : undefined}
      onKeyDown={expandable && onKeyDown ? onKeyDown : undefined}
      colWidth={width}
      isTruncated={truncate}
      expandable={expandable}
      id={id.current}
      {...rest}
    >
      <StyledCellContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
      >
        {expandable && (
          <Icon type="chevron_down_thick" bgSize="extra-small" mr="8px" />
        )}
        {children}
      </StyledCellContent>
    </StyledFlatTableCell>
  );
};

FlatTableCell.propTypes = {
  /** Styled system padding props */
  ...paddingPropTypes,
  /** Content alignment */
  align: PropTypes.oneOf(["center", "left", "right"]),
  /** Cell content */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Number of columns that a cell should span */
  colspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Number of rows that a cell should span */
  rowspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  /**
   * @private
   * @ignore
   * Sets the left position when sticky column found
   */
  leftPosition: PropTypes.number,
  /**
   * @private
   * @ignore
   * Sets the right position when sticky column found
   */
  rightPosition: PropTypes.number,
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
  /** Sets a custom vertical right border */
  verticalBorder: PropTypes.oneOf(["small", "medium", "large"]),
  /** Sets a vertical right border color, provide design token, any color from palette or any valid css color value. */
  verticalBorderColor: PropTypes.string,
};

FlatTableCell.displayName = "FlatTableCell";

export default FlatTableCell;
