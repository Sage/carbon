import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import guid from "../../__internal__/utils/helpers/guid";

import DraggableContainer from "./draggable-container";
import DraggableItem from "./draggable-item";

import "../../__spec_helper__/__internal__/drag-event-polyfill";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
  fireEvent.dragEnd(window);
});

const itemDataRole = { "data-role": "draggable-item" };

describe("Basic Rendering", () => {
  it("renders children within the draggable item", () => {
    render(
      <DraggableItem id="Apple" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toBeVisible();
  });

  it("renders with custom HTML element when itemsNode is specified", () => {
    render(
      <DraggableItem itemsNode="article" id="Apple" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    const draggableItem = screen.getByRole("article");
    expect(draggableItem).toBeVisible();
  });

  it("initializes with data-drag-state as idle by default", () => {
    render(
      <DraggableItem itemProps={itemDataRole} id="apple">
        Apple
      </DraggableItem>,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-drag-state", "idle");
  });
});

describe("Ref Handling", () => {
  it("calls function ref with element when function ref is provided", () => {
    const mockFunctionRef = jest.fn();

    render(
      <DraggableItem ref={mockFunctionRef} id="Apple" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    expect(mockFunctionRef).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(mockFunctionRef).toHaveBeenCalledTimes(1);
  });

  it("sets current property on object ref when object ref is provided", () => {
    const mockObjectRef = { current: null };

    render(
      <DraggableItem ref={mockObjectRef} id="Apple" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    expect(mockObjectRef.current).toBeInstanceOf(HTMLElement);
    expect(mockObjectRef.current).not.toBeNull();
  });

  it("handles ref prop when ref is null", () => {
    // This should not throw an error
    expect(() => {
      render(
        <DraggableItem ref={null} id="Apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>,
      );
    }).not.toThrow();
  });

  it("handles ref prop when ref is undefined", () => {
    // This should not throw an error
    expect(() => {
      render(
        <DraggableItem ref={undefined} id="Apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>,
      );
    }).not.toThrow();
  });

  it("updates object ref when element changes", () => {
    const mockObjectRef = { current: null };

    const { rerender } = render(
      <DraggableItem ref={mockObjectRef} id="Apple" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    const firstElement = mockObjectRef.current;
    expect(firstElement).toBeInstanceOf(HTMLElement);

    rerender(
      <DraggableItem ref={mockObjectRef} id="Orange" itemProps={itemDataRole}>
        Orange
      </DraggableItem>,
    );

    // Ref should still be set (though it might be the same element reused)
    expect(mockObjectRef.current).toBeInstanceOf(HTMLElement);
  });

  it("calls function ref with null when component unmounts", () => {
    const mockFunctionRef = jest.fn();

    const { unmount } = render(
      <DraggableItem ref={mockFunctionRef} id="Apple" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    // Clear previous calls to focus on unmount behavior
    mockFunctionRef.mockClear();

    unmount();

    expect(mockFunctionRef).toHaveBeenCalledWith(null);
  });
});

describe("Data Attributes", () => {
  it("sets data-item-id attribute from id prop", () => {
    render(
      <DraggableItem id="foo" itemProps={itemDataRole}>
        Apple
      </DraggableItem>,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-item-id", "foo");
  });

  it("uses first child id for data-item-id when available", () => {
    render(
      <DraggableItem id="foo" itemProps={itemDataRole}>
        <div id="bar">Apple</div>
      </DraggableItem>,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-item-id", "bar");
  });

  it("falls back to id when child id is a GUID", () => {
    const localGuid = guid();
    render(
      <DraggableItem id="foo" itemProps={itemDataRole}>
        <div id={localGuid}>Apple</div>
      </DraggableItem>,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-item-id", "foo");
  });

  it("inherits data-parent-container-id from DraggableContainer context", () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem id="Apple" itemProps={itemDataRole}>
          Apple
        </DraggableItem>
      </DraggableContainer>,
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-parent-container-id", "foo");
  });
});

describe("Drag Source Behavior", () => {
  it("updates data-drag-state to is-dragging when drag operation begins", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");

    fireEvent.dragStart(appleElement);
    await waitFor(() => {
      const draggedApple = screen.getByText("Apple");
      expect(draggedApple).toHaveAttribute("data-drag-state", "is-dragging");
    });
  });

  it("resets data-drag-state to idle when drag operation completes", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");

    fireEvent.dragStart(appleElement);
    fireEvent.drop(appleElement);
    await waitFor(() => {
      const droppedApple = screen.getByText("Apple");
      expect(droppedApple).toHaveAttribute("data-drag-state", "idle");
    });
  });

  it("handles self-drop operations correctly", async () => {
    render(<DraggableItem id="apple">Apple</DraggableItem>);

    const appleElement = screen.getByText("Apple");

    fireEvent.dragStart(appleElement);
    await waitFor(() => {
      const draggedApple = screen.getByText("Apple");
      expect(draggedApple).toHaveAttribute("data-drag-state", "is-dragging");
    });

    fireEvent.dragEnter(appleElement);
    fireEvent.dragOver(appleElement);
    fireEvent.drop(appleElement);
    await waitFor(() => {
      const droppedApple = screen.getByText("Apple");
      expect(droppedApple).toHaveAttribute("data-drag-state", "idle");
    });
  });
});

describe("Drop Target Behavior", () => {
  it("updates data-drag-state to is-being-dragged-over when item is dragged over it", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute(
        "data-drag-state",
        "is-being-dragged-over",
      );
    });
  });

  it("resets data-drag-state to idle when dragged item leaves the drop target", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement);
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute(
        "data-drag-state",
        "is-being-dragged-over",
      );
    });

    fireEvent.dragLeave(mercuryElement);
    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).toHaveAttribute("data-drag-state", "idle");
    });
  });

  it("resets data-drag-state to idle after item is dropped on it", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute(
        "data-drag-state",
        "is-being-dragged-over",
      );
    });

    fireEvent.dragOver(mercuryElement);
    fireEvent.drop(appleElement);
    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).toHaveAttribute("data-drag-state", "idle");
    });
  });

  it("ensures both source and target items return to idle state after drop completion", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement);
    fireEvent.drop(appleElement);
    await waitFor(() => {
      const droppedApple = screen.getByText("Apple");
      expect(droppedApple).toHaveAttribute("data-drag-state", "idle");
    });

    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).toHaveAttribute("data-drag-state", "idle");
    });
  });
});

