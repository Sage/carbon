import { DataGridApi, DataGridCellCommitParams } from "../../data-grid.types";
import {
  addDataGridRow,
  deleteDataGridRow,
  duplicateDataGridRow,
  insertDataGridRow,
  moveDataGridRow,
  updateDataGridCell,
} from "./data-grid-row-operations";

interface Row {
  id: string;
  name: string;
  selected: boolean;
}

const rows: Row[] = [
  { id: "a", name: "Alpha", selected: false },
  { id: "b", name: "Beta", selected: true },
  { id: "c", name: "Gamma", selected: false },
];
const getRowId = (row: Row) => row.id;

const cellChange = (
  value: unknown,
  type: "text" | "dropdown" | "checkbox" = "text",
): DataGridCellCommitParams<Row> => ({
  api: {} as DataGridApi<Row>,
  column:
    type === "dropdown"
      ? {
          field: "name",
          headerName: "Name",
          type,
          options: [{ label: "Updated", value: "Updated" }],
        }
      : type === "checkbox"
        ? { field: "selected", headerName: "Selected", type }
        : { field: "name", headerName: "Name", type },
  field: type === "checkbox" ? "selected" : "name",
  row: rows[0],
  rowId: "a",
  value,
});

test.each([
  ["text", "cell-edit"],
  ["dropdown", "dropdown-select"],
  ["checkbox", "checkbox-toggle"],
] as const)("immutably applies a %s cell change", (cellType, changeType) => {
  const value = cellType === "checkbox" ? true : "Updated";
  const result = updateDataGridCell(
    rows,
    cellChange(value, cellType),
    getRowId,
  );

  expect(result?.rows).not.toBe(rows);
  expect(result?.rows[0]).toEqual({
    ...rows[0],
    [cellChange(value, cellType).field]: value,
  });
  expect(result?.rows[1]).toBe(rows[1]);
  expect(rows[0]).toEqual({ id: "a", name: "Alpha", selected: false });
  expect(result?.change).toEqual(
    expect.objectContaining({
      type: changeType,
      rowId: "a",
      previousRow: rows[0],
      row: result?.rows[0],
    }),
  );
});

test("does not emit a transaction for an unchanged cell", () => {
  expect(updateDataGridCell(rows, cellChange("Alpha"), getRowId)).toBeNull();
  expect(
    updateDataGridCell(
      rows,
      { ...cellChange("Updated"), rowId: "missing" },
      getRowId,
    ),
  ).toBeNull();
});

test("adds and inserts consumer-created rows", () => {
  const added = { id: "d", name: "Delta", selected: false };
  const inserted = { id: "x", name: "Inserted", selected: false };

  expect(addDataGridRow(rows, added, getRowId)).toEqual({
    rows: [...rows, added],
    change: { type: "row-add", row: added, index: 3 },
  });
  expect(
    insertDataGridRow(rows, inserted, { beforeRowId: "b" }, getRowId),
  ).toEqual({
    rows: [rows[0], inserted, rows[1], rows[2]],
    change: { type: "row-insert", row: inserted, index: 1 },
  });
  expect(
    insertDataGridRow(rows, inserted, { afterRowId: "b" }, getRowId),
  ).toEqual({
    rows: [rows[0], rows[1], inserted, rows[2]],
    change: { type: "row-insert", row: inserted, index: 2 },
  });
  expect(
    insertDataGridRow(rows, inserted, { afterRowId: "missing" }, getRowId),
  ).toBeNull();
  expect(
    insertDataGridRow(rows, inserted, { beforeRowId: "missing" }, getRowId),
  ).toBeNull();
});

test("rejects new rows whose stable id already exists", () => {
  const duplicateId = { id: "b", name: "Duplicate", selected: false };

  expect(() => addDataGridRow(rows, duplicateId, getRowId)).toThrow(
    'DataGrid row IDs must be unique. A row with the ID "b" already exists.',
  );
  expect(() =>
    insertDataGridRow(rows, duplicateId, { index: 0 }, getRowId),
  ).toThrow(/row IDs must be unique/);
  expect(() =>
    duplicateDataGridRow(rows, "a", duplicateId, "after", getRowId),
  ).toThrow(/row IDs must be unique/);
});

test("duplicates a supplied row beside its source", () => {
  const duplicate = { id: "copy", name: "Copy", selected: false };

  expect(duplicateDataGridRow(rows, "b", duplicate, "after", getRowId)).toEqual(
    {
      rows: [rows[0], rows[1], duplicate, rows[2]],
      change: {
        type: "row-duplicate",
        sourceRowId: "b",
        row: duplicate,
        index: 2,
      },
    },
  );
  expect(
    duplicateDataGridRow(rows, "b", duplicate, "before", getRowId),
  ).toEqual({
    rows: [rows[0], duplicate, rows[1], rows[2]],
    change: {
      type: "row-duplicate",
      sourceRowId: "b",
      row: duplicate,
      index: 1,
    },
  });
  expect(
    duplicateDataGridRow(rows, "missing", duplicate, "after", getRowId),
  ).toBeNull();
});

test("deletes by stable id and includes the previous row", () => {
  expect(deleteDataGridRow(rows, "b", getRowId)).toEqual({
    rows: [rows[0], rows[2]],
    change: { type: "row-delete", rowId: "b", row: rows[1], index: 1 },
  });
  expect(deleteDataGridRow(rows, "missing", getRowId)).toBeNull();
});

test("moves a row to its final clamped index", () => {
  expect(moveDataGridRow(rows, "a", 99, getRowId)).toEqual({
    rows: [rows[1], rows[2], rows[0]],
    change: {
      type: "row-move",
      rowId: "a",
      row: rows[0],
      fromIndex: 0,
      toIndex: 2,
    },
  });
  expect(moveDataGridRow(rows, "b", 1, getRowId)).toBeNull();
  expect(moveDataGridRow(rows, "missing", 1, getRowId)).toBeNull();
  expect(moveDataGridRow(rows.slice(0, 1), "a", 1, getRowId)).toBeNull();
});
