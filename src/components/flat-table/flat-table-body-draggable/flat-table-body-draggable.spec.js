import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { render } from "react-dom";
import {
  FlatTable,
  FlatTableRow,
  FlatTableCell,
  FlatTableBodyDraggable,
} from "..";

describe("Draggable Table", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
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
});

describe("Draggable Table with sub rows", () => {
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
    const getTableCells = () =>
      Array.from(
        mountNode.querySelectorAll('tr[data-element="flat-table-row"]')
      );

    const createBubbledEvent = (type, props = {}) =>
      new Event(type, { bubbles: true, ...props });

    it("on initial render it has Initial order of the rows", () => {
      expect(getTableCells().map((cell) => cell.textContent)).toEqual([
        "UK",
        "Germany",
        "Finland",
      ]);
    });

    it("can drag-and-drop downward", () => {
      const tableCells1 = getTableCells();
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

      expect(getTableCells().map((cell) => cell.textContent)).toEqual([
        "Germany",
        "Finland",
        "UK",
      ]);
    });

    it("can drag without drop", () => {
      const tableCells1 = getTableCells();
      const startingNode1 = tableCells1[0];

      act(() => {
        startingNode1.dispatchEvent(
          createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
        );
      });

      expect(getTableCells().map((cell) => cell.textContent)).toEqual([
        "UK",
        "Germany",
        "Finland",
      ]);
    });

    it("can drop on the same item", () => {
      const tableCells1 = getTableCells();
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

      expect(getTableCells().map((cell) => cell.textContent)).toEqual([
        "UK",
        "Germany",
        "Finland",
      ]);
    });

    it("can drag-and-drop upward", () => {
      const tableCells2 = getTableCells();
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

      expect(getTableCells().map((cell) => cell.textContent)).toEqual([
        "UK",
        "Finland",
        "Germany",
      ]);
    });

    it("updates children", () => {
      const wrapper = mount(
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
