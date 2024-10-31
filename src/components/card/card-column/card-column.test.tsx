import React from "react";
import { render, screen } from "@testing-library/react";
import CardColumn from "./card-column.component";

test("renders children within CardColumn as expected", () => {
  const content = <div>content</div>;
  render(<CardColumn>{content}</CardColumn>);
  expect(screen.getByText("content")).toBeInTheDocument();
});

test("has the expected data attributes when they are passed in", () => {
  render(
    <CardColumn data-element="foo" data-role="bar">
      <div>content</div>
    </CardColumn>,
  );
  const cardColumnElementWithAttributes = screen.getByTestId("bar");
  expect(cardColumnElementWithAttributes).toHaveAttribute(
    "data-component",
    "card-column",
  );
  expect(cardColumnElementWithAttributes).toHaveAttribute(
    "data-element",
    "foo",
  );
  expect(cardColumnElementWithAttributes).toHaveAttribute("data-role", "bar");
});
