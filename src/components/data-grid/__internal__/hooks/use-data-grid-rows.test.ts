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
  const onRowsChangeResult = jest.fn();
  const { result } = renderHook(() =>
    useDataGridRows({
      rows,
      getRowId,
      onRowsChange,
      onRowsChangeResult,
    }),
  );

  act(() => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    result.current.api.insertRow(
      { id: "d", name: "Delta" },
      { beforeRowId: "b" },
    );
    result.current.api.duplicateRow("a", { id: "e", name: "Alpha copy" });
    result.current.api.deleteRow("a");
    result.current.api.moveRow("b", 1);
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
  expect(onRowsChangeResult).toHaveBeenCalledTimes(5);
  expect(onRowsChange.mock.calls[4][0].map(({ id }: Row) => id)).toEqual([
    "e",
    "b",
    "d",
    "c",
  ]);
  expect(onRowsChangeResult.mock.calls[2][0]).toEqual(
    expect.objectContaining({
      change: expect.objectContaining({ type: "row-duplicate" }),
    }),
  );
});

test("composes additions and deletions before rerendering and reconciles controlled rows", () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({ rows: controlledRows, getRowId, onRowsChange }),
    { initialProps: { controlledRows: rows } },
  );
  act(() => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    result.current.api.addRow({ id: "d", name: "Delta" });
    result.current.api.deleteRow("a");
    result.current.api.deleteRow("b");
  });
  expect(onRowsChange.mock.calls[3][0].map(({ id }: Row) => id)).toEqual([
    "c",
    "d",
  ]);
  rerender({ controlledRows: [{ id: "z", name: "External" }] });
  act(() => result.current.api.addRow({ id: "c", name: "Gamma" }));
  expect(onRowsChange.mock.calls[4][0].map(({ id }: Row) => id)).toEqual([
    "z",
    "c",
  ]);
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
