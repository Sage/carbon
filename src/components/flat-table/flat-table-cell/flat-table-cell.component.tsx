import React, { useRef } from "react";
import { PaddingProps } from "styled-system";

import { TableBorderSize, TableCellAlign } from "..";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import {
  StyledFlatTableCell,
  StyledCellContent,
} from "./flat-table-cell.style";
import Icon from "../../icon";
import guid from "../../../__internal__/utils/helpers/guid";
import useTableCell from "../__internal__/use-table-cell";

export interface FlatTableCellProps extends PaddingProps, TagProps {
  /** Content alignment */
  align?: TableCellAlign;
  /** Cell content */
  children?: React.ReactNode;
  /** Number of columns that a cell should span */
  colspan?: number | string;
  /** Number of rows that a cell should span */
  rowspan?: number | string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
  /** Truncate cell content and add ellipsis to any text that overflows */
  truncate?: boolean;
  /** Title text to display if cell content truncates */
  title?: string;
  /** Sets a custom vertical right border */
  verticalBorder?: TableBorderSize;
  /** Sets the color of the right border */
  verticalBorderColor?: string;
  /** Sets an id string on the element */
  id?: string;
}

const FlatTableCell = ({
  align = "left",
  children,
  pl,
  width,
  truncate = false,
  title,
  colspan,
  rowspan,
  id,
  "data-element": dataElement,
  "data-role": dataRole,
  ...rest
}: FlatTableCellProps) => {
  const internalId = useRef(id || guid());

  const {
    leftPosition,
    rightPosition,
    expandable,
    onClick,
    onKeyDown,
    isFirstCell,
    isExpandableCell,
    makeCellSticky,
    isInHighlightedRow,
    isInSelectedRow,
    tabIndex,
    bringToFront,
  } = useTableCell(internalId.current);

  const handleOnFocus = (ev: React.FocusEvent<HTMLElement>) => {
    bringToFront(ev, "TD");
  };

  return (
    <StyledFlatTableCell
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={makeCellSticky}
      className={makeCellSticky ? "isSticky" : undefined}
      align={align}
      data-component="flat-table-cell"
      data-element={dataElement || "flat-table-cell"}
      data-role={dataRole}
      pl={pl}
      onClick={isExpandableCell ? onClick : undefined}
      tabIndex={isExpandableCell ? tabIndex : undefined}
      onKeyDown={isExpandableCell ? onKeyDown : undefined}
      colWidth={width}
      isTruncated={truncate}
      expandable={expandable}
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      data-selected={isInSelectedRow && isExpandableCell}
      data-highlighted={isInHighlightedRow && isExpandableCell}
      {...rest}
      id={internalId.current}
      onFocus={handleOnFocus}
    >
      <StyledCellContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
        data-role="flat-table-cell-content"
      >
        {expandable && isFirstCell && (
          <Icon type="chevron_down_thick" mr="8px" />
        )}
        {children}
      </StyledCellContent>
    </StyledFlatTableCell>
  );
};

FlatTableCell.displayName = "FlatTableCell";

export default FlatTableCell;
