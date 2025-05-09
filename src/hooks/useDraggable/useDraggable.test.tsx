import React, { forwardRef } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import useDraggable, {
  UseDraggableHandle,
  UseDraggableOptions,
} from "./useDraggable";
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

  fireEvent.dragEnd(window);

  fireEvent.pointerMove(window);

  jest.clearAllTimers();
  jest.clearAllMocks();
});

// Modify TestComponent to use forwardRef
const TestComponent = forwardRef<UseDraggableHandle, UseDraggableOptions>(
  (
    {
      draggableItems,
      dragType,
      containerId,
      stylingOptOut,
      containerNode,
      containerRole,
      itemsRole,
      itemsNode,
      getOrder,
    },
    ref,
  ) => {
    // Use the forwarded ref instead of creating a new one
    const { draggableElement, draggedNode } = useDraggable({
      draggableItems,
      ref, // Pass the forwarded ref directly
      dragType,
      containerId,
      stylingOptOut,
      containerNode,
      itemsNode,
      containerRole: containerRole || "draggable-container",
      itemsRole: itemsRole || "draggable-item",
      getOrder,
    });

    return (
      <>
        {draggableElement}
        <span data-role="last-dragged-node">
          Last dragged node is: {draggedNode?.textContent}
        </span>
      </>
    );
  },
);

test("renders a container", () => {
  render(<TestComponent draggableItems={<span>Item 1</span>} />);

  const container = screen.getByTestId("draggable-container");
  expect(container).toBeVisible();
});

test("accepts a node and wraps it in a draggable item", () => {
  render(<TestComponent draggableItems={<span>Item 1</span>} />);

  const container = screen.getByTestId("draggable-container");
  const draggableItem = screen.getByTestId("draggable-item");
  const draggableItemText = screen.getByText("Item 1");

  expect(container).toContainElement(draggableItem);
  expect(draggableItem).toBeVisible();
  expect(draggableItem).toContainElement(draggableItemText);
  expect(draggableItemText).toBeVisible();
});

test("accepts an array of nodes and wraps each node in a a draggable item", () => {
  render(
    <TestComponent
      draggableItems={[<span>Item 1</span>, <span>Item 2</span>]}
    />,
  );

  const container = screen.getByTestId("draggable-container");
  const draggableItems = screen.getAllByTestId("draggable-item");
  const draggableItemText = screen.getAllByText(/Item/);

  expect(draggableItems.length).toBe(draggableItemText.length);

  draggableItems.forEach((item, index) => {
    expect(container).toContainElement(item);
    expect(item).toBeVisible();

    expect(item).toContainElement(draggableItemText[index]);
    expect(draggableItemText[index]).toBeVisible();
  });
});

test("returns the last dragged node", () => {
  jest.useFakeTimers();

  render(
    <TestComponent
      draggableItems={[<span>Item 1</span>, <span>Item 2</span>]}
    />,
  );

  const draggableItems = screen.getAllByTestId("draggable-item");
  const draggableItem1 = draggableItems[0];
  const draggableItem2 = draggableItems[1];

  fireEvent.dragStart(draggableItem1);

  act(() => {
    jest.runAllTimers();
  });

  fireEvent.dragEnter(draggableItem2);

  fireEvent.dragOver(draggableItem2);

  act(() => {
    jest.runAllTimers();
  });

  const lastDraggedNode = screen.getByTestId("last-dragged-node");
  expect(lastDraggedNode).toHaveTextContent("Last dragged node is: Item 1");
});

test("renders a container with a custom id attribute via the `containerId`", () => {
  render(
    <TestComponent
      containerId="custom-id"
      draggableItems={<span>Item 1</span>}
    />,
  );

  const container = screen.getByTestId("draggable-container");
  expect(container).toHaveAttribute("id", "custom-id");
});

test("renders a container with a node via `containerNode`", () => {
  render(
    <TestComponent
      containerId="custom-id"
      draggableItems={<span>Item 1</span>}
      containerNode="article"
    />,
  );

  const container = screen.getByTestId("draggable-container");
  expect(container.tagName).toBe("ARTICLE");
});

