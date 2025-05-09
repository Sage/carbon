import React, { useState } from "react";

import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";

import guid from "../../__internal__/utils/helpers/guid";

import DraggableContainer from "./draggable-container";
import DraggableItem from "./draggable-item";

// Import drag event polyfill
import "../../__spec_helper__/__internal__/drag-event-polyfill";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
  fireEvent.dragEnd(window);
});

// ==========================================
// Basic rendering tests
// ==========================================

describe("DraggableItem - Rendering", () => {
  it("renders children within the item", () => {
    render(
      <DraggableItem uniqueId="Apple" data-role="draggable-item">Apple</DraggableItem>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toBeVisible();
  });

  it("renders with custom node", () => {
    render(
      <DraggableItem itemsNode="article" uniqueId="Apple" data-role="draggable-item">Apple</DraggableItem>
    );

    const draggableItem = screen.getByRole("article");
    expect(draggableItem).toBeVisible();
  });

  it("renders with custom data attributes", () => {
    render(
      <DraggableItem uniqueId="Apple" data-role="foo" data-component="bar" data-element="baz">Apple</DraggableItem>
    );

    const draggableItem = screen.getByTestId("foo");
    expect(draggableItem).toHaveAttribute("data-component", "bar");
    expect(draggableItem).toHaveAttribute("data-element", "baz");
  });

  it("renders with custom id", () => {
    render(
      <DraggableItem uniqueId="foo" data-role="draggable-item">Apple</DraggableItem>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-item-id", "foo");
  });

  it("renders with custom id of the first child if one is found", () => {
    render(
      <DraggableItem uniqueId="foo" data-role="draggable-item">
        <div id="bar">Apple</div>
      </DraggableItem>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-item-id", "bar");
  });

  it("renders with custom id of the draggable item if the first child has an id but it is a guid", () => {
    const localGuid = guid();
    render(
      <DraggableItem uniqueId="foo" data-role="draggable-item">
        <div id={localGuid}>Apple</div>
      </DraggableItem>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-item-id", "foo");
  });

  it("renders with custom className", () => {
    render(
      <DraggableItem className="foo" uniqueId="Apple" data-role="draggable-item">Apple</DraggableItem>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveClass("foo");
  });

  it("renders with data-parent-container-id when provider context is consumed", () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem uniqueId="Apple" data-role="draggable-item">Apple</DraggableItem>
      </DraggableContainer>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-parent-container-id", "foo");
  });

  it("initializes data-drag-state as idle", () => {
    render(
      <DraggableItem data-role="draggable-item" uniqueId="apple">
        Apple
      </DraggableItem>
    );

    const draggableItem = screen.getByTestId("draggable-item");
    expect(draggableItem).toHaveAttribute("data-drag-state", "idle");
  });
});

describe("DraggableItem - Dragging Behavior", () => {
  it("updates data-drag-state to is-dragging when the item begins to drag", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    
    // Start the drag operation
    fireEvent.dragStart(appleElement);
    
    // Verify apple has the is-dragging state
    await waitFor(() => {
      const draggedApple = screen.getByText("Apple");
      expect(draggedApple).toHaveAttribute("data-drag-state", "is-dragging");
    });
  });

  it("resets data-drag-state to idle when a draggable item is dropped", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    
    // Complete drag sequence including drop
    fireEvent.dragStart(appleElement);
    fireEvent.drop(appleElement);
    
    // Check apple returns to idle state
    await waitFor(() => {
      const droppedApple = screen.getByText("Apple");
      expect(droppedApple).toHaveAttribute("data-drag-state", "idle");
    });
  });

  it("handles self-drop correctly", async () => {
    render(
      <DraggableItem uniqueId="apple" data-role="apple-item">
        Apple
      </DraggableItem>
    );
    
    const appleElement = screen.getByText("Apple");
    
    // Start dragging
    fireEvent.dragStart(appleElement);
    
    // Verify apple has the is-dragging state
    await waitFor(() => {
      const draggedApple = screen.getByText("Apple");
      expect(draggedApple).toHaveAttribute("data-drag-state", "is-dragging");
    });
    
    // Drag over self
    fireEvent.dragEnter(appleElement);
    fireEvent.dragOver(appleElement);
    
    // Drop on self
    fireEvent.drop(appleElement);
    
    // Check apple returns to idle state
    await waitFor(() => {
      const droppedApple = screen.getByText("Apple");
      expect(droppedApple).toHaveAttribute("data-drag-state", "idle");
    });
  });
});

// ==========================================
// Drop Target behavior tests (when being dragged over)
// ==========================================

describe("DraggableItem - Drop Target Behavior", () => {
  it("updates data-drag-state to is-being-dragged-over when an item is dragged over it", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Initiate drag and move over target
    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    
    // Check mercury has the correct drag-over state
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-drag-state", "is-being-dragged-over");
    });
  });
  

  it("resets data-drag-state to idle when a draggable item leaves another item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Complete drag sequence including enter and leave
    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement);
    
    // Mercury should now be in dragged-over state
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-drag-state", "is-being-dragged-over");
    });
    
    // Leave the element
    fireEvent.dragLeave(mercuryElement);
    
    // Mercury should return to idle state
    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).toHaveAttribute("data-drag-state", "idle");
    });
  });

  it("resets data-drag-state to idle after an item is dropped on it", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Start the drag operation
    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    
    // Verify mercury has the dragged-over state
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-drag-state", "is-being-dragged-over");
    });

    // Complete the drag operation by dropping
    fireEvent.dragOver(mercuryElement);
    fireEvent.drop(appleElement);
    
    // Check mercury returns to idle state after drop
    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).toHaveAttribute("data-drag-state", "idle");
    });
  });

  it("ensures both source and target items reset to idle state after drop completion", async () => {
    render(
      <DraggableContainer id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Complete drag sequence including drop
    fireEvent.dragStart(appleElement);
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement);
    fireEvent.drop(appleElement);
    
    // Check both elements return to idle
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

describe("DraggableItem - Closest Edge Behavior", () => {
  it("sets data-closest-edge attribute to top when dragging over the top half of an item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Mock getBoundingClientRect to simulate dragging over top half
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
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
        toJSON: () => {}
      };
    });
    
    // Start drag operation
    fireEvent.dragStart(appleElement);
    
    // Simulate drag event over top half of mercury
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 20, // Position in top half
    });
    
    // Check mercury has the correct closest-edge
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "top");
    });
    
    // Restore original getBoundingClientRect
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it("sets data-closest-edge attribute to bottom when dragging over the bottom half of an item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Mock getBoundingClientRect to simulate dragging over bottom half
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
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
        toJSON: () => {}
      };
    });
    // Start drag operation
    fireEvent.dragStart(appleElement);
    
    // Simulate drag event over bottom half of mercury
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 80, // Position in bottom half
    });
    
    // Check mercury has the correct closest-edge
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "bottom");
    });
    
    // Restore original getBoundingClientRect
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it("updates data-closest-edge attribute when dragging from top to bottom of an item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Mock getBoundingClientRect
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
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
        toJSON: () => {}
      };
    });
    
    // Start drag operation
    fireEvent.dragStart(appleElement);
    
    // Drag over top half of mercury
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 20, // Top half
    });
    
    // Verify top edge
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "top");
    });
    
    // Now drag over the bottom half
    fireEvent.dragOver(mercuryElement, {
      clientY: 80, // Bottom half
    });
    
    // Verify edge updated to bottom
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "bottom");
    });
    
    // Restore original getBoundingClientRect
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it("removes data-closest-edge attribute when drag leaves the item", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Mock getBoundingClientRect
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
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
        toJSON: () => {}
      };
    });
    // Start drag operation
    fireEvent.dragStart(appleElement);
    
    // Drag over mercury
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 20,
    });
    
    // Verify closest-edge is set
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "top");
    });
    
    // Leave the element
    fireEvent.dragLeave(mercuryElement);
    
    // Verify no closest-edge attribute
    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).not.toHaveAttribute("data-closest-edge");
    });
    
    // Restore original getBoundingClientRect
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it("removes data-closest-edge attribute after drop completion", async () => {
    render(
      <DraggableContainer dragType="onDrop" id="foo">
        <DraggableItem data-role="draggable-item" uniqueId="apple">
          Apple
        </DraggableItem>
        <DraggableItem data-role="draggable-item" uniqueId="mercury">
          Mercury
        </DraggableItem>
      </DraggableContainer>
    );

    const appleElement = screen.getByText("Apple");
    const mercuryElement = screen.getByText("Mercury");
    
    // Mock getBoundingClientRect
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
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
        toJSON: () => {}
      };
    });
    
    // Start drag sequence
    fireEvent.dragStart(appleElement);
    
    // Drag over mercury
    fireEvent.dragEnter(mercuryElement);
    fireEvent.dragOver(mercuryElement, {
      clientY: 80,
    });
    
    // Verify closest-edge attribute is set
    await waitFor(() => {
      const draggedOverMercury = screen.getByText("Mercury");
      expect(draggedOverMercury).toHaveAttribute("data-closest-edge", "bottom");
    });
    
    // Complete drop
    fireEvent.drop(mercuryElement);
    
    // Verify closest-edge attribute is removed
    await waitFor(() => {
      const resetMercury = screen.getByText("Mercury");
      expect(resetMercury).not.toHaveAttribute("data-closest-edge");
    });
    
    // Restore original getBoundingClientRect
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });
});