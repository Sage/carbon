import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import DraggableContainer, { DraggableHandle } from "./draggable-container";
import DraggableItem from "./draggable-item";
import guid from "../../__internal__/utils/helpers/guid";

import "../../__spec_helper__/__internal__/drag-event-polyfill";

let guidCounter = 0;
const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => {
  guidCounter += 1;
  return `${mockedGuid}-${guidCounter}`;
});

afterEach(() => {
  guidCounter = 0;
  jest.clearAllTimers();
  jest.clearAllMocks();
  fireEvent.dragEnd(window);
});

const containerDataRole = { "data-role": "draggable-container" };
const itemDataRole = { "data-role": "draggable-item" };

describe("Rendering", () => {
  it("renders all draggable items within the container", () => {
    render(
      <DraggableContainer containerProps={containerDataRole}>
        <DraggableItem id="Apple">Apple</DraggableItem>
        <DraggableItem id="Mercury">Mercury</DraggableItem>
        <DraggableItem id="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    const items = ["Apple", "Mercury", "Venus"];

    expect(draggableContainer).toBeVisible();

    items.forEach((itemText) => {
      const item = screen.getByText(itemText);
      expect(draggableContainer).toContainElement(item);
    });
  });

  it("renders all draggable items as an array within the container", () => {
    const testItems = [
      <DraggableItem key="1" id="item1">
        Apple
      </DraggableItem>,
      <DraggableItem key="2" id="item2">
        Mercury
      </DraggableItem>,
      <DraggableItem key="3" id="item3">
        Venus
      </DraggableItem>,
    ];
    render(
      <DraggableContainer containerProps={containerDataRole}>
        {testItems}
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    const items = ["Apple", "Mercury", "Venus"];

    expect(draggableContainer).toBeVisible();

    items.forEach((itemText) => {
      const item = screen.getByText(itemText);
      expect(draggableContainer).toContainElement(item);
    });
  });

  it("renders with custom container node", () => {
    render(
      <DraggableContainer
        containerNode="article"
        containerProps={containerDataRole}
      >
        <DraggableItem id="Apple">Apple</DraggableItem>
        <DraggableItem id="Mercury">Mercury</DraggableItem>
        <DraggableItem id="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByRole("article");
    expect(draggableContainer).toBeVisible();
  });

  it("renders with custom id", () => {
    render(
      <DraggableContainer id="foo" containerProps={containerDataRole}>
        <DraggableItem id="Apple">Apple</DraggableItem>
        <DraggableItem id="Mercury">Mercury</DraggableItem>
        <DraggableItem id="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    expect(draggableContainer).toHaveAttribute("id", "foo");
  });

  it("renders without children", () => {
    render(<DraggableContainer containerProps={containerDataRole} />);

    const nullChildrenElement = screen.getByTestId("draggable-container");
    expect(nullChildrenElement).toBeVisible();
    expect(nullChildrenElement).toBeEmptyDOMElement();
  });

  it("recovers from empty to populated list on rerender", () => {
    const { rerender } = render(
      <DraggableContainer
        id="recovery-container"
        containerProps={containerDataRole}
      />,
    );

    const recoveryContainer = screen.getByTestId("draggable-container");
    expect(recoveryContainer).toBeEmptyDOMElement();

    rerender(
      <DraggableContainer
        id="recovery-container"
        containerProps={containerDataRole}
      >
        <DraggableItem id="test-item">Test Item</DraggableItem>
      </DraggableContainer>,
    );

    const testItem = screen.getByText("Test Item");
    expect(recoveryContainer).toContainElement(testItem);
  });
});

describe("Drag and Drop Functionality", () => {
  it("handles continuous dragging", () => {
    render(
      <DraggableContainer containerProps={containerDataRole}>
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="venus">
          Venus
        </DraggableItem>
      </DraggableContainer>,
    );

    const apple = screen.getByText("Apple");
    const venus = screen.getByText("Venus");
    const draggableContainer = screen.getByTestId("draggable-container");
    fireEvent.dragStart(apple);
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);
    fireEvent.dragLeave(venus);
    fireEvent.drop(draggableContainer);
    fireEvent.dragEnd(apple);

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(3);
    expect(allItems[0]).toHaveTextContent("Mercury");
    expect(allItems[1]).toHaveTextContent("Venus");
    expect(allItems[2]).toHaveTextContent("Apple");
  });

  it("handles drag and drop functionality on drop only", () => {
    render(
      <DraggableContainer dragType="onDrop" containerProps={containerDataRole}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
        <DraggableItem id="venus" itemProps={itemDataRole}>
          Venus
        </DraggableItem>
      </DraggableContainer>,
    );

    const apple = screen.getByText("Apple");
    const venus = screen.getByText("Venus");

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    expect(initialItems[2]).toHaveTextContent("Venus");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);

    const duringDragItems = screen.getAllByTestId("draggable-item");
    expect(duringDragItems[0]).toHaveTextContent("Apple");
    expect(duringDragItems[1]).toHaveTextContent("Mercury");
    expect(duringDragItems[2]).toHaveTextContent("Venus");

    fireEvent.drop(venus);
    fireEvent.dragEnd(apple);

    const afterDropItems = screen.getAllByTestId("draggable-item");
    expect(afterDropItems).toHaveLength(3);
    expect(afterDropItems[0]).toHaveTextContent("Mercury");
    expect(afterDropItems[1]).toHaveTextContent("Venus");
    expect(afterDropItems[2]).toHaveTextContent("Apple");
  });

  it("resets list to original state when item is dropped outside container during continuous drag", () => {
    render(
      <>
        <DraggableContainer>
          <DraggableItem itemProps={itemDataRole} id="apple">
            Apple
          </DraggableItem>
          <DraggableItem itemProps={itemDataRole} id="mercury">
            Mercury
          </DraggableItem>
          <DraggableItem itemProps={itemDataRole} id="venus">
            Venus
          </DraggableItem>
        </DraggableContainer>
        <p>Outer content</p>
      </>,
    );

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    expect(initialItems[2]).toHaveTextContent("Venus");

    const apple = screen.getByText("Apple");
    const venus = screen.getByText("Venus");
    const outerContent = screen.getByText("Outer content");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);
    fireEvent.dragLeave(venus);
    fireEvent.dragEnter(outerContent);
    fireEvent.dragOver(outerContent);
    fireEvent.drop(outerContent);
    fireEvent.dragEnd(apple);

    const afterSecondDropItems = screen.getAllByTestId("draggable-item");
    expect(afterSecondDropItems).toHaveLength(3);
    expect(afterSecondDropItems[0]).toHaveTextContent("Apple");
    expect(afterSecondDropItems[1]).toHaveTextContent("Mercury");
    expect(afterSecondDropItems[2]).toHaveTextContent("Venus");
  });

  it("resets list to original state when item is dropped outside container during onDrop mode", () => {
    render(
      <>
        <DraggableContainer dragType="onDrop">
          <DraggableItem itemProps={itemDataRole} id="apple">
            Apple
          </DraggableItem>
          <DraggableItem itemProps={itemDataRole} id="mercury">
            Mercury
          </DraggableItem>
          <DraggableItem itemProps={itemDataRole} id="venus">
            Venus
          </DraggableItem>
        </DraggableContainer>
        <p>Outer content</p>
      </>,
    );

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    expect(initialItems[2]).toHaveTextContent("Venus");

    const apple = screen.getByText("Apple");
    const venus = screen.getByText("Venus");
    const outerContent = screen.getByText("Outer content");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);
    fireEvent.dragLeave(venus);
    fireEvent.dragEnter(outerContent);
    fireEvent.dragOver(outerContent);
    fireEvent.drop(outerContent);
    fireEvent.dragEnd(apple);

    const afterSecondDropItems = screen.getAllByTestId("draggable-item");
    expect(afterSecondDropItems).toHaveLength(3);
    expect(afterSecondDropItems[0]).toHaveTextContent("Apple");
    expect(afterSecondDropItems[1]).toHaveTextContent("Mercury");
    expect(afterSecondDropItems[2]).toHaveTextContent("Venus");
  });

  it("handles when item is dropped on itself with continuous drag", () => {
    render(
      <DraggableContainer containerProps={containerDataRole}>
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="venus">
          Venus
        </DraggableItem>
      </DraggableContainer>,
    );

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    expect(initialItems[2]).toHaveTextContent("Venus");

    const apple = screen.getByText("Apple");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(apple);
    fireEvent.dragOver(apple);
    fireEvent.drop(apple);
    fireEvent.dragEnd(apple);

    const itemsAfterDrag = screen.getAllByTestId("draggable-item");
    expect(itemsAfterDrag).toHaveLength(3);
    expect(itemsAfterDrag[0]).toHaveTextContent("Apple");
    expect(itemsAfterDrag[1]).toHaveTextContent("Mercury");
    expect(itemsAfterDrag[2]).toHaveTextContent("Venus");
  });

  it("handles when item is dropped on itself with onDrop mode", () => {
    render(
      <DraggableContainer dragType="onDrop" containerProps={containerDataRole}>
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="venus">
          Venus
        </DraggableItem>
      </DraggableContainer>,
    );

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    expect(initialItems[2]).toHaveTextContent("Venus");

    const apple = screen.getByText("Apple");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(apple);
    fireEvent.dragOver(apple);
    fireEvent.drop(apple);
    fireEvent.dragEnd(apple);

    const itemsAfterDrag = screen.getAllByTestId("draggable-item");
    expect(itemsAfterDrag).toHaveLength(3);
    expect(itemsAfterDrag[0]).toHaveTextContent("Apple");
    expect(itemsAfterDrag[1]).toHaveTextContent("Mercury");
    expect(itemsAfterDrag[2]).toHaveTextContent("Venus");
  });

  it("prevents drags from other containers affecting current container on continuous drag", () => {
    render(
      <>
        <DraggableContainer
          containerProps={{ "data-role": "container-1" }}
          id="container-1"
        >
          <DraggableItem
            itemProps={{ "data-role": "item-container-1" }}
            id="apple"
          >
            Apple
          </DraggableItem>
          <DraggableItem
            itemProps={{ "data-role": "item-container-1" }}
            id="mercury"
          >
            Mercury
          </DraggableItem>
        </DraggableContainer>
        <DraggableContainer
          containerProps={{ "data-role": "container-2" }}
          id="container-2"
        >
          <DraggableItem
            itemProps={{ "data-role": "item-container-2" }}
            id="venus"
          >
            Venus
          </DraggableItem>
          <DraggableItem
            itemProps={{ "data-role": "item-container-2" }}
            id="pear"
          >
            Pear
          </DraggableItem>
        </DraggableContainer>
      </>,
    );

    const container1Items = screen.getAllByTestId("item-container-1");
    expect(container1Items[0]).toHaveTextContent("Apple");
    expect(container1Items[1]).toHaveTextContent("Mercury");

    const container2Items = screen.getAllByTestId("item-container-2");
    expect(container2Items[0]).toHaveTextContent("Venus");
    expect(container2Items[1]).toHaveTextContent("Pear");

    const apple = screen.getByText("Apple");
    const venus = screen.getByText("Venus");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);
    fireEvent.drop(venus);
    fireEvent.dragEnd(apple);

    const container1ItemsAfterDrag = screen.getAllByTestId("item-container-1");
    expect(container1ItemsAfterDrag[0]).toHaveTextContent("Apple");
    expect(container1ItemsAfterDrag[1]).toHaveTextContent("Mercury");

    const container2ItemsAfterDrag = screen.getAllByTestId("item-container-2");
    expect(container2ItemsAfterDrag[0]).toHaveTextContent("Venus");
    expect(container2ItemsAfterDrag[1]).toHaveTextContent("Pear");
  });

  it("prevents drags from other containers affecting current container on drop only", () => {
    render(
      <>
        <DraggableContainer
          dragType="onDrop"
          containerProps={{ "data-role": "container-1" }}
          id="container-1"
        >
          <DraggableItem
            itemProps={{ "data-role": "item-container-1" }}
            id="apple"
          >
            Apple
          </DraggableItem>
          <DraggableItem
            itemProps={{ "data-role": "item-container-1" }}
            id="mercury"
          >
            Mercury
          </DraggableItem>
        </DraggableContainer>
        <DraggableContainer
          containerProps={{ "data-role": "container-2" }}
          id="container-2"
        >
          <DraggableItem
            itemProps={{ "data-role": "item-container-2" }}
            id="venus"
          >
            Venus
          </DraggableItem>
          <DraggableItem
            itemProps={{ "data-role": "item-container-2" }}
            id="pear"
          >
            Pear
          </DraggableItem>
        </DraggableContainer>
      </>,
    );

    const container1Items = screen.getAllByTestId("item-container-1");
    expect(container1Items[0]).toHaveTextContent("Apple");
    expect(container1Items[1]).toHaveTextContent("Mercury");

    const container2Items = screen.getAllByTestId("item-container-2");
    expect(container2Items[0]).toHaveTextContent("Venus");
    expect(container2Items[1]).toHaveTextContent("Pear");

    const apple = screen.getByText("Apple");
    const venus = screen.getByText("Venus");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);
    fireEvent.drop(venus);
    fireEvent.dragEnd(apple);

    const container1ItemsAfterDrag = screen.getAllByTestId("item-container-1");
    expect(container1ItemsAfterDrag[0]).toHaveTextContent("Apple");
    expect(container1ItemsAfterDrag[1]).toHaveTextContent("Mercury");

    const container2ItemsAfterDrag = screen.getAllByTestId("item-container-2");
    expect(container2ItemsAfterDrag[0]).toHaveTextContent("Venus");
    expect(container2ItemsAfterDrag[1]).toHaveTextContent("Pear");
  });
});

