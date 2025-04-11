import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "../../../__spec_helper__/__internal__/drag-event-polyfill"

import {
  FlatTable,
  FlatTableRow,
  FlatTableCell,
  FlatTableBodyDraggable,
} from "..";

// Set up fake timers for the tests
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
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
  act(() => {
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
      </FlatTable>
    );
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  const ftDraggableBody = screen.getByRole("rowgroup");

  expect(ftDraggableBody).toHaveAttribute(
    "data-component",
    "flat-table-body-draggable"
  );
  expect(ftDraggableBody).toHaveAttribute(
    "data-element",
    "ft-draggable-data-element"
  );
  expect(ftDraggableBody).toHaveAttribute(
    "data-role",
    "ft-draggable-data-role"
  );
});

describe("drag and drop functionality", () => {
  it("should have rows in correct order on initial render", () => {
    act(() => {
      render(<WithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop downwards", () => {
    act(() => {
      render(<WithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row two",
      "Row three",
      "Row one",
    ]);
  });

  it("can drag without drop", () => {
    act(() => {
      render(<WithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(window);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("sets the cursor correctly when dragging", async () => {
    jest.useRealTimers(); // Need real timers for waitFor
    
    act(() => {
      render(<WithDraggableRows />);
    });

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      fireEvent.dragEnter(elementToDrag);
    });
    
    act(() => {
      fireEvent.dragOver(elementToDrag);
    });

    await waitFor(() => {
      expect(screen.getByTestId("flat-table-body-draggable")).toHaveStyle(
        "cursor: grabbing"
      );
    });
    
    jest.useFakeTimers(); // Switch back to fake timers
  });

  it("can drop on the same item", () => {
    act(() => {
      render(<WithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(elementToDrag);
    });
    
    act(() => {
      fireEvent.dragOver(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(elementToDrag);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop upwards", () => {
    act(() => {
      render(<WithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row one" });
    const elementToDrag = screen.getByRole("row", { name: "Row three" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row three",
      "Row one",
      "Row two",
    ]);
  });

  it("should allow a dynamically added row to be dragged and dropped", async () => {
    jest.useRealTimers(); // Need real timers for userEvent
    
    const user = userEvent.setup({ delay: null });
    
    act(() => {
      render(<WithDynamicRow />);
    });

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Add row/i }));
    });

    const rowThree = screen.getByRole("row", { name: "Row three" });
    const rowOne = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(rowThree);
    });
    
    act(() => {
      fireEvent.dragEnter(rowOne);
    });
    
    act(() => {
      fireEvent.dragOver(rowOne);
    });
    
    act(() => {
      fireEvent.drop(rowOne);
    });
    
    act(() => {
      fireEvent.dragEnd(rowThree);
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row three",
      "Row one",
      "Row two",
    ]);
    
    jest.useFakeTimers(); // Switch back to fake timers
  });
});

describe("with sub rows", () => {
  test("on initial render the rows are in the correct order", () => {
    act(() => {
      render(<ComplexTableWithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop downwards", () => {
    act(() => {
      render(<ComplexTableWithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row two",
      "Row three",
      "Row one",
    ]);
  });

  it("can drag without drop", () => {
    act(() => {
      render(<ComplexTableWithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drop on the same item", () => {
    act(() => {
      render(<ComplexTableWithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(elementToDrag);
    });
    
    act(() => {
      fireEvent.dragOver(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(elementToDrag);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row one",
      "Row two",
      "Row three",
    ]);
  });

  it("can drag-and-drop upwards", () => {
    act(() => {
      render(<ComplexTableWithDraggableRows />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row one" });
    const elementToDrag = screen.getByRole("row", { name: "Row three" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByRole("row").map((cell) => cell.textContent)).toEqual([
      "Row three",
      "Row one",
      "Row two",
    ]);
  });
});

it("calls getOrder callback when the order is changed and getOrder prop is set", () => {
  const getOrder = jest.fn();

  act(() => {
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
      </FlatTable>
    );
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  const elementToDrag = screen.getByRole("row", { name: "Row one" });

  act(() => {
    fireEvent.dragStart(elementToDrag);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragEnter(elementToDrag);
  });
  
  act(() => {
    fireEvent.dragOver(elementToDrag);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.drop(elementToDrag);
  });
  
  act(() => {
    fireEvent.dragEnd(elementToDrag);
  });
  
  act(() => {
    jest.runAllTimers();
  });

  expect(getOrder).toHaveBeenCalledWith([0, 1, 2]);
});

describe("multiple draggable tables", () => {
  it("should drag items within table 1", () => {
    act(() => {
      render(<MultipleDraggableTables />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row three" });
    const elementToDrag = screen.getByRole("row", { name: "Row one" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

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
    act(() => {
      render(<MultipleDraggableTables />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row six" });
    const elementToDrag = screen.getByRole("row", { name: "Row four" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

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
    act(() => {
      render(<MultipleDraggableTables />);
    });
    
    act(() => {
      jest.runAllTimers();
    });

    const dropTarget = screen.getByRole("row", { name: "Row one" });
    const elementToDrag = screen.getByRole("row", { name: "Row six" });

    act(() => {
      fireEvent.dragStart(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.dragEnter(dropTarget);
    });
    
    act(() => {
      fireEvent.dragOver(dropTarget);
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    act(() => {
      fireEvent.drop(dropTarget);
    });
    
    act(() => {
      fireEvent.dragEnd(elementToDrag);
    });
    
    act(() => {
      jest.runAllTimers();
    });

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