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
    <ButtonToggleGroup id="test" onChange={() => {}}>
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
    <ButtonToggleGroup id="test" onChange={() => {}}>
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
    <ButtonToggleGroup id="test" onChange={() => {}}>
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
    <ButtonToggleGroup id="test" onChange={() => {}}>
      <ButtonToggle disabled>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button")).toBeDisabled();
  expect(screen.getByRole("button")).toHaveStyle({ cursor: "not-allowed" });
});

test("should render with expected styles when buttonIcon is set", () => {
  render(
    <ButtonToggleGroup id="test" onChange={() => {}}>
      <ButtonToggle buttonIcon="add">Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("button-toggle-icon")).toHaveStyle({
    marginRight: "8px",
  });
});

test("should render with expected styles when buttonIcon is set and buttonIconSize is large'", () => {
  render(
    <ButtonToggleGroup id="test" onChange={() => {}}>
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
      <ButtonToggleGroup id="test" onChange={() => {}}>
        <ButtonToggle />
      </ButtonToggleGroup>,
    ),
  ).toThrow(
    "Either prop `buttonIcon` must be defined, or this node must have children",
  );

  consoleSpy.mockRestore();
});
