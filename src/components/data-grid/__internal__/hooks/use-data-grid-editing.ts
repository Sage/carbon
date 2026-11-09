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
  const finishingEdit = useRef(false);

  const beginEdit = useCallback(
    (position: DataGridCellPosition, appendedText?: string) => {
      const params = getCellParams(position);
      if (isCellReadOnly(params) || params.column.type === "action") return;
      if (params.column.type === "checkbox") {
        onCellChange?.({ ...params, value: !Boolean(params.value) });
        return;
      }

      finishingEdit.current = false;
      activateCell(position);
      ensureCellVisible(position);
      setDraftValue(
        appendedText === undefined
          ? (params.value ?? "")
          : `${params.value ?? ""}${appendedText}`,
      );
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
      if (!editing || finishingEdit.current) return;
      finishingEdit.current = true;
      onCellChange?.({ ...getCellParams(editing), value: draftValue });
      restoreFocus.current = shouldRestoreFocus ? editing : null;
      setEditing(null);
    },
    [draftValue, editing, getCellParams, onCellChange],
  );

  const cancelEdit = useCallback(
    (shouldRestoreFocus = false) => {
      finishingEdit.current = true;
      restoreFocus.current = shouldRestoreFocus ? editing : null;
      setEditing(null);
    },
    [editing],
  );

  useEffect(() => {
    if (!editing) return;
    const editor = editorRef.current;
    editor?.focus();
    if (editor instanceof HTMLInputElement) {
      const end = editor.value.length;
      editor.setSelectionRange(end, end);
    } else if (editor instanceof HTMLSelectElement && editor.showPicker) {
      try {
        editor.showPicker();
      } catch {
        // Some browsers only allow showPicker during a direct user gesture.
      }
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
