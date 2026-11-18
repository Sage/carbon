import { DataGridColumn } from "../../data-grid.types";
import {
  DATA_GRID_ACTION_COLUMN_WIDTH,
  DATA_GRID_DEFAULT_COLUMN_WIDTH,
  DATA_GRID_FLEX_COLUMN_WIDTH,
} from "./data-grid.constants";

export interface DataGridColumnModel {
  contentWidth: number;
  gridTemplateColumns: string;
  pinnedOffsets: Map<number, number>;
  leftPinnedWidth: number;
  rightPinnedWidth: number;
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
  let leftPinnedWidth = 0;
  let rightPinnedWidth = 0;
  const pinnedOffsets = new Map<number, number>();

  columns.forEach((column, index) => {
    if (column.pinned === "left") {
      pinnedOffsets.set(index, leftPinnedWidth);
      leftPinnedWidth += getDataGridColumnWidth(column);
    }
  });

  for (let index = columns.length - 1; index >= 0; index -= 1) {
    const column = columns[index];
    if (column.pinned === "right") {
      pinnedOffsets.set(index, rightPinnedWidth);
      rightPinnedWidth += getDataGridColumnWidth(column);
    }
  }

  return {
    contentWidth: columns.reduce(
      (total, column) => total + getDataGridColumnWidth(column),
      0,
    ),
    gridTemplateColumns: columns.map(getGridTemplateColumn).join(" "),
    pinnedOffsets,
    leftPinnedWidth,
    rightPinnedWidth,
  };
};