describe("Dynamic Item Management", () => {
  it("handles procedural adding of new items", () => {
    const { rerender } = render(
      <DraggableContainer>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );
    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems).toHaveLength(2);
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    rerender(
      <DraggableContainer>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
        <DraggableItem id="venus" itemProps={itemDataRole}>
          Venus
        </DraggableItem>
        <DraggableItem id="jupiter" itemProps={itemDataRole}>
          Jupiter
        </DraggableItem>
      </DraggableContainer>,
    );
    const itemsAfterAdd = screen.getAllByTestId("draggable-item");
    expect(itemsAfterAdd).toHaveLength(4);
    expect(itemsAfterAdd[0]).toHaveTextContent("Apple");
    expect(itemsAfterAdd[1]).toHaveTextContent("Mercury");
    expect(itemsAfterAdd[2]).toHaveTextContent("Venus");
    expect(itemsAfterAdd[3]).toHaveTextContent("Jupiter");
  });

  it("handles procedural deletion of items", () => {
    const { rerender } = render(
      <DraggableContainer>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
        <DraggableItem id="venus" itemProps={itemDataRole}>
          Venus
        </DraggableItem>
        <DraggableItem id="jupiter" itemProps={itemDataRole}>
          Jupiter
        </DraggableItem>
      </DraggableContainer>,
    );

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems).toHaveLength(4);
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");
    expect(initialItems[2]).toHaveTextContent("Venus");
    expect(initialItems[3]).toHaveTextContent("Jupiter");

    rerender(
      <DraggableContainer>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const itemsAfterDelete = screen.getAllByTestId("draggable-item");
    expect(itemsAfterDelete).toHaveLength(2);
    expect(itemsAfterDelete[0]).toHaveTextContent("Apple");
    expect(itemsAfterDelete[1]).toHaveTextContent("Mercury");
  });

  it("handles procedural reordering of items when length is the same", () => {
    const { rerender } = render(
      <DraggableContainer>
        <DraggableItem key="apple" id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem key="mercury" id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const initialItems = screen.getAllByTestId("draggable-item");
    expect(initialItems).toHaveLength(2);
    expect(initialItems[0]).toHaveTextContent("Apple");
    expect(initialItems[1]).toHaveTextContent("Mercury");

    rerender(
      <DraggableContainer>
        <DraggableItem key="mercury" id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
        <DraggableItem key="apple" id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
      </DraggableContainer>,
    );

    const itemsAfterUpdate = screen.getAllByTestId("draggable-item");
    expect(itemsAfterUpdate).toHaveLength(2);
    expect(itemsAfterUpdate[0]).toHaveTextContent("Mercury");
    expect(itemsAfterUpdate[1]).toHaveTextContent("Apple");
  });
});

