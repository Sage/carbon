import { useCallback, useMemo } from "react";

import {
  DataGridApi,
  DataGridCellCommitParams,
  DataGridProps,
  DataGridRowId,
} from "../../data-grid.types";
import {
  addDataGridRow,
  DataGridRowsChangeResult,
  deleteDataGridRow,
  duplicateDataGridRow,
  insertDataGridRow,
  moveDataGridRow,
  updateDataGridCell,
} from "../rows/data-grid-row-operations";

interface UseDataGridRowsOptions<T extends object> {
  rows: T[];
  getRowId: (row: T) => DataGridRowId;
  onRowsChange?: DataGridProps<T>["onRowsChange"];
}

const useDataGridRows = <T extends object>({
  rows,
  getRowId,
  onRowsChange,
}: UseDataGridRowsOptions<T>) => {
  const emit = useCallback(
    (result: DataGridRowsChangeResult<T> | null) => {
      if (result) onRowsChange?.(result.rows, result.change);
    },
    [onRowsChange],
  );

  const commitCellChange = useCallback(
    (params: DataGridCellCommitParams<T>) => {
      emit(updateDataGridCell(rows, params, getRowId));
    },
    [emit, getRowId, rows],
  );

  const api = useMemo<DataGridApi<T>>(
    () => ({
      addRow: (row) => emit(addDataGridRow(rows, row, getRowId)),
      insertRow: (row, insertion) =>
        emit(insertDataGridRow(rows, row, insertion, getRowId)),
      duplicateRow: (sourceRowId, row, position = "after") =>
        emit(duplicateDataGridRow(rows, sourceRowId, row, position, getRowId)),
      deleteRow: (rowId) => emit(deleteDataGridRow(rows, rowId, getRowId)),
      moveRow: (rowId, toIndex) =>
        emit(moveDataGridRow(rows, rowId, toIndex, getRowId)),
    }),
    [emit, getRowId, rows],
  );

  return { api, commitCellChange };
};

export default useDataGridRows;
