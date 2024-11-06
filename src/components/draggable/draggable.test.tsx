import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  testStyledSystemMargin,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";

import { DraggableContainer, DraggableItem } from ".";

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
  const draggableContainer = screen.getByTestId("draggable-container");
  fireEvent.dragStart(apple);
  fireEvent.dragEnter(venus);
  fireEvent.dragOver(venus);
  fireEvent.dragLeave(venus);
  fireEvent.drop(draggableContainer);
  fireEvent.dragEnd(apple);

  expect(getOrder).toHaveBeenCalledTimes(1);
  expect(getOrder).toHaveBeenCalledWith(["mercury", "venus", "apple"], "apple");
});

test("the actual rendered item element is hidden from view while the item is dragged", async () => {
  const user = userEvent.setup({ delay: null }); // delay set to null to prevent setTimeout(fn, 0) being called by react-dnd
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

testStyledSystemMargin(
  (props) => (
    <DraggableContainer {...props}>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>
  ),
  () => screen.getByTestId("draggable-container"),
  undefined,
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
  { py: "8px" },
);
