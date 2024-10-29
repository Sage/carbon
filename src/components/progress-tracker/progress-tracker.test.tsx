import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressTracker from "./progress-tracker.component";
import CarbonProvider from "../carbon-provider";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";

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
test("renders with `labelsPosition` set to `top`", () => {
  render(<ProgressTracker labelsPosition="top" />);

  expect(screen.getByTestId("values-label")).toHaveStyleRule(
    "margin-bottom",
    "var(--spacing100)",
  );
});

// coverage
test("renders with `labelsPosition` set to `bottom`", () => {
  render(<ProgressTracker labelsPosition="bottom" />);

  expect(screen.getByTestId("values-label")).toHaveStyleRule(
    "margin-top",
    "var(--spacing100)",
  );
});

// coverage
test("renders with `labelsPosition` set to `left`", () => {
  render(
    <ProgressTracker data-role="progress-tracker" labelsPosition="left" />,
  );

  expect(screen.getByTestId("progress-tracker")).toHaveStyle({
    display: "flex",
    alignItems: "center",
  });
  expect(screen.getByTestId("values-label")).toHaveStyleRule(
    "margin-right",
    "var(--spacing100)",
  );
});

// coverage
test("renders with provided `labelWidth` when `labelsPosition` is set to `left`", () => {
  render(<ProgressTracker labelsPosition="left" labelWidth="100px" />);

  expect(screen.getByTestId("values-label")).toHaveStyle({
    width: "100px",
  });
});

// coverage
test("renders inner bar with correct width when `progress` is set", () => {
  render(<ProgressTracker progress={50} />);

  expect(screen.getByTestId("inner-bar")).toHaveStyle({
    width: "50%",
  });
});

// coverage
test("renders inner bar with correct height when `size` is 'small'", () => {
  render(<ProgressTracker size="small" />);

  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "height",
    "var(--sizing050)",
  );
});

// coverage
test("renders inner bar with correct height when `size` is 'medium'", () => {
  render(<ProgressTracker size="medium" />);

  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "height",
    "var(--sizing100)",
  );
});

// coverage
test("renders inner bar with correct height when `size` is 'large'", () => {
  render(<ProgressTracker size="large" />);

  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "height",
    "var(--sizing200)",
  );
});

// coverage
test("renders with correct colour when `error` is set", () => {
  render(<ProgressTracker error />);

  expect(screen.getByTestId("progress-bar")).toHaveStyleRule(
    "border",
    "1px solid var(--colorsSemanticNegative500)",
  );
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticNegative500)",
  );
});

// coverage
test("renders with correct colour when progress is '100%'", () => {
  render(<ProgressTracker progress={100} />);

  expect(screen.getByTestId("progress-bar")).toHaveStyleRule(
    "border",
    "1px solid var(--colorsSemanticPositive500)",
  );
  expect(screen.getByTestId("inner-bar")).toHaveStyleRule(
    "background-color",
    "var(--colorsSemanticPositive500)",
  );
});

// coverage
test("renders with correct border-radius when `roundedCornersOptOut` is true", () => {
  render(
    <CarbonProvider roundedCornersOptOut>
      <ProgressTracker progress={100} />
    </CarbonProvider>,
  );

  expect(screen.getByTestId("progress-bar")).toHaveStyle({
    borderRadius: "25px",
  });
  expect(screen.getByTestId("inner-bar")).toHaveStyle({ borderRadius: "25px" });
});

testStyledSystemMarginRTL(
  (props) => <ProgressTracker data-role="progress" {...props} />,
  () => screen.getByTestId("progress"),
);
