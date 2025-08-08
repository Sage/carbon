import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  FlatTable,
  FlatTableRow,
  FlatTableCell,
  FlatTableBodyDraggable,
  FlatTableHead,
  FlatTableHeader,
  FlatTableBodyDraggableHandle,
} from "..";
import "../../../__spec_helper__/__internal__/drag-event-polyfill";

afterEach(() => {
  fireEvent.dragEnd(window);
  fireEvent.pointerMove(window);
});

const WithDraggableRows = () => (
  <FlatTable>
    <FlatTableBodyDraggable>
      <FlatTableRow key="0" id={0}>
        <FlatTableCell>Row one</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow key="1" id={1}>
        <FlatTableCell>Row two</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow key="2" id={2}>
        <FlatTableCell>Row three</FlatTableCell>
      </FlatTableRow>
    </FlatTableBodyDraggable>
  </FlatTable>
);

const ComplexTableWithDraggableRows = () => {
  const subRows = (
    <>
      <FlatTableRow key="sub-row-1">
        <FlatTableCell>Sub row one</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow key="sub-row-2">
        <FlatTableCell>Sub row two</FlatTableCell>
      </FlatTableRow>
    </>
  );

  return (
    <FlatTable>
      <FlatTableBodyDraggable>
        <FlatTableRow expandable subRows={subRows} key="0" id={0}>
          <FlatTableCell>Row one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={subRows} key="1" id={1}>
          <FlatTableCell>Row two</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable subRows={subRows} key="2" id={2}>
          <FlatTableCell>Row three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBodyDraggable>
    </FlatTable>
  );
};

const MultipleDraggableTables = () => (
  <>
    <FlatTable data-role="table-1">
      <FlatTableBodyDraggable>
        <FlatTableRow expandable key="0" id={0} data-role="table-1-row">
          <FlatTableCell>Row one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable key="1" id={1} data-role="table-1-row">
          <FlatTableCell>Row two</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable key="2" id={2} data-role="table-1-row">
          <FlatTableCell>Row three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBodyDraggable>
    </FlatTable>
    <FlatTable data-role="table-2">
      <FlatTableBodyDraggable>
        <FlatTableRow expandable key="3" id={3}>
          <FlatTableCell>Row four</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable key="4" id={4}>
          <FlatTableCell>Row five</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow expandable key="5" id={5}>
          <FlatTableCell>Row six</FlatTableCell>
        </FlatTableRow>
      </FlatTableBodyDraggable>
    </FlatTable>
  </>
);

const WithDynamicRow = () => {
  const [rows, setRows] = React.useState([
    { id: 0, content: "Row one" },
    { id: 1, content: "Row two" },
  ]);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setRows((prev) => [...prev, { id: 2, content: "Row three" }])
        }
      >
        Add row
      </button>
      <FlatTable>
        <FlatTableBodyDraggable>
          {rows.map((row) => (
            <FlatTableRow key={row.id} id={row.id}>
              <FlatTableCell>{row.content}</FlatTableCell>
            </FlatTableRow>
          ))}
        </FlatTableBodyDraggable>
      </FlatTable>
    </>
  );
};

test("should set the expected data- attributes on the table body", () => {
  render(
    <FlatTable>
      <FlatTableBodyDraggable
        data-element="ft-draggable-data-element"
        data-role="ft-draggable-data-role"
      >
        <FlatTableRow key={0} id={0}>
          <FlatTableCell>UK</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow key={1} id={1}>
          <FlatTableCell>Germany</FlatTableCell>
        </FlatTableRow>
      </FlatTableBodyDraggable>
    </FlatTable>,
  );
  const ftDraggableBody = screen.getByRole("rowgroup");

  expect(ftDraggableBody).toHaveAttribute(
    "data-component",
    "flat-table-body-draggable",
  );
  expect(ftDraggableBody).toHaveAttribute(
    "data-element",
    "ft-draggable-data-element",
  );
  expect(ftDraggableBody).toHaveAttribute(
    "data-role",
    "ft-draggable-data-role",
  );
});

describe("drag and drop functionality", () => {
  it("should have rows in correct order on initial render", () => {
    render(<WithDraggableRows />);
    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop downwards", () => {
    render(<WithDraggableRows />);

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row two",
      "Row three",
      "Row one",
    ]);
  });

  it("can drag without drop", () => {
    render(<WithDraggableRows />);

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.dragEnter(window);
    fireEvent.dragOver(window);
    fireEvent.drop(window);
    fireEvent.dragEnd(elementToDrag);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("sets the cursor correctly", async () => {
    render(<WithDraggableRows />);
    const draggableFlatTableRow = screen.getByRole("row", { name: "Row one" });

    expect(draggableFlatTableRow).toHaveAttribute("draggable", "true");

    await waitFor(() => {
      expect(draggableFlatTableRow).toHaveStyle({ cursor: "grab" });
    });
  });

  it("sets the cursor correctly whilst dragging", async () => {
    render(<WithDraggableRows />);
    const draggableFlatTableRow = screen.getByRole("row", { name: "Row one" });

    expect(draggableFlatTableRow).toHaveAttribute("draggable", "true");
    fireEvent.dragStart(draggableFlatTableRow);

    await waitFor(() => {
      expect(draggableFlatTableRow).toHaveStyle({ cursor: "grabbing" });
    });
  });

  it("can drop on the same item", () => {
    render(<WithDraggableRows />);

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(elementToDrag);
    fireEvent.dragOver(elementToDrag);
    fireEvent.drop(elementToDrag);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop upwards", () => {
    render(<WithDraggableRows />);

    const dropTarget = screen.getByRole("row", { name: "Row one" });
    const elementToDrag = screen.getByRole("row", { name: "Row three" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row three",
      "Row one",
      "Row two",
    ]);
  });

  it("should allow a dynamically added row to be dragged and dropped", async () => {
    const user = userEvent.setup({ delay: null });
    render(<WithDynamicRow />);

    await user.click(screen.getByRole("button", { name: /Add row/i }));

    const rowOne = screen.getByRole("row", { name: "Row one" });
    const rowThree = screen.getByRole("row", { name: "Row three" });

    fireEvent.dragStart(rowThree);
    fireEvent.dragEnter(rowOne);
    fireEvent.dragOver(rowOne);
    fireEvent.drop(rowOne);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row three",
      "Row one",
      "Row two",
    ]);
  });
});

