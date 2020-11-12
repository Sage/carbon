import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { render } from "react-dom";
import DraggableContainer from "./draggable-container.component";
import DraggableItem from "./draggable-item.component";
import { Checkbox } from "../../__experimental__/components/checkbox";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { StyledDraggableItem } from "./draggable-item.style";

describe("Draggable Checkbox", () => {
  let wrapper;

  const getOrder = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <DraggableContainer>
        <DraggableItem key="1" id={1}>
          simple content
        </DraggableItem>
        <DraggableItem key="2" id={2}>
          simple content
        </DraggableItem>
      </DraggableContainer>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array with id's", () => {
    wrapper.setProps({ getOrder });
    wrapper.find("DropTarget").at(0).props().getOrder();
    expect(getOrder).toHaveBeenCalledWith([1, 2]);
  });

  it("should return an array if getOrder is not passed to the component", () => {
    wrapper.find("DropTarget").at(0).props().getOrder();
    expect(getOrder).not.toHaveBeenCalledWith();
  });

  it("should render correct", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("validates the incorrect children prop", () => {
    jest.spyOn(global.console, "error").mockImplementation(() => {});

    wrapper = mount(
      <DraggableContainer>
        <Checkbox name="myCheckbox" id="1" key="1" />
      </DraggableContainer>
    );

    const expected =
      "Warning: Failed prop type: `DraggableContainer` only accepts children of" +
      " type `DraggableItem`.\n    in DraggableContainer";

    expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
  });

  it("should render correct if isDragging enable", () => {
    wrapper = mount(<StyledDraggableItem isDragging opacity={1} />);

    assertStyleMatch(
      {
        opacity: "0",
      },
      wrapper
    );
  });
});

describe("Draggable Checkbox", () => {
  let mountNode;

  beforeEach(() => {
    const getOrder = jest.fn();
    const component = (
      <DraggableContainer getOrder={getOrder}>
        <DraggableItem key="1" id={1}>
          <Checkbox name="one" label="Draggable Label One" />
        </DraggableItem>
        <DraggableItem key="2" id={2}>
          <Checkbox name="two" label="Draggable Label Two" />
        </DraggableItem>
        <DraggableItem key="3" id={3}>
          <Checkbox name="three" label="Draggable Label Three" />
        </DraggableItem>
      </DraggableContainer>
    );

    mountNode = document.createElement("div");
    document.body.appendChild(mountNode);
    render(component, mountNode);
  });

  describe("drag and drop functionality works as expected", () => {
    const getTableCells = () =>
      Array.from(mountNode.querySelectorAll('div[data-element="draggable"]'));

    const createBubbledEvent = (type, props = {}) => {
      const event = new Event(type, { bubbles: true, ...props });
      return event;
    };

    it("on initial render it has Initial order of the rows", () => {
      expect(getTableCells().map((cell) => cell.textContent)).toEqual([
        "Draggable Label One",
        "Draggable Label Two",
        "Draggable Label Three",
      ]);
    });

    it("can Drag-and-dropping downward", () => {
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
        "Draggable Label Two",
        "Draggable Label Three",
        "Draggable Label One",
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
        "Draggable Label One",
        "Draggable Label Two",
        "Draggable Label Three",
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
        "Draggable Label One",
        "Draggable Label Two",
        "Draggable Label Three",
      ]);
    });

    it("can Drag-and-dropping upward", () => {
      const tableCells2 = getTableCells();
      const startingNode2 = tableCells2[2];
      const endingNode2 = tableCells2[1];
      startingNode2.closest(
        'div[data-element="draggable"]'
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
        "Draggable Label One",
        "Draggable Label Three",
        "Draggable Label Two",
      ]);
    });
  });
});
