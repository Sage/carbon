import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { getWindow } from "../../../../__internal__/dom/globals";

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

const useIsomorphicLayoutEffect = getWindow() ? useLayoutEffect : useEffect;

interface UseDataGridRowsOptions<T extends object> {
  /** The controlled row collection supplied by the consumer. */
  rows: T[];
  /** Resolves the stable identity used to locate rows during updates. */
  getRowId: (row: T) => DataGridRowId;
  /** Synchronously approves, transforms, or discards a proposal before it is queued or emitted. */
  onBeforeRowChange?: DataGridProps<T>["onBeforeRowChange"];
  /** Receives proposed rows and change metadata for the consumer to accept or reject. */
  onRowsChange?: DataGridProps<T>["onRowsChange"];
  /** Notifies grid internals of an emitted result so navigation can follow row operations. */
  onRowsChangeResult?: (result: DataGridRowsChangeResult<T>) => void;
}

const useDataGridRows = <T extends object>({
  rows,
  getRowId: resolveRowId,
  onBeforeRowChange,
  onRowsChange,
  onRowsChangeResult,
}: UseDataGridRowsOptions<T>) => {
  const pending = useRef({
    source: rows,
    latest: rows,
    proposals: new WeakMap<T[], number>(),
    version: 0,
    acknowledgedVersion: 0,
  });
  const options = useRef({
    rows,
    getRowId: resolveRowId,
    onBeforeRowChange,
    onRowsChange,
    onRowsChangeResult,
  });
  useIsomorphicLayoutEffect(() => {
    options.current = {
      rows,
      getRowId: resolveRowId,
      onBeforeRowChange,
      onRowsChange,
      onRowsChangeResult,
    };
  }, [rows, resolveRowId, onBeforeRowChange, onRowsChange, onRowsChangeResult]);
  const getRowId = useCallback((row: T) => options.current.getRowId(row), []);
  const getRows = useCallback(() => {
    const { rows } = options.current;
    if (pending.current.source !== rows) {
      const version = pending.current.proposals.get(rows);
      if (
        version === undefined ||
        version <= pending.current.acknowledgedVersion
      ) {
        pending.current.latest = rows;
        pending.current.proposals = new WeakMap();
        pending.current.version = 0;
        pending.current.acknowledgedVersion = 0;
      } else {
        pending.current.acknowledgedVersion = version;
      }
      pending.current.source = rows;
    }
    return pending.current.latest;
  }, []);

  useEffect(() => {
    getRows();
  }, [getRows, rows]);

  const emit = useCallback(
    (result: DataGridRowsChangeResult<T> | null) => {
      if (!result) return;
      const { onBeforeRowChange, onRowsChange, onRowsChangeResult } =
        options.current;
      const decision = onBeforeRowChange?.({
        previousRows: getRows(),
        proposedRows: result.rows,
        change: result.change,
      });
      if (decision === false) return;
      if (decision !== undefined) {
        if (!Array.isArray(decision)) {
          throw new Error(
            "DataGrid onBeforeRowChange must synchronously return undefined, false, or a row array.",
          );
        }
        if (
          decision.length !== result.rows.length ||
          decision.some(
            (row, index) => getRowId(row) !== getRowId(result.rows[index]),
          )
        ) {
          throw new Error(
            "DataGrid onBeforeRowChange must preserve the proposed row IDs and order. Return false to discard the operation.",
          );
        }
      }
      const approvedResult = { ...result, rows: decision ?? result.rows };
      if (onRowsChange) {
        pending.current.latest = approvedResult.rows;
        pending.current.version += 1;
        pending.current.proposals.set(
          approvedResult.rows,
          pending.current.version,
        );
      }
      onRowsChange?.(approvedResult.rows, approvedResult.change);
      onRowsChangeResult?.(approvedResult);
    },
    [getRowId, getRows],
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
