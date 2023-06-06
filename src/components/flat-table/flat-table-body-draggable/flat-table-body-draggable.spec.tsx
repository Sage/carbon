import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

import {
  FlatTable,
  FlatTableRow,
  FlatTableCell,
  FlatTableBodyDraggable,
} from "..";

describe("FlatTableBodyDraggable", () => {
  describe("when a data prop is added", () => {
    test("should be added to the FlatTableBody", () => {
      render(
        <FlatTable>
          <FlatTableBodyDraggable data-testid="test">
            <FlatTableRow key={0} id={0}>
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow key={1} id={1}>
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </FlatTable>
      );

      expect(screen.getByTestId("test")).toBeTruthy();
    });
  });

  describe("drag and drop functionality", () => {
    beforeEach(() => {
      render(
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
    });

    test("on initial render the rows are in the correct order", () => {
      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    test("it can drag-and-drop downwards", () => {
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

    test("it can drag without drop", () => {
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

    test("sets the cursor correctly when dragging", async () => {
      const tableRows = screen.getAllByRole("row");
      const elementToDrag = tableRows[0];

      function tick() {
        return new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      }

      await act(async () => {
        fireEvent.dragStart(elementToDrag);
        fireEvent.dragEnter(elementToDrag);
        fireEvent.dragOver(elementToDrag);

        await tick();
      });

      assertStyleMatch(
        {
          cursor: "grabbing",
        },
        screen.getByTestId("flat-table-body-draggable")
      );
    });

    test("it can drop on the same item", () => {
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

    test("it can drag-and-drop upwards", () => {
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

  describe("with sub rows", () => {
    beforeEach(() => {
      const subRows = [
        <FlatTableRow key="sub-row-1">
          <FlatTableCell>Sub row one</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow key="sub-row-2">
          <FlatTableCell>Sub row two</FlatTableCell>
        </FlatTableRow>,
      ];

      render(
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
    });

    test("on initial render the rows are in the correct order", () => {
      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    test("it can drag-and-drop downwards", () => {
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

    test("it can drag without drop", () => {
      const tableRows = screen.getAllByRole("row");
      const elementToDrag = tableRows[0];

      fireEvent.dragStart(elementToDrag);

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row one", "Row two", "Row three"]);
    });

    test("it can drop on the same item", () => {
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

    test("it can drag-and-drop upwards", () => {
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

  describe("when the passed in children change", () => {
    test("should update the children correctly", () => {
      const { rerender } = render(
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

      rerender(
        <FlatTable>
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
      );

      expect(
        screen.getAllByRole("row").map((cell) => cell.textContent)
      ).toEqual(["Row four", "Row five", "Row six"]);
    });
  });

  describe("when getOrder prop set", () => {
    test("it should call getOrder when the order is changed", () => {
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
  });

  describe("mulitple draggable tables", () => {
    beforeEach(() => {
      render(
        <div>
          <FlatTable data-testid="table-1">
            <FlatTableBodyDraggable>
              <FlatTableRow expandable key="0" id={0} data-testid="table-1-row">
                <FlatTableCell>Row one</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable key="1" id={1} data-testid="table-1-row">
                <FlatTableCell>Row two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable key="2" id={2} data-testid="table-1-row">
                <FlatTableCell>Row three</FlatTableCell>
              </FlatTableRow>
            </FlatTableBodyDraggable>
          </FlatTable>
          <FlatTable data-testid="table-2">
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
        </div>
      );
    });

    test("should drag items within table 1", () => {
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

    test("should drag items within table 2", () => {
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

    test("should not drag item from one table to another", () => {
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
