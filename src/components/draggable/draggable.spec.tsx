import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { Container, render } from "react-dom";

import DraggableContainer from "./draggable-container.component";
import DraggableItem from "./draggable-item/draggable-item.component";
import { Checkbox } from "../checkbox";
import {
  assertStyleMatch,
  testStyledSystemMargin,
  testStyledSystemPadding,
} from "../../__spec_helper__/test-utils";
import {
  StyledDraggableContainer,
  StyledDraggableItem,
} from "./draggable-item/draggable-item.style";
import DropTarget from "./__internal__/drop-target.component";

describe("Draggable", () => {
  let wrapper: ReactWrapper;

  const getOrder = jest.fn();

  const getDraggableItems = (mountNode: Element | null) => {
    const draggableItems = mountNode?.querySelectorAll(
      'div[data-element="draggable"]'
    );
    return draggableItems ? Array.from(draggableItems) : [];
  };

  const createBubbledEvent = (type: string, props = {}) => {
    const event = new Event(type, { bubbles: true, ...props });
    return event;
  };

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
    getOrder.mockClear();
  });

  testStyledSystemMargin(
    (props) => (
      <DraggableContainer {...props}>
        <DraggableItem key="1" id={1}>
          simple content
        </DraggableItem>
        <DraggableItem key="2" id={2}>
          simple content
        </DraggableItem>
      </DraggableContainer>
    ),
    undefined,
    (component) => component.find(StyledDraggableContainer)
  );

  testStyledSystemPadding(
    (props) => (
      <DraggableContainer>
        <DraggableItem {...props} key="1`" id={1}>
          simple content
        </DraggableItem>
      </DraggableContainer>
    ),
    { py: "8px" },
    (component) => component.find(StyledDraggableItem)
  );

  it("should return an array with id's", () => {
    wrapper.setProps({ getOrder });
    wrapper.find(DropTarget).at(0).props().getOrder(2);
    expect(getOrder).toHaveBeenCalledWith([1, 2], 2);
  });

  it("should return an array if getOrder is not passed to the component", () => {
    wrapper.find(DropTarget)?.at(0)?.props()?.getOrder();
    expect(getOrder).not.toHaveBeenCalledWith();
  });

  it("should render correct", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("accepts empty children", () => {
    expect(() => {
      mount(
        <DraggableContainer>
          {null}
          {undefined}
          {false}
        </DraggableContainer>
      );
    }).not.toThrow();
  });

  it("updates children", () => {
    wrapper = mount(<DraggableContainer>{null}</DraggableContainer>);

    wrapper.setProps({
      children: [
        <DraggableItem key="1" id={1}>
          simple content
        </DraggableItem>,
        <DraggableItem key="2" id={2}>
          simple content
        </DraggableItem>,
      ],
    });

    wrapper.update();

    expect(wrapper.find(DraggableItem).length).toBe(2);
  });

  it("should render correct styles if isDragging is true", () => {
    wrapper = mount(<StyledDraggableItem isDragging />);

    assertStyleMatch(
      {
        opacity: "0",
      },
      wrapper
    );
  });

  describe("Multiple draggable containers", () => {
    let mountNode: HTMLElement;

    beforeEach(() => {
      const component = (
        <div>
          <div id="container-1">
            <DraggableContainer getOrder={getOrder}>
              <DraggableItem key="1" id={1}>
                Item 1
              </DraggableItem>
              <DraggableItem key="2" id={2}>
                Item 2
              </DraggableItem>
              <DraggableItem key="3" id={3}>
                Item 3
              </DraggableItem>
            </DraggableContainer>
          </div>
          <div id="container-2">
            <DraggableContainer getOrder={getOrder}>
              <DraggableItem key="4" id={4}>
                Item 4
              </DraggableItem>
              <DraggableItem key="5" id={5}>
                Item 5
              </DraggableItem>
              <DraggableItem key="6" id={6}>
                Item 6
              </DraggableItem>
            </DraggableContainer>
          </div>
        </div>
      );

      mountNode = document.createElement("div");
      document.body.appendChild(mountNode);
      render(component, mountNode);
    });

    it("should drag items within container 1", () => {
      const container1 = mountNode?.querySelector("#container-1");

      const draggableItems = getDraggableItems(container1);
      const startingNode = draggableItems[0];
      const endingNode = draggableItems[2];
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

      expect(
        getDraggableItems(container1).map((cell) => cell?.textContent)
      ).toEqual(["Item 2", "Item 3", "Item 1"]);
    });

    it("should drag items within container 2", () => {
      const container2 = mountNode?.querySelector("#container-2");

      const draggableItems = getDraggableItems(container2);
      const startingNode = draggableItems[0];
      const endingNode = draggableItems[2];
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

      expect(
        getDraggableItems(container2).map((cell) => cell?.textContent)
      ).toEqual(["Item 5", "Item 6", "Item 4"]);
    });

    it("should not drag items from one container to another", () => {
      const draggableItems = getDraggableItems(mountNode);
      const startingNode = draggableItems[0];
      const endingNode = draggableItems[4];
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

      expect(
        getDraggableItems(mountNode).map((cell) => cell?.textContent)
      ).toEqual(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]);
    });
  });
});

describe("Draggable Checkbox", () => {
  let mountNode: Container;
  let getOrder = jest.fn();

  beforeEach(() => {
    getOrder = jest.fn();
    const component = (
      <DraggableContainer getOrder={getOrder}>
        <DraggableItem key="1" id={1}>
          <Checkbox
            name="one"
            label="Draggable Label One"
            onChange={() => {}}
          />
        </DraggableItem>
        <DraggableItem key="2" id={2}>
          <Checkbox
            name="two"
            label="Draggable Label Two"
            onChange={() => {}}
          />
        </DraggableItem>
        <DraggableItem key="3" id={3}>
          <Checkbox
            name="three"
            label="Draggable Label Three"
            onChange={() => {}}
          />
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

    const createBubbledEvent = (type: string, props = {}) => {
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

    it("forwards the new order and dropped item's id to the getColumns() function", () => {
      const tableCells1 = getTableCells();
      const startingNode1 = tableCells1[0];
      const endingNode1 = tableCells1[2];
      expect(getOrder).not.toHaveBeenCalled();
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

      expect(getOrder).toHaveBeenCalledWith([1, 2, 3], "1");
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
      if (startingNode2) {
        const draggableElement = startingNode2.closest(
          'div[data-element="draggable"]'
        );
        if (draggableElement) {
          draggableElement.getBoundingClientRect = () =>
            ({
              top: 20,
              left: 0,
              bottom: 0,
              height: 0,
              right: 0,
              width: 0,
              x: 0,
              y: 0,
            } as DOMRect);
        }
      }

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

describe("Invariant", () => {
  let mockGlobal: jest.SpyInstance;

  beforeEach(() => {
    mockGlobal = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    mockGlobal.mockReset();
  });

  it("should throw if incorrect children prop is passed", () => {
    expect(() => {
      mount(<DraggableContainer>foo</DraggableContainer>);
    }).toThrow(
      "`DraggableContainer` only accepts children of type `DraggableItem`."
    );
  });
});
