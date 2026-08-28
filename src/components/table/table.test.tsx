import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";

import Table, { TableProps } from "./table.component";
import TableHead from "./table-head";
import TableBody from "./table-body";
import TableFoot from "./table-foot";
import TableCell, { TableCellProps } from "./table-cell";
import TableRow, { TableRowProps } from "./table-row";
import TableHeader, { TableHeaderCellProps } from "./table-header";
import userEvent from "@testing-library/user-event";
import borderThicknessStyles from "./__internal__/config";

const createRow = (
  id: string,
  label: string,
  props: Omit<Partial<TableRowProps>, "children" | "id"> = {},
  cellProps: Omit<Partial<TableCellProps>, "children"> = {},
) => (
  <TableRow key={id} id={id} {...props}>
    <TableCell id={`${id}-cell`} {...cellProps}>
      {label}
    </TableCell>
  </TableRow>
);

const createHeaderRow = (
  id: string,
  label: string,
  props: Omit<Partial<TableRowProps>, "children" | "id"> = {},
  headerCellProps: Omit<Partial<TableHeaderCellProps>, "children"> = {},
) => (
  <TableRow key={id} id={id} {...props}>
    <TableHeader id={`${id}-cell`} {...headerCellProps}>
      {label}
    </TableHeader>
  </TableRow>
);

const renderTable = ({
  rows,
  headerRows,
  footerRows,
  isDraggable,
  isZebraStriped,
  getOrder,
  tableProps,
}: {
  rows: React.ReactNode;
  headerRows?: React.ReactNode;
  footerRows?: React.ReactNode;
  isDraggable?: boolean;
  isZebraStriped?: boolean;
  getOrder?: (ids?: (string | number | undefined)[]) => void;
  tableProps?: Omit<Partial<TableProps>, "children">;
}) =>
  render(
    <Table
      {...tableProps}
      isDraggable={isDraggable}
      isZebraStriped={isZebraStriped}
    >
      {headerRows && <TableHead>{headerRows}</TableHead>}
      <TableBody getOrder={getOrder}>{rows}</TableBody>
      {footerRows && <TableFoot>{footerRows}</TableFoot>}
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
  elementsFromPointSpy.mockRestore();
});

describe("drag and drop", () => {
  afterEach(() => {
    fireEvent.dragEnd(window);
    fireEvent.pointerMove(window);
  });

  it("does not render the drag handle when isDraggable is falsy", () => {
    renderTable({
      rows: createRow("one", "Row one"),
    });

    expect(screen.queryByTestId("table-cell-drag-handle")).not.toBeInTheDocument();
  });

  it("renders the drag handle when isDraggable is true", () => {
    renderTable({
      isDraggable: true,
      rows: createRow("one", "Row one"),
    });

    expect(screen.getByTestId("table-cell-drag-handle")).toBeInTheDocument();
  });

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

  it("does not reorder when the dragged row changes during the drag", () => {
    const getOrder = jest.fn();
    const draggableTable = (draggedRowId: string) => (
      <Table isDraggable>
        <TableBody getOrder={getOrder}>
          <TableRow key="dragged-row" id={draggedRowId}>
            <TableCell id={`${draggedRowId}-cell`}>Row one</TableCell>
          </TableRow>
          {createRow("two", "Row two")}
        </TableBody>
      </Table>
    );
    const { rerender } = render(draggableTable("one"));

    const draggedRow = screen.getByRole("row", { name: "Row one" });
    const dragHandle = screen.getByRole("cell", { name: "Row one" });

    jest.mocked(document.elementsFromPoint).mockReturnValue([dragHandle]);

    fireEvent.dragStart(draggedRow);
    rerender(draggableTable("renamed"));

    const dropTarget = screen.getByRole("row", { name: "Row two" });
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
      "Row one",
      "Row two",
    ]);
    expect(getOrder).not.toHaveBeenCalled();
  });

  it("clears the drop target when the dragged row leaves it", () => {
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

    jest.mocked(document.elementsFromPoint).mockReturnValue([dragHandle]);

    fireEvent.dragStart(draggedRow);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.dragLeave(dropTarget);
    fireEvent.drop(window);

    expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
    expect(getOrder).not.toHaveBeenCalled();
  });
});

