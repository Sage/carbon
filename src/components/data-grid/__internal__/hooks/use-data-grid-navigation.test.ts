import { createRef } from "react";
import { act, renderHook } from "@testing-library/react";

import { DataGridCellIdentity, DataGridColumn } from "../../data-grid.types";
import { createDataGridColumnModel } from "../layout/data-grid-column-model";
import {
  scrollColumnIntoView,
  scrollRowIntoView,
} from "../layout/data-grid.utils";
import useDataGridNavigation from "./use-data-grid-navigation";

jest.mock("../layout/data-grid.utils", () => ({
  scrollColumnIntoView: jest.fn(),
  scrollRowIntoView: jest.fn(),
}));

interface Row {
  id: string;
  name: string;
  type: string;
}

const columns: DataGridColumn<Row>[] = [
  { field: "name", headerName: "Name" },
  { field: "type", headerName: "Type" },
];
const identityFor = ({ row, column }: { row: number; column: number }) => ({
  rowId: row,
  field: String(columns[column].field),
});
const positionForIdentity = ({ rowId, field }: DataGridCellIdentity) =>
  typeof rowId === "number"
    ? { row: rowId, column: columns.findIndex((item) => item.field === field) }
    : null;
const keyFor = ({ row, column }: { row: number; column: number }) =>
  `${row}-${column}`;

const setup = (rowCount = 2) => {
  const scrollElementRef = { current: document.createElement("div") };
  const view = renderHook(
    ({ renderToken }) =>
      useDataGridNavigation({
        rowCount,
        columns,
        columnModel: createDataGridColumnModel(columns),
        scrollElementRef,
        identityFor,
        positionForIdentity,
        keyFor,
        renderToken,
        stickyHeader: true,
      }),
    { initialProps: { renderToken: 0 } },
  );

  return { ...view, scrollElementRef };
};

test("focuses registered cells, clamps movement, and opens an action", () => {
  const { result, scrollElementRef } = setup();
  const firstCell = document.createElement("div");
  const lastCell = document.createElement("div");
  const action = document.createElement("button");
  firstCell.tabIndex = -1;
  lastCell.tabIndex = -1;
  action.click = jest.fn();
  lastCell.append(action);
  document.body.append(firstCell, lastCell);

  act(() => {
    result.current.registerCell(0, 0, firstCell);
    result.current.registerCell(1, 1, lastCell);
    result.current.focusCell({ row: 99, column: 99 });
  });

  expect(lastCell).toHaveFocus();
  expect(scrollColumnIntoView).toHaveBeenCalledWith(
    scrollElementRef.current,
    columns,
    1,
    0,
    0,
  );
  expect(scrollRowIntoView).toHaveBeenCalledWith(
    scrollElementRef.current,
    1,
    true,
  );

  act(() => result.current.moveLinear({ row: 1, column: 1 }, -99));
  expect(firstCell).toHaveFocus();

  act(() => result.current.focusAction({ row: 1, column: 1 }));
  expect(action).toHaveFocus();
  expect(action.click).toHaveBeenCalled();

  firstCell.remove();
  lastCell.remove();
});

test("defers focus until a virtualized cell is registered", () => {
  const { result, rerender } = setup();
  const cell = document.createElement("div");
  cell.tabIndex = -1;
  document.body.append(cell);

  act(() => result.current.focusCell({ row: 1, column: 0 }));
  expect(cell).not.toHaveFocus();

  act(() => result.current.registerCell(1, 0, cell));
  rerender({ renderToken: 1 });

  expect(cell).toHaveFocus();

  act(() => result.current.registerCell(1, 0, null));
  cell.remove();
});

test("clears deferred focus when its row identity no longer exists", () => {
  const scrollElementRef = createRef<HTMLDivElement>();
  const cell = document.createElement("div");
  const { result, rerender } = renderHook(
    ({ exists, renderToken }) =>
      useDataGridNavigation({
        rowCount: 2,
        columns,
        columnModel: createDataGridColumnModel(columns),
        scrollElementRef,
        identityFor,
        positionForIdentity: (identity) =>
          exists ? positionForIdentity(identity) : null,
        keyFor,
        renderToken,
        stickyHeader: false,
      }),
    { initialProps: { exists: true, renderToken: 0 } },
  );

  act(() => result.current.focusCell({ row: 1, column: 0 }));
  rerender({ exists: false, renderToken: 1 });
  expect(result.current.active).toEqual({ row: 0, column: 0 });
  act(() => result.current.registerCell(1, 0, cell));
  rerender({ exists: true, renderToken: 2 });

  expect(cell).not.toHaveFocus();
});

test("does not focus when the grid has no rows", () => {
  const { result } = setup(0);

  expect(() => {
    act(() => result.current.focusCell({ row: 0, column: 0 }));
  }).not.toThrow();
});
