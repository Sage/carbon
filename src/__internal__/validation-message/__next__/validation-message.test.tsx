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

  expect(validationMessage).toHaveStyle(
    "color: var(--input-validation-label-error)",
  );
});

test("should apply error font-weight", () => {
  render(<ValidationMessage error="Error message" />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveStyle("font-weight: 500");
});

test("should apply warning color when warning is provided", () => {
  render(<ValidationMessage warning="Warning message" />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyle(
    "color: var(--input-validation-label-warn)",
  );
});

test("should apply warning font-weight", () => {
  render(<ValidationMessage warning="Warning message" />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyle("font-weight: 400");
});

test("should apply medium font size by default for error", () => {
  render(<ValidationMessage error="Error message" />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveStyle(
    "font-size: var(--global-font-static-body-regular-m)",
  );
});

test("should apply large font size when isLarge is true for error", () => {
  render(<ValidationMessage error="Error message" isLarge={true} />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveStyle(
    "font-size: var(--global-font-static-body-regular-l)",
  );
});

test("should apply medium font size by default for warning", () => {
  render(<ValidationMessage warning="Warning message" />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyle(
    "font-size: var(--global-font-static-body-regular-m)",
  );
});

test("should apply large font size when isLarge is true for warning", () => {
  render(<ValidationMessage warning="Warning message" isLarge={true} />);
  const validationMessage = screen.getByText("Warning message");
  expect(validationMessage).toHaveStyle(
    "font-size: var(--global-font-static-body-regular-l)",
  );
});

test("should prioritize error over warning when both provided", () => {
  render(<ValidationMessage error="Error message" warning="Warning message" />);
  expect(screen.getByText("Error message")).toBeVisible();
  expect(screen.queryByText("Warning message")).not.toBeInTheDocument();
});

test("should apply error styling when both error and warning strings are provided", () => {
  render(<ValidationMessage error="Error message" warning="Warning message" />);
  const validationMessage = screen.getByText("Error message");
  expect(validationMessage).toHaveStyle(
    "color: var(--input-validation-label-error)",
  );
  expect(validationMessage).toHaveStyle("font-weight: 500");
});
