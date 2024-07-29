import React from "react";
import { render, screen } from "@testing-library/react";
import Preview from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

test("renders placeholder by default", () => {
  render(<Preview />);

  expect(screen.getByTestId("preview-placeholder")).toBeVisible();
});

test("renders placeholder when `loading` is true", () => {
  render(<Preview loading />);

  expect(screen.getByTestId("preview-placeholder")).toBeVisible();
});

test("renders placeholder when `loading` is true and children are provided", () => {
  render(<Preview loading>Some content</Preview>);

  expect(screen.getByTestId("preview-placeholder")).toBeVisible();
  expect(screen.queryByTestId("Some content")).not.toBeInTheDocument();
});

test("does not render a placeholder when `loading` is false", () => {
  render(<Preview loading={false} />);

  expect(screen.queryByTestId("preview-placeholder")).not.toBeInTheDocument();
});

test("does not render a placeholder when children are provided", () => {
  render(<Preview>Some content</Preview>);

  expect(screen.queryByTestId("preview-placeholder")).not.toBeInTheDocument();
  expect(screen.getByText("Some content")).toBeVisible();
});

test("renders the correct number of placeholders when `lines` prop is set", () => {
  render(<Preview lines={3} />);

  expect(screen.getAllByTestId("preview-placeholder")).toHaveLength(3);
});

test("renders with provided `width` and `height`", () => {
  render(<Preview width="100px" height="100px" />);

  expect(screen.getByTestId("preview-placeholder")).toHaveStyle({
    width: "100px",
    height: "100px",
  });
});

testStyledSystemMargin((props) => <Preview {...props} />);
