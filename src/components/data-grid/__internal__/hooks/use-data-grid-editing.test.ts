import { RefObject } from "react";
import { act, renderHook } from "@testing-library/react";

import {
  DataGridApi,
  DataGridCellParams,
  DataGridCellPosition,
  DataGridColumn,
} from "../../data-grid.types";
import useDataGridEditing from "./use-data-grid-editing";

interface Row {
  id: string;
  name?: string;
  type?: string;
  selected?: boolean;
}

const row: Row = { id: "a", name: "Alpha", type: "A", selected: false };
const textColumn: DataGridColumn<Row> = {
  field: "name",
  headerName: "Name",
};
const position = { row: 0, column: 0 };

const setEditorRef = (
  editorRef: RefObject<HTMLInputElement | HTMLSelectElement>,
  element: HTMLInputElement | HTMLSelectElement,
) => {
  Object.defineProperty(editorRef, "current", {
    configurable: true,
    value: element,
  });
};

const setup = (
  column: DataGridColumn<Row> = textColumn,
  value: unknown = row[column.field as keyof Row],
) => {
  const onCellCommit = jest.fn();
  const activateCell = jest.fn();
  const ensureCellVisible = jest.fn();
  const focusCell = jest.fn();
  const getCellParams = jest.fn(
    (): DataGridCellParams<Row> => ({
      api: {} as DataGridApi<Row>,
      column,
      field: String(column.field),
      row,
      rowId: row.id,
      value,
    }),
  );
  const positionForIdentity = jest.fn(
    (): DataGridCellPosition | null => position,
  );
  const view = renderHook(
    ({ renderToken }) =>
      useDataGridEditing({
        getCellParams,
        isCellReadOnly: (params) => !!params.column.readOnly,
        onCellCommit,
        identityFor: () => ({ rowId: row.id, field: String(column.field) }),
        positionForIdentity,
        activateCell,
        ensureCellVisible,
        focusCell,
        renderToken,
      }),
    { initialProps: { renderToken: 0 } },
  );

  return {
    ...view,
    onCellCommit,
    activateCell,
    ensureCellVisible,
    focusCell,
    positionForIdentity,
  };
};

test("begins, commits, and cancels text editing while restoring focus", () => {
  const view = setup();
  const { result, onCellCommit, focusCell } = view;
  const input = document.createElement("input");
  input.value = "Alpha";
  document.body.append(input);
  setEditorRef(result.current.editorRef, input);

  act(() => result.current.beginEdit(position));

  expect(result.current.draftValue).toBe("Alpha");
  expect(input).toHaveFocus();
  expect(input.selectionStart).toBe(input.value.length);

  act(() => result.current.setDraftValue("Updated"));
  act(() => result.current.commitEdit(true));

  expect(onCellCommit).toHaveBeenCalledWith(
    expect.objectContaining({ value: "Updated" }),
  );
  expect(focusCell).toHaveBeenCalledWith(position);

  act(() => result.current.commitEdit());
  expect(onCellCommit).toHaveBeenCalledTimes(1);

  act(() => result.current.beginEdit(position, "!"));
  expect(result.current.draftValue).toBe("Alpha!");
  act(() => result.current.cancelEdit(true));
  expect(focusCell).toHaveBeenCalledTimes(2);

  input.remove();
});

test("opens dropdown editors when the browser supports showPicker", () => {
  const column: DataGridColumn<Row> = {
    field: "type",
    headerName: "Type",
    type: "dropdown",
    options: [{ label: "A", value: "A" }],
  };
  const { result } = setup(column);
  const select = document.createElement("select");
  const showPicker = jest.fn();
  select.showPicker = showPicker;
  setEditorRef(result.current.editorRef, select);

  act(() => result.current.beginEdit(position));

  expect(showPicker).toHaveBeenCalled();
});

test("tolerates browsers that reject programmatic dropdown opening", () => {
  const column: DataGridColumn<Row> = {
    field: "type",
    headerName: "Type",
    type: "dropdown",
    options: [{ label: "A", value: "A" }],
  };
  const { result } = setup(column);
  const select = document.createElement("select");
  select.showPicker = jest.fn(() => {
    throw new Error("not allowed");
  });
  setEditorRef(result.current.editorRef, select);

  expect(() => {
    act(() => result.current.beginEdit(position));
  }).not.toThrow();
});

test("toggles checkboxes without entering edit mode", () => {
  const column: DataGridColumn<Row> = {
    field: "selected",
    headerName: "Selected",
    type: "checkbox",
  };
  const { result, onCellCommit } = setup(column, false);

  act(() => result.current.beginEdit(position));

  expect(onCellCommit).toHaveBeenCalledWith(
    expect.objectContaining({ value: true }),
  );
  expect(result.current.editing).toBeNull();
});

test("appends typed text to an empty value", () => {
  const { result } = setup(textColumn, null);

  act(() => result.current.beginEdit(position, "A"));

  expect(result.current.draftValue).toBe("A");
});

test.each([
  { ...textColumn, readOnly: true },
  {
    field: "actions",
    headerName: "Actions",
    type: "action" as const,
    renderCell: () => null,
  },
])("does not edit read-only or action cells", (column) => {
  const { result, activateCell } = setup(column);

  act(() => result.current.beginEdit(position));

  expect(result.current.editing).toBeNull();
  expect(activateCell).not.toHaveBeenCalled();
});

test("does not restore focus when the edited row no longer exists", () => {
  const { result, positionForIdentity, focusCell } = setup();

  act(() => result.current.beginEdit(position));
  positionForIdentity.mockReturnValue(null);
  act(() => result.current.cancelEdit(true));

  expect(focusCell).not.toHaveBeenCalled();
});
