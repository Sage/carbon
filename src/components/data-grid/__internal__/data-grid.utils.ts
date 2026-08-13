import { DataGridColumn } from "../data-grid.types";

export const getColumnWidth = <T extends object>(column: DataGridColumn<T>) =>
  column.width ??
  column.minWidth ??
  (column.flex ? column.flex * 160 : undefined) ??
  (column.type === "action" ? 52 : 120);

export const getGridTemplateColumns = <T extends object>(
  columns: DataGridColumn<T>[],
) =>
  columns
    .map((column) => {
      if (column.width) return `${column.width}px`;
      if (column.flex) {
        return `minmax(${column.minWidth ?? 120}px, ${column.flex}fr)`;
      }
      return `${getColumnWidth(column)}px`;
    })
    .join(" ");

export const getStickyOffsets = <T extends object>(
  columns: DataGridColumn<T>[],
) => {
  let left = 0;
  let right = 0;
  const offsets = new Map<number, number>();

  columns.forEach((column, index) => {
    if (column.sticky === "left") {
      offsets.set(index, left);
      left += getColumnWidth(column);
    }
  });
  [...columns].reverse().forEach((column, reverseIndex) => {
    const index = columns.length - reverseIndex - 1;
    if (column.sticky === "right") {
      offsets.set(index, right);
      right += getColumnWidth(column);
    }
  });

  return { offsets, leftWidth: left, rightWidth: right };
};

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
    .reduce((total, column) => total + getColumnWidth(column), 0);
  const columnEnd = columnStart + getColumnWidth(columns[columnIndex]);
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
  headerHeight = 40,
  rowHeight = 40,
) => {
  if (!container) return;

  const rowStart = headerHeight + rowIndex * rowHeight;
  const rowEnd = rowStart + rowHeight;
  const visibleStart = container.scrollTop + headerHeight;
  const visibleEnd = container.scrollTop + container.clientHeight;

  if (rowStart < visibleStart) {
    container.scrollTop = Math.max(0, rowStart - headerHeight);
  } else if (rowEnd > visibleEnd) {
    container.scrollTop = Math.max(0, rowEnd - container.clientHeight);
  }
};