describe("expandable rows", () => {
  it("expands and collapses sub rows when the user clicks the first cell", async () => {
    const user = userEvent.setup();
    const subRow = createRow("one-child", "Child row");
    renderTable({
      rows: createRow("one", "Parent row", { subRows: subRow }),
    });

    expect(screen.getByTestId("table-cell-expand-icon")).toBeVisible();
    expect(
      screen.queryByRole("row", { name: "Child row" }),
    ).not.toBeInTheDocument();

    const expandableCell = screen.getByRole("cell", { name: "Parent row" });
    await user.click(expandableCell);

    expect(screen.getByRole("row", { name: "Child row" })).toBeVisible();

    await user.click(expandableCell);

    expect(
      screen.queryByRole("row", { name: "Child row" }),
    ).not.toBeInTheDocument();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "expands and collapses sub rows when user presses %s and the first cell is focused",
    async (_keyName, key) => {
      const user = userEvent.setup();
      const subRow = createRow("one-child", "Child row");
      renderTable({
        rows: createRow("one", "Parent row", { subRows: subRow }),
      });

      expect(
        screen.queryByRole("row", { name: "Child row" }),
      ).not.toBeInTheDocument();

      const expandableCell = screen.getByRole("cell", { name: "Parent row" });
      await user.tab();

      expect(expandableCell).toHaveFocus();

      await user.keyboard(key);

      expect(screen.getByRole("row", { name: "Child row" })).toBeVisible();

      await user.keyboard(key);

      expect(
        screen.queryByRole("row", { name: "Child row" }),
      ).not.toBeInTheDocument();
    },
  );

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
          'tbody tr:nth-child(even of :not([data-component*="sub-row"])):not([data-is-selected="true"]) td',
      },
    );
  });
});

