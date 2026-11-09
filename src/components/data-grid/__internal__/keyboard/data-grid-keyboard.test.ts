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

test.each([
  ["ArrowLeft", 0, -1],
  ["ArrowRight", 0, 1],
  ["ArrowUp", -1, 0],
  ["ArrowDown", 1, 0],
])("maps %s to cell movement", (key, rowDelta, columnDelta) => {
  expect(getDataGridCellKeyAction(keyEvent(key), "text", false)).toEqual({
    type: "move",
    rowDelta,
    columnDelta,
  });
});

test("maps printable text to edit mode as appended text", () => {
  expect(getDataGridCellKeyAction(keyEvent("A"), "text", false)).toEqual({
    type: "begin-edit",
    appendedText: "A",
  });
  expect(
    getDataGridCellKeyAction(keyEvent("A", { ctrlKey: true }), "text", false),
  ).toBeNull();
  expect(
    getDataGridCellKeyAction(keyEvent("A", { metaKey: true }), "text", false),
  ).toBeNull();
  expect(
    getDataGridCellKeyAction(keyEvent("A", { altKey: true }), "text", false),
  ).toBeNull();
});

test("maps Enter to the interaction appropriate for the cell type", () => {
  expect(getDataGridCellKeyAction(keyEvent("Enter"), "text", false)).toEqual({
    type: "begin-edit",
  });
  expect(getDataGridCellKeyAction(keyEvent("Enter"), "action", false)).toEqual({
    type: "focus-action",
  });
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
  expect(getDataGridEditorKeyAction(keyEvent("Tab"), false)).toBeNull();
  expect(getDataGridEditorKeyAction(keyEvent("Tab"), true)).toEqual({
    type: "commit-and-move",
    delta: 1,
  });
  expect(
    getDataGridEditorKeyAction(keyEvent("Tab", { shiftKey: true }), true),
  ).toEqual({ type: "commit-and-move", delta: -1 });
});
