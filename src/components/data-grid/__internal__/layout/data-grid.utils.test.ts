import { DataGridColumn } from "../../data-grid.types";
import { scrollColumnIntoView, scrollRowIntoView } from "./data-grid.utils";

interface Row {
  id: number;
  name: string;
}

const columns: DataGridColumn<Row>[] = [
  { field: "name", headerName: "Name", width: 100 },
];

test("does nothing without a scroll container", () => {
  expect(() => {
    scrollColumnIntoView(null, columns, 0, 0, 0);
    scrollRowIntoView(null, 0);
  }).not.toThrow();
});

test("uses the non-sticky header defaults when revealing a row", () => {
  const container = document.createElement("div");
  Object.defineProperty(container, "clientHeight", { value: 40 });

  scrollRowIntoView(container, 1);

  expect(container.scrollTop).toBe(80);
});

test("reveals a non-sticky header with the first row", () => {
  const container = document.createElement("div");
  Object.defineProperty(container, "clientHeight", { value: 80 });
  container.scrollTop = 80;

  scrollRowIntoView(container, 0);

  expect(container.scrollTop).toBe(0);
});
