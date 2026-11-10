import { DataGridColumn } from "../../data-grid.types";
import { reconcileColumnLayout, resolveColumns } from "./column-layout";

interface Row {
  a: string;
  b: string;
  c: string;
}

function widths(columns: DataGridColumn<Row>[], viewport: number) {
  const layout = reconcileColumnLayout(columns, { order: [], widths: {} });
  return resolveColumns(columns, layout, viewport).map(
    (column) => column.widthPx,
  );
}

test("redistributes capped flex space without freezing minimums too early", () => {
  expect(
    widths(
      [
        { field: "a", headerName: "A", flex: 1, minWidth: 100 },
        { field: "b", headerName: "B", flex: 1, minWidth: 100 },
        { field: "c", headerName: "C", flex: 10, minWidth: 10, maxWidth: 50 },
      ],
      300,
    ),
  ).toEqual([125, 125, 50]);
});

test("honours minimums without freezing maximums too early", () => {
  expect(
    widths(
      [
        { field: "a", headerName: "A", flex: 1, minWidth: 180 },
        { field: "b", headerName: "B", flex: 1, minWidth: 10, maxWidth: 80 },
      ],
      240,
    ),
  ).toEqual([180, 60]);
});

test("keeps minimum tracks when the viewport requires horizontal scrolling", () => {
  expect(
    widths(
      [
        { field: "a", headerName: "A", width: 100 },
        { field: "b", headerName: "B", flex: 1, minWidth: 180 },
      ],
      200,
    ),
  ).toEqual([100, 180]);
});
