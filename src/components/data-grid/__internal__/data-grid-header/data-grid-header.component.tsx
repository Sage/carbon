import React, { memo } from "react";

import {
  DataGridColumn,
  DataGridPlugin,
  DataGridPluginApi,
  DataGridSnapshot,
} from "../../data-grid.types";
import {
  StyledHeader,
  StyledHeaderGroup,
  StyledHeaderRow,
  StyledVisuallyHidden,
} from "../data-grid.style";

interface DataGridHeaderProps<T extends object> {
  columns: DataGridColumn<T>[];
  plugins: readonly DataGridPlugin<T>[];
  api: DataGridPluginApi<T>;
  snapshot: DataGridSnapshot<T>;
  headers: Map<string, HTMLElement>;
  stickyOffsets: Map<number, number>;
  gridTemplateColumns: string;
  sticky: boolean;
}

const DataGridHeaderInner = <T extends object>({
  columns,
  plugins,
  api,
  snapshot,
  headers,
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
          ref={(node: HTMLDivElement | null) => {
            if (node) headers.set(String(column.field), node);
            else headers.delete(String(column.field));
          }}
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
          {plugins.map(({ id, slots }) => {
            const Actions = slots?.headerActions;
            return Actions ? (
              <Actions
                key={id}
                api={api}
                snapshot={snapshot}
                column={snapshot.columns[columnIndex]}
              />
            ) : null;
          })}
          {plugins.map(({ id, slots }) => {
            const Handle = slots?.headerResizeHandle;
            return Handle ? (
              <Handle
                key={id}
                api={api}
                snapshot={snapshot}
                column={snapshot.columns[columnIndex]}
              />
            ) : null;
          })}
        </StyledHeader>
      ))}
    </StyledHeaderRow>
  </StyledHeaderGroup>
);

const MemoizedDataGridHeader = memo(DataGridHeaderInner);
MemoizedDataGridHeader.displayName = "DataGridHeader";

const DataGridHeader = MemoizedDataGridHeader as typeof DataGridHeaderInner;

export default DataGridHeader;
