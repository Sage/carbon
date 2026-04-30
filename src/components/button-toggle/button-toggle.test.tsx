import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonToggleGroup, ButtonToggle } from ".";
import Logger from "../../__internal__/utils/logger";

test("logs warning if not used within ButtonToggleGroup", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(<ButtonToggle>Button</ButtonToggle>);

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon ButtonToggleGroup: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

test("should call `onClick` when the button is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle onClick={onClick}>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should call `onFocus` when the button is focused", async () => {
  const onFocus = jest.fn();
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle onFocus={onFocus}>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button"));
  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("should call `onBlur` when the button is blurred", async () => {
  const onBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle onBlur={onBlur}>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button"));
  await user.tab();
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("should render disabled button with expected styles", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle disabled>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toBeDisabled();
  expect(screen.getByRole("button")).toHaveStyle({ cursor: "not-allowed" });
});

test("should throw an error when neither children or a `buttonIcon` is provided", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <ButtonToggleGroup id="test" value="" onChange={() => {}}>
        <ButtonToggle />
      </ButtonToggleGroup>,
    ),
  ).toThrow(
    "Either prop `buttonIcon` must be defined, or this node must have children",
  );

  consoleSpy.mockRestore();
});

test("should render with aria-label attribute", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle aria-label="test-label">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName("test-label");
});

test("should render with aria-labelledby attribute", () => {
  render(
    <>
      <span id="test-id">Test Label</span>
      <ButtonToggleGroup id="test" value="" onChange={() => {}}>
        <ButtonToggle aria-labelledby="test-id">Button</ButtonToggle>
      </ButtonToggleGroup>
    </>,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName("Test Label");
});

test("should render with aria-pressed true when the button is selected", () => {
  render(
    <ButtonToggleGroup id="test" value="test-value" onChange={() => {}}>
      <ButtonToggle value="test-value">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("should render with aria-pressed false when the button is not selected", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle pressed={false}>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
});

test("should render with provided data- tags", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle data-element="test-element" data-role="test-role">
        Button
      </ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("test-role")).toHaveAttribute(
    "data-element",
    "test-element",
  );
});

test("should render with value attribute", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle value="test-value">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveValue("test-value");
});

test("should render button with text content", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle>Test Button Text</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveTextContent("Test Button Text");
});

test("should render with provided `buttonIcon`", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle buttonIcon="placeholder" />
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("icon")).toBeVisible();
  expect(screen.getByTestId("icon")).toHaveAttribute("type", "placeholder");
});

// coverage
test("should render button with expected styles when selected button is disabled", () => {
  render(
    <ButtonToggleGroup id="test" value="test-value" onChange={() => {}}>
      <ButtonToggle value="test-value" disabled>
        Button
      </ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveStyleRule(
    "color",
    "var(--button-typical-toggle-label-active-disabled)",
  );
});

// coverage
test("should render with expected styles when `size` prop is set", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle value="test-value" size="large">
        Button
      </ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveStyleRule(
    "height",
    "var(--global-size-m)",
  );
});
