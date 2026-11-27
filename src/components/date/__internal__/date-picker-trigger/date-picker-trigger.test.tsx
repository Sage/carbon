import React from "react";
import { render, screen } from "@testing-library/react";

import DatePickerTrigger from "./date-picker-trigger.component";

const defaultProps = {
  pickerId: "test-picker",
  size: "medium" as const,
  onClick: () => {},
};

describe("typical variant", () => {
  test("does not set aria-controls when the picker is closed", () => {
    render(
      <DatePickerTrigger {...defaultProps} variant="typical" open={false} />,
    );

    const button = screen.getByRole("button", { name: "Open calendar" });

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).not.toHaveAttribute("aria-controls");
  });

  test("sets aria-controls to the picker id when the picker is open", () => {
    render(<DatePickerTrigger {...defaultProps} variant="typical" open />);

    const button = screen.getByRole("button", { name: "Open calendar" });

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls", "test-picker");
  });
});

describe("legacy variant", () => {
  test.each([
    ["small", "var(--global-size-3-xs)"],
    ["medium", "var(--global-size-2-xs)"],
  ] as const)(
    "renders the calendar icon at the correct size when `size` is %s",
    (size, token) => {
      render(
        <DatePickerTrigger {...defaultProps} size={size} variant="legacy" />,
      );

      expect(screen.getByTestId("icon")).toHaveStyleRule("font-size", token, {
        modifier: "&::before",
      });
    },
  );
});
