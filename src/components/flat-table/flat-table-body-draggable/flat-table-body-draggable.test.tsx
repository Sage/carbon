import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  FlatTable,
  FlatTableRow,
  FlatTableCell,
  FlatTableBodyDraggable,
} from "..";
import Logger from "../../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

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

describe("FlatTableBodyDraggable", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  it("sets data-role on table body when passed as a prop", () => {
    render(
      <FlatTable>
        <FlatTableBodyDraggable data-role="test">
          <FlatTableRow key={0} id={0}>
            <FlatTableCell>UK</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow key={1} id={1}>
            <FlatTableCell>Germany</FlatTableCell>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>
    );

    expect(screen.getByRole("rowgroup")).toHaveAttribute("data-role", "test");
  });

  describe("drag and drop functionality", () => {
    it("should have rows in correct order on initial render", () => {
      render(<WithDraggableRows />);
      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    it("can drag-and-drop downwards", () => {
      render(<WithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[2];
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row two", "Row three", "Row one"]);
    });

    it("can drag without drop", () => {
      render(<WithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[2];
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(window);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    it("sets the cursor correctly when dragging", async () => {
      render(<WithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(elementToDrag);
      fireEvent.dragOver(elementToDrag);

      await waitFor(() => {
        expect(screen.getByTestId("flat-table-body-draggable")).toHaveStyle(
          "cursor: grabbing"
        );
      });
    });

    it("can drop on the same item", () => {
      render(<WithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(elementToDrag);
      fireEvent.dragOver(elementToDrag);
      fireEvent.drop(elementToDrag);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    it("can drag-and-drop upwards", () => {
      render(<WithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[0];
      const elementToDrag = tableRows[2];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row three", "Row one", "Row two"]);
    });

    it("should allow a dynamically added row to be dragged and dropped", async () => {
      const user = userEvent.setup({ delay: null });
      render(<WithDynamicRow />);

      await user.click(screen.getByRole("button", { name: /Add row/i }));

      const rowThree = screen.getByRole("row", { name: "Row three" });
      const rowOne = screen.getByRole("row", { name: "Row one" });

      fireEvent.dragStart(rowThree);
      fireEvent.dragEnter(rowOne);
      fireEvent.dragOver(rowOne);
      fireEvent.drop(rowOne);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row three", "Row one", "Row two"]);
    });
  });

  describe("with sub rows", () => {
    test("on initial render the rows are in the correct order", () => {
      render(<ComplexTableWithDraggableRows />);
      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    it("can drag-and-drop downwards", () => {
      render(<ComplexTableWithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[2];
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row two", "Row three", "Row one"]);
    });

    it("can drag without drop", () => {
      render(<ComplexTableWithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    it("can drop on the same item", () => {
      render(<ComplexTableWithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(elementToDrag);
      fireEvent.dragOver(elementToDrag);
      fireEvent.drop(elementToDrag);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    it("can drag-and-drop upwards", () => {
      render(<ComplexTableWithDraggableRows />);

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[0];
      const elementToDrag = tableRows[2];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row three", "Row one", "Row two"]);
    });
  });

  it("calls getOrder callback when the order is changed and getOrder prop is set", () => {
    const getOrder = jest.fn();

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
    const tableRows = screen.getAllByRole("row");
    const elementToDrag = tableRows[0];

    fireEvent.dragStart(elementToDrag);
    fireEvent.dragEnter(elementToDrag);
    fireEvent.dragOver(elementToDrag);
    fireEvent.drop(elementToDrag);

    expect(getOrder).toHaveBeenCalledWith([0, 1, 2]);
  });

  describe("mulitple draggable tables", () => {
    it("should drag items within table 1", () => {
      render(<MultipleDraggableTables />);

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[2];
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual([
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

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[5];
      const elementToDrag = tableRows[3];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual([
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

      const tableRows = screen.getAllByRole("row");
      const dropTarget = tableRows[0];
      const elementToDrag = tableRows[4];

      fireEvent.dragStart(elementToDrag);
      fireEvent.dragEnter(dropTarget);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual([
        "Row one",
        "Row two",
        "Row three",
        "Row four",
        "Row five",
        "Row six",
      ]);
    });
  });
});
