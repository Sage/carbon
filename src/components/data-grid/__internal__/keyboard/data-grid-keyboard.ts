import { DataGridCellType } from "../../data-grid.types";

interface DataGridKey {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export type DataGridCellKeyAction =
  | { type: "move"; rowDelta: number; columnDelta: number }
  | { type: "move-linear"; delta: number }
  | { type: "begin-edit"; appendedText?: string }
  | { type: "focus-action" }
  | { type: "toggle-checkbox" };

export type DataGridEditorKeyAction =
  | { type: "cancel" }
  | { type: "commit" }
  | { type: "commit-and-move"; delta: number };

const arrowMovement: Record<
  string,
  Extract<DataGridCellKeyAction, { type: "move" }>
> = {
  ArrowLeft: { type: "move", rowDelta: 0, columnDelta: -1 },
  ArrowRight: { type: "move", rowDelta: 0, columnDelta: 1 },
  ArrowUp: { type: "move", rowDelta: -1, columnDelta: 0 },
  ArrowDown: { type: "move", rowDelta: 1, columnDelta: 0 },
};

const isPrintableKey = (event: DataGridKey) =>
  event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey;

export const getDataGridCellKeyAction = (
  event: DataGridKey,
  cellType: DataGridCellType,
  enableTabNavigation: boolean,
): DataGridCellKeyAction | null => {
  const movement = arrowMovement[event.key];
  if (movement) return movement;

  if (event.key === "Enter") {
    return cellType === "action"
      ? { type: "focus-action" }
      : { type: "begin-edit" };
  }
  if (event.key === " ") {
    if (cellType === "checkbox") return { type: "toggle-checkbox" };
    if (cellType === "dropdown") return { type: "begin-edit" };
  }
  if (enableTabNavigation && event.key === "Tab") {
    return { type: "move-linear", delta: event.shiftKey ? -1 : 1 };
  }
  if (cellType === "text" && isPrintableKey(event)) {
    return { type: "begin-edit", appendedText: event.key };
  }
  return null;
};

export const getDataGridEditorKeyAction = (
  event: DataGridKey,
  enableTabNavigation: boolean,
): DataGridEditorKeyAction | null => {
  if (event.key === "Escape") return { type: "cancel" };
  if (event.key === "Enter") return { type: "commit" };
  if (enableTabNavigation && event.key === "Tab") {
    return { type: "commit-and-move", delta: event.shiftKey ? -1 : 1 };
  }
  return null;
};
