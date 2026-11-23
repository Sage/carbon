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

test("does not carry a rejected cell edit into a later row operation", async () => {
  const onRowsChange = jest.fn();
  const { result } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onRowsChange }),
  );

  await act(async () => {
    result.current.commitCellChange({
      api: result.current.api,
      column: { field: "name", headerName: "Name" },
      field: "name",
      row: rows[0],
      rowId: "a",
      value: "Rejected",
    });
  });
  act(() => result.current.api.addRow({ id: "c", name: "Gamma" }));

  expect(onRowsChange.mock.calls[0][0][0].name).toBe("Rejected");
  expect(onRowsChange.mock.calls[1][0]).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
  ]);
});

test("does not carry a rejected row operation into a later cell edit after rerendering with the same rows", async () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onRowsChange }),
  );

  await act(async () => {
    result.current.api.deleteRow("b");
  });
  rerender();
  act(() => {
    result.current.commitCellChange({
      api: result.current.api,
      column: { field: "name", headerName: "Name" },
      field: "name",
      row: rows[0],
      rowId: "a",
      value: "Accepted",
    });
  });

  expect(onRowsChange.mock.calls[1][0]).toEqual([
    { id: "a", name: "Accepted" },
    rows[1],
  ]);
});

test("composes cell and row changes in one batch and uses accepted rows in later interactions", async () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({ rows: controlledRows, getRowId, onRowsChange }),
    { initialProps: { controlledRows: rows } },
  );

  await act(async () => {
    result.current.commitCellChange({
      api: result.current.api,
      column: { field: "name", headerName: "Name" },
      field: "name",
      row: rows[0],
      rowId: "a",
      value: "Accepted",
    });
    result.current.api.addRow({ id: "c", name: "Gamma" });
  });
  rerender({ controlledRows: onRowsChange.mock.calls[1][0] });
  act(() => result.current.api.deleteRow("b"));

  expect(onRowsChange.mock.calls[1][0]).toEqual([
    { id: "a", name: "Accepted" },
    rows[1],
    { id: "c", name: "Gamma" },
  ]);
  expect(onRowsChange.mock.calls[2][0]).toEqual([
    { id: "a", name: "Accepted" },
    { id: "c", name: "Gamma" },
  ]);
});

test("uses supplied rows across asynchronous boundaries and honours delayed parent acceptance", async () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({ rows: controlledRows, getRowId, onRowsChange }),
    { initialProps: { controlledRows: rows } },
  );

  await act(async () => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    await Promise.resolve();
    result.current.api.addRow({ id: "d", name: "Delta" });
  });

  expect(onRowsChange.mock.calls[0][0]).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
  ]);
  expect(onRowsChange.mock.calls[1][0]).toEqual([
    ...rows,
    { id: "d", name: "Delta" },
  ]);

  rerender({ controlledRows: onRowsChange.mock.calls[0][0] });
  act(() => result.current.api.addRow({ id: "e", name: "Epsilon" }));

  expect(onRowsChange.mock.calls[2][0]).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
    { id: "e", name: "Epsilon" },
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
