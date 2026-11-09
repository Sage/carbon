import React, { memo } from "react";

import { DataGridColumn } from "../../data-grid.types";
import {
  StyledHeader,
  StyledHeaderGroup,
  StyledHeaderRow,
  StyledVisuallyHidden,
} from "../data-grid.style";

interface DataGridHeaderProps<T extends object> {
  columns: DataGridColumn<T>[];
  stickyOffsets: Map<number, number>;
  gridTemplateColumns: string;
  sticky: boolean;
}

const DataGridHeaderInner = <T extends object>({
  columns,
  stickyOffsets,
  gridTemplateColumns,
  sticky,
}: DataGridHeaderProps<T>) => (
  <StyledHeaderGroup
    role="rowgroup"
    data-component="data-grid-header"
    $sticky={sticky}
  >
    <StyledHeaderRow
      role="row"
      aria-rowindex={1}
      $gridTemplateColumns={gridTemplateColumns}
    >
      {columns.map((column, columnIndex) => (
        <StyledHeader
          key={String(column.field)}
          role="columnheader"
          aria-colindex={columnIndex + 1}
          $cellType={column.type ?? "text"}
          $align={
            column.align ??
            (column.type === "checkbox" || column.type === "action"
              ? "center"
              : "left")
          }
          $sticky={column.sticky}
          $stickyOffset={stickyOffsets.get(columnIndex)}
        >
          <span data-element="data-grid-header-label">{column.headerName}</span>
          {!column.headerName && column.headerAriaLabel && (
            <StyledVisuallyHidden>
              {column.headerAriaLabel}
            </StyledVisuallyHidden>
          )}
        </StyledHeader>
      ))}
    </StyledHeaderRow>
  </StyledHeaderGroup>
);

const MemoizedDataGridHeader = memo(DataGridHeaderInner);
MemoizedDataGridHeader.displayName = "DataGridHeader";

const DataGridHeader = MemoizedDataGridHeader as typeof DataGridHeaderInner;

export default DataGridHeader;