describe("table props", () => {
  it("sets text-align on the table cells when align is specified", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { align: "center" },
    });

    const cellWrapper = screen
      .getByRole("cell", { name: "Row one" })
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector<HTMLElement>('[data-element="table-cell-collapse"]');

    expect(cellWrapper).toHaveStyle("text-align: center");
  });

  it("sets the maximum width and overflow styles on the wrapper", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { maxWidth: "480px" },
    });

    const wrapper = screen.getByTestId("table-wrapper");

    expect(wrapper).toHaveStyleRule("max-width", "480px");
    expect(wrapper).toHaveStyleRule("overflow-x", "auto");
    expect(wrapper).toHaveStyleRule("overflow-y", "hidden");
  });

  it("renders pagination node when prop is provided", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: {
        pagination: <nav aria-label="Table pagination">Pagination</nav>,
      },
    });

    const pagination = screen.getByRole("navigation", {
      name: "Table pagination",
    });

    expect(pagination).toBeVisible();
  });

  it.each([
    ["first", "true", "false"],
    ["last", "false", "true"],
    ["both", "true", "true"],
  ] as const)(
    "sets the sticky column attributes for %s",
    (stickyColumn, hasFirstColumn, hasLastColumn) => {
      renderTable({
        rows: createRow("one", "Row one"),
        tableProps: { stickyColumn },
      });

      expect(screen.getByRole("table")).toHaveAttribute(
        "data-has-first-column",
        hasFirstColumn,
      );
      expect(screen.getByRole("table")).toHaveAttribute(
        "data-has-last-column",
        hasLastColumn,
      );
    },
  );

  it.each([
    ["header", "true", "false"],
    ["footer", "false", "true"],
    ["both", "true", "true"],
  ] as const)(
    "sets the sticky row attributes for %s",
    (stickyRow, hasStickyHeader, hasStickyFooter) => {
      renderTable({
        headerRows: createHeaderRow("header", "Header row"),
        rows: createRow("one", "Row one"),
        footerRows: createRow("footer", "Footer row"),
        tableProps: { stickyRow },
      });

      expect(screen.getByRole("table")).toHaveAttribute(
        "data-has-sticky-header",
        hasStickyHeader,
      );
      expect(screen.getByRole("table")).toHaveAttribute(
        "data-has-sticky-footer",
        hasStickyFooter,
      );
    },
  );

  it.each([
    ["prominent", "var(--table-header-harsh-border-default)"],
    ["subtle-white", "var(--table-header-subtle-border-default)"],
    ["subtle-grey", "var(--table-header-subtle-border-default)"],
  ] as const)("applies the %s variant", (variant, expectedBorderColor) => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { variant },
    });

    expect(screen.getByRole("table")).toHaveStyleRule(
      "--table-header-border-color",
      expectedBorderColor,
    );
  });

  it.each([
    ["extra-small", "var(--global-size-xs)"],
    ["small", "var(--global-size-s)"],
    ["medium", "var(--global-size-m)"],
    ["large", "var(--global-size-l)"],
    ["extra-large", "var(--global-size-xxl)"],
  ] as const)("applies the %s size to cells", (size, expectedMinHeight) => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { size },
    });

    const contentContainer = screen
      .getByRole("cell", { name: "Row one" })
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector<HTMLElement>(
        '[data-element="table-cell-content-container"]',
      );

    expect(contentContainer).toHaveStyle(
      `min-height: ${expectedMinHeight}`,
    );
  });

  it("renders outer borders by default", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { variant: "subtle-white" },
    });

    expect(screen.getByRole("table")).toHaveStyleRule(
      "border-left",
      "var(--global-borderwidth-xs) solid var(--table-row-border-default)",
      { modifier: "tbody tr td:first-child" },
    );
  });

  it("removes outer borders when requested on a subtle table", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { outerBorders: "none", variant: "subtle-white" },
    });

    expect(screen.getByRole("table")).not.toHaveStyleRule(
      "border-left",
      "var(--global-borderwidth-xs) solid var(--table-row-border-default)",
      { modifier: "tbody tr td:first-child" },
    );
  });

  it("sets horizontal and vertical border thicknesses", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: {
        horizontalBorderThickness: "medium",
        verticalBorderThickness: "large",
      },
    });

    const table = screen.getByRole("table");
    expect(table).toHaveStyleRule(
      "--table-cell-border-horizontal-width",
      "var(--global-borderwidth-s)",
    );
    expect(table).toHaveStyleRule(
      "--table-cell-border-vertical-width",
      "var(--global-borderwidth-m)",
    );
  });

  it("renders the table footer when footer rows are provided", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      footerRows: createRow("footer", "Footer row"),
    });

    const footer = screen.getByTestId("table-footer");

    expect(footer).toBeVisible();
    expect(within(footer).getByRole("row", { name: "Footer row" })).toBeVisible();
  });
});