describe("Item Reordering and Imperative API", () => {
  it("reorders items when order is manually changed", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer ref={ref} getOrder={mockGetOrder}>
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.reOrder("apple", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury");
    expect(allItems[1]).toHaveTextContent("Apple");

    jest.useRealTimers();
  });

  it("calls setDraggedNode when dragging an item", () => {
    const mockSetDraggedNode = jest.fn();

    render(
      <DraggableContainer
        containerProps={containerDataRole}
        setDraggedNode={mockSetDraggedNode}
      >
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="venus">
          Venus
        </DraggableItem>
      </DraggableContainer>,
    );

    const apple = screen.getByText("Apple");
    const mercury = screen.getByText("Mercury");

    fireEvent.dragStart(apple);
    fireEvent.dragEnter(mercury);
    fireEvent.dragOver(mercury);
    fireEvent.drop(mercury);
    fireEvent.dragEnd(apple);

    expect(mockSetDraggedNode).toHaveBeenCalled();
    expect(mockSetDraggedNode.mock.calls[0][0]).toBeInstanceOf(Element);

    const draggedNode = mockSetDraggedNode.mock.calls[0][0];
    expect(draggedNode).toHaveTextContent("Apple");
  });

  it("calls setDraggedNode with correct element when using reOrder", () => {
    jest.useFakeTimers();
    const mockSetDraggedNode = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer
        ref={ref}
        setDraggedNode={mockSetDraggedNode}
        containerProps={containerDataRole}
      >
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    act(() => {
      ref.current?.reOrder("apple", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockSetDraggedNode).toHaveBeenCalled();
    expect(mockSetDraggedNode.mock.calls[0][0]).toBeInstanceOf(Element);

    const draggedNode = mockSetDraggedNode.mock.calls[0][0];
    expect(draggedNode).toHaveTextContent("Apple");

    jest.useRealTimers();
  });
});

describe("Console Warning Checks", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "warn");
    consoleSpy.mockImplementation(() => {});
  });

  it("logs warning once when one duplicate unique identifier is found", () => {
    const ref = React.createRef<DraggableHandle>();
    render(
      <DraggableContainer ref={ref}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      `[WARNING] There are draggable item(s) with duplicate unique identifiers (apple), therefore a move could not be completed.`,
    );
  });

  it("logs warning once when more than one duplicate identifier is found", () => {
    const ref = React.createRef<DraggableHandle>();
    render(
      <DraggableContainer ref={ref}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      `[WARNING] There are draggable item(s) with duplicate unique identifiers (apple, apple), therefore a move could not be completed.`,
    );
  });
});