describe("with sub rows", () => {
  test("on initial render the rows are in the correct order", () => {
    render(<ComplexTableWithDraggableRows />);
    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop downwards", () => {
    render(<ComplexTableWithDraggableRows />);

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row two",
      "Row three",
      "Row one",
    ]);
  });

  it("can drag without drop", () => {
    render(<ComplexTableWithDraggableRows />);

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drop on the same item", () => {
    render(<ComplexTableWithDraggableRows />);

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(elementToDrag);
    fireEvent.dragOver(elementToDrag);
    fireEvent.drop(elementToDrag);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop upwards", () => {
    render(<ComplexTableWithDraggableRows />);

    const dropTarget = screen.getByRole("row", { name: "Row one" });
    const elementToDrag = screen.getByRole("row", { name: "Row three" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row three",
      "Row one",
      "Row two",
    ]);
  });
});

it("calls getOrder callback when the order is changed and getOrder prop is set", () => {
  const getOrder = jest.fn();
  jest.useFakeTimers();

  render(
    <FlatTable>
      <FlatTableBodyDraggable getOrder={getOrder}>
        <FlatTableRow key="0" id={0}>
          <FlatTableCell>Row one</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow key="1" id={1}>
          <FlatTableCell>Row two</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow key="2" id={2}>
          <FlatTableCell>Row three</FlatTableCell>
        </FlatTableRow>
      </FlatTableBodyDraggable>
    </FlatTable>,
  );

  const dropTarget = screen.getByRole("row", { name: "Row two" });
  const elementToDrag = screen.getByRole("row", { name: "Row one" });

  fireEvent.dragStart(elementToDrag);
  fireEvent.dragEnter(dropTarget);
  fireEvent.dragOver(elementToDrag);
  fireEvent.drop(dropTarget);
  fireEvent.dragEnd(elementToDrag);

  act(() => {
    jest.runAllTimers();
  });

  expect(getOrder).toHaveBeenCalledWith(["1", "0", "2"], "0");
});

test("accepts a ref and allows imperative reordering of draggable table rows", () => {
  jest.useFakeTimers();
  const mockGetOrder = jest.fn();
  const ref = React.createRef<FlatTableBodyDraggableHandle>();

  const rows = [
    { id: "0", name: "UK" },
    { id: "1", name: "Germany" },
    { id: "2", name: "China" },
    { id: "3", name: "US" },
  ];

  render(
    <FlatTable title="Table for draggable rows">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader />
          <FlatTableHeader>Country</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBodyDraggable getOrder={mockGetOrder} ref={ref}>
        {rows.map((row) => (
          <FlatTableRow key={row.id} id={row.id}>
            <FlatTableCell>{row.name}</FlatTableCell>
          </FlatTableRow>
        ))}
      </FlatTableBodyDraggable>
    </FlatTable>,
  );

  expect(ref.current).not.toBeNull();

  // Test moving UK (id: "0") to position 2 (should be after Germany and China)
  act(() => {
    ref.current?.reOrder("0", 2);
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(mockGetOrder).toHaveBeenCalledWith(["1", "2", "0", "3"], "0");
});

describe("multiple draggable tables", () => {
  it("should drag items within table 1", () => {
    render(<MultipleDraggableTables />);

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);
    fireEvent.dragEnd(elementToDrag);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row two",
      "Row three",
      "Row one",
      "Row four",
      "Row five",
      "Row six",
    ]);
  });

  it("should drag items within table 2", () => {
    render(<MultipleDraggableTables />);

    const dropTarget = screen.getByRole("row", { name: "Row six" });
    const elementToDrag = screen.getByRole("row", { name: "Row four" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);
    fireEvent.dragEnd(elementToDrag);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
      "Row five",
      "Row six",
      "Row four",
    ]);
  });

  it("should not drag item from one table to another", () => {
    render(<MultipleDraggableTables />);

    const dropTarget = screen.getByRole("row", { name: "Row one" });
    const elementToDrag = screen.getByRole("row", { name: "Row six" });

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(dropTarget);
    fireEvent.dragOver(dropTarget);
    fireEvent.drop(dropTarget);

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
      "Row four",
      "Row five",
      "Row six",
    ]);
  });
});
