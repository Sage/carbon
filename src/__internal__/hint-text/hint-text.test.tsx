import React from "react";
import { render, screen } from "@testing-library/react";
import HintText from ".";

test("should render with children", () => {
  render(<HintText size="medium">This is a hint</HintText>);

  expect(screen.getByText("This is a hint")).toBeVisible();
});

test("should render with `id` prop", () => {
  render(
    <HintText size="medium" id="hint-1">
      hint text
    </HintText>,
  );

  expect(screen.getByTestId("hint-text")).toHaveAttribute("id", "hint-1");
});

test("should apply large font size when `size` prop is 'large'", () => {
  render(<HintText size="large">hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-l)",
  );
});

test("should apply medium font size when `size` prop is 'medium'", () => {
  render(<HintText size="medium">hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-m)",
  );
});

test("should apply small font size when `size` prop is 'small'", () => {
  render(<HintText size="small">hint text</HintText>);

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-s)",
  );
});

test("should apply disabled colour and set aria-disabled when `disabled` prop is true", () => {
  render(
    <HintText size="medium" disabled>
      hint text
    </HintText>,
  );

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule(
    "color",
    "var(--input-labelset-label-disabled)",
  );
  expect(element).toHaveAttribute("aria-disabled", "true");
});

test("should apply alt colour when `disabled` prop is false", () => {
  render(
    <HintText size="medium" disabled={false}>
      hint text
    </HintText>,
  );

  const element = screen.getByTestId("hint-text");
  expect(element).toHaveStyleRule("color", "var(--input-labelset-label-alt)");
});
