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

test("logs deprecation warning if pressed prop is used", () => {
  jest.spyOn(Logger, "error").mockImplementation(() => {});

  const loggerDeprecateSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(<ButtonToggle pressed>Button</ButtonToggle>);

  expect(loggerDeprecateSpy).toHaveBeenCalledWith(
    expect.stringContaining("The `pressed` prop is deprecated."),
  );
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

test("should render with expected styles when buttonIcon is set", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle buttonIcon="add">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("button-toggle-icon")).toHaveStyle({
    marginRight: "8px",
  });
});

test("should render with expected styles when buttonIcon is set and buttonIconSize is large'", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle buttonIcon="add" buttonIconSize="large">
        Button
      </ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("button-toggle-icon")).toHaveStyle({
    marginRight: "0",
  });
  expect(screen.getByTestId("icon")).toHaveStyle({
    marginLeft: "0",
    marginRight: "0",
    marginBottom: "8px",
  });
  expect(screen.getByRole("button")).toHaveStyle({
    minHeight: "88px",
    flexDirection: "column",
  });
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

test("should render with aria-pressed true when pressed prop is true", () => {
  jest.spyOn(Logger, "deprecate").mockImplementation(() => {});
  jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(
    <ButtonToggleGroup id="test" value="test-value" onChange={() => {}}>
      <ButtonToggle value="test-value" pressed>
        Button
      </ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("should render with aria-pressed false when pressed prop is false", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle pressed={false}>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
});

test("should render with data-element attribute", () => {
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

test("should render with data-role attribute", () => {
  render(
    <ButtonToggleGroup id="test" value="" onChange={() => {}}>
      <ButtonToggle data-role="test-role">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("test-role")).toBeInTheDocument();
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

test("should call onChange when ButtonToggleGroup button is clicked", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();

  render(
    <ButtonToggleGroup id="test" value="" onChange={onChange}>
      <ButtonToggle value="button1">Button 1</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button"));
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("should not call onChange when ButtonToggleGroup is disabled", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();

  render(
    <ButtonToggleGroup id="test" value="" onChange={onChange} disabled>
      <ButtonToggle value="button1">Button 1</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button"));
  expect(onChange).not.toHaveBeenCalled();
});

test("should render ButtonToggleGroup with data-element attribute", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value=""
      onChange={() => {}}
      data-element="test-group-element"
      data-role="test-group-role"
    >
      <ButtonToggle>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("test-group-role")).toHaveAttribute(
    "data-element",
    "test-group-element",
  );
});

test("should render ButtonToggleGroup with data-role attribute", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value=""
      onChange={() => {}}
      data-role="test-group-role"
    >
      <ButtonToggle>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("test-group-role")).toBeInTheDocument();
});

test("should render ButtonToggleGroup with fieldHelp", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value=""
      onChange={() => {}}
      fieldHelp="Test help"
    >
      <ButtonToggle>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByText("Test help")).toBeInTheDocument();
});

test("should call onChange with undefined when allowDeselect is true and pressed button is clicked", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();

  render(
    <ButtonToggleGroup
      id="test"
      value="button1"
      onChange={onChange}
      allowDeselect
    >
      <ButtonToggle value="button1">Button 1</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button"));
  expect(onChange).toHaveBeenCalledWith(expect.anything(), undefined);
});
