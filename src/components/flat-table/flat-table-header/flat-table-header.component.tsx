import React, { useRef, useContext } from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize, TableCellAlign } from "..";

import StyledFlatTableHeader from "./flat-table-header.style";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";
import useCalculateStickyCells from "../__internal__/use-calculate-sticky-cells";

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
  /** Sets an id string on the element */
  id?: string;
}

export const FlatTableHeader = ({
  align,
  children,
  colspan,
  rowspan,
  width,
  py,
  px,
  id,
  ...rest
}: FlatTableHeaderProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const internalId = useRef(id || guid());
  const { colorTheme } = useContext(FlatTableThemeContext);
  const {
    leftPosition,
    rightPosition,
    makeCellSticky,
  } = useCalculateStickyCells(internalId.current);

  return (
    <StyledFlatTableHeader
      ref={ref}
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={makeCellSticky}
      className={makeCellSticky ? "isSticky" : undefined}
      align={align}
      colorTheme={colorTheme}
      data-element="flat-table-header"
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      colWidth={width}
      py={py}
      px={px}
      {...rest}
      id={internalId.current}
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
