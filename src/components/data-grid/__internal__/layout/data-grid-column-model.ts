import { DataGridColumn } from "../../data-grid.types";
import {
  DATA_GRID_ACTION_COLUMN_WIDTH,
  DATA_GRID_DEFAULT_COLUMN_WIDTH,
  DATA_GRID_FLEX_COLUMN_WIDTH,
} from "./data-grid.constants";

export interface DataGridColumnModel {
  contentWidth: number;
  gridTemplateColumns: string;
  stickyOffsets: Map<number, number>;
  leftStickyWidth: number;
  rightStickyWidth: number;
}

export const getDataGridColumnWidth = <T extends object>(
  column: DataGridColumn<T>,
) =>
  column.width ??
  column.minWidth ??
  (column.flex ? column.flex * DATA_GRID_FLEX_COLUMN_WIDTH : undefined) ??
  (column.type === "action"
    ? DATA_GRID_ACTION_COLUMN_WIDTH
    : DATA_GRID_DEFAULT_COLUMN_WIDTH);

const getGridTemplateColumn = <T extends object>(column: DataGridColumn<T>) => {
  if (column.width) return `${column.width}px`;
  if (column.flex) {
    return `minmax(${column.minWidth ?? DATA_GRID_DEFAULT_COLUMN_WIDTH}px, ${column.flex}fr)`;
  }
  return `${getDataGridColumnWidth(column)}px`;
};

export const createDataGridColumnModel = <T extends object>(
  columns: DataGridColumn<T>[],
): DataGridColumnModel => {
  let leftStickyWidth = 0;
  let rightStickyWidth = 0;
  const stickyOffsets = new Map<number, number>();

  columns.forEach((column, index) => {
    if (column.sticky === "left") {
      stickyOffsets.set(index, leftStickyWidth);
      leftStickyWidth += getDataGridColumnWidth(column);
    }
  });

  for (let index = columns.length - 1; index >= 0; index -= 1) {
    const column = columns[index];
    if (column.sticky === "right") {
      stickyOffsets.set(index, rightStickyWidth);
      rightStickyWidth += getDataGridColumnWidth(column);
    }
  }

  return {
    contentWidth: columns.reduce(
      (total, column) => total + getDataGridColumnWidth(column),
      0,
    ),
    gridTemplateColumns: columns.map(getGridTemplateColumn).join(" "),
    stickyOffsets,
    leftStickyWidth,
    rightStickyWidth,
  };
};
