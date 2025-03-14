import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../../__spec_helper__/__internal__/test-utils";

import TypeIcon from "./type-icon.component";

test("renders with 'info' icon when variant is 'info", () => {
  render(<TypeIcon variant="info" />);

  const icon = screen.getByTestId("icon");

  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "info");
});

test("renders with 'tick_circle' icon when variant is 'success'", () => {
  render(<TypeIcon variant="success" />);

  const icon = screen.getByTestId("icon");

  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "tick_circle");
});

test("renders with 'info' icon when variant is 'neutral'", () => {
  render(<TypeIcon variant="neutral" />);

  const icon = screen.getByTestId("icon");

  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "info");
});

test("renders with 'warning' icon when variant is 'warning'", () => {
  render(<TypeIcon variant="warning" />);

  const icon = screen.getByTestId("icon");

  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "warning");
});

test("renders with 'error' icon when variant is 'error'", () => {
  render(<TypeIcon variant="error" />);

  const icon = screen.getByTestId("icon");

  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "error");
});
