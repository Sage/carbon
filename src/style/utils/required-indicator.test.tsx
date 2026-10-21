import React from "react";
import styled from "styled-components";
import { render, screen } from "@testing-library/react";
import requiredIndicatorStyles from "./required-indicator";

const font = "var(--global-font-static-comp-medium-m)";

const TestLabel = styled.label<{ $disabled?: boolean }>`
  ${({ $disabled }) => requiredIndicatorStyles({ font, disabled: $disabled })}
`;

test("should render an inline asterisk with given font and spacing", () => {
  render(<TestLabel>Label</TestLabel>);

  const label = screen.getByText("Label");
  expect(label).toHaveStyleRule("content", '"*"', { modifier: "::after" });
  expect(label).toHaveStyleRule("display", "inline", { modifier: "::after" });
  expect(label).toHaveStyleRule("font", font, { modifier: "::after" });
  expect(label).toHaveStyleRule(
    "margin-inline-start",
    "var(--global-space-comp-xs)",
    { modifier: "::after" },
  );
});

test.each([
  [false, "var(--input-labelset-label-required)"],
  [true, "var(--input-labelset-label-disabled)"],
])(
  "should render an asterisk with correct color when disabled is %s",
  (disabled, expectedColor) => {
    render(<TestLabel $disabled={disabled}>Label</TestLabel>);

    const label = screen.getByText("Label");
    expect(label).toHaveStyleRule("color", expectedColor, {
      modifier: "::after",
    });
  },
);
