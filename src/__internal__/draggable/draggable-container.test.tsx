import React, { useState } from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Import the components to test
import DraggableContainer from "./draggable-container";
import DraggableItem from "./draggable-item";
import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";
import DraggableProviderContext from "../../hooks/useDraggable/draggable-provider-context";
import DraggableContainerContext from "./draggable-container-context";
import guid from "../../__internal__/utils/helpers/guid";
import {
  monitorForElements,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { isDraggableItemData } from "./draggable-utils";

// Import drag event polyfill
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

describe("Rendering behavior", () => {
  it("renders all draggable items within the container", () => {
    render(
      <DraggableContainer data-role="draggable-container">
        <DraggableItem uniqueId="Apple">Apple</DraggableItem>
        <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
        <DraggableItem uniqueId="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    const items = ["Apple", "Mercury", "Venus"];

    // Check container is visible
    expect(draggableContainer).toBeVisible();

    // Check all items exist and are within container
    items.forEach((itemText) => {
      const item = screen.getByText(itemText);
      expect(draggableContainer).toContainElement(item);
    });
  });

  it("renders all draggable items as an array within the container", () => {
    const testItems = [
      <DraggableItem key="1" uniqueId="item1">
        Apple
      </DraggableItem>,
      <DraggableItem key="2" uniqueId="item2">
        Mercury
      </DraggableItem>,
      <DraggableItem key="3" uniqueId="item3">
        Venus
      </DraggableItem>,
    ];
    render(
      <DraggableContainer data-role="draggable-container">
        {testItems}
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    const items = ["Apple", "Mercury", "Venus"];

    // Check container is visible
    expect(draggableContainer).toBeVisible();

    // Check all items exist and are within container
    items.forEach((itemText) => {
      const item = screen.getByText(itemText);
      expect(draggableContainer).toContainElement(item);
    });
  });

  it("renders with custom container node", () => {
    render(
      <DraggableContainer
        containerNode="article"
        data-role="draggable-container"
      >
        <DraggableItem uniqueId="Apple">Apple</DraggableItem>
        <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
        <DraggableItem uniqueId="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByRole("article");
    expect(draggableContainer).toBeVisible();
  });

  it("renders with custom data attributes", () => {
    render(
      <DraggableContainer
        data-role="foo"
        data-component="bar"
        data-element="baz"
      >
        <DraggableItem uniqueId="Apple">Apple</DraggableItem>
        <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
        <DraggableItem uniqueId="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("foo");
    expect(draggableContainer).toHaveAttribute("data-component", "bar");
    expect(draggableContainer).toHaveAttribute("data-element", "baz");
  });

  it("renders with custom id", () => {
    render(
      <DraggableContainer id="foo" data-role="draggable-component">
        <DraggableItem uniqueId="Apple">Apple</DraggableItem>
        <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
        <DraggableItem uniqueId="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-component");
    expect(draggableContainer).toHaveAttribute("id", "foo");
  });

  // internal only - for styled component use elsewhere
  it("renders with custom className", () => {
    render(
      <DraggableContainer className="foo" data-role="draggable-component">
        <DraggableItem uniqueId="Apple">Apple</DraggableItem>
        <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
        <DraggableItem uniqueId="Venus">Venus</DraggableItem>
      </DraggableContainer>,
    );

    const draggableContainer = screen.getByTestId("draggable-component");
    expect(draggableContainer).toHaveClass("foo");
  });

  it("renders with data-provider-id when provider context is consumed", () => {
    render(
      <DraggableProviderContext.Provider value={{ uniqueId: "foo" }}>
        <DraggableContainer data-role="draggable-container">
          <DraggableItem uniqueId="Apple">Apple</DraggableItem>
          <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
          <DraggableItem uniqueId="Venus">Venus</DraggableItem>
        </DraggableContainer>
      </DraggableProviderContext.Provider>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    expect(draggableContainer).toHaveAttribute("data-provider-id", "foo");
  });

  it("renders with a data-drag-state to show when items are being dragged between containers", () => {
    const moveMock = jest.fn();
    render(
      <DraggableProviderContext.Provider
        value={{
          move: moveMock,
          containerDragState: {
            draggingBetweenContainers: true,
            targetContainerId: "foo",
          },
          uniqueId: "foo",
        }}
      >
        <DraggableContainer id="foo" data-role="draggable-container">
          <DraggableItem uniqueId="Apple">Apple</DraggableItem>
          <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
          <DraggableItem uniqueId="Venus">Venus</DraggableItem>
        </DraggableContainer>
      </DraggableProviderContext.Provider>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    expect(draggableContainer).toHaveAttribute(
      "data-drag-state",
      "dragging-over-between-containers",
    );
  });

  it("renders with a data-drag-state to show when items are being dragged within the same container", () => {
    const moveMock = jest.fn();
    render(
      <DraggableProviderContext.Provider
        value={{
          move: moveMock,
          containerDragState: {
            draggingBetweenContainers: false,
            targetContainerId: "foo",
          },
          uniqueId: "foo",
        }}
      >
        <DraggableContainer id="foo" data-role="draggable-container">
          <DraggableItem uniqueId="Apple">Apple</DraggableItem>
          <DraggableItem uniqueId="Mercury">Mercury</DraggableItem>
          <DraggableItem uniqueId="Venus">Venus</DraggableItem>
        </DraggableContainer>
      </DraggableProviderContext.Provider>,
    );

    const draggableContainer = screen.getByTestId("draggable-container");
    expect(draggableContainer).toHaveAttribute(
      "data-drag-state",
      "dragging-over",
    );
  });

  it("renders with empty provider context list", () => {
    const registerMock = jest.fn();
    const moveMock = jest.fn();
    render(
      <DraggableProviderContext.Provider
        value={{
          register: registerMock,
          lists: {},
          move: moveMock,
          containerDragState: {
            draggingBetweenContainers: false,
            targetContainerId: "mock-id",
          },
          uniqueId: "test-provider-id",
        }}
      >
        <DraggableContainer id="test-container" data-role="empty-container" />
      </DraggableProviderContext.Provider>,
    );

    const emptyContainer = screen.getByTestId("empty-container");
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer.children.length).toBe(0);
    expect(registerMock).toHaveBeenCalledWith("test-container", []);
  });

  it("renders with explicitly empty array from provider", () => {
    const registerMock = jest.fn();
    const moveMock = jest.fn();
    render(
      <DraggableProviderContext.Provider
        value={{
          register: registerMock,
          lists: { "test-container": [] },
          move: moveMock,
          containerDragState: {
            draggingBetweenContainers: false,
            targetContainerId: "mock-id",
          },
          uniqueId: "test-provider-id",
        }}
      >
        <DraggableContainer id="test-container" data-role="empty-container" />
      </DraggableProviderContext.Provider>,
    );

    const emptyContainer = screen.getByTestId("empty-container");
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer.children.length).toBe(0);
  });

  it("renders without provider context (using local state)", () => {
    render(<DraggableContainer data-role="local-empty-container" />);

    const localEmptyContainer = screen.getByTestId("local-empty-container");
    expect(localEmptyContainer).toBeInTheDocument();
    expect(localEmptyContainer.children.length).toBe(0);
  });

  it("renders with null children prop", () => {
    render(
      <DraggableContainer
        data-role="null-children-container"
        children={null}
      />,
    );

    const nullChildrenElement = screen.getByTestId("null-children-container");
    expect(nullChildrenElement).toBeInTheDocument();
    expect(nullChildrenElement.children.length).toBe(0);
  });

  it("recovers from empty to populated list on rerender", () => {
    const { rerender } = render(
      <DraggableContainer
        id="recovery-container"
        data-role="recovery-container"
      />,
    );

    const recoveryContainer = screen.getByTestId("recovery-container");
    expect(recoveryContainer.children.length).toBe(0);

    rerender(
      <DraggableContainer
        id="recovery-container"
        data-role="recovery-container"
      >
        <DraggableItem uniqueId="test-item">Test Item</DraggableItem>
      </DraggableContainer>,
    );

    const testItem = screen.getByText("Test Item");
    expect(recoveryContainer).toContainElement(testItem);
  });
});

describe("Registration and state management", () => {
  it("registers items with the provider context on initial render", () => {
    const registerMock = jest.fn();
    const moveMock = jest.fn();

    const testItems = [
      <DraggableItem key="1" uniqueId="item1">
        Item 1
      </DraggableItem>,
      <DraggableItem key="2" uniqueId="item2">
        Item 2
      </DraggableItem>,
      <DraggableItem key="3" uniqueId="item3">
        Item 3
      </DraggableItem>,
    ];

    render(
      <DraggableProviderContext.Provider
        value={{
          register: registerMock,
          lists: {},
          move: moveMock,
          containerDragState: {
            draggingBetweenContainers: false,
            targetContainerId: "mock-id",
          },
          uniqueId: "test-provider-id",
        }}
      >
        <DraggableContainer
          id="test-container"
          data-role="container-with-items"
        >
          {testItems}
        </DraggableContainer>
      </DraggableProviderContext.Provider>,
    );

    const container = screen.getByTestId("container-with-items");
    expect(container).toBeVisible();

    expect(registerMock).toHaveBeenCalledTimes(1);
    expect(registerMock.mock.calls[0][0]).toBe("test-container");

    const registeredItems = registerMock.mock.calls[0][1];

    expect(registeredItems[0].props.uniqueId).toBe("item1");
    expect(registeredItems[0].props.children).toBe("Item 1");
    expect(registeredItems[1].props.uniqueId).toBe("item2");
    expect(registeredItems[1].props.children).toBe("Item 2");
    expect(registeredItems[2].props.uniqueId).toBe("item3");
    expect(registeredItems[2].props.children).toBe("Item 3");
  });
});

describe("Drag and drop functionality using fireEvent", () => {
  it("handles drag and drop functionality using continuous dragging", () => {
    render(
      <DraggableContainer data-role="draggable-container">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="venus">
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
      <DraggableContainer dragType="onDrop" data-role="draggable-container">
        <DraggableItem uniqueId="apple" data-role="draggable-item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="draggable-item">
          Mercury
        </DraggableItem>
        <DraggableItem uniqueId="venus" data-role="draggable-item">
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

    // Drag over venus - this shouldn't change order in "onDrop" mode
    fireEvent.dragEnter(venus);
    fireEvent.dragOver(venus);

    // Check that order hasn't changed during drag (only happens with continuous)
    const duringDragItems = screen.getAllByTestId("draggable-item");
    expect(duringDragItems[0]).toHaveTextContent("Apple");
    expect(duringDragItems[1]).toHaveTextContent("Mercury");
    expect(duringDragItems[2]).toHaveTextContent("Venus");

    // Complete the drag operation
    fireEvent.drop(venus);
    fireEvent.dragEnd(apple);

    // Now the order should be updated
    const afterDropItems = screen.getAllByTestId("draggable-item");
    expect(afterDropItems).toHaveLength(3);
    expect(afterDropItems[0]).toHaveTextContent("Mercury");
    expect(afterDropItems[1]).toHaveTextContent("Venus");
    expect(afterDropItems[2]).toHaveTextContent("Apple");
  });

  it("resets list to original state on render when an item is dropped outside the container during a continous drag", async () => {
    render(
      <>
        <DraggableContainer>
          <DraggableItem data-role="draggable-item" uniqueId="apple">
            Apple
          </DraggableItem>
          <DraggableItem data-role="draggable-item" uniqueId="mercury">
            Mercury
          </DraggableItem>
          <DraggableItem data-role="draggable-item" uniqueId="venus">
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
    // does a full continous move
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

  it("resets list to original state on render when an item is dropped outside the container during an on drop only", async () => {
    render(
      <>
        <DraggableContainer dragType="onDrop">
          <DraggableItem data-role="draggable-item" uniqueId="apple">
            Apple
          </DraggableItem>
          <DraggableItem data-role="draggable-item" uniqueId="mercury">
            Mercury
          </DraggableItem>
          <DraggableItem data-role="draggable-item" uniqueId="venus">
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
    // does a full continous move
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
});

test("items are reordered when their order is manually changed", () => {
  jest.useFakeTimers();
  const mockGetOrder = jest.fn();
  const ref = React.createRef<UseDraggableHandle>();

  act(() => {
    render(
      <DraggableContainer ref={ref} getOrder={mockGetOrder}>
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );
  });

  // Verify ref is properly connected
  expect(ref.current).not.toBeNull();

  // Use imperative handle to reorder items
  act(() => {
    ref.current?.reOrder("apple", 1);
  });

  act(() => {
    jest.runAllTimers();
  });

  // Verify callback was called with correct parameters
  expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

  // Verify DOM reflects the new order
  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(2);
  expect(allItems[0]).toHaveTextContent("Mercury");
  expect(allItems[1]).toHaveTextContent("Apple");
});

describe("findParentItemId function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Helper component to create nested structures
  const NestedDraggableItem = ({
    uniqueId,
    children,
  }: {
    uniqueId: string;
    children: React.ReactNode;
  }) => (
    <DraggableItem uniqueId={uniqueId} data-role="draggable-item">
      <div data-testid={`wrapper-${uniqueId}`}>{children}</div>
    </DraggableItem>
  );

  it("finds the parent item ID when using reOrder with nested structures", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <NestedDraggableItem uniqueId="apple">
          <div data-testid="apple-inner" id="apple-inner">
            Apple Content
          </div>
        </NestedDraggableItem>
        <NestedDraggableItem uniqueId="mercury">
          <div data-testid="mercury-inner" id="mercury-inner">
            Mercury Content
          </div>
        </NestedDraggableItem>
      </DraggableContainer>,
    );

    // Verify ref is properly connected
    expect(ref.current).not.toBeNull();

    // Use imperative handle to reorder items using the ID of a nested element
    act(() => {
      ref.current?.reOrder("apple-inner", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify callback was called with correct parameters
    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    // Verify DOM reflects the new order
    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury Content");
    expect(allItems[1]).toHaveTextContent("Apple Content");
  });

  it("finds the parent item ID through multiple levels of nesting", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <DraggableItem uniqueId="apple" data-role="draggable-item">
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
        <DraggableItem uniqueId="mercury" data-role="draggable-item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Verify ref is properly connected
    expect(ref.current).not.toBeNull();

    // Use imperative handle to reorder items using the ID of a deeply nested element
    act(() => {
      ref.current?.reOrder("deeply-nested-apple", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify callback was called with correct parameters
    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    // Verify DOM reflects the new order
    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury");
    expect(allItems[1]).toHaveTextContent("Deeply Nested Apple");
  });

  it("doesn't reorder when element is outside the container", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();
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
          <DraggableItem uniqueId="apple" data-role="draggable-item">
            Apple
          </DraggableItem>
          <DraggableItem uniqueId="mercury" data-role="draggable-item">
            Mercury
          </DraggableItem>
        </DraggableContainer>
      </>,
    );

    // Use imperative handle with an element that exists but is outside the container
    act(() => {
      ref.current?.reOrder("outside-element", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify the order didn't change
    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Apple");
    expect(allItems[1]).toHaveTextContent("Mercury");

    // Verify the callback wasn't called
    expect(mockGetOrder).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("doesn't reorder when element exists but has no parent with data-item-id", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <div id="non-draggable">
          <span id="nested-element">Non-draggable content</span>
        </div>
        <DraggableItem uniqueId="apple" data-role="draggable-item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="draggable-item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Use imperative handle with an element that has no parent with data-item-id
    act(() => {
      ref.current?.reOrder("nested-element", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify the order didn't change
    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Apple");
    expect(allItems[1]).toHaveTextContent("Mercury");

    // Verify the callback wasn't called
    expect(mockGetOrder).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("handles non-existent element IDs gracefully", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <DraggableItem uniqueId="apple" data-role="draggable-item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="draggable-item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Verify ref is properly connected
    expect(ref.current).not.toBeNull();

    // Use imperative handle with a non-existent ID
    act(() => {
      ref.current?.reOrder("non-existent-id", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify the order didn't change since the element wasn't found
    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Apple");
    expect(allItems[1]).toHaveTextContent("Mercury");

    // Verify the callback wasn't called
    expect(mockGetOrder).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("falls back to using the provided ID if no parent with data-item-id is found", () => {
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    // Set up for direct ID usage with no parent element having data-item-id
    render(
      <DraggableContainer id="test-container" ref={ref} getOrder={mockGetOrder}>
        <DraggableItem uniqueId="apple" data-role="draggable-item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="draggable-item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Verify ref is properly connected
    expect(ref.current).not.toBeNull();

    // Use imperative handle with the direct ID of the item
    act(() => {
      ref.current?.reOrder("apple", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify callback was called with correct parameters
    expect(mockGetOrder).toHaveBeenCalledWith(["mercury", "apple"], "apple");

    // Verify DOM reflects the new order
    const allItems = screen.getAllByTestId("draggable-item");
    expect(allItems).toHaveLength(2);
    expect(allItems[0]).toHaveTextContent("Mercury");
    expect(allItems[1]).toHaveTextContent("Apple");
  });
});

it("calls setDraggedNode when dragging an item", () => {
  const mockSetDraggedNode = jest.fn();

  render(
    <DraggableContainer
      data-role="draggable-container"
      setDraggedNode={mockSetDraggedNode}
    >
      <DraggableItem data-role="draggable-item" uniqueId="apple">
        Apple
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="mercury">
        Mercury
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="venus">
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
  expect(draggedNode.textContent).toContain("Apple");
});

it("calls setDraggedNode with the correct element when using reOrder", () => {
  jest.useFakeTimers();
  const mockSetDraggedNode = jest.fn();
  const ref = React.createRef<UseDraggableHandle>();

  render(
    <DraggableContainer
      ref={ref}
      setDraggedNode={mockSetDraggedNode}
      data-role="draggable-container"
    >
      <DraggableItem data-role="draggable-item" uniqueId="apple">
        Apple
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="mercury">
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
  expect(draggedNode.textContent).toContain("Apple");
});

// ========================================================================
// ADDITIONAL COVERAGE TESTS
// These tests focus on covering branches marked with "// cover this"
// in the DraggableContainer component
// ========================================================================

describe("Coverage for edge cases and marked branches", () => {
  // Set up for consistently mocking time-based functions
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  // Test for handling invalid indices in localMove
  it("handles invalid cases in localMove with invalid index or missing ID", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <DraggableContainer
        ref={ref}
        getOrder={mockGetOrder}
        data-role="container"
      >
        <DraggableItem uniqueId="apple" data-role="item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Test with null index
    act(() => {
      // @ts-ignore - Testing invalid params
      ref.current?.reOrder("apple", null);
    });

    // Test with undefined index
    act(() => {
      // @ts-ignore - Testing invalid params
      ref.current?.reOrder("apple", undefined);
    });

    // Test with null ID
    act(() => {
      // @ts-ignore - Testing invalid params
      ref.current?.reOrder(null, 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify order didn't change
    const items = screen.getAllByTestId("item");
    expect(items[0]).toHaveTextContent("Apple");
    expect(items[1]).toHaveTextContent("Mercury");
    expect(mockGetOrder).not.toHaveBeenCalled();
  });

  // Test for handling the case when item not found in the list
  it("handles when an item is not found in the list during localMove", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <DraggableContainer
        ref={ref}
        getOrder={mockGetOrder}
        data-role="container"
      >
        <DraggableItem uniqueId="apple" data-role="item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Attempt to move a non-existent item
    act(() => {
      ref.current?.reOrder("nonexistent", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify order didn't change
    const items = screen.getAllByTestId("item");
    expect(items[0]).toHaveTextContent("Apple");
    expect(items[1]).toHaveTextContent("Mercury");
    expect(mockGetOrder).not.toHaveBeenCalled();
  });

  it("handles when an item is not found in the list during localMove", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <DraggableContainer
        ref={ref}
        getOrder={mockGetOrder}
        data-role="container"
      >
        <DraggableItem uniqueId="apple" data-role="item">
          Apple
        </DraggableItem>
        <DraggableItem uniqueId="mercury" data-role="item">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    // Attempt to move a non-existent item
    act(() => {
      ref.current?.reOrder("nonexistent", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Verify order didn't change
    const items = screen.getAllByTestId("item");
    expect(items[0]).toHaveTextContent("Apple");
    expect(items[1]).toHaveTextContent("Mercury");
    expect(mockGetOrder).not.toHaveBeenCalled();
  });
});

it("handles adding new items to an existing container with localRegister", () => {
  const { rerender } = render(
    <DraggableContainer data-role="incremental-container">
      <DraggableItem uniqueId="apple">Apple</DraggableItem>
      <DraggableItem uniqueId="mercury">Mercury</DraggableItem>
    </DraggableContainer>,
  );

  // Initial check - two items rendered
  const container = screen.getByTestId("incremental-container");
  expect(container.children.length).toBe(2);

  let items = screen.getAllByText(/Apple|Mercury/);
  expect(items).toHaveLength(2);
  expect(items[0]).toHaveTextContent("Apple");
  expect(items[1]).toHaveTextContent("Mercury");

  // Now rerender with additional items
  rerender(
    <DraggableContainer data-role="incremental-container">
      <DraggableItem uniqueId="apple">Apple</DraggableItem>
      <DraggableItem uniqueId="mercury">Mercury</DraggableItem>
      <DraggableItem uniqueId="venus">Venus</DraggableItem>
      <DraggableItem uniqueId="jupiter">Jupiter</DraggableItem>
    </DraggableContainer>,
  );

  // Check that all four items are now rendered
  expect(container.children.length).toBe(4);

  items = screen.getAllByText(/Apple|Mercury|Venus|Jupiter/);
  expect(items).toHaveLength(4);
  expect(items[0]).toHaveTextContent("Apple");
  expect(items[1]).toHaveTextContent("Mercury");
  expect(items[2]).toHaveTextContent("Venus");
  expect(items[3]).toHaveTextContent("Jupiter");
});

it("handles the procedural adding of new items", async () => {
  const user = userEvent.setup();
  // Create a component that can add items dynamically
  const TestComponent = () => {
    const [items, setItems] = useState([
      <DraggableItem key="apple" uniqueId="apple" data-role="draggable-item">
        Apple
      </DraggableItem>,
      <DraggableItem
        key="mercury"
        uniqueId="mercury"
        data-role="draggable-item"
      >
        Mercury
      </DraggableItem>,
    ]);

    return (
      <>
        <button
          data-role="add-items-button"
          onClick={() =>
            setItems([
              ...items,
              <DraggableItem
                key="venus"
                uniqueId="venus"
                data-role="draggable-item"
              >
                Venus
              </DraggableItem>,
              <DraggableItem
                key="jupiter"
                uniqueId="jupiter"
                data-role="draggable-item"
              >
                Jupiter
              </DraggableItem>,
            ])
          }
        >
          Add Items
        </button>
        <DraggableContainer data-role="incremental-container">
          {items}
        </DraggableContainer>
      </>
    );
  };

  render(<TestComponent />);

  const initialItems = screen.getAllByTestId("draggable-item");
  expect(initialItems).toHaveLength(2);
  expect(initialItems[0]).toHaveTextContent("Apple");
  expect(initialItems[1]).toHaveTextContent("Mercury");

  await user.click(screen.getByTestId("add-items-button"));

  const itemsAfterAdd = screen.getAllByTestId("draggable-item");
  expect(itemsAfterAdd).toHaveLength(4);
  expect(itemsAfterAdd[0]).toHaveTextContent("Apple");
  expect(itemsAfterAdd[1]).toHaveTextContent("Mercury");
  expect(itemsAfterAdd[2]).toHaveTextContent("Venus");
  expect(itemsAfterAdd[3]).toHaveTextContent("Jupiter");
});

it("handles the procedural deletion of items", async () => {
  const user = userEvent.setup();

  // Create a component that can delete items dynamically
  const TestComponent = () => {
    const [items, setItems] = useState([
      <DraggableItem key="apple" uniqueId="apple" data-role="draggable-item">
        Apple
      </DraggableItem>,
      <DraggableItem
        key="mercury"
        uniqueId="mercury"
        data-role="draggable-item"
      >
        Mercury
      </DraggableItem>,
      <DraggableItem key="venus" uniqueId="venus" data-role="draggable-item">
        Venus
      </DraggableItem>,
      <DraggableItem
        key="jupiter"
        uniqueId="jupiter"
        data-role="draggable-item"
      >
        Jupiter
      </DraggableItem>,
    ]);

    const deleteItems = () => {
      // Remove the last two items
      const newItems = [...items];
      newItems.splice(-2);
      setItems(newItems);
    };

    return (
      <>
        <button data-role="delete-items-button" onClick={deleteItems}>
          Delete Items
        </button>
        <DraggableContainer data-role="decremental-container">
          {items}
        </DraggableContainer>
      </>
    );
  };

  render(<TestComponent />);

  // Check initial state
  const initialItems = screen.getAllByTestId("draggable-item");
  expect(initialItems).toHaveLength(4);
  expect(initialItems[0]).toHaveTextContent("Apple");
  expect(initialItems[1]).toHaveTextContent("Mercury");
  expect(initialItems[2]).toHaveTextContent("Venus");
  expect(initialItems[3]).toHaveTextContent("Jupiter");

  // Delete items
  await user.click(screen.getByTestId("delete-items-button"));

  // Check state after deletion
  const itemsAfterDelete = screen.getAllByTestId("draggable-item");
  expect(itemsAfterDelete).toHaveLength(2);
  expect(itemsAfterDelete[0]).toHaveTextContent("Apple");
  expect(itemsAfterDelete[1]).toHaveTextContent("Mercury");
});

it("if items are procedurally changed, but the count does not increase it does nothing", async () => {
  const user = userEvent.setup();

  // Create a component that can update items without changing the count
  const TestComponent = () => {
    const [items, setItems] = useState([
      <DraggableItem key="apple" uniqueId="apple" data-role="draggable-item">
        Apple
      </DraggableItem>,
      <DraggableItem
        key="mercury"
        uniqueId="mercury"
        data-role="draggable-item"
      >
        Mercury
      </DraggableItem>,
    ]);

    const updateItems = () => {
      // Same count but different content
      setItems([
        <DraggableItem
          key="banana"
          uniqueId="banana"
          data-role="draggable-item"
        >
          Banana
        </DraggableItem>,
        <DraggableItem key="mars" uniqueId="mars" data-role="draggable-item">
          Mars
        </DraggableItem>,
      ]);
    };

    return (
      <>
        <button data-role="update-items-button" onClick={updateItems}>
          Update Items
        </button>
        <DraggableContainer data-role="update-container">
          {items}
        </DraggableContainer>
      </>
    );
  };

  render(<TestComponent />);

  // Check initial state
  const initialItems = screen.getAllByTestId("draggable-item");
  expect(initialItems).toHaveLength(2);
  expect(initialItems[0]).toHaveTextContent("Apple");
  expect(initialItems[1]).toHaveTextContent("Mercury");

  // Update items without changing the count
  await user.click(screen.getByTestId("update-items-button"));

  // Check state after update - content should NOT change if our component is working as described
  const itemsAfterUpdate = screen.getAllByTestId("draggable-item");
  expect(itemsAfterUpdate).toHaveLength(2); // Same count
  expect(itemsAfterUpdate[0]).toHaveTextContent("Apple"); // Content should not change
  expect(itemsAfterUpdate[1]).toHaveTextContent("Mercury"); // Content should not change
});

it("prevents drags from other containers affecting the current container on continous drag", () => {
  render(
    <>
      <DraggableContainer data-role="container-1" id="container-1">
        <DraggableItem data-role="item-container-1" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="item-container-1" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="container-2" id="container-2">
        <DraggableItem data-role="item-container-2" uniqueId="venus">
          Venus
        </DraggableItem>
        <DraggableItem data-role="item-container-2" uniqueId="pear">
          Pear
        </DraggableItem>
      </DraggableContainer>
    </>,
  );

  // Verify initial state of both containers
  const container1Items = screen.getAllByTestId("item-container-1");
  expect(container1Items[0]).toHaveTextContent("Apple");
  expect(container1Items[1]).toHaveTextContent("Mercury");

  const container2Items = screen.getAllByTestId("item-container-2");
  expect(container2Items[0]).toHaveTextContent("Venus");
  expect(container2Items[1]).toHaveTextContent("Pear");

  // Get elements to use in dragging
  const apple = screen.getByText("Apple");
  const venus = screen.getByText("Venus");

  // Start dragging from container 1 over an element in container 2
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.drop(venus);
  fireEvent.dragEnd(apple);

  // Verify that neither container's order changed
  // Container 1 should maintain its original order
  const container1ItemsAfterDrag = screen.getAllByTestId("item-container-1");
  expect(container1ItemsAfterDrag[0]).toHaveTextContent("Apple");
  expect(container1ItemsAfterDrag[1]).toHaveTextContent("Mercury");

  // Container 2 should also maintain its original order
  const container2ItemsAfterDrag = screen.getAllByTestId("item-container-2");
  expect(container2ItemsAfterDrag[0]).toHaveTextContent("Venus");
  expect(container2ItemsAfterDrag[1]).toHaveTextContent("Pear");
});

it("prevents drags from other containers affecting the current container on drop only", () => {
  render(
    <>
      <DraggableContainer dragType="onDrop" data-role="container-1" id="container-1">
        <DraggableItem data-role="item-container-1" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="item-container-1" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="container-2" id="container-2">
        <DraggableItem data-role="item-container-2" uniqueId="venus">
          Venus
        </DraggableItem>
        <DraggableItem data-role="item-container-2" uniqueId="pear">
          Pear
        </DraggableItem>
      </DraggableContainer>
    </>,
  );

  // Verify initial state of both containers
  const container1Items = screen.getAllByTestId("item-container-1");
  expect(container1Items[0]).toHaveTextContent("Apple");
  expect(container1Items[1]).toHaveTextContent("Mercury");

  const container2Items = screen.getAllByTestId("item-container-2");
  expect(container2Items[0]).toHaveTextContent("Venus");
  expect(container2Items[1]).toHaveTextContent("Pear");

  // Get elements to use in dragging
  const apple = screen.getByText("Apple");
  const venus = screen.getByText("Venus");

  // Start dragging from container 1 over an element in container 2
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.drop(venus);
  fireEvent.dragEnd(apple);

  // Verify that neither container's order changed
  // Container 1 should maintain its original order
  const container1ItemsAfterDrag = screen.getAllByTestId("item-container-1");
  expect(container1ItemsAfterDrag[0]).toHaveTextContent("Apple");
  expect(container1ItemsAfterDrag[1]).toHaveTextContent("Mercury");

  // Container 2 should also maintain its original order
  const container2ItemsAfterDrag = screen.getAllByTestId("item-container-2");
  expect(container2ItemsAfterDrag[0]).toHaveTextContent("Venus");
  expect(container2ItemsAfterDrag[1]).toHaveTextContent("Pear");
});

it("handles when an item is dropped on itself with continuous drag (default)", () => {
  render(
    <DraggableContainer data-role="draggable-container">
      <DraggableItem data-role="draggable-item" uniqueId="apple">
        Apple
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="mercury">
        Mercury
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="venus">
        Venus
      </DraggableItem>
    </DraggableContainer>
  );

  // Get initial state
  const initialItems = screen.getAllByTestId("draggable-item");
  expect(initialItems[0]).toHaveTextContent("Apple");
  expect(initialItems[1]).toHaveTextContent("Mercury");
  expect(initialItems[2]).toHaveTextContent("Venus");

  // Get apple element and perform drag-and-drop on itself
  const apple = screen.getByText("Apple");
  
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(apple);
  fireEvent.dragOver(apple);
  fireEvent.drop(apple);
  fireEvent.dragEnd(apple);

  // Verify order hasn't changed
  const itemsAfterDrag = screen.getAllByTestId("draggable-item");
  expect(itemsAfterDrag).toHaveLength(3);
  expect(itemsAfterDrag[0]).toHaveTextContent("Apple");
  expect(itemsAfterDrag[1]).toHaveTextContent("Mercury");
  expect(itemsAfterDrag[2]).toHaveTextContent("Venus");
});

it("handles when an item is dropped on itself with dragType='onDrop'", () => {
  render(
    <DraggableContainer dragType="onDrop" data-role="draggable-container">
      <DraggableItem data-role="draggable-item" uniqueId="apple">
        Apple
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="mercury">
        Mercury
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="venus">
        Venus
      </DraggableItem>
    </DraggableContainer>
  );

  // Get initial state
  const initialItems = screen.getAllByTestId("draggable-item");
  expect(initialItems[0]).toHaveTextContent("Apple");
  expect(initialItems[1]).toHaveTextContent("Mercury");
  expect(initialItems[2]).toHaveTextContent("Venus");

  // Get apple element and perform drag-and-drop on itself
  const apple = screen.getByText("Apple");
  
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(apple);
  fireEvent.dragOver(apple);
  fireEvent.drop(apple);
  fireEvent.dragEnd(apple);

  // Verify order hasn't changed
  const itemsAfterDrag = screen.getAllByTestId("draggable-item");
  expect(itemsAfterDrag).toHaveLength(3);
  expect(itemsAfterDrag[0]).toHaveTextContent("Apple");
  expect(itemsAfterDrag[1]).toHaveTextContent("Mercury");
  expect(itemsAfterDrag[2]).toHaveTextContent("Venus");
});

it("handles when destinationId is the same but position is different in continuous drag", () => {
  render(
    <DraggableContainer data-role="draggable-container">
      <DraggableItem data-role="draggable-item" uniqueId="apple">
        Apple
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="mercury">
        Mercury
      </DraggableItem>
      <DraggableItem data-role="draggable-item" uniqueId="mercury">
        Venus
      </DraggableItem>
    </DraggableContainer>
  );
  
  // Get initial state
  const initialItems = screen.getAllByTestId("draggable-item");
  expect(initialItems[0]).toHaveTextContent("Apple");
  expect(initialItems[1]).toHaveTextContent("Mercury");
  expect(initialItems[2]).toHaveTextContent("Venus");

  const mercury = screen.getByText("Mercury");
  const venus = screen.getByText("Venus");

  fireEvent.dragStart(mercury)
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.drop(venus);
  fireEvent.dragEnd(mercury);

  // items should be the same, even though the indexes are different the unique identifier is the same
  // so no move should occur
  const itemsAfterMove = screen.getAllByTestId("draggable-item");
  expect(itemsAfterMove[0]).toHaveTextContent("Apple");
  expect(itemsAfterMove[1]).toHaveTextContent("Venus");
  expect(itemsAfterMove[2]).toHaveTextContent("Mercury");
});



//////

