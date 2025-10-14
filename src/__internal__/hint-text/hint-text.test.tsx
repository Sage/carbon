import React from "react";
import { render, screen } from "@testing-library/react";
import HintText from ".";

test("should render with children", () => {
  render(<HintText>This is a hint</HintText>);

  expect(screen.getByText("This is a hint")).toBeVisible();
});

test("should render with `id` prop", () => {
  render(<HintText id="hint-1">hint text</HintText>);

  expect(screen.getByTestId("hint-text")).toHaveAttribute("id", "hint-1");
});

test("should apply large font size when `isLarge` prop is true", () => {
  render(<HintText isLarge>hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-l)",
  );
});

test("should apply medium font size when `isLarge` prop is false", () => {
  render(<HintText isLarge={false}>hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-m)",
  );
});

test("should apply disabled colour when `disabled` prop is true", () => {
  render(<HintText disabled>hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
});

test("should apply alt colour when `disabled` prop is false", () => {
  render(<HintText disabled={false}>hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule("color", "var(--input-labelset-label-alt)");
});
