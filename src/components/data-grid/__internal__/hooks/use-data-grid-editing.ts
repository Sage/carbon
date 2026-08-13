import { useCallback, useEffect, useRef, useState } from "react";

import {
  DataGridCellChangeParams,
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";

interface UseDataGridEditingOptions<T extends object> {
  getCellParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  isCellReadOnly: (params: DataGridCellParams<T>) => boolean;
  onCellChange?: (params: DataGridCellChangeParams<T>) => void;
  activateCell: (position: DataGridCellPosition) => void;
  ensureCellVisible: (position: DataGridCellPosition) => void;
  focusCell: (position: DataGridCellPosition) => void;
  renderToken: unknown;
}

const useDataGridEditing = <T extends object>({
  getCellParams,
  isCellReadOnly,
  onCellChange,
  activateCell,
  ensureCellVisible,
  focusCell,
  renderToken,
}: UseDataGridEditingOptions<T>) => {
  const [editing, setEditing] = useState<DataGridCellPosition | null>(null);
  const [draftValue, setDraftValue] = useState<unknown>("");
  const editorRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  const restoreFocus = useRef<DataGridCellPosition | null>(null);

  const beginEdit = useCallback(
    (position: DataGridCellPosition, initialValue?: unknown) => {
      const params = getCellParams(position);
      if (isCellReadOnly(params) || params.column.type === "action") return;
      if (params.column.type === "checkbox") {
        onCellChange?.({ ...params, value: !Boolean(params.value) });
        return;
      }

      activateCell(position);
      ensureCellVisible(position);
      setDraftValue(initialValue ?? params.value ?? "");
      setEditing(position);
    },
    [
      activateCell,
      ensureCellVisible,
      getCellParams,
      isCellReadOnly,
      onCellChange,
    ],
  );

  const commitEdit = useCallback(
    (shouldRestoreFocus = false) => {
      if (!editing) return;
      onCellChange?.({ ...getCellParams(editing), value: draftValue });
      restoreFocus.current = shouldRestoreFocus ? editing : null;
      setEditing(null);
    },
    [draftValue, editing, getCellParams, onCellChange],
  );

  const cancelEdit = useCallback(
    (shouldRestoreFocus = false) => {
      restoreFocus.current = shouldRestoreFocus ? editing : null;
      setEditing(null);
    },
    [editing],
  );

  useEffect(() => {
    if (!editing) return;
    editorRef.current?.focus();
    if (editorRef.current instanceof HTMLInputElement) {
      const end = editorRef.current.value.length;
      editorRef.current.setSelectionRange(end, end);
    }
  }, [editing, renderToken]);

  useEffect(() => {
    if (editing || !restoreFocus.current) return;
    focusCell(restoreFocus.current);
    restoreFocus.current = null;
  }, [editing, focusCell]);

  return {
    editing,
    draftValue,
    editorRef,
    setDraftValue,
    beginEdit,
    commitEdit,
    cancelEdit,
  };
};

export default useDataGridEditing;
