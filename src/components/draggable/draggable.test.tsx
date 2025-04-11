import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  testStyledSystemMargin,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";
import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";

import { DraggableContainer, DraggableItem } from ".";
import "../../__spec_helper__/__internal__/drag-event-polyfill"

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  fireEvent.dragEnd(window);

  fireEvent.pointerMove(window);

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("dragging an item and dropping it after another item within the target container should reorder the items", () => {
  act(() => {
    render(
      <DraggableContainer>
        <DraggableItem id="apple">Apple</DraggableItem>
        <DraggableItem id="mercury">Mercury</DraggableItem>
        <DraggableItem id="venus">Venus</DraggableItem>
      </DraggableContainer>,
    );
  });

  const apple = screen.getByText("Apple").parentElement as HTMLElement;
  const venus = screen.getByText("Venus").parentElement as HTMLElement;
  const draggableContainer = screen.getByTestId("draggable-container");
  
  act(() => {
    fireEvent.dragStart(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragEnter(venus);
  });
  
  act(() => {
    fireEvent.dragOver(venus);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragLeave(venus);
  });
  
  act(() => {
    fireEvent.drop(draggableContainer);
  });
  
  act(() => {
    fireEvent.dragEnd(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(3);
  expect(allItems[0]).toHaveTextContent("Mercury");
  expect(allItems[1]).toHaveTextContent("Venus");
  expect(allItems[2]).toHaveTextContent("Apple");
});

test("dragging an item and dropping it outside of the target container should not reorder the items", () => {
  act(() => {
    render(
      <>
        <DraggableContainer>
          <DraggableItem id="apple">Apple</DraggableItem>
          <DraggableItem id="mercury">Mercury</DraggableItem>
          <DraggableItem id="venus">Venus</DraggableItem>
        </DraggableContainer>
        <p>Outer content</p>
      </>,
    );
  });

  const apple = screen.getByText("Apple").parentElement as HTMLElement;
  const venus = screen.getByText("Venus").parentElement as HTMLElement;
  const outerContent = screen.getByText("Outer content");
  
  act(() => {
    fireEvent.dragStart(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragEnter(venus);
  });
  
  act(() => {
    fireEvent.dragOver(venus);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragLeave(venus);
  });

  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.drop(outerContent);
  });
  
  act(() => {
    fireEvent.dragEnd(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(3);
  expect(allItems[0]).toHaveTextContent("Apple");
  expect(allItems[1]).toHaveTextContent("Mercury");
  expect(allItems[2]).toHaveTextContent("Venus");
});

test("dragging and dropping an item in its current location does not change the overall item order", () => {
  act(() => {
    render(
      <DraggableContainer>
        <DraggableItem id="apple">Apple</DraggableItem>
        <DraggableItem id="mercury">Mercury</DraggableItem>
        <DraggableItem id="venus">Venus</DraggableItem>
      </DraggableContainer>,
    );
  });

  const apple = screen.getByText("Apple").parentElement as HTMLElement;
  
  act(() => {
    fireEvent.dragStart(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragEnter(apple);
  });
  
  act(() => {
    fireEvent.dragOver(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.drop(apple);
  });
  
  act(() => {
    fireEvent.dragEnd(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(3);
  expect(allItems[0]).toHaveTextContent("Apple");
  expect(allItems[1]).toHaveTextContent("Mercury");
  expect(allItems[2]).toHaveTextContent("Venus");
});

test("calls getOrder callback, with an array of the new item order and the dragged item as arguments, when the getOrder prop is provided and the order item changes", () => {
  const getOrder = jest.fn();
  
  act(() => {
    render(
      <DraggableContainer getOrder={getOrder}>
        <DraggableItem id="apple">Apple</DraggableItem>
        <DraggableItem id="mercury">Mercury</DraggableItem>
        <DraggableItem id="venus">Venus</DraggableItem>
      </DraggableContainer>,
    );
  });

  const apple = screen.getByText("Apple").parentElement as HTMLElement;
  const venus = screen.getByText("Venus").parentElement as HTMLElement;
  const draggableContainer = screen.getByTestId("draggable-container");
  
  act(() => {
    fireEvent.dragStart(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragEnter(venus);
  });
  
  act(() => {
    fireEvent.dragOver(venus);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragLeave(venus);
  });
  
  act(() => {
    fireEvent.drop(draggableContainer);
  });
  
  act(() => {
    fireEvent.dragEnd(apple);
  });
  
  act(() => {
    jest.runAllTimers();
  });

  expect(getOrder).toHaveBeenCalledTimes(1);
  expect(getOrder).toHaveBeenCalledWith(["mercury", "venus", "apple"], "apple");
});

test("the actual rendered item element is hidden from view while the item is dragged", async () => {
  jest.useRealTimers(); // Real timers for waitFor
  
  const user = userEvent.setup({ delay: null }); // delay set to null to prevent setTimeout(fn, 0) being called by react-dnd
  
  act(() => {
    render(
      <DraggableContainer>
        <DraggableItem id="apple">Apple</DraggableItem>
      </DraggableContainer>,
    );
  });

  const apple = screen.getByText("Apple").parentElement as HTMLElement;
  
  await act(async () => {
    await user.pointer({ keys: "[MouseLeft>]", target: apple });
  });
  
  act(() => {
    fireEvent.dragStart(apple);
  });
  
  await act(async () => {
    await user.pointer({ target: apple, coords: { x: 0, y: 0 } });
  });

  await waitFor(() => {
    expect(screen.getByTestId("draggable-item")).not.toBeVisible();
  });

  act(() => {
    fireEvent.dragEnd(apple);
  });
  
  await act(async () => {
    await user.pointer("[/MouseLeft]");
  });
  
  jest.useFakeTimers(); // Switch back to fake timers for other tests
});

test("items are reordered when their order is manually changed", () => {
   jest.useFakeTimers();
  const mockGetOrder = jest.fn();
  const ref = React.createRef<UseDraggableHandle>();
  
  act(() => {
    render(
      <DraggableContainer ref={ref} getOrder={mockGetOrder}>
        <DraggableItem id="apple">Apple</DraggableItem>
        <DraggableItem id="mercury">Mercury</DraggableItem>
      </DraggableContainer>
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

test("throws error when DraggableContainer contains a child which is not DraggableItem", () => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});

  expect(() => {
    act(() => {
      render(
        <DraggableContainer>
          <div>Not draggable</div>
        </DraggableContainer>,
      );
    });
  }).toThrow(
    "`DraggableContainer` only accepts children of type `DraggableItem`.",
  );

  jest.restoreAllMocks();
});

test("renders with provided data- attributes", () => {
  act(() => {
    render(
      <DraggableContainer
        data-element="draggable-element"
        data-role="draggable-role"
      >
        <DraggableItem
          data-element="item-element"
          data-role="item-role"
          id="apple"
        >
          Apple
        </DraggableItem>
      </DraggableContainer>,
    );
  });
  
  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByTestId("draggable-role")).toHaveAttribute(
    "data-element",
    "draggable-element",
  );
  expect(screen.getByTestId("item-role")).toHaveAttribute(
    "data-element",
    "item-element",
  );
});

testStyledSystemMargin(
  (props) => (
    <DraggableContainer {...props}>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>
  ),
  () => screen.getByTestId("draggable-container"),
);

testStyledSystemPadding(
  (props) => (
    <DraggableContainer>
      <DraggableItem id="apple" {...props}>
        Apple
      </DraggableItem>
    </DraggableContainer>
  ),
  () => screen.getByTestId("draggable-item"),
);

test("should render with default padding when no padding props are passed", () => {
  act(() => {
    render(
      <DraggableContainer>
        <DraggableItem id="apple">Apple</DraggableItem>
      </DraggableContainer>,
    );
  });
  
  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByTestId("draggable-item")).toHaveStyleRule(
    "padding-top",
    "var(--spacing100)",
  );
  expect(screen.getByTestId("draggable-item")).toHaveStyleRule(
    "padding-bottom",
    "var(--spacing100)",
  );
});