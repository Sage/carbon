import React, { memo } from "react";

import { DataGridColumn } from "../../data-grid.types";
import {
  StyledHeader,
  StyledHeaderGroup,
  StyledHeaderRow,
  StyledVisuallyHidden,
} from "../data-grid.style";

interface DataGridHeaderProps<T extends object> {
  /** The column definitions in their displayed order. */
  columns: DataGridColumn<T>[];
  /** Sticky offsets in pixels, keyed by zero-based column index. */
  pinnedOffsets: Map<number, number>;
  /** The CSS grid tracks shared by the header and body rows. */
  gridTemplateColumns: string;
  /** Whether the header remains visible when the grid scrolls vertically. */
  stickyHeader: boolean;
}

const DataGridHeaderInner = <T extends object>({
  columns,
  pinnedOffsets,
  gridTemplateColumns,
  stickyHeader,
}: DataGridHeaderProps<T>) => (
  <StyledHeaderGroup
    role="rowgroup"
    data-component="data-grid-header"
    $sticky={stickyHeader}
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
          $sticky={column.pinned}
          $stickyHeader={stickyHeader}
          $stickyOffset={pinnedOffsets.get(columnIndex)}
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
