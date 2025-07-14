import React, { forwardRef } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UseDraggableHandle } from ".";
import useDraggable, { UseDraggableProps } from "./useDraggable";
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

const TestComponent = forwardRef<UseDraggableHandle, UseDraggableProps>(
  (
    {
      draggableItems,
      dragType,
      containerId,
      containerNode,
      containerProps,
      itemProps,
      itemsNode,
      getOrder,
    },
    ref,
  ) => {
    const { draggableElement, draggedNode } = useDraggable({
      draggableItems,
      ref,
      dragType,
      containerId,
      containerNode,
      itemsNode,
      containerProps: { "data-role": "draggable-container", ...containerProps },
      itemProps: { "data-role": "draggable-item", ...itemProps },
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

describe("Basic Rendering", () => {
  it("renders a container", () => {
    render(
      <TestComponent
        draggableItems={[
          <span key="1">Item 1</span>,
          <span key="2">Item 2</span>,
        ]}
      />,
    );

    const container = screen.getByTestId("draggable-container");
    expect(container).toBeVisible();
  });

  it("renders a single draggable item", () => {
    render(<TestComponent draggableItems={[<span key="1">Item 1</span>]} />);

    const container = screen.getByTestId("draggable-container");
    const draggableItem = screen.getByTestId("draggable-item");
    const draggableItemText = screen.getByText("Item 1");

    expect(container).toContainElement(draggableItem);
    expect(draggableItem).toBeVisible();
    expect(draggableItem).toContainElement(draggableItemText);
    expect(draggableItemText).toBeVisible();
  });

  it("renders multiple draggable items", () => {
    const items = [
      <span key="1">Item 1</span>,
      <span key="2">Item 2</span>,
      <span key="3">Item 3</span>,
    ];
    render(<TestComponent draggableItems={items} />);

    const container = screen.getByTestId("draggable-container");
    const draggableItems = screen.getAllByTestId("draggable-item");
    const draggableItemTexts = screen.getAllByText(/Item/);

    expect(draggableItems).toHaveLength(3);
    expect(draggableItems.length).toBe(draggableItemTexts.length);

    draggableItems.forEach((item, index) => {
      expect(container).toContainElement(item);
      expect(item).toBeVisible();
      expect(item).toContainElement(draggableItemTexts[index]);
      expect(draggableItemTexts[index]).toBeVisible();
    });
  });
});

describe("Container Configuration", () => {
  it("renders container with custom id via containerId prop", () => {
    render(
      <TestComponent
        containerId="custom-container-id"
        draggableItems={[
          <span key="1">Item 1</span>,
          <span key="2">Item 2</span>,
        ]}
      />,
    );

    const container = screen.getByTestId("draggable-container");
    expect(container).toHaveAttribute("id", "custom-container-id");
  });

  it("renders container with custom HTML element via containerNode prop", () => {
    render(
      <TestComponent
        containerId="custom-id"
        draggableItems={[
          <span key="1">Item 1</span>,
          <span key="2">Item 2</span>,
        ]}
        containerNode="article"
      />,
    );

    const container = screen.getByTestId("draggable-container");
    expect(container.tagName).toBe("ARTICLE");
  });

  it("applies additional container props via containerProps", () => {
    render(
      <TestComponent
        draggableItems={[<span key="1">Item 1</span>]}
        containerProps={{
          "aria-label": "Draggable list",
          className: "custom-class",
        }}
      />,
    );

    const container = screen.getByTestId("draggable-container");
    expect(container).toHaveAttribute("aria-label", "Draggable list");
    expect(container).toHaveClass("custom-class");
  });
});

describe("Item Configuration", () => {
  it("renders items with custom HTML element via itemsNode prop", () => {
    render(
      <TestComponent
        containerId="custom-id"
        draggableItems={["Item 1", "Item 2"]}
        containerNode="ul"
        itemsNode="li"
      />,
    );

    const draggableItems = screen.getAllByTestId("draggable-item");

    expect(draggableItems).toHaveLength(2);
    draggableItems.forEach((item) => {
      expect(item.tagName).toBe("LI");
    });
  });

  it("applies additional item props via itemProps", () => {
    render(
      <TestComponent
        draggableItems={[<span key="1">Item 1</span>]}
        itemProps={{ "aria-label": "Draggable item", className: "item-class" }}
      />,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("aria-label", "Draggable item");
    expect(draggableItem).toHaveClass("item-class");
  });
});

describe("Drag and Drop Behavior", () => {
  it("tracks the last dragged node during drag operation", () => {
    jest.useFakeTimers();

    render(
      <TestComponent
        draggableItems={[
          <span key="1">Item 1</span>,
          <span key="2">Item 2</span>,
        ]}
      />,
    );

    const draggableItems = screen.getAllByTestId("draggable-item");
    const [draggableItem1, draggableItem2] = draggableItems;

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

    jest.useRealTimers();
  });

  it("calls getOrder callback during continuous drag behavior (default)", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();

    render(
      <TestComponent
        draggableItems={[
          <span key="1">Item 1</span>,
          <span key="2">Item 2</span>,
        ]}
        getOrder={mockGetOrder}
      />,
    );

    const draggableItems = screen.getAllByTestId("draggable-item");
    const [draggableItem1, draggableItem2] = draggableItems;

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

    jest.useRealTimers();
  });

  it('delays getOrder callback until drop when dragType is "onDrop"', () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();

    render(
      <TestComponent
        dragType="onDrop"
        draggableItems={[
          <span key="1">Item 1</span>,
          <span key="2">Item 2</span>,
        ]}
        getOrder={mockGetOrder}
      />,
    );

    const draggableItems = screen.getAllByTestId("draggable-item");
    const [draggableItem1, draggableItem2] = draggableItems;

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

    jest.useRealTimers();
  });

  it("provides correct parameters to getOrder callback", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();

    render(
      <TestComponent
        containerId="container-id"
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
    const [draggableItem1, draggableItem2] = draggableItems;

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

    jest.useRealTimers();
  });
});

describe("Imperative API", () => {
  it("provides ref with reOrder method for programmatic reordering", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <TestComponent
        ref={ref}
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

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeDefined();

    act(() => {
      ref.current?.reOrder("foo", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockGetOrder).toHaveBeenCalledWith(["bar", "foo"], "foo");

    jest.useRealTimers();
  });

  it("handles invalid reOrder parameters gracefully", () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    const ref = React.createRef<UseDraggableHandle>();

    render(
      <TestComponent
        ref={ref}
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

    act(() => {
      ref.current?.reOrder("non-existent", 1);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockGetOrder).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
