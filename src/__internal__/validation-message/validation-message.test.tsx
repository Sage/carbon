import React from "react";
import { render, screen } from "@testing-library/react";
import ValidationMessage from ".";

test("renders only the error message when both `error` and `warning` props are provided as strings", () => {
  render(<ValidationMessage error="error" warning="warning" />);

  const validationMessage = screen.getByTestId("validation-message");
  expect(validationMessage).toHaveTextContent("error");
});

test("renders only the warning message when the `warning` prop is a string and the `error` prop is undefined", () => {
  render(<ValidationMessage warning="warning" />);

  const validationMessage = screen.getByTestId("validation-message");
  expect(validationMessage).toHaveTextContent("warning");
});

test("does not render when the `error` prop is true, and the `warning` prop is a string", () => {
  render(<ValidationMessage error warning="warning" />);

  const validationMessage = screen.queryByTestId("validation-message");
  expect(validationMessage).not.toBeInTheDocument();
});

test("does not render when the `error` prop is undefined, and the `warning` prop is true", () => {
  render(<ValidationMessage warning />);

  const validationMessage = screen.queryByTestId("validation-message");
  expect(validationMessage).not.toBeInTheDocument();
});

test("does not render when the `error` and `warning` props are not provided", () => {
  render(<ValidationMessage />);

  const validationMessage = screen.queryByTestId("validation-message");
  expect(validationMessage).not.toBeInTheDocument();
});

test("sets the 'id' attribute to the value of the `validationId` prop", () => {
  render(<ValidationMessage error="error" validationId="foo" />);

  const validationMessage = screen.getByTestId("validation-message");
  expect(validationMessage).toHaveAttribute("id", "foo");
});

test("renders with the correct data attributes", () => {
  render(
    <ValidationMessage
      error="error"
      data-element="test-element"
      data-role="test-role"
    />,
  );

  const validationMessage = screen.getByText("error");
  expect(validationMessage).toHaveAttribute("data-element", "test-element");
  expect(validationMessage).toHaveAttribute("data-role", "test-role");
});

// coverage
test("renders with the correct colour when `isDarkBackground` is true", () => {
  render(<ValidationMessage error="error" isDarkBackground />);

  expect(screen.getByTestId("validation-message")).toHaveStyle({
    color: "var(--colorsSemanticNegative450)",
  });
});

// coverage
test("renders with the correct colour when `isDarkBackground` is false", () => {
  render(<ValidationMessage error="error" isDarkBackground={false} />);

  expect(screen.getByTestId("validation-message")).toHaveStyle({
    color: "var(--colorsSemanticNegative500)",
  });
});

// coverage
test("renders with the correct colour when `isLarge` is true", () => {
  render(<ValidationMessage error="error" isLarge />);

  expect(screen.getByText("error")).toHaveStyleRule(
    "font-size",
    "var(--fontSizes200)",
  );
});
