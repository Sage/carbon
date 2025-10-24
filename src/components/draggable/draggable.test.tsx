import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  testStyledSystemMargin,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";

import { DraggableContainer, DraggableItem } from ".";

afterEach(() => {
  fireEvent.dragEnd(window);
  fireEvent.pointerMove(window);
});

test("dragging an item and dropping it after another item within the target container should reorder the items", () => {
  render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
      <DraggableItem id="mercury">Mercury</DraggableItem>
      <DraggableItem id="venus">Venus</DraggableItem>
    </DraggableContainer>,
  );

  const apple = screen.getByText("Apple");
  const venus = screen.getByText("Venus");
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.drop(venus);
  fireEvent.dragEnd(apple);

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(3);
  expect(allItems[0]).toHaveTextContent("Mercury");
  expect(allItems[1]).toHaveTextContent("Venus");
  expect(allItems[2]).toHaveTextContent("Apple");
});

test("dragging an item and dropping it outside of the target container should not reorder the items", () => {
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

  const apple = screen.getByText("Apple");
  const venus = screen.getByText("Venus");
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.dragLeave(venus);
  fireEvent.dragLeave(screen.getByTestId("draggable-container"));
  fireEvent.drop(screen.getByText("Outer content"));
  fireEvent.dragEnd(apple);

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(3);
  expect(allItems[0]).toHaveTextContent("Apple");
  expect(allItems[1]).toHaveTextContent("Mercury");
  expect(allItems[2]).toHaveTextContent("Venus");
});

test("dragging and dropping an item in its current location does not change the overall item order", () => {
  render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
      <DraggableItem id="mercury">Mercury</DraggableItem>
      <DraggableItem id="venus">Venus</DraggableItem>
    </DraggableContainer>,
  );

  const apple = screen.getByText("Apple");
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(apple);
  fireEvent.dragOver(apple);
  fireEvent.drop(apple);
  fireEvent.dragEnd(apple);

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(3);
  expect(allItems[0]).toHaveTextContent("Apple");
  expect(allItems[1]).toHaveTextContent("Mercury");
  expect(allItems[2]).toHaveTextContent("Venus");
});

test("calls getOrder callback, with an array of the new item order and the dragged item as arguments, when the getOrder prop is provided and the order item changes", () => {
  const getOrder = jest.fn();
  render(
    <DraggableContainer getOrder={getOrder}>
      <DraggableItem id="apple">Apple</DraggableItem>
      <DraggableItem id="mercury">Mercury</DraggableItem>
      <DraggableItem id="venus">Venus</DraggableItem>
    </DraggableContainer>,
  );

  const apple = screen.getByText("Apple");
  const venus = screen.getByText("Venus");
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.drop(venus);
  fireEvent.dragEnd(apple);

  expect(getOrder).toHaveBeenCalledTimes(1);
  expect(getOrder).toHaveBeenCalledWith(["mercury", "venus", "apple"], "apple");
});

test("the actual rendered item element is hidden from view while the item is dragged", async () => {
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>,
  );

  const apple = screen.getByText("Apple");
  await user.pointer({ keys: "[MouseLeft>]", target: apple });
  fireEvent.dragStart(apple);
  await user.pointer({ target: apple, coords: { x: 0, y: 0 } });

  await waitFor(() => {
    expect(screen.getByTestId("draggable-item")).not.toBeVisible();
  });

  fireEvent.dragEnd(apple);
  await user.pointer("[/MouseLeft]");

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("items are reordered when their order is manually changed", () => {
  const { rerender } = render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
      <DraggableItem id="mercury">Mercury</DraggableItem>
    </DraggableContainer>,
  );

  rerender(
    <DraggableContainer>
      <DraggableItem id="apple">Mercury</DraggableItem>
      <DraggableItem id="mercury">Apple</DraggableItem>
    </DraggableContainer>,
  );

  const allItems = screen.getAllByTestId("draggable-item");
  expect(allItems).toHaveLength(2);
  expect(allItems[0]).toHaveTextContent("Mercury");
  expect(allItems[1]).toHaveTextContent("Apple");
});

test("throws error when DraggableContainer contains a child which is not DraggableItem", () => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});

  expect(() => {
    render(
      <DraggableContainer>
        <div>Not draggable</div>
      </DraggableContainer>,
    );
  }).toThrow(
    "`DraggableContainer` only accepts children of type `DraggableItem`.",
  );

  jest.restoreAllMocks();
});

test("renders with provided data- attributes", () => {
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
  render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>,
  );

  expect(screen.getByTestId("draggable-item")).toHaveStyleRule(
    "padding-top",
    "var(--spacing100)",
  );
  expect(screen.getByTestId("draggable-item")).toHaveStyleRule(
    "padding-bottom",
    "var(--spacing100)",
  );
});

test("when two containers have items with the same ids, reordering items in one container does not affect the other", () => {
  render(
    <>
      <DraggableContainer data-role="fruits-container">
        <DraggableItem id={0}>Apple</DraggableItem>
        <DraggableItem id={1}>Banana</DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="planets-container">
        <DraggableItem id={0}>Mercury</DraggableItem>
        <DraggableItem id={1}>Venus</DraggableItem>
      </DraggableContainer>
    </>,
  );

  const apple = screen.getByText("Apple");
  const banana = screen.getByText("Banana");
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(banana);
  fireEvent.dragOver(banana);
  fireEvent.drop(banana);
  fireEvent.dragEnd(apple);

  const planetsContainer = screen.getByTestId("planets-container");
  const planets = within(planetsContainer).getAllByTestId("draggable-item");
  expect(planets[0]).not.toHaveTextContent("Venus");
  expect(planets[1]).not.toHaveTextContent("Mercury");
});