describe("selectable rows", () => {
  it("renders a checkbox in the first cell when onRowSelect is provided", () => {
    renderTable({
      rows: createRow("one", "Row one", { isSelected: true, onRowSelect: jest.fn() }),
    });

    const cell = screen.getByRole("cell", { name: "Row one" });
    const checkbox = within(cell).getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(screen.getByRole("row", { name: "Row one" })).toHaveAttribute("data-is-selected", "true");
  });

  it("does not render a checkbox when onRowSelect is not provided", () => {
    renderTable({
      rows: createRow("one", "Row one"),
    });
    
    const cell = screen.getByRole("cell", { name: "Row one" });
    const checkbox = within(cell).queryByRole("checkbox");

    expect(checkbox).not.toBeInTheDocument();
    expect(screen.getByRole("row", { name: "Row one" })).toHaveAttribute("data-is-selected", "false");
  });

  it("calls onRowSelect when the checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    renderTable({
      rows: createRow("one", "Row one", { isSelected: true, onRowSelect }),
    });

    const cell = screen.getByRole("cell", { name: "Row one" });
    const checkbox = within(cell).getByRole("checkbox");

    await user.click(checkbox);

    expect(onRowSelect).toHaveBeenCalledTimes(1);
    const [toggleSelection] = onRowSelect.mock.calls[0];
    
    // ensure the state callback gets coverage
    expect(toggleSelection(true)).toBe(false);
  });

  it("calls onRowSelect when the checkbox in the header is clicked", async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    renderTable({
      headerRows: createHeaderRow("header", "Header row", { isSelected: true, onRowSelect }),
      rows: createRow("one", "Row one", { isSelected: true, onRowSelect: jest.fn() }),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const checkbox = within(header).getByRole("checkbox");

    await user.click(checkbox);

    expect(onRowSelect).toHaveBeenCalledTimes(1);
    const [toggleSelection] = onRowSelect.mock.calls[0];
    
    // ensure the state callback gets coverage
    expect(toggleSelection(true)).toBe(false);
  });
});

describe("with sortable columns", () => {
  it("renders a sort button in the header cell when onSort is provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { onSort: jest.fn(), sortType: "unsorted" }),
      rows: createRow("one", "Row one"),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const sortButton = within(header).getByRole("button");

    expect(sortButton).toBeInTheDocument();
  });

  it("does not render a sort button when onSort is not provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { sortType: "unsorted" }),
      rows: createRow("one", "Row one"),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const sortButton = within(header).queryByRole("button");

    expect(sortButton).not.toBeInTheDocument();
  });

  it("does not render a sort button when sortType is not provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { onSort: () => {}}),
      rows: createRow("one", "Row one"),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const sortButton = within(header).queryByRole("button");

    expect(sortButton).not.toBeInTheDocument();
  });

  it("calls onSort when the sort button is clicked", async () => {
    const user = userEvent.setup();
    const onSort = jest.fn();
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { onSort, sortType: "unsorted" }),
      rows: createRow("one", "Row one"),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const sortButton = within(header).getByRole("button");

    await user.click(sortButton);

    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it.each<TableHeaderCellProps["sortType"]>(["ascending", "descending", "unsorted"])("renders the expectd sort icon when sortType is %s", (sortType) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { onSort: jest.fn(), sortType }),
      rows: createRow("one", "Row one"),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const sortIcon = within(header).getByTestId(`table-header-sort-${sortType}`);

    expect(sortIcon).toBeInTheDocument();
  });

  it.each(["prominent", "subtle-white", "subtle-grey"] as const)("applies the %s variant to the sort button", (variant) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { onSort: jest.fn(), sortType: "unsorted" }),
      rows: createRow("one", "Row one"),
      tableProps: { variant },
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });
    const sortButton = within(header).getByRole("button");
    const color = variant === "prominent" ? "var(--table-header-harsh-label-default)" : "var(--table-header-subtle-label-default)";

    expect(sortButton).toHaveStyle(`color: ${color}`);
  });
});

describe("table row", () => {
  it("does not override the border thickness when the prop is not provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row"),
      rows: createRow("one", "Row one"),
      tableProps: { horizontalBorderThickness: "medium" },
    });

    const cell = screen.getByRole("cell", { name: "Row one" });

    expect(cell).toHaveStyleRule(
      `--table-cell-border-horizontal-width: ${borderThicknessStyles.medium}`,
    );
  });

  it.each(["small", "medium", "large"] as const)("overrides the border thickness when the prop is provided", (borderThickness) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row"),
      rows: createRow("one", "Row one", { borderThickness }),
      tableProps: { horizontalBorderThickness: borderThickness === "medium" ? "small" : "medium" },
    });

    const cell = screen.getByRole("cell", { name: "Row one" });

    expect(cell).toHaveStyleRule(
      `--table-cell-border-horizontal-width: ${borderThicknessStyles[borderThickness]}`,
    );
  });
});

describe("table cell", () => {
  it("does not override the border thickness when the prop is not provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row"),
      rows: createRow("one", "Row one"),
      tableProps: { verticalBorderThickness: "medium" },
    });

    const header = screen.getByRole("cell", { name: "Row one" });

    expect(header).toHaveStyleRule(
      `--table-cell-border-vertical-width: ${borderThicknessStyles.medium}`,
    );
  });

  it.each(["small", "medium", "large"] as const)("overrides the border thickness when the prop is provided", (borderThickness) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row"),
      rows: createRow("one", "Row one", {}, { borderThickness}),
      tableProps: { verticalBorderThickness: borderThickness === "medium" ? "small" : "medium" },
    });

    const header = screen.getByRole("cell", { name: "Row one" });

    expect(header).toHaveStyleRule(
      `--table-cell-border-vertical-width: ${borderThicknessStyles[borderThickness]}`,
    );
  });
});

describe("table header", () => {
  it("does not override the border thickness when the prop is not provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row"),
      rows: createRow("one", "Row one"),
      tableProps: { verticalBorderThickness: "medium" },
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });

    expect(header).toHaveStyleRule(
      `--table-cell-border-vertical-width: ${borderThicknessStyles.medium}`,
    );
  });

  it.each(["small", "medium", "large"] as const)("overrides the border thickness when the prop is provided", (borderThickness) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { borderThickness}),
      rows: createRow("one", "Row one"),
      tableProps: { verticalBorderThickness: borderThickness === "medium" ? "small" : "medium" },
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });

    expect(header).toHaveStyleRule(
      `--table-cell-border-vertical-width: ${borderThicknessStyles[borderThickness]}`,
    );
  });

  it.each([
    ["extra-small", "xs"],
    ["small", "s"],
    ["medium", "m"],
    ["large", "l"],
    ["extra-large", "xxl"],
  ] as const)("renders with the expected %s size", (size, token) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row"),
      rows: createRow("one", "Row one"),
      tableProps: { size },
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });

    expect(header).toHaveStyle(
      `height: var(--global-size-${token})`,
    );
  });

  it("renders with the expected width when provided", () => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { width: "200px" }),
      rows: createRow("one", "Row one"),
    });

    const header = screen.getByRole("columnheader", { name: "Header row" });

    expect(header).toHaveStyle(
      `width: 200px`,
    );
    expect(header).toHaveStyle(
      `min-width: 200px`,
    );
  });

  it.each([
    ["prominent", "default", "var(--table-header-harsh-bg-default)"],
    ["subtle-white", "default", "var(--page-bg-default)"],
    ["subtle-grey", "default", "var(--page-bg-alt)"],
    ["prominent", "alternate", "var(--table-header-harsh-bg-alt)"],
    ["subtle-white", "alternate", "var(--table-header-subtle-bg-alt)"],
    ["subtle-grey", "alternate", "var(--table-header-subtle-bg-alt)"],
  ] as const)("renders with the expected variant and alternate background", (variant, variantType, backgroundColor) => {
    renderTable({
      headerRows: createHeaderRow("header", "Header row", {}, { variantType }),
      rows: createRow("one", "Row one"),
      tableProps: { variant },
    });
    const header = screen.getByRole("columnheader", { name: "Header row" });
    const color = variant === "prominent" ? "var(--table-header-harsh-label-default)" : "var(--table-header-subtle-label-default)";

    expect(header).toHaveStyle(`background-color: ${backgroundColor}`);
    expect(header).toHaveStyle(`color: ${color}`);
  });
});

describe("additional table behaviour", () => {
  it("forwards supported native table attributes", () => {
    renderTable({
      rows: createRow("one", "Row one"),
      tableProps: { summary: "A summary of the table contents" },
    });

    expect(screen.getByRole("table")).toHaveAttribute(
      "summary",
      "A summary of the table contents",
    );
  });
});
