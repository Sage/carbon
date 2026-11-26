import { useCallback, useEffect, useRef, useState } from "react";

import {
  DataGridCellCommitParams,
  DataGridCellIdentity,
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";

interface UseDataGridEditingOptions<T extends object> {
  /** Resolves the latest row, column and committed value for a cell position. */
  getCellParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  /** Determines whether a cell may enter edit mode. */
  isCellReadOnly: (params: DataGridCellParams<T>) => boolean;
  /** Receives the completed edit to apply through the controlled row-update flow. */
  onCellCommit: (params: DataGridCellCommitParams<T>) => void;
  /** Converts positional coordinates to a row ID and column field identity. */
  identityFor: (position: DataGridCellPosition) => DataGridCellIdentity;
  /** Finds an identity's current position, or null if its row or column was removed. */
  positionForIdentity: (
    identity: DataGridCellIdentity,
  ) => DataGridCellPosition | null;
  /** Updates the active cell without moving DOM focus. */
  activateCell: (position: DataGridCellPosition) => void;
  /** Scrolls the viewport to reveal the cell before focusing its editor. */
  ensureCellVisible: (position: DataGridCellPosition) => void;
  /** Restores navigation focus to a cell after editing finishes. */
  focusCell: (position: DataGridCellPosition) => void;
  /** Changes when the rendered row range changes, allowing editor focus and selection to be restored. */
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
  const [draftValue, setDraftState] = useState<unknown>("");
  const draftValueRef = useRef<unknown>("");
  const editorRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<DataGridCellIdentity | null>(null);
  const finishingEdit = useRef(false);
  const initializedEditor = useRef<HTMLInputElement | null>(null);

  const setDraftValue = useCallback((value: unknown) => {
    draftValueRef.current = value;
    setDraftState(value);
  }, []);

  const beginEdit = useCallback(
    (position: DataGridCellPosition, appendedText?: string) => {
      const params = getCellParams(position);
      if (isCellReadOnly(params) || params.column.type === "action") return;
      if (params.column.type === "checkbox") {
        onCellCommit({ ...params, value: !Boolean(params.value) });
        return;
      }

      finishingEdit.current = false;
      initializedEditor.current = null;
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
      setDraftValue,
    ],
  );

  const commitEdit = useCallback(
    (shouldRestoreFocus = false, value = draftValueRef.current) => {
      if (finishingEdit.current) {
        // A native editor may blur immediately before its keydown handler
        // commits. Keep the first data commit, but allow the keyboard commit
        // to upgrade it with the requested focus restoration.
        if (shouldRestoreFocus) {
          restoreFocus.current = editingIdentity;
        }
        return;
      }
      const position = editingIdentity
        ? positionForIdentity(editingIdentity)
        : null;
      if (!position) return;
      finishingEdit.current = true;
      const params = getCellParams(position);
      if (!isCellReadOnly(params)) onCellCommit({ ...params, value });
      restoreFocus.current = shouldRestoreFocus ? editingIdentity : null;
      setEditingIdentity(null);
    },
    [
      editingIdentity,
      getCellParams,
      isCellReadOnly,
      onCellCommit,
      positionForIdentity,
    ],
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
    if (!editor || initializedEditor.current === editor) return;
    const previousEditor = initializedEditor.current;
    initializedEditor.current = editor;
    if (previousEditor) {
      if (document.activeElement === document.body) {
        editor.focus({ preventScroll: true });
      }
      editor.setSelectionRange(
        previousEditor.selectionStart,
        previousEditor.selectionEnd,
        previousEditor.selectionDirection ?? undefined,
      );
    } else {
      editor.focus();
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
