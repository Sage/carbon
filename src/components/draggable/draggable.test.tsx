import React from "react";
import { render, screen } from "@testing-library/react";
import {
  testStyledSystemMargin,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";

import { DraggableContainer, DraggableItem } from ".";

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
  () => screen.getByTestId("draggable-item-content"),
);

test("should render with default padding when no padding props are passed", () => {
  render(
    <DraggableContainer>
      <DraggableItem id="apple">Apple</DraggableItem>
    </DraggableContainer>,
  );

  expect(screen.getByTestId("draggable-item-content")).toHaveStyleRule(
    "padding-top",
    "var(--spacing100)",
  );
  expect(screen.getByTestId("draggable-item-content")).toHaveStyleRule(
    "padding-bottom",
    "var(--spacing100)",
  );
});
