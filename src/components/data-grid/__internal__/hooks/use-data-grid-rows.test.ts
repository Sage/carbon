import React, { useState } from "react";
import { act, renderHook } from "@testing-library/react";

import {
  DataGridBeforeRowChangeParams,
  DataGridCellCommitParams,
  DataGridProps,
  DataGridRowChange,
} from "../../data-grid.types";
import useDataGridRows from "./use-data-grid-rows";

interface Row {
  id: string;
  name: string;
  selected?: boolean;
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

test("replaces a pending cell edit when the parent explicitly rejects it", async () => {
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
      value: "Rejected",
    });
  });
  rerender({ controlledRows: [...rows] });
  act(() => result.current.api.addRow({ id: "c", name: "Gamma" }));

  expect(onRowsChange.mock.calls[0][0][0].name).toBe("Rejected");
  expect(onRowsChange.mock.calls[1][0]).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
  ]);
});

test("replaces a pending row operation when the parent supplies a new array of unchanged rows", async () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({ rows: controlledRows, getRowId, onRowsChange }),
    { initialProps: { controlledRows: rows } },
  );

  await act(async () => {
    result.current.api.deleteRow("b");
  });
  rerender({ controlledRows: [...rows] });
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

test("preserves asynchronously accepted additions before the parent supplies updated rows", async () => {
  const { result } = renderHook(() => {
    const [controlledRows, setControlledRows] = useState(rows);
    const [acceptedRows, setAcceptedRows] = useState(rows);
    const grid = useDataGridRows({
      rows: controlledRows,
      getRowId,
      onRowsChange: async (nextRows) => {
        await Promise.resolve();
        setAcceptedRows(nextRows);
      },
    });
    return {
      ...grid,
      controlledRows,
      supplyAcceptedRows: () => setControlledRows(acceptedRows),
    };
  });

  await act(async () => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    await Promise.resolve();
    result.current.api.addRow({ id: "d", name: "Delta" });
  });
  act(() => result.current.supplyAcceptedRows());

  expect(result.current.controlledRows).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
    { id: "d", name: "Delta" },
  ]);
});

test("preserves later proposals when the parent acknowledges an earlier async update", async () => {
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
    { id: "c", name: "Gamma" },
    { id: "d", name: "Delta" },
  ]);

  rerender({ controlledRows: onRowsChange.mock.calls[0][0] });
  act(() => result.current.api.addRow({ id: "e", name: "Epsilon" }));

  expect(onRowsChange.mock.calls[2][0]).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
    { id: "d", name: "Delta" },
    { id: "e", name: "Epsilon" },
  ]);
});

test("retains only the source and latest row arrays while the parent delays acceptance", () => {
  let latestRows = rows;
  const useRefSpy = jest.spyOn(React, "useRef");
  const { result } = renderHook(() =>
    useDataGridRows({
      rows,
      getRowId,
      onRowsChange: (nextRows) => {
        latestRows = nextRows;
      },
    }),
  );
  const pendingRef = useRefSpy.mock.results[0].value;
  useRefSpy.mockRestore();

  act(() => {
    for (let index = 0; index < 1000; index += 1) {
      result.current.api.addRow({ id: `added-${index}`, name: "Added" });
    }
  });

  expect(latestRows).toHaveLength(rows.length + 1000);
  expect(pendingRef.current.proposals).toBeInstanceOf(WeakMap);
  expect(Object.values(pendingRef.current).filter(Array.isArray)).toEqual([
    rows,
    latestRows,
  ]);
});

test("treats a previously acknowledged older snapshot as an authoritative replacement", () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({ rows: controlledRows, getRowId, onRowsChange }),
    { initialProps: { controlledRows: rows } },
  );
  act(() => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    result.current.api.addRow({ id: "d", name: "Delta" });
  });
  const firstProposal = onRowsChange.mock.calls[0][0];
  rerender({ controlledRows: firstProposal });
  rerender({ controlledRows: onRowsChange.mock.calls[1][0] });
  act(() => result.current.api.addRow({ id: "e", name: "Epsilon" }));
  rerender({ controlledRows: firstProposal });
  act(() => result.current.api.addRow({ id: "f", name: "Final" }));

  expect(onRowsChange.mock.calls[3][0].map((row: Row) => row.id)).toEqual([
    "a",
    "b",
    "c",
    "f",
  ]);
});

