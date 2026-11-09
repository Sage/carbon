import { DataGridColumn } from "../../data-grid.types";
import { createDataGridColumnModel } from "./data-grid-column-model";

interface Row {
  id: number;
  first: string;
  middle: string;
  last: string;
}

test("creates one consistent layout model for width and sticky positioning", () => {
  const columns: DataGridColumn<Row>[] = [
    { field: "first", headerName: "First", width: 80, sticky: "left" },
    {
      field: "middle",
      headerName: "Middle",
      flex: 2,
      minWidth: 160,
    },
    { field: "last", headerName: "Last", width: 60, sticky: "right" },
  ];

  const model = createDataGridColumnModel(columns);

  expect(model).toEqual({
    contentWidth: 300,
    gridTemplateColumns: "80px minmax(160px, 2fr) 60px",
    stickyOffsets: new Map([
      [0, 0],
      [2, 0],
    ]),
    leftStickyWidth: 80,
    rightStickyWidth: 60,
  });
});

test("does not infer sticky columns from their position or cell type", () => {
  const columns: DataGridColumn<Row>[] = [
    { field: "first", headerName: "First", width: 80 },
    { field: "middle", headerName: "Middle", width: 120 },
    {
      field: "last",
      headerName: "Actions",
      type: "action",
      renderCell: () => null,
    },
  ];

  const model = createDataGridColumnModel(columns);

  expect(model.stickyOffsets).toEqual(new Map());
  expect(model.leftStickyWidth).toBe(0);
  expect(model.rightStickyWidth).toBe(0);
});

test("accumulates offsets for adjacent sticky columns", () => {
  const columns: DataGridColumn<Row>[] = [
    { field: "first", headerName: "First", width: 40, sticky: "left" },
    { field: "middle", headerName: "Middle", width: 80, sticky: "left" },
    { field: "last", headerName: "Last", width: 120 },
    { field: "total", headerName: "Total", width: 100, sticky: "right" },
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      sticky: "right",
      renderCell: () => null,
    },
  ];

  const model = createDataGridColumnModel(columns);

  expect(model.stickyOffsets).toEqual(
    new Map([
      [0, 0],
      [1, 40],
      [4, 0],
      [3, 52],
    ]),
  );
  expect(model.leftStickyWidth).toBe(120);
  expect(model.rightStickyWidth).toBe(152);
});
