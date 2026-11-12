import { useCallback, useEffect, useRef, useState } from "react";

import {
  DataGridCellCommitParams,
  DataGridCellIdentity,
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";

interface UseDataGridEditingOptions<T extends object> {
  getCellParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  isCellReadOnly: (params: DataGridCellParams<T>) => boolean;
  onCellCommit: (params: DataGridCellCommitParams<T>) => void;
  identityFor: (position: DataGridCellPosition) => DataGridCellIdentity;
  positionForIdentity: (
    identity: DataGridCellIdentity,
  ) => DataGridCellPosition | null;
  activateCell: (position: DataGridCellPosition) => void;
  ensureCellVisible: (position: DataGridCellPosition) => void;
  focusCell: (position: DataGridCellPosition) => void;
  renderToken: unknown;
}

const useDataGridEditing = <T extends object>({
  getCellParams,
  isCellReadOnly,
  onCellCommit,
  identityFor,
  positionForIdentity,
  activateCell,
  ensureCellVisible,
  focusCell,
  renderToken,
}: UseDataGridEditingOptions<T>) => {
  const [editingIdentity, setEditingIdentity] =
    useState<DataGridCellIdentity | null>(null);
  const editing = editingIdentity ? positionForIdentity(editingIdentity) : null;
  const [draftValue, setDraftValue] = useState<unknown>("");
  const editorRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<DataGridCellIdentity | null>(null);
  const finishingEdit = useRef(false);

  const beginEdit = useCallback(
    (position: DataGridCellPosition, appendedText?: string) => {
      const params = getCellParams(position);
      if (isCellReadOnly(params) || params.column.type === "action") return;
      if (params.column.type === "checkbox") {
        onCellCommit({ ...params, value: !Boolean(params.value) });
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
      setEditingIdentity(identityFor(position));
    },
    [
      activateCell,
      ensureCellVisible,
      getCellParams,
      identityFor,
      isCellReadOnly,
      onCellCommit,
    ],
  );

  const commitEdit = useCallback(
    (shouldRestoreFocus = false, value = draftValue) => {
      if (finishingEdit.current) {
        // A native editor may blur immediately before its keydown handler
        // commits. Keep the first data commit, but allow the keyboard commit
        // to upgrade it with the requested focus restoration.
        if (shouldRestoreFocus) {
          restoreFocus.current = editingIdentity;
        }
        return;
      }
      if (!editing) return;
      finishingEdit.current = true;
      onCellCommit({ ...getCellParams(editing), value });
      restoreFocus.current = shouldRestoreFocus ? editingIdentity : null;
      setEditingIdentity(null);
    },
    [draftValue, editing, editingIdentity, getCellParams, onCellCommit],
  );

  const commitEditOnBlur = useCallback(
    (shouldRestoreFocus = false) => {
      // A blur caused by an edit that has already finished must not override
      // its focus destination, for example when Tab moves to the next cell.
      if (finishingEdit.current) return;
      commitEdit(shouldRestoreFocus);
    },
    [commitEdit],
  );

  const cancelEdit = useCallback(
    (shouldRestoreFocus = false) => {
      finishingEdit.current = true;
      restoreFocus.current = shouldRestoreFocus ? editingIdentity : null;
      setEditingIdentity(null);
    },
    [editingIdentity],
  );

  useEffect(() => {
    if (!editingIdentity) return;
    const editor = editorRef.current;
    editor?.focus();
    if (editor instanceof HTMLInputElement) {
      const end = editor.value.length;
      editor.setSelectionRange(end, end);
    }
  }, [editingIdentity, renderToken]);

  useEffect(() => {
    if (editingIdentity || !restoreFocus.current) return;
    const position = positionForIdentity(restoreFocus.current);
    if (position) focusCell(position);
    restoreFocus.current = null;
  }, [editingIdentity, focusCell, positionForIdentity]);

  return {
    editing,
    draftValue,
    editorRef,
    setDraftValue,
    beginEdit,
    commitEdit,
    commitEditOnBlur,
    cancelEdit,
  };
};

export default useDataGridEditing;
