import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonToggleGroup, ButtonToggle } from ".";

test("should call `onClick` when the button is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(<ButtonToggle onClick={onClick}>Button</ButtonToggle>);

  await user.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should call `onFocus` when the button is focused", async () => {
  const onFocus = jest.fn();
  const user = userEvent.setup();
  render(<ButtonToggle onFocus={onFocus}>Button</ButtonToggle>);

  await user.click(screen.getByRole("button"));
  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("should call `onBlur` when the button is blurred", async () => {
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(<ButtonToggle onBlur={onBlur}>Button</ButtonToggle>);

  await user.click(screen.getByRole("button"));
  await user.tab();
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("should render disabled button with expected styles", () => {
  render(<ButtonToggle disabled>Button</ButtonToggle>);

  expect(screen.getByRole("button")).toBeDisabled();
  expect(screen.getByRole("button")).toHaveStyle({ cursor: "not-allowed" });
});

test("should throw an error when neither children or a `buttonIcon` is provided", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => render(<ButtonToggle />)).toThrow(
    "Either prop `buttonIcon` must be defined, or this node must have children",
  );

  consoleSpy.mockRestore();
});

test("should render with aria-label attribute", () => {
  render(<ButtonToggle aria-label="test-label">Button</ButtonToggle>);

  expect(screen.getByRole("button")).toHaveAccessibleName("test-label");
});

test("should render with aria-labelledby attribute", () => {
  render(
    <>
      <span id="test-id">Test Label</span>
      <ButtonToggle aria-labelledby="test-id">Button</ButtonToggle>
    </>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName("Test Label");
});

test("should render with aria-pressed true when the button is selected within a group", () => {
  render(
    <ButtonToggleGroup id="test" value="test-value" onChange={() => {}}>
      <ButtonToggle value="test-value">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("should render with aria-pressed false when the button is not selected within a group", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle value="test-value">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
});

test("should render with aria-pressed true when `pressed` is true", () => {
  render(<ButtonToggle pressed>Single Button</ButtonToggle>);

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("should render with aria-pressed false when `pressed` is false", () => {
  render(<ButtonToggle pressed={false}>Single Button</ButtonToggle>);

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
});

test("should render with provided data- tags", () => {
  render(
    <ButtonToggle data-element="test-element" data-role="test-role">
      Button
    </ButtonToggle>,
  );

  expect(screen.getByRole("button")).toHaveAttribute(
    "data-element",
    "test-element",
  );
  expect(screen.getByRole("button")).toHaveAttribute("data-role", "test-role");
});

test("should render with value attribute", () => {
  render(<ButtonToggle value="test-value">Button</ButtonToggle>);

  expect(screen.getByRole("button")).toHaveValue("test-value");
});

test("should render button with text content", () => {
  render(<ButtonToggle>Test Button Text</ButtonToggle>);

  expect(screen.getByRole("button")).toHaveTextContent("Test Button Text");
});

test("should not render with tabindex when not in a group", () => {
  render(<ButtonToggle pressed={false}>Single Button</ButtonToggle>);

  expect(screen.getByRole("button")).not.toHaveAttribute("tabindex");
});

test("should render with provided `buttonIcon`", () => {
  render(<ButtonToggle buttonIcon="placeholder" />);

  expect(screen.getByTestId("icon")).toBeVisible();
  expect(screen.getByTestId("icon")).toHaveAttribute("type", "placeholder");
});

// coverage
test("should render button with expected styles when pressed button is disabled", () => {
  render(
    <ButtonToggle pressed disabled>
      Button
    </ButtonToggle>,
  );

  expect(screen.getByRole("button")).toHaveStyleRule(
    "color",
    "var(--button-typical-toggle-label-active-disabled)",
  );
});

test("should render extra-small button when rendered in small group", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value="test-value"
      onChange={() => {}}
      size="small"
    >
      <ButtonToggle value="">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveStyleRule(
    "height",
    "var(--global-size-xs)",
  );
});

test("should render small button when rendered in medium group", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value="test-value"
      onChange={() => {}}
      size="medium"
    >
      <ButtonToggle value="">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveStyleRule(
    "height",
    "var(--global-size-s)",
  );
});

test("should render medium button when rendered in large group", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value="test-value"
      onChange={() => {}}
      size="large"
    >
      <ButtonToggle value="">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveStyleRule(
    "height",
    "var(--global-size-m)",
  );
});
