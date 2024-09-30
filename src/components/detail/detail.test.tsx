import React from "react";
import { render, screen, within } from "@testing-library/react";
import Detail from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

test("renders children", () => {
  render(<Detail>foo</Detail>);

  expect(screen.getByText("foo")).toBeVisible();
});

test("renders with provided `footnote`", () => {
  render(<Detail footnote="extra info">foo</Detail>);

  const footnoteText = within(screen.getByTestId("footnote")).getByText(
    "extra info"
  );

  expect(footnoteText).toBeVisible();
});

test("renders with provided `icon`", () => {
  render(<Detail icon="bin">foo</Detail>);

  const icon = screen.getByTestId("icon");

  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "bin");
});

test("renders with provided data- tags", () => {
  render(
    <Detail data-element="bar" data-role="baz">
      foo
    </Detail>
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

// coverage
test("renders with expected styles when `icon` and `footnote` are passed", () => {
  render(
    <Detail icon="bin" footnote="extra info">
      foo
    </Detail>
  );

  const footnote = screen.getByTestId("footnote");

  expect(footnote).toHaveStyle("margin-left: 26px");
});

testStyledSystemMargin((props) => <Detail {...props}>foo</Detail>);
