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
