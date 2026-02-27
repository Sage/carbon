import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBorder from "./error-border.style";

test("when `warning` is true should render with warning background colour", () => {
  render(<ErrorBorder data-role="error-border" warning />);

  expect(screen.getByTestId("error-border")).toHaveStyleRule(
    "background-color",
    "var(--input-validation-bar-warn)",
  );
});

test("when `warning` is false should render with error background colour", () => {
  render(<ErrorBorder data-role="error-border" warning={false} />);

  expect(screen.getByTestId("error-border")).toHaveStyleRule(
    "background-color",
    "var(--input-validation-border-error)",
  );
});