test("does not interpret unchanged row props as rejection", async () => {
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onRowsChange }),
  );

  await act(async () => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
  });
  rerender();
  act(() => result.current.api.addRow({ id: "d", name: "Delta" }));

  expect(onRowsChange.mock.calls[1][0]).toEqual([
    ...rows,
    { id: "c", name: "Gamma" },
    { id: "d", name: "Delta" },
  ]);
});

test("can reject a later proposal while retaining an earlier accepted addition", async () => {
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
  rerender({ controlledRows: [...onRowsChange.mock.calls[0][0]] });
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
    act(() => result.current.api.addRow({ id: "c", name: "Gamma" }));
  }).not.toThrow();
});

type Grid = ReturnType<typeof useDataGridRows<Row>>;
type BeforeChange = NonNullable<DataGridProps<Row>["onBeforeRowChange"]>;

const operations: {
  type: DataGridRowChange<Row>["type"];
  run: (grid: Grid) => void;
}[] = [
  ...(["text", "dropdown", "checkbox"] as const).map((type) => ({
    type: (type === "text"
      ? "cell-edit"
      : type === "dropdown"
        ? "dropdown-select"
        : "checkbox-toggle") as DataGridRowChange<Row>["type"],
    run: (grid: Grid) =>
      grid.commitCellChange({
        api: grid.api,
        column:
          type === "dropdown"
            ? { field: "name", headerName: "Name", type, options: [] }
            : {
                field: type === "checkbox" ? "selected" : "name",
                headerName: "Value",
                type,
              },
        field: type === "checkbox" ? "selected" : "name",
        row: rows[0],
        rowId: "a",
        value: type === "checkbox" ? true : "Updated",
      }),
  })),
  {
    type: "row-add",
    run: (grid) => grid.api.addRow({ id: "c", name: "Gamma" }),
  },
  {
    type: "row-insert",
    run: (grid) => grid.api.insertRow({ id: "c", name: "Gamma" }, { index: 1 }),
  },
  {
    type: "row-duplicate",
    run: (grid) => grid.api.duplicateRow("a", { id: "c", name: "Copy" }),
  },
  { type: "row-delete", run: (grid) => grid.api.deleteRow("a") },
  { type: "row-move", run: (grid) => grid.api.moveRow("a", 1) },
];

