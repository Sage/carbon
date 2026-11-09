import React, { memo } from "react";

import { DataGridColumn } from "../../data-grid.types";
import { StyledHeader, StyledHeaderRow } from "../data-grid.style";

interface DataGridHeaderProps<T extends object> {
  columns: DataGridColumn<T>[];
  stickyOffsets: Map<number, number>;
  gridTemplateColumns: string;
}

const DataGridHeaderInner = <T extends object>({
  columns,
  stickyOffsets,
  gridTemplateColumns,
}: DataGridHeaderProps<T>) => (
  <div role="rowgroup" data-component="data-grid-header">
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
          aria-label={column.headerAriaLabel}
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
        </StyledHeader>
      ))}
    </StyledHeaderRow>
  </div>
);

const MemoizedDataGridHeader = memo(DataGridHeaderInner);
MemoizedDataGridHeader.displayName = "DataGridHeader";

const DataGridHeader = MemoizedDataGridHeader as typeof DataGridHeaderInner;

export default DataGridHeader;
