import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Number from ".";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const ControlledNumber = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number value={state} onChange={setValue} />;
};

test("renders a textbox with provided label", () => {
  render(<Number label="foo" />);

  expect(screen.getByRole("textbox", { name: "foo" })).toBeVisible();
});

test("renders a textbox with provided value", () => {
  render(<Number value="123" />);

  expect(screen.getByRole("textbox")).toHaveValue("123");
});

test("calls onChange when valid characters are provided", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Number onChange={onChange} />);

  await user.type(screen.getByRole("textbox"), "123");

  expect(onChange).toHaveBeenCalledTimes(3);
});

test("does not call onChange when invalid characters are provided", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Number onChange={onChange} />);

  await user.tab();
  await user.keyboard("abc");

  expect(onChange).not.toHaveBeenCalled();
});

test("calls onKeyDown when a key is pressed", async () => {
  const user = userEvent.setup();
  const onKeyDown = jest.fn();
  render(<Number onKeyDown={onKeyDown} />);

  await user.tab();
  await user.keyboard("1");

  expect(onKeyDown).toHaveBeenCalled();
});

test("accepts numeric characters", async () => {
  const user = userEvent.setup();
  render(<ControlledNumber />);

  await user.tab();
  await user.keyboard("123");

  expect(screen.getByRole("textbox")).toHaveValue("123");
});

test("accepts negative numeric characters", async () => {
  const user = userEvent.setup();
  render(<ControlledNumber />);

  await user.tab();
  await user.keyboard("-123");

  expect(screen.getByRole("textbox")).toHaveValue("-123");
});

test("rejects non-numeric characters", async () => {
  const user = userEvent.setup();
  render(<ControlledNumber />);

  await user.tab();
  await user.keyboard("abc");

  expect(screen.getByRole("textbox")).toHaveValue("");
});

test("maintains the user's cursor position when an invalid character is provided", async () => {
  const user = userEvent.setup();
  render(<ControlledNumber />);

  await user.tab();
  await user.keyboard("abc");

  const textbox = screen.getByRole("textbox") as HTMLInputElement;

  expect(textbox.selectionStart).toBe(0);
  expect(textbox.selectionEnd).toBe(0);
});

test("logs a deprecation warning when uncontrolled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Number />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Number` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("renders a required textbox when `required` prop is true", () => {
  render(<Number required />);

  expect(screen.getByRole("textbox")).toBeRequired();
});

test("renders a disabled textbox when `disabled` prop is true", () => {
  render(<Number disabled />);

  expect(screen.getByRole("textbox")).toBeDisabled();
});

test("renders with `ref` when passed as an object", () => {
  const ref = { current: null };
  render(<Number ref={ref}>foo</Number>);

  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("renders with `ref` when passed as a callback", () => {
  const ref = jest.fn();
  render(<Number ref={ref}>foo</Number>);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
});

test("sets `ref` to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(<Number ref={ref}>foo</Number>);

  expect(ref.current).toBe(screen.getByRole("textbox"));

  unmount();

  expect(ref.current).toBeNull();
});
