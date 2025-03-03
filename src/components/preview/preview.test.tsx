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

test("renders with provided data- attributes", () => {
  render(<Preview data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
});

// coverage
test("renders with the correct height, width and border-radius when `shape` is set to 'text'", () => {
  render(<Preview shape="text" />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyleRule("height", "var(--sizing175)");
  expect(placeholder).toHaveStyle({ width: "100%" });
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius100)",
  );
});

// coverage
test("renders with the correct height, width and border-radius when `shape` is set to 'rectangle'", () => {
  render(<Preview shape="rectangle" />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyleRule("height", "var(--sizing400)");
  expect(placeholder).toHaveStyleRule("width", "var(--sizing1500)");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius100)",
  );
});

// coverage
test("renders with the correct height, width and border-radius when `shape` is set to 'rectangle-round'", () => {
  render(<Preview shape="rectangle-round" />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyleRule("height", "var(--sizing400)");
  expect(placeholder).toHaveStyleRule("width", "var(--sizing1500)");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius400)",
  );
});

// coverage
test("renders with the correct height, width and border-radius when `shape` is set to 'circle'", () => {
  render(<Preview shape="circle" />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyleRule("height", "var(--sizing700)");
  expect(placeholder).toHaveStyleRule("width", "var(--sizing700)");
  expect(placeholder).toHaveStyleRule(
    "border-radius",
    "var(--borderRadiusCircle)",
  );
});

// coverage
test("renders with no animation when `disableAnimation` is true", () => {
  render(<Preview disableAnimation />);

  const placeholder = screen.getByTestId("preview-placeholder");

  expect(placeholder).toHaveStyle({
    animation: "none",
  });
});

testStyledSystemMargin(
  (props) => <Preview {...props} />,
  () => screen.getByTestId("preview-wrapper"),
);