describe("Closest Edge Detection", () => {
  const mockItemDimensions = () => {
    const originalGetBoundingClientRect =
      Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
    });

    return originalGetBoundingClientRect;
  };

  beforeEach(() => {
    mockItemDimensions();
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = mockItemDimensions();
  });

  it("identifies top edge when cursor is over top half of draggable item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 20,
    });

    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "top");
    });
  });

  it("identifies bottom edge when cursor is over bottom half of draggable item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 80,
    });

    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "bottom");
    });
  });

  it("updates edge detection when cursor moves from top to bottom of item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 20,
    });

    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "top");
    });

    fireEvent.dragOver(mercuryElement, {
      clientY: 80,
    });

    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "bottom");
    });
  });

  it("removes edge indicators when drag leaves the item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 20,
    });

    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "top");
    });

    fireEvent.dragLeave(mercuryElement);

    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).not.toHaveAttribute("data-closest-edge");
    });
  });

  it("clears edge indicators after drop completion", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem itemProps={itemDataRole} id="apple">
          Apple
        </DraggableItem>
        <DraggableItem itemProps={itemDataRole} id="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>,
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");

    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 80,
    });

    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "bottom");
    });

    fireEvent.drop(mercuryElement);

    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).not.toHaveAttribute("data-closest-edge");
    });
  });
});
