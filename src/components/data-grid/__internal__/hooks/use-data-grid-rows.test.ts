import { act, renderHook } from "@testing-library/react";

import { DataGridCellCommitParams } from "../../data-grid.types";
import useDataGridRows from "./use-data-grid-rows";

interface Row {
  id: string;
  name: string;
}

const rows: Row[] = [
  { id: "a", name: "Alpha" },
  { id: "b", name: "Beta" },
];
const getRowId = (row: Row) => row.id;

test("exposes every immutable row operation through the grid API", () => {
  const onRowsChange = jest.fn();
  const { result } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onRowsChange }),
  );

  act(() => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    result.current.api.insertRow(
      { id: "c", name: "Gamma" },
      { beforeRowId: "b" },
    );
    result.current.api.duplicateRow("a", { id: "c", name: "Alpha copy" });
    result.current.api.deleteRow("a");
    result.current.api.moveRow("a", 1);
  });

  expect(onRowsChange.mock.calls.map(([, change]) => change.type)).toEqual([
    "row-add",
    "row-insert",
    "row-duplicate",
    "row-delete",
    "row-move",
  ]);
  expect(onRowsChange.mock.calls[2][1]).toEqual(
    expect.objectContaining({ sourceRowId: "a", index: 1 }),
  );
});

test("does not emit when a row or cell operation makes no change", () => {
  const onRowsChange = jest.fn();
  const { result } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onRowsChange }),
  );
  const unchangedCell: DataGridCellCommitParams<Row> = {
    api: result.current.api,
    column: { field: "name", headerName: "Name" },
    field: "name",
    row: rows[0],
    rowId: "a",
    value: "Alpha",
  };

  act(() => {
    result.current.commitCellChange(unchangedCell);
    result.current.api.deleteRow("missing");
  });

  expect(onRowsChange).not.toHaveBeenCalled();
});

test("supports an omitted change handler", () => {
  const { result } = renderHook(() => useDataGridRows({ rows, getRowId }));

  expect(() => {
    act(() => result.current.api.addRow({ id: "c", name: "Gamma" }));
  }).not.toThrow();
});
