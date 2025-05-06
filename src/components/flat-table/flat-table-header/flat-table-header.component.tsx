import React, { useRef } from "react";
import { PaddingProps } from "styled-system";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import { TableBorderSize, TableCellAlign } from "..";

import StyledFlatTableHeader from "./flat-table-header.style";
import { useStrictFlatTableContext } from "../__internal__/strict-flat-table.context";
import guid from "../../../__internal__/utils/helpers/guid";
import useTableCell from "../__internal__/use-table-cell";

export interface FlatTableHeaderProps extends PaddingProps, TagProps {
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
  align = "left",
  children,
  colspan,
  rowspan,
  width,
  py,
  px,
  id,
  "data-element": dataElement,
  "data-role": dataRole,
  ...rest
}: FlatTableHeaderProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const internalId = useRef(id || guid());
  const { colorTheme } = useStrictFlatTableContext();
  const { leftPosition, rightPosition, makeCellSticky } = useTableCell(
    internalId.current,
  );

  return (
    <StyledFlatTableHeader
      ref={ref}
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={makeCellSticky}
      className={makeCellSticky ? "isSticky" : undefined}
      align={align}
      colorTheme={colorTheme}
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      colWidth={width}
      py={py}
      px={px}
      {...rest}
      data-component="flat-table-header"
      data-element={dataElement || "flat-table-header"}
      data-role={dataRole}
      id={internalId.current}
    >
      <div data-role="flat-table-header-content">{children}</div>
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.displayName = "FlatTableHeader";

export default FlatTableHeader;
