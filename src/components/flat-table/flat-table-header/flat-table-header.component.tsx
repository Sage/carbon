import React, { useLayoutEffect, useRef, useContext } from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize, TableCellAlign } from "..";

import StyledFlatTableHeader from "./flat-table-header.style";
import { FlatTableThemeContext } from "../flat-table.component";

export interface FlatTableHeaderProps extends PaddingProps {
  /** Content alignment */
  align?: TableCellAlign;
  /** If true sets alternative background color */
  alternativeBgColor?: boolean;
  /** Header content */
  children?: React.ReactNode;
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
  /** Sets a custom vertical right border */
  verticalBorder?: TableBorderSize;
  /** Sets the color of the right border */
  verticalBorderColor?: string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
  /** Sets an id string on the DOM element */
  id?: string;
  /**
   * @private
   * @ignore
   * Sets the left position when sticky column found
   */
  leftPosition?: number;
  /**
   * @private
   * @ignore
   * Sets the right position when sticky column found
   */
  rightPosition?: number;
  /**
   * @private
   * @ignore
   * Index of cell within row
   */
  cellIndex?: number;
  /**
   * @private
   * @ignore
   * Callback to report the offsetWidth
   */
  reportCellWidth?: (offset: number, index?: number) => void;
}

export const FlatTableHeader = ({
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
}: FlatTableHeaderProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
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
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      colWidth={width}
      py={py}
      px={px}
      {...rest}
    >
      <div>{children}</div>
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.defaultProps = {
  align: "left",
};

FlatTableHeader.displayName = "FlatTableHeader";

export default FlatTableHeader;