describe.each(operations)("intercepts $type", ({ type, run }) => {
  test.each(["approve", "transform"] as const)(
    "can %s the operation",
    (decision) => {
      const onRowsChange = jest.fn();
      const onRowsChangeResult = jest.fn();
      let transformedRows: Row[] | undefined;
      const onBeforeRowChange = jest.fn(
        ({ proposedRows }: DataGridBeforeRowChangeParams<Row>) => {
          if (decision === "transform") {
            transformedRows = proposedRows.map((row) => ({
              ...row,
              name: row.name.toUpperCase(),
            }));
            return transformedRows;
          }
          return undefined;
        },
      );
      const { result } = renderHook(() =>
        useDataGridRows({
          rows,
          getRowId,
          onBeforeRowChange,
          onRowsChange,
          onRowsChangeResult,
        }),
      );

      act(() => run(result.current));

      expect(onBeforeRowChange).toHaveBeenCalledTimes(1);
      const params = onBeforeRowChange.mock.calls[0][0];
      expect(params.previousRows).toBe(rows);
      expect(params.change.type).toBe(type);
      expect(rows).toEqual([
        { id: "a", name: "Alpha" },
        { id: "b", name: "Beta" },
      ]);
      const approvedRows = transformedRows ?? params.proposedRows;
      expect(onRowsChange).toHaveBeenCalledTimes(1);
      expect(onRowsChange).toHaveBeenCalledWith(approvedRows, params.change);
      expect(onRowsChange.mock.calls[0][0]).toBe(approvedRows);
      expect(onRowsChangeResult).toHaveBeenCalledWith({
        rows: approvedRows,
        change: params.change,
      });
      expect(onBeforeRowChange.mock.invocationCallOrder[0]).toBeLessThan(
        onRowsChange.mock.invocationCallOrder[0],
      );
      expect(onRowsChange.mock.invocationCallOrder[0]).toBeLessThan(
        onRowsChangeResult.mock.invocationCallOrder[0],
      );
    },
  );

  test("can discard the operation", () => {
    const onBeforeRowChange = jest.fn(() => false as const);
    const onRowsChange = jest.fn();
    const onRowsChangeResult = jest.fn();
    const { result } = renderHook(() =>
      useDataGridRows({
        rows,
        getRowId,
        onBeforeRowChange,
        onRowsChange,
        onRowsChangeResult,
      }),
    );
    act(() => run(result.current));
    expect(onBeforeRowChange).toHaveBeenCalledTimes(1);
    expect(onRowsChange).not.toHaveBeenCalled();
    expect(onRowsChangeResult).not.toHaveBeenCalled();
  });
});

test("uses transformed pending rows for comparison and retains them after discarding a later operation", () => {
  const onRowsChange = jest.fn();
  const onBeforeRowChange = jest.fn(
    ({ proposedRows, change }: DataGridBeforeRowChangeParams<Row>) =>
      change.type === "row-delete"
        ? false
        : proposedRows.map((row) => ({ ...row, name: row.name.toUpperCase() })),
  );
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({
        rows: controlledRows,
        getRowId,
        onBeforeRowChange,
        onRowsChange,
      }),
    { initialProps: { controlledRows: rows } },
  );

  act(() => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    result.current.api.deleteRow("a");
    result.current.api.addRow({ id: "d", name: "Delta" });
  });
  const firstProposal = onRowsChange.mock.calls[0][0];
  expect(onBeforeRowChange.mock.calls[1][0].previousRows).toBe(firstProposal);
  expect(onBeforeRowChange.mock.calls[2][0].previousRows).toBe(firstProposal);
  expect(firstProposal).toContainEqual({ id: "a", name: "ALPHA" });
  expect(firstProposal).toContainEqual({ id: "c", name: "GAMMA" });
  expect(onRowsChange.mock.calls[0][1].row.name).toBe("Gamma");

  rerender({ controlledRows: firstProposal });
  act(() => result.current.api.addRow({ id: "e", name: "Epsilon" }));
  expect(onRowsChange.mock.calls[2][0].map((row: Row) => row.id)).toEqual([
    "a",
    "b",
    "c",
    "d",
    "e",
  ]);
  expect(onBeforeRowChange).toHaveBeenCalledTimes(4);
});

test("does not intercept no-op operations or incoming controlled rows", () => {
  const onBeforeRowChange = jest.fn();
  const onRowsChange = jest.fn();
  const { result, rerender } = renderHook(
    ({ controlledRows }) =>
      useDataGridRows({
        rows: controlledRows,
        getRowId,
        onBeforeRowChange,
        onRowsChange,
      }),
    { initialProps: { controlledRows: rows } },
  );
  act(() => {
    result.current.api.deleteRow("missing");
    result.current.api.moveRow("a", 0);
    result.current.commitCellChange({
      api: result.current.api,
      column: { field: "name", headerName: "Name" },
      field: "name",
      row: rows[0],
      rowId: "a",
      value: "Alpha",
    });
  });
  rerender({ controlledRows: [...rows] });
  expect(onBeforeRowChange).not.toHaveBeenCalled();
  expect(onRowsChange).not.toHaveBeenCalled();
});

