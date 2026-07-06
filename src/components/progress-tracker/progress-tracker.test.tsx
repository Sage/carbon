import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressTracker from "./progress-tracker.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

test("renders with default labels", () => {
  render(<ProgressTracker />);

  expect(screen.getByText("0%")).toBeVisible();
  expect(screen.getByText("of")).toBeVisible();
  expect(screen.getByText("100%")).toBeVisible();
});

test("renders with `customProgressLabel`", () => {
  render(<ProgressTracker currentProgressLabel="foo" />);

  expect(screen.getByText("foo")).toBeVisible();
});

test("renders with `maxProgressLabel`", () => {
  render(<ProgressTracker currentProgressLabel="foo" maxProgressLabel="bar" />);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("of")).toBeVisible();
  expect(screen.getByText("bar")).toBeVisible();
});

test("renders with `customValuePreposition`", () => {
  render(<ProgressTracker customValuePreposition="bar" />);

  expect(screen.getByText("0%")).toBeVisible();
  expect(screen.getByText("bar")).toBeVisible();
  expect(screen.getByText("100%")).toBeVisible();
});

test("renders with `description`", () => {
  render(<ProgressTracker description="foo" />);

  expect(screen.getByText("foo")).toBeVisible();
});

test("renders default labels if `maxProgressLabel` is set but no `currentProgressLabel` is provided", () => {
  render(<ProgressTracker maxProgressLabel="bar" />);

  expect(screen.getByText("0%")).toBeVisible();
  expect(screen.getByText("of")).toBeVisible();
  expect(screen.getByText("100%")).toBeVisible();
  expect(screen.queryByText("bar")).not.toBeInTheDocument();
});

// coverage
test("renders with `labelsPosition` set to `bottom`", () => {
  render(<ProgressTracker labelsPosition="bottom" />);

  expect(screen.getByText("0%")).toBeVisible();
  expect(screen.getByText("of")).toBeVisible();
  expect(screen.getByText("100%")).toBeVisible();
});

// coverage
test("renders with `labelsPosition` set to `left`", () => {
  render(
    <ProgressTracker data-role="progress-tracker" labelsPosition="left" />,
  );

  expect(screen.getByTestId("progress-tracker")).toHaveStyle({
    flexDirection: "row",
  });
});

test("renders with `labelWidth` when `labelsPosition` is `left`", () => {
  render(<ProgressTracker labelsPosition="left" labelWidth="40px" />);

  expect(screen.getByTestId("values-label")).toHaveStyle({ width: "40px" });
});

test("renders error `variant` when `error` prop is set", () => {
  render(<ProgressTracker error />);

  expect(screen.getByTestId("progress-bar")).toHaveStyleRule(
    "background-color",
    "var(--progress-fg-error)",
    { modifier: "::after" },
  );
});

test("renders with provided data- attributes", () => {
  render(<ProgressTracker data-role="bar" data-element="baz" />);

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "baz");
});

testStyledSystemMargin(
  (props) => <ProgressTracker data-role="progress" {...props} />,
  () => screen.getByTestId("progress"),
);
