import React from "react";
import { render, screen } from "@testing-library/react";
import ValidationMessage from ".";

test("should not render when neither error nor warning is provided", () => {
  render(<ValidationMessage data-role="validation-message" />);
  expect(screen.queryByTestId("validation-message")).not.toBeInTheDocument();
});

test("should render when error is a string", () => {
  render(<ValidationMessage error="Error message" />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toBeVisible();
});

test("should render when warning is a string", () => {
  render(<ValidationMessage warning="Warning message" />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toBeVisible();
});

test("should render with id attribute", () => {
  render(<ValidationMessage id="validation-error-1" error="Error message" />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveAttribute("id", "validation-error-1");
});

test("should support custom data-role attribute", () => {
  render(
    <ValidationMessage error="Error occurred" data-role="custom-validation" />,
  );
  const validationMessage = screen.getByTestId("custom-validation");
  expect(validationMessage).toBeVisible();
});

test("should support data-element attribute", () => {
  render(
    <ValidationMessage error="Error message" data-element="validation-error" />,
  );
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveAttribute("data-element", "validation-error");
});

test("should apply error color when error is provided", () => {
  render(<ValidationMessage error="Error message" />);
  const validationMessage = screen.getByText("Error message");

  expect(validationMessage).toHaveStyleRule(
    "color",
    "var(--input-validation-label-error)",
  );
});

test("should apply warning color when warning is provided", () => {
  render(<ValidationMessage warning="Warning message" />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyleRule(
    "color",
    "var(--input-validation-label-warn)",
  );
});

test("should apply medium font by default for error", () => {
  render(<ValidationMessage error="Error message" />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
  );
});

test("should apply large font when isLarge is true for error", () => {
  render(<ValidationMessage error="Error message" isLarge={true} />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-l)",
  );
});

test("should apply medium font by default for warning", () => {
  render(<ValidationMessage warning="Warning message" />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-m)",
  );
});

test("should apply large font when isLarge is true for warning", () => {
  render(<ValidationMessage warning="Warning message" isLarge={true} />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-l)",
  );
});

test("should prioritize error over warning when both provided", () => {
  render(<ValidationMessage error="Error message" warning="Warning message" />);
  expect(screen.getByText("Error message")).toBeVisible();
  expect(screen.queryByText("Warning message")).not.toBeInTheDocument();
});