test.each([Promise.resolve(), null, true, {}])(
  "rejects an invalid synchronous result: %p",
  (decision) => {
    const onRowsChange = jest.fn();
    const onRowsChangeResult = jest.fn();
    const { result } = renderHook(() =>
      useDataGridRows({
        rows,
        getRowId,
        onBeforeRowChange: (() => decision) as unknown as BeforeChange,
        onRowsChange,
        onRowsChangeResult,
      }),
    );
    expect(() =>
      act(() => result.current.api.addRow({ id: "c", name: "Gamma" })),
    ).toThrow("must synchronously return");
    expect(onRowsChange).not.toHaveBeenCalled();
    expect(onRowsChangeResult).not.toHaveBeenCalled();
  },
);

test.each([
  [rows[0]],
  [rows[1], rows[0], { id: "c", name: "Gamma" }],
  [rows[0], rows[1], { id: "a", name: "Duplicate" }],
  [rows[0], rows[1], { id: "different", name: "Replacement" }],
])(
  "rejects a transformation that changes the proposed ID sequence: %p",
  (...transformedRows) => {
    const onRowsChange = jest.fn();
    const { result } = renderHook(() =>
      useDataGridRows({
        rows,
        getRowId,
        onBeforeRowChange: () => transformedRows,
        onRowsChange,
      }),
    );
    expect(() =>
      act(() => result.current.api.addRow({ id: "c", name: "Gamma" })),
    ).toThrow("must preserve the proposed row IDs and order");
    expect(onRowsChange).not.toHaveBeenCalled();
  },
);

test("propagates hook errors without losing an earlier accepted proposal", () => {
  const onRowsChange = jest.fn();
  const onBeforeRowChange = jest
    .fn<ReturnType<BeforeChange>, Parameters<BeforeChange>>()
    .mockReturnValueOnce(undefined)
    .mockImplementationOnce(() => {
      throw new Error("Consumer failure");
    })
    .mockReturnValue(undefined);
  const { result } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onBeforeRowChange, onRowsChange }),
  );
  act(() => result.current.api.addRow({ id: "c", name: "Gamma" }));
  expect(() => act(() => result.current.api.deleteRow("a"))).toThrow(
    "Consumer failure",
  );
  act(() => result.current.api.addRow({ id: "d", name: "Delta" }));
  expect(onRowsChange.mock.calls[1][0].map((row: Row) => row.id)).toEqual([
    "a",
    "b",
    "c",
    "d",
  ]);
});

test("validates transformed custom IDs without coercing numbers to strings", () => {
  const customRows = [
    { key: 1, name: "Numeric" },
    { key: "1", name: "String" },
  ];
  const onRowsChange = jest.fn();
  const { result } = renderHook(() =>
    useDataGridRows({
      rows: customRows,
      getRowId: (row) => row.key,
      onBeforeRowChange: ({ proposedRows }) =>
        proposedRows.map((row) => ({ ...row, name: row.name.toUpperCase() })),
      onRowsChange,
    }),
  );
  act(() => result.current.api.moveRow(1, 1));
  expect(onRowsChange.mock.calls[0][0]).toEqual([
    { key: "1", name: "STRING" },
    { key: 1, name: "NUMERIC" },
  ]);
});

test("does not accumulate transformed rows without a notification handler", () => {
  const onBeforeRowChange = jest.fn(
    ({ proposedRows }: DataGridBeforeRowChangeParams<Row>) => [...proposedRows],
  );
  const { result } = renderHook(() =>
    useDataGridRows({ rows, getRowId, onBeforeRowChange }),
  );
  act(() => {
    result.current.api.addRow({ id: "c", name: "Gamma" });
    result.current.api.addRow({ id: "c", name: "Gamma" });
  });
  expect(onBeforeRowChange.mock.calls[1][0].previousRows).toBe(rows);
});

test("does not accept an async interceptor in the public callback type", () => {
  // @ts-expect-error Async interception is not supported.
  const onBeforeRowChange: BeforeChange = async () => undefined;
  expect(onBeforeRowChange).toBeInstanceOf(Function);
});
