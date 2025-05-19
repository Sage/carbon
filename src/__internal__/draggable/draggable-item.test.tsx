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

test("renders children within the draggable item", () => {
  render(
    <DraggableItem uniqueId="Apple" data-role="draggable-item">
      Apple
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toBeVisible();
});

test("renders with a custom HTML element when itemsNode is specified", () => {
  render(
    <DraggableItem
      itemsNode="article"
      uniqueId="Apple"
      data-role="draggable-item"
    >
      Apple
    </DraggableItem>,
  );

  const draggableItem = screen.getByRole("article");
  expect(draggableItem).toBeVisible();
});

test("applies custom className to the draggable item", () => {
  render(
    <DraggableItem className="foo" uniqueId="Apple" data-role="draggable-item">
      Apple
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toHaveClass("foo");
});

test("propagates custom data attributes to the rendered element", () => {
  render(
    <DraggableItem
      uniqueId="Apple"
      data-role="foo"
      data-component="bar"
      data-element="baz"
    >
      Apple
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("foo");
  expect(draggableItem).toHaveAttribute("data-component", "bar");
  expect(draggableItem).toHaveAttribute("data-element", "baz");
});

test("sets data-item-id attribute from uniqueId prop", () => {
  render(
    <DraggableItem uniqueId="foo" data-role="draggable-item">
      Apple
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toHaveAttribute("data-item-id", "foo");
});

test("uses the id of the first child for data-item-id when available", () => {
  render(
    <DraggableItem uniqueId="foo" data-role="draggable-item">
      <div id="bar">Apple</div>
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toHaveAttribute("data-item-id", "bar");
});

test("falls back to uniqueId when child id is a GUID", () => {
  const localGuid = guid();
  render(
    <DraggableItem uniqueId="foo" data-role="draggable-item">
      <div id={localGuid}>Apple</div>
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toHaveAttribute("data-item-id", "foo");
});

test("inherits data-parent-container-id from DraggableContainer context", () => {
  render(
    <DraggableContainer id="foo">
      <DraggableItem uniqueId="Apple" data-role="draggable-item">
        Apple
      </DraggableItem>
    </DraggableContainer>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toHaveAttribute("data-parent-container-id", "foo");
});

test("initializes with data-drag-state='idle' by default", () => {
  render(
    <DraggableItem data-role="draggable-item" uniqueId="apple">
      Apple
    </DraggableItem>,
  );

  const draggableItem = screen.getByTestId("draggable-item");
  expect(draggableItem).toHaveAttribute("data-drag-state", "idle");
});

describe("Drag Source Behavior", () => {
  it("updates data-drag-state to 'is-dragging' when drag operation begins", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("resets data-drag-state to 'idle' when drag operation completes", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("correctly handles self-drop operations", async () => {
    render(
      <DraggableItem uniqueId="apple" data-role="apple-item">
        Apple
      </DraggableItem>,
    );

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
  it("updates data-drag-state to 'is-being-dragged-over' when an item is dragged over it", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("resets data-drag-state to 'idle' when a dragged item leaves the drop target", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("resets data-drag-state to 'idle' after an item is dropped on it", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("ensures both source and target items return to 'idle' state after drop completion", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("identifies top edge when cursor is over the top half of a draggable item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("identifies bottom edge when cursor is over the bottom half of a draggable item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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

  it("updates edge detection when cursor moves from top to bottom of an item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
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
