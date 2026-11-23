import { useCallback, useMemo, useRef } from "react";

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
  /** The controlled row collection supplied by the consumer. */
  rows: T[];
  /** Resolves the stable identity used to locate rows during updates. */
  getRowId: (row: T) => DataGridRowId;
  /** Receives proposed rows and change metadata for the consumer to accept or reject. */
  onRowsChange?: DataGridProps<T>["onRowsChange"];
  /** Notifies grid internals of an emitted result so navigation can follow row operations. */
  onRowsChangeResult?: (result: DataGridRowsChangeResult<T>) => void;
}

const useDataGridRows = <T extends object>({
  rows,
  getRowId,
  onRowsChange,
  onRowsChangeResult,
}: UseDataGridRowsOptions<T>) => {
  const pending = useRef({ source: rows, rows });
  const getRows = useCallback(() => {
    if (pending.current.source !== rows) {
      pending.current = { source: rows, rows };
    }
    return pending.current.rows;
  }, [rows]);

  const emit = useCallback(
    (result: DataGridRowsChangeResult<T> | null) => {
      if (!result) return;
      const proposal = { source: rows, rows: result.rows };
      pending.current = proposal;
      void Promise.resolve().then(() => {
        if (pending.current === proposal) {
          pending.current = { source: rows, rows };
        }
      });
      onRowsChange?.(result.rows, result.change);
      onRowsChangeResult?.(result);
    },
    [rows, onRowsChange, onRowsChangeResult],
  );

  const commitCellChange = useCallback(
    (params: DataGridCellCommitParams<T>) => {
      emit(updateDataGridCell(getRows(), params, getRowId));
    },
    [emit, getRowId, getRows],
  );

  const api = useMemo<DataGridApi<T>>(
    () => ({
      addRow: (row) => emit(addDataGridRow(getRows(), row, getRowId)),
      insertRow: (row, insertion) =>
        emit(insertDataGridRow(getRows(), row, insertion, getRowId)),
      duplicateRow: (sourceRowId, row, position = "after") =>
        emit(
          duplicateDataGridRow(getRows(), sourceRowId, row, position, getRowId),
        ),
      deleteRow: (rowId) => emit(deleteDataGridRow(getRows(), rowId, getRowId)),
      moveRow: (rowId, toIndex) =>
        emit(moveDataGridRow(getRows(), rowId, toIndex, getRowId)),
    }),
    [emit, getRowId, getRows],
  );

  return { api, commitCellChange };
};

export default useDataGridRows;
