import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { render } from "react-dom";
import {
  FlatTable,
  FlatTableBody,
  FlatTableRow,
  FlatTableCell,
  FlatTableBodyDraggable,
} from "..";

describe("Draggable Table", () => {
  let wrapper;

  const getTableCells = (mountNode) =>
    Array.from(mountNode.querySelectorAll('tr[data-element="flat-table-row"]'));

  const createBubbledEvent = (type, props = {}) =>
    new Event(type, { bubbles: true, ...props });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when a data prop is added", () => {
    it("should be added to the FlatTableBody", () => {
      wrapper = mount(
        <FlatTable>
          <FlatTableBodyDraggable data-role="test">
            <FlatTableRow key={0} id={0} index={0}>
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow key={1} id={1} index={1}>
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </FlatTable>
      );

      expect(wrapper.find(FlatTableBody).props()["data-role"]).toEqual("test");
    });
  });

  it("should call getOrder with an array with id's", () => {
    const getOrder = jest.fn();
    wrapper = mount(
      <FlatTable>
        <FlatTableBodyDraggable getOrder={getOrder}>
          <FlatTableRow key={0} id={0} index={0}>
            <FlatTableCell>UK</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow key={1} id={1} index={1}>
            <FlatTableCell>Germany</FlatTableCell>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>
    );
    wrapper.find("DropTarget").at(0).props().getOrder();
    expect(getOrder).toHaveBeenCalledWith([0, 1]);
  });

  it("should not call getOrder with an array if getOrder is not passed to the component", () => {
    const getOrder = jest.fn();
    wrapper = mount(
      <FlatTable>
        <FlatTableBodyDraggable>
          <FlatTableRow key={0} id={0} index={0}>
            <FlatTableCell>UK</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow key={1} id={1} index={1}>
            <FlatTableCell>Germany</FlatTableCell>
          </FlatTableRow>
        </FlatTableBodyDraggable>
      </FlatTable>
    );
    wrapper.find("DropTarget").at(0).props().getOrder();
    expect(getOrder).not.toHaveBeenCalledWith();
  });

  describe("With sub rows", () => {
    let mountNode;

    beforeEach(() => {
      const subRows = [
        <FlatTableRow>
          <FlatTableCell>York</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow>
          <FlatTableCell>Edinburgh</FlatTableCell>
        </FlatTableRow>,
      ];
      const component = (
        <FlatTable>
          <FlatTableBodyDraggable>
            <FlatTableRow expandable subRow={subRows} key="0" id={0}>
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow expandable subRow={subRows} key="1" id={1}>
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow expandable subRow={subRows} key="2" id={2}>
              <FlatTableCell>Finland</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </FlatTable>
      );

      mountNode = document.createElement("div");
      document.body.appendChild(mountNode);
      render(component, mountNode);
    });

    describe("drag and drop functionality works as expected", () => {
      it("on initial render it has Initial order of the rows", () => {
        expect(
          getTableCells(mountNode).map((cell) => cell.textContent)
        ).toEqual(["UK", "Germany", "Finland"]);
      });

      it("can drag-and-drop downward", () => {
        const tableCells1 = getTableCells(mountNode);
        const startingNode1 = tableCells1[0];
        const endingNode1 = tableCells1[2];

        act(() => {
          startingNode1.dispatchEvent(
            createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
          );

          endingNode1.dispatchEvent(
            createBubbledEvent("dragover", { clientX: 0, clientY: 1 })
          );

          endingNode1.dispatchEvent(
            createBubbledEvent("drop", { clientX: 0, clientY: 1 })
          );
        });

        expect(
          getTableCells(mountNode).map((cell) => cell.textContent)
        ).toEqual(["Germany", "Finland", "UK"]);
      });

      it("can drag without drop", () => {
        const tableCells1 = getTableCells(mountNode);
        const startingNode1 = tableCells1[0];

        act(() => {
          startingNode1.dispatchEvent(
            createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
          );
        });

        expect(
          getTableCells(mountNode).map((cell) => cell.textContent)
        ).toEqual(["UK", "Germany", "Finland"]);
      });

      it("can drop on the same item", () => {
        const tableCells1 = getTableCells(mountNode);
        const startingNode1 = tableCells1[0];

        act(() => {
          startingNode1.dispatchEvent(
            createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
          );

          startingNode1.dispatchEvent(
            createBubbledEvent("dragover", { clientX: 0, clientY: 0 })
          );

          startingNode1.dispatchEvent(
            createBubbledEvent("drop", { clientX: 0, clientY: 0 })
          );
        });

        expect(
          getTableCells(mountNode).map((cell) => cell.textContent)
        ).toEqual(["UK", "Germany", "Finland"]);
      });

      it("can drag-and-drop upward", () => {
        const tableCells2 = getTableCells(mountNode);
        const startingNode2 = tableCells2[2];
        const endingNode2 = tableCells2[1];
        startingNode2.closest(
          'tr[data-element="flat-table-row"]'
        ).getBoundingClientRect = () => ({
          top: 20,
          left: 0,
        });

        act(() => {
          startingNode2.dispatchEvent(
            createBubbledEvent("dragstart", { clientX: 0, clientY: 20 })
          );
          endingNode2.dispatchEvent(
            createBubbledEvent("dragover", { clientX: 0, clientY: 10 })
          );
          endingNode2.dispatchEvent(
            createBubbledEvent("drop", { clientX: 0, clientY: 10 })
          );
        });

        expect(
          getTableCells(mountNode).map((cell) => cell.textContent)
        ).toEqual(["UK", "Finland", "Germany"]);
      });

      it("updates children", () => {
        wrapper = mount(
          <FlatTable>
            <FlatTableBodyDraggable>
              <FlatTableRow key={0} id={0} index={0}>
                <FlatTableCell>UK</FlatTableCell>
              </FlatTableRow>
            </FlatTableBodyDraggable>
          </FlatTable>
        );

        wrapper.setProps({
          children: (
            <FlatTableBodyDraggable>
              <FlatTableRow key={0} id={0} index={0}>
                <FlatTableCell>UK</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow key={1} id={1} index={1}>
                <FlatTableCell>Germany</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow key={2} id={2} index={2}>
                <FlatTableCell>Finland</FlatTableCell>
              </FlatTableRow>
            </FlatTableBodyDraggable>
          ),
        });

        wrapper.update();

        expect(wrapper.find(FlatTableRow).length).toBe(3);
      });
    });
  });

  describe("mulitple draggable tables", () => {
    let mountNode;

    beforeEach(() => {
      const component = (
        <div>
          <FlatTable id="table-1">
            <FlatTableBodyDraggable>
              <FlatTableRow expandable key="0" id={0}>
                <FlatTableCell>UK</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandablekey="1" id={1}>
                <FlatTableCell>Germany</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable key="2" id={2}>
                <FlatTableCell>Finland</FlatTableCell>
              </FlatTableRow>
            </FlatTableBodyDraggable>
          </FlatTable>
          <FlatTable id="table-2">
            <FlatTableBodyDraggable>
              <FlatTableRow expandable key="3" id={3}>
                <FlatTableCell>USA</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable key="4" id={4}>
                <FlatTableCell>Canada</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable key="5" id={5}>
                <FlatTableCell>Spain</FlatTableCell>
              </FlatTableRow>
            </FlatTableBodyDraggable>
          </FlatTable>
        </div>
      );

      mountNode = document.createElement("div");
      document.body.appendChild(mountNode);
      render(component, mountNode);
    });

    it("should drag items within table 1", () => {
      const table1 = mountNode.querySelector("#table-1");
      const tableCells = getTableCells(table1);
      const startingNode = tableCells[0];
      const endingNode = tableCells[2];

      act(() => {
        startingNode.dispatchEvent(
          createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
        );

        endingNode.dispatchEvent(
          createBubbledEvent("dragover", { clientX: 0, clientY: 1 })
        );

        endingNode.dispatchEvent(
          createBubbledEvent("drop", { clientX: 0, clientY: 1 })
        );
      });

      expect(getTableCells(table1).map((cell) => cell.textContent)).toEqual([
        "Germany",
        "Finland",
        "UK",
      ]);
    });

    it("should drag items within table 2", () => {
      const table2 = mountNode.querySelector("#table-2");
      const tableCells = getTableCells(table2);
      const startingNode = tableCells[0];
      const endingNode = tableCells[2];

      act(() => {
        startingNode.dispatchEvent(
          createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
        );

        endingNode.dispatchEvent(
          createBubbledEvent("dragover", { clientX: 0, clientY: 1 })
        );

        endingNode.dispatchEvent(
          createBubbledEvent("drop", { clientX: 0, clientY: 1 })
        );
      });

      expect(getTableCells(table2).map((cell) => cell.textContent)).toEqual([
        "Canada",
        "Spain",
        "USA",
      ]);
    });

    it("should not drag item from one table to another", () => {
      const tableCells = getTableCells(mountNode);
      const startingNode = tableCells[0];
      const endingNode = tableCells[4];

      act(() => {
        startingNode.dispatchEvent(
          createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
        );

        endingNode.dispatchEvent(
          createBubbledEvent("dragover", { clientX: 0, clientY: 1 })
        );

        endingNode.dispatchEvent(
          createBubbledEvent("drop", { clientX: 0, clientY: 1 })
        );
      });

      expect(getTableCells(mountNode).map((cell) => cell.textContent)).toEqual([
        "UK",
        "Germany",
        "Finland",
        "USA",
        "Canada",
        "Spain",
      ]);
    });
  });
});