test("renders a container with a custom data-role attribute node via `containerRole`", () => {
  render(
    <TestComponent
      containerId="custom-id"
      containerRole="custom-role"
      draggableItems={<span>Item 1</span>}
    />,
  );

  const container = screen.getByTestId("custom-role");
  expect(container).toBeVisible();
});

test('changes the dragging behavior to be onDrop when `dragType` is `"onDrop"`', () => {
  jest.useFakeTimers();
  const mockGetOrder = jest.fn();

  render(
    <TestComponent
      dragType="onDrop"
      draggableItems={[<span>Item 1</span>, <span>Item 2</span>]}
      getOrder={mockGetOrder}
    />,
  );

  const draggableItems = screen.getAllByTestId("draggable-item");
  const draggableItem1 = draggableItems[0];
  const draggableItem2 = draggableItems[1];

  fireEvent.dragStart(draggableItem1);

  act(() => {
    jest.runAllTimers();
  });

  fireEvent.dragEnter(draggableItem2);

  fireEvent.dragOver(draggableItem2);

  act(() => {
    jest.runAllTimers();
  });

  expect(mockGetOrder).toHaveBeenCalledTimes(0);

  fireEvent.drop(draggableItem2);

  act(() => {
    jest.runAllTimers();
  });

  fireEvent.dragEnd(draggableItem1);

  act(() => {
    jest.runAllTimers();
  });

  expect(mockGetOrder).toHaveBeenCalledTimes(1);
});

test("verifies the getOrder callback is called once after a complete drag and drop operation", () => {
  jest.useFakeTimers();
  const mockGetOrder = jest.fn();

  render(
    <TestComponent
      draggableItems={[<span>Item 1</span>, <span>Item 2</span>]}
      getOrder={mockGetOrder}
    />,
  );

  const draggableItems = screen.getAllByTestId("draggable-item");
  const draggableItem1 = draggableItems[0];
  const draggableItem2 = draggableItems[1];

  fireEvent.dragStart(draggableItem1);

  act(() => {
    jest.runAllTimers();
  });

  fireEvent.dragEnter(draggableItem2);

  fireEvent.dragOver(draggableItem2);

  act(() => {
    jest.runAllTimers();
  });

  expect(mockGetOrder).toHaveBeenCalledTimes(1);
});

test("verifies the getOrder callback receives the correct reordered array of ids and the dragged item id", () => {
  jest.useFakeTimers();
  const mockGetOrder = jest.fn();

  render(
    <TestComponent
      containerId="containerid"
      draggableItems={[
        <span id="foo" key="1">
          Item 1
        </span>,
        <span id="bar" key="2">
          Item 2
        </span>,
      ]}
      getOrder={mockGetOrder}
    />,
  );

  const draggableItems = screen.getAllByTestId("draggable-item");
  const draggableItem1 = draggableItems[0];
  const draggableItem2 = draggableItems[1];

  fireEvent.dragStart(draggableItem1);

  act(() => {
    jest.runAllTimers();
  });

  fireEvent.dragEnter(draggableItem2);

  fireEvent.dragOver(draggableItem2);

  act(() => {
    jest.runAllTimers();
  });

  expect(mockGetOrder).toHaveBeenCalledWith(["bar", "foo"], "foo");
});

test("renders a draggable item with a custom data-role attribute node via `itemRole`", () => {
  render(
    <TestComponent
      containerId="custom-id"
      itemsRole="custom-role"
      draggableItems={<span>Item 1</span>}
    />,
  );

  const draggableItem = screen.getByTestId("custom-role");
  expect(draggableItem).toBeVisible();
});

test("accepts a ref and allows imperative reordering of draggable items", () => {
  jest.useFakeTimers();
  const mockGetOrder = jest.fn();
  const ref = React.createRef<UseDraggableHandle>();

  render(
    <TestComponent
      ref={ref}
      draggableItems={[
        <span id="foo">Item 1</span>,
        <span id="bar">Item 2</span>,
      ]}
      getOrder={mockGetOrder}
    />,
  );

  expect(ref.current).not.toBeNull();

  act(() => {
    ref.current?.reOrder("foo", 1);
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(mockGetOrder).toHaveBeenCalledWith(["bar", "foo"], "foo");
});
