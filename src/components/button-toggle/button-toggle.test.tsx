import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logger from "../../__internal__/utils/logger";
import { ButtonToggle } from ".";
import { InputGroupContext } from "../../__internal__/input-behaviour";

test("should display a deprecation warning for uncontrolled behaviour which is triggered only once", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});
  render(<ButtonToggle>Button</ButtonToggle>);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Button Toggle` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockRestore();
});

test("should display a deprecation warning for the `grouped` prop which is triggered only once", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});
  render(<ButtonToggle grouped>Button</ButtonToggle>);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `grouped` prop in `ButtonToggle` component is deprecated and will soon be removed. Spacing between buttons is no longer no removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1); // total two times to account for uncontrolled behaviour warning
  loggerSpy.mockRestore();
});

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

test("should call `onFocus` passed via InputGroupContext when the button is focused", async () => {
  const contextOnFocus = jest.fn();
  const user = userEvent.setup();
  render(
    <InputGroupContext.Provider value={{ onFocus: contextOnFocus }}>
      <ButtonToggle>Button</ButtonToggle>
    </InputGroupContext.Provider>,
  );

  await user.click(screen.getByRole("button"));
  expect(contextOnFocus).toHaveBeenCalledTimes(1);
});

test("should call `onBlur` passed via InputGroupContext when the button is blurred", async () => {
  const contextOnBlur = jest.fn();
  const user = userEvent.setup();
  render(
    <InputGroupContext.Provider value={{ onBlur: contextOnBlur }}>
      <ButtonToggle>Button</ButtonToggle>
    </InputGroupContext.Provider>,
  );

  await user.click(screen.getByRole("button"));
  await user.tab();
  expect(contextOnBlur).toHaveBeenCalledTimes(1);
});

test("should call `onMouseEnter` passed via InputGroupContext when the button is hovered", async () => {
  const contextOnMouseEnter = jest.fn();
  const user = userEvent.setup();
  render(
    <InputGroupContext.Provider value={{ onMouseEnter: contextOnMouseEnter }}>
      <ButtonToggle>Button</ButtonToggle>
    </InputGroupContext.Provider>,
  );

  await user.hover(screen.getByRole("button"));
  expect(contextOnMouseEnter).toHaveBeenCalledTimes(1);
});

test("should call `onMouseLeave` passed via InputGroupContext when the button is un-hovered", async () => {
  const contextOnMouseLeave = jest.fn();
  const user = userEvent.setup();
  render(
    <InputGroupContext.Provider value={{ onMouseLeave: contextOnMouseLeave }}>
      <ButtonToggle>Button</ButtonToggle>
    </InputGroupContext.Provider>,
  );

  await user.hover(screen.getByRole("button"));
  await user.unhover(screen.getByRole("button"));
  expect(contextOnMouseLeave).toHaveBeenCalledTimes(1);
});

test("should render with aria-pressed set to true when pressed is set", () => {
  render(<ButtonToggle pressed>Button</ButtonToggle>);

  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("should render disabled button with expected styles", () => {
  render(<ButtonToggle disabled>Button</ButtonToggle>);

  expect(screen.getByRole("button")).toBeDisabled();
  expect(screen.getByRole("button")).toHaveStyle({ cursor: "not-allowed" });
});

test("should render disabled button with expected styles when pressed is set", () => {
  render(
    <ButtonToggle disabled pressed>
      Button
    </ButtonToggle>,
  );

  expect(screen.getByRole("button")).toBeDisabled();
  expect(screen.getByRole("button")).toHaveStyle({
    cursor: "not-allowed",
    backgroundColor: "var(--colorsActionMinorYin030)",
  });
});

test("should render with expected styles when buttonIcon is set", () => {
  render(<ButtonToggle buttonIcon="add">Button</ButtonToggle>);

  expect(screen.getByTestId("button-toggle-icon")).toHaveStyle({
    marginRight: "8px",
  });
});

test("should render with expected styles when buttonIcon is set and buttonIconSize is large'", () => {
  render(
    <ButtonToggle buttonIcon="add" buttonIconSize="large">
      Button
    </ButtonToggle>,
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

  expect(() => render(<ButtonToggle />)).toThrow(
    "Either prop `buttonIcon` must be defined, or this node must have children",
  );

  consoleSpy.mockRestore();
});
