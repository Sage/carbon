import React, { useLayoutEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import StyledFlatTableHeader from "./flat-table-header.style";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { FlatTableThemeContext } from "../flat-table.component";

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

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
  rightPosition,
  ...rest
}) => {
  const ref = useRef(null);
  const { colorTheme } = useContext(FlatTableThemeContext);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  return (
    <StyledFlatTableHeader
      ref={ref}
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={!!reportCellWidth}
      className={reportCellWidth ? "isSticky" : undefined}
      align={align}
      colorTheme={colorTheme}
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
  /** Styled system padding props */
  ...paddingPropTypes,
  /** Content alignment */
  align: PropTypes.oneOf(["center", "left", "right"]),
  /** Header content */
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
  /** If true sets alternative background color */
  alternativeBgColor: PropTypes.bool,
  /** Sets a custom vertical right border */
  verticalBorder: PropTypes.oneOf(["small", "medium", "large"]),
};

FlatTableHeader.defaultProps = {
  align: "left",
};

FlatTableHeader.displayName = "FlatTableHeader";

export default FlatTableHeader;