describe("Finding Parent Item ID", () => {
  const NestedDraggableItem = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => (
    <DraggableItem id={id} itemProps={itemDataRole}>
      <div data-testid={`wrapper-${id}`}>{children}</div>
    </DraggableItem>
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("finds parent item ID when using reOrder with nested structures", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <NestedDraggableItem id="apple">
          <div data-testid="apple-inner" id="apple-inner">
            Apple Content
          </div>
        </NestedDraggableItem>
        <NestedDraggableItem id="mercury">
          <div data-testid="mercury-inner" id="mercury-inner">
            Mercury Content
          </div>
        </NestedDraggableItem>
      </DraggableContainer>,
    );

    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.reOrder("apple-inner", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury Content");
    expect(allItems[1]).toHaveTextContent("Apple Content");
  });

  it("finds parent item ID through multiple levels of nesting", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          <div data-testid="level-1">
            <div data-testid="level-2">
              <div data-testid="level-3">
                <span
                  id="deeply-nested-apple"
                  data-testid="deeply-nested-apple"
                >
                  Deeply Nested Apple
                </span>
              </div>
            </div>
          </div>
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.reOrder("deeply-nested-apple", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury");
    expect(allItems[1]).toHaveTextContent("Deeply Nested Apple");
  });

  it("does not reorder when element is outside the container", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <>
        <div id="outside-element">Outside Element</div>
        <DraggableContainer
          id="test-container"
          ref={ref}
          getOrder={mockGetOrder}
        >
          <DraggableItem id="apple" itemProps={itemDataRole}>
            Apple
          </DraggableItem>
          <DraggableItem id="mercury" itemProps={itemDataRole}>
            Mercury
          </DraggableItem>
        </DraggableContainer>
      </>,
    );

    act(() => {
      ref.current?.reOrder("outside-element", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Apple");
    expect(allItems[1]).toHaveTextContent("Mercury");

    expect(mockGetOrder).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("does not reorder when element exists but has no parent with data-item-id", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <div id="non-draggable">
          <span id="nested-element">Non-draggable content</span>
        </div>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    act(() => {
      ref.current?.reOrder("nested-element", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Apple");
    expect(allItems[1]).toHaveTextContent("Mercury");

    expect(mockGetOrder).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("handles non-existent element IDs gracefully", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.reOrder("non-existent-id", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Apple");
    expect(allItems[1]).toHaveTextContent("Mercury");

    expect(mockGetOrder).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("falls back to using provided ID if no parent with data-item-id is found", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.reOrder("apple", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury");
    expect(allItems[1]).toHaveTextContent("Apple");
  });
});

describe("Edge Cases", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("handles invalid cases in localMove with invalid index or missing ID", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer ref={ref} getOrder={mockGetOrder}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    act(() => {
      // @ts-expect-error - Testing invalid params
      ref.current?.reOrder("apple", null);
    });

    act(() => {
      // @ts-expect-error - Testing invalid params
      ref.current?.reOrder("apple", undefined);
    });

    act(() => {
      // @ts-expect-error - Testing invalid params
      ref.current?.reOrder(null, 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    const draggableItems = screen.getAllByTestId("draggable-item");
    expect(draggableItems[0]).toHaveTextContent("Apple");
    expect(draggableItems[1]).toHaveTextContent("Mercury");
    expect(mockGetOrder).not.toHaveBeenCalled();
  });

  it("handles when item is not found in list during localMove", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<DraggableHandle>();

    render(
      <DraggableContainer ref={ref} getOrder={mockGetOrder}>
        <DraggableItem id="apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
        <DraggableItem id="mercury" itemProps={itemDataRole}>
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    act(() => {
      ref.current?.reOrder("nonexistent", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    const draggableItems = screen.getAllByTestId("draggable-item");
    expect(draggableItems[0]).toHaveTextContent("Apple");
    expect(draggableItems[1]).toHaveTextContent("Mercury");
    expect(mockGetOrder).not.toHaveBeenCalled();
  });
});
