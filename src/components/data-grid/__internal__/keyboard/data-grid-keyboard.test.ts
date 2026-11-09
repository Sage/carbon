import {
  getDataGridCellKeyAction,
  getDataGridEditorKeyAction,
} from "./data-grid-keyboard";

const keyEvent = (
  key: string,
  overrides: Partial<{
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
  }> = {},
) => ({
  key,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  ...overrides,
});

test("maps directional keys to cell movement", () => {
  expect(
    getDataGridCellKeyAction(keyEvent("ArrowRight"), "text", false),
  ).toEqual({ type: "move", rowDelta: 0, columnDelta: 1 });
});

test("maps printable text to edit mode as appended text", () => {
  expect(getDataGridCellKeyAction(keyEvent("A"), "text", false)).toEqual({
    type: "begin-edit",
    appendedText: "A",
  });
  expect(
    getDataGridCellKeyAction(keyEvent("A", { ctrlKey: true }), "text", false),
  ).toBeNull();
});

test("maps Space to the interaction appropriate for the cell type", () => {
  expect(getDataGridCellKeyAction(keyEvent(" "), "checkbox", false)).toEqual({
    type: "toggle-checkbox",
  });
  expect(getDataGridCellKeyAction(keyEvent(" "), "dropdown", false)).toEqual({
    type: "begin-edit",
  });
  expect(getDataGridCellKeyAction(keyEvent(" "), "text", false)).toEqual({
    type: "begin-edit",
    appendedText: " ",
  });
});

test("only maps Tab when tab navigation is enabled", () => {
  expect(getDataGridCellKeyAction(keyEvent("Tab"), "text", false)).toBeNull();
  expect(
    getDataGridCellKeyAction(keyEvent("Tab", { shiftKey: true }), "text", true),
  ).toEqual({ type: "move-linear", delta: -1 });
});

test("maps editor completion and cancellation keys", () => {
  expect(getDataGridEditorKeyAction(keyEvent("Escape"), false)).toEqual({
    type: "cancel",
  });
  expect(getDataGridEditorKeyAction(keyEvent("Enter"), false)).toEqual({
    type: "commit",
  });
});
