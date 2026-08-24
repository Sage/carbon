import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Table from "./table.component";
import TableBody from "./table-body";
import TableCell from "./table-cell";
import TableRow from "./table-row";
import { TableRowProps } from "./table-row/table-row.component";

const createRow = (
  id: string,
  label: string,
  props: Omit<Partial<TableRowProps>, "children" | "id"> = {},
) => (
  <TableRow key={id} id={id} {...props}>
    <TableCell id={`${id}-cell`}>{label}</TableCell>
  </TableRow>
);

const renderTable = ({
  rows,
  isDraggable = false,
  isZebraStriped = false,
  getOrder,
}: {
  rows: React.ReactNode;
  isDraggable?: boolean;
  isZebraStriped?: boolean;
  getOrder?: (ids?: (string | number | undefined)[]) => void;
}) =>
  render(
    <Table isDraggable={isDraggable} isZebraStriped={isZebraStriped}>
      <TableBody getOrder={getOrder}>{rows}</TableBody>
    </Table>
  );

let elementsFromPointSpy: jest.SpyInstance;

beforeAll(() => {
  Object.defineProperty(document, "elementsFromPoint", {
    configurable: true,
    value: jest.fn(),
  });
});

beforeEach(() => {
  elementsFromPointSpy = jest
    .spyOn(document, "elementsFromPoint")
    .mockReturnValue([]);
});

afterEach(() => {
  fireEvent.dragEnd(window);
  fireEvent.pointerMove(window);
  elementsFromPointSpy.mockRestore();
});

describe("drag and drop", () => {
  it("keeps the dragged row in place until drop, then reorders and reports the new order", () => {
    const getOrder = jest.fn();
    renderTable({
      isDraggable: true,
      getOrder,
      rows: [
        createRow("one", "Row one"),
        createRow("two", "Row two"),
        createRow("three", "Row three"),
      ],
    });

    const draggedRow = screen.getByRole("row", { name: "Row one" });
    const dragHandle = screen.getByRole("cell", { name: "Row one" });
    const dropTarget = screen.getByRole("row", { name: "Row three" });

    jest
      .mocked(document.elementsFromPoint)
      .mockReturnValue([dragHandle]);

    fireEvent.dragStart(draggedRow);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);

    expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);

    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
      "Row two",
      "Row three",
      "Row one",
    ]);
    expect(getOrder).toHaveBeenCalledWith(["two", "three", "one"]);
  });

  it("does not reorder when dropped outside a row", () => {
    const getOrder = jest.fn();
    renderTable({
      isDraggable: true,
      getOrder,
      rows: [createRow("one", "Row one"), createRow("two", "Row two")],
    });

    const draggedRow = screen.getByRole("row", { name: "Row one" });
    const dragHandle = screen.getByRole("cell", { name: "Row one" });

    jest.mocked(document.elementsFromPoint).mockReturnValue([dragHandle]);

    fireEvent.dragStart(draggedRow);
    fireEvent.drop(window);

    expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
      "Row one",
      "Row two",
    ]);
    expect(getOrder).not.toHaveBeenCalled();
  });
});

describe("expandable rows", () => {
  it("expands and collapses sub rows from the first cell", () => {
    const subRow = createRow("one-child", "Child row");
    renderTable({
      rows: createRow("one", "Parent row", { subRows: subRow }),
    });

    expect(
      screen.queryByRole("row", { name: "Child row" }),
    ).not.toBeInTheDocument();

    const expandableCell = screen.getByRole("cell", { name: "Parent row" });
    fireEvent.click(expandableCell);

    expect(screen.getByRole("row", { name: "Child row" })).toBeVisible();

    fireEvent.click(expandableCell);

    expect(
      screen.queryByRole("row", { name: "Child row" }),
    ).not.toBeInTheDocument();
  });

  it("renders sub rows initially when isExpanded is true", () => {
    renderTable({
      rows: createRow("one", "Parent row", {
        isExpanded: true,
        subRows: createRow("one-child", "Child row"),
      }),
    });

    expect(screen.getByRole("row", { name: "Child row" })).toBeVisible();
  });
});

describe("zebra striping", () => {
  it("applies the alternate background to even non-sub rows when enabled", () => {
    renderTable({
      isZebraStriped: true,
      rows: [createRow("one", "Row one"), createRow("two", "Row two")],
    });

    expect(screen.getByRole("table")).toHaveStyleRule(
      "background-color",
      "var(--table-row-bg-alt)",
      {
        modifier:
          'tbody tr:nth-child(even of :not([data-component*="sub-row"])) td',
      },
    );
  });
});
