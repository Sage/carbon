import { DataGridColumn } from "../../data-grid.types";
import {
  DATA_GRID_HEADER_HEIGHT,
  DATA_GRID_ROW_HEIGHT,
} from "./data-grid.constants";
import { getDataGridColumnWidth } from "./data-grid-column-model";

export const scrollColumnIntoView = <T extends object>(
  container: HTMLDivElement | null,
  columns: DataGridColumn<T>[],
  columnIndex: number,
  leftStickyWidth: number,
  rightStickyWidth: number,
) => {
  if (!container || columns[columnIndex]?.sticky) return;

  const columnStart = columns
    .slice(0, columnIndex)
    .reduce((total, column) => total + getDataGridColumnWidth(column), 0);
  const columnEnd = columnStart + getDataGridColumnWidth(columns[columnIndex]);
  const visibleStart = container.scrollLeft + leftStickyWidth;
  const visibleEnd =
    container.scrollLeft + container.clientWidth - rightStickyWidth;

  if (columnStart < visibleStart) {
    container.scrollLeft = Math.max(0, columnStart - leftStickyWidth);
  } else if (columnEnd > visibleEnd) {
    container.scrollLeft = Math.max(
      0,
      columnEnd - (container.clientWidth - rightStickyWidth),
    );
  }
};

export const scrollRowIntoView = (
  container: HTMLDivElement | null,
  rowIndex: number,
  stickyHeader = false,
  headerHeight = DATA_GRID_HEADER_HEIGHT,
  rowHeight = DATA_GRID_ROW_HEIGHT,
) => {
  if (!container) return;

  const rowStart = headerHeight + rowIndex * rowHeight;
  const rowEnd = rowStart + rowHeight;
  const stickyHeaderHeight = stickyHeader ? headerHeight : 0;
  const revealStart = !stickyHeader && rowIndex === 0 ? 0 : rowStart;
  const visibleStart = container.scrollTop + stickyHeaderHeight;
  const visibleEnd = container.scrollTop + container.clientHeight;

  if (revealStart < visibleStart) {
    container.scrollTop = Math.max(0, revealStart - stickyHeaderHeight);
  } else if (rowEnd > visibleEnd) {
    container.scrollTop = Math.max(0, rowEnd - container.clientHeight);
  }
};
