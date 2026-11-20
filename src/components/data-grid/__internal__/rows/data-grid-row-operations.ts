import {
  DataGridCellCommitParams,
  DataGridRowChange,
  DataGridRowId,
  DataGridRowInsertion,
} from "../../data-grid.types";

export interface DataGridRowsChangeResult<T extends object> {
  rows: T[];
  change: DataGridRowChange<T>;
}

type GetRowId<T> = (row: T) => DataGridRowId;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const findRowIndex = <T extends object>(
  rows: T[],
  rowId: DataGridRowId,
  getRowId: GetRowId<T>,
) => rows.findIndex((row) => getRowId(row) === rowId);

const assertUniqueRowId = <T extends object>(
  rows: T[],
  row: T,
  getRowId: GetRowId<T>,
) => {
  const rowId = getRowId(row);
  if (findRowIndex(rows, rowId, getRowId) >= 0) {
    throw new Error(
      `DataGrid row IDs must be unique. A row with the ID "${String(rowId)}" already exists.`,
    );
  }
};

export const updateDataGridCell = <T extends object>(
  rows: T[],
  params: DataGridCellCommitParams<T>,
  getRowId: GetRowId<T>,
): DataGridRowsChangeResult<T> | null => {
  const index = findRowIndex(rows, params.rowId, getRowId);
  if (index < 0) return null;

  const previousRow = rows[index];
  const previousValue = previousRow[params.field as keyof T];
  if (Object.is(previousValue, params.value)) return null;

  const row = { ...previousRow, [params.field]: params.value } as T;
  const nextRows = [...rows];
  nextRows[index] = row;
  const cellType = params.column.type ?? "text";

  return {
    rows: nextRows,
    change: {
      type:
        cellType === "dropdown"
          ? "dropdown-select"
          : cellType === "checkbox"
            ? "checkbox-toggle"
            : "cell-edit",
      rowId: params.rowId,
      field: params.field,
      previousValue,
      value: params.value,
      previousRow,
      row,
    },
  };
};

export const addDataGridRow = <T extends object>(
  rows: T[],
  row: T,
  getRowId: GetRowId<T>,
): DataGridRowsChangeResult<T> => {
  assertUniqueRowId(rows, row, getRowId);
  return {
    rows: [...rows, row],
    change: { type: "row-add", row, index: rows.length },
  };
};

const resolveInsertionIndex = <T extends object>(
  rows: T[],
  insertion: DataGridRowInsertion,
  getRowId: GetRowId<T>,
) => {
  if ("index" in insertion) {
    return clamp(insertion.index, 0, rows.length);
  }

  if ("beforeRowId" in insertion) {
    return findRowIndex(rows, insertion.beforeRowId, getRowId);
  }

  const anchorIndex = findRowIndex(rows, insertion.afterRowId, getRowId);
  return anchorIndex < 0 ? -1 : anchorIndex + 1;
};

export const insertDataGridRow = <T extends object>(
  rows: T[],
  row: T,
  insertion: DataGridRowInsertion,
  getRowId: GetRowId<T>,
): DataGridRowsChangeResult<T> | null => {
  const index = resolveInsertionIndex(rows, insertion, getRowId);
  if (index < 0) return null;
  assertUniqueRowId(rows, row, getRowId);

  return {
    rows: [...rows.slice(0, index), row, ...rows.slice(index)],
    change: { type: "row-insert", row, index },
  };
};

export const duplicateDataGridRow = <T extends object>(
  rows: T[],
  sourceRowId: DataGridRowId,
  row: T,
  position: "before" | "after",
  getRowId: GetRowId<T>,
): DataGridRowsChangeResult<T> | null => {
  const sourceIndex = findRowIndex(rows, sourceRowId, getRowId);
  if (sourceIndex < 0) return null;
  assertUniqueRowId(rows, row, getRowId);
  const index = sourceIndex + (position === "after" ? 1 : 0);

  return {
    rows: [...rows.slice(0, index), row, ...rows.slice(index)],
    change: { type: "row-duplicate", sourceRowId, row, index },
  };
};

export const deleteDataGridRow = <T extends object>(
  rows: T[],
  rowId: DataGridRowId,
  getRowId: GetRowId<T>,
): DataGridRowsChangeResult<T> | null => {
  const index = findRowIndex(rows, rowId, getRowId);
  if (index < 0) return null;
  const row = rows[index];

  return {
    rows: [...rows.slice(0, index), ...rows.slice(index + 1)],
    change: { type: "row-delete", rowId, row, index },
  };
};

export const moveDataGridRow = <T extends object>(
  rows: T[],
  rowId: DataGridRowId,
  toIndex: number,
  getRowId: GetRowId<T>,
): DataGridRowsChangeResult<T> | null => {
  const fromIndex = findRowIndex(rows, rowId, getRowId);
  if (fromIndex < 0 || rows.length < 2) return null;
  const resolvedToIndex = clamp(toIndex, 0, rows.length - 1);
  if (fromIndex === resolvedToIndex) return null;

  const row = rows[fromIndex];
  const remainingRows = [
    ...rows.slice(0, fromIndex),
    ...rows.slice(fromIndex + 1),
  ];
  const nextRows = [
    ...remainingRows.slice(0, resolvedToIndex),
    row,
    ...remainingRows.slice(resolvedToIndex),
  ];

  return {
    rows: nextRows,
    change: {
      type: "row-move",
      rowId,
      row,
      fromIndex,
      toIndex: resolvedToIndex,
    },
  };
};
