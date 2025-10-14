import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";
import InputIconToggle from "../input-icon-toggle";

test("should render text input element with `type` of 'text' by default", () => {
  render(<Input value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
  expect(input).toHaveAttribute("type", "text");
});

test("should render text input element with `type` of 'password'", () => {
  render(
    <Input value="" onChange={() => {}} type="password" data-role="input" />,
  );

  const input = screen.getByTestId("input");
  expect(input).toBeVisible();
  expect(input).toHaveAttribute("type", "password");
});

test("should render with `placeholder` prop", () => {
  render(<Input value="" placeholder="Enter text" onChange={() => {}} />);

  const input = screen.getByPlaceholderText("Enter text");
  expect(input).toBeVisible();
});

test("should render with `value` prop", () => {
  render(<Input value="test value" onChange={() => {}} />);

  const input = screen.getByDisplayValue("test value");
  expect(input).toBeVisible();
});

test("should render with `id` prop", () => {
  render(<Input id="input-1" value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("id", "input-1");
});

test("should render with `name` prop", () => {
  render(<Input name="email" value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("name", "email");
});

test("should render with `aria-describedby` prop", () => {
  render(<Input aria-describedby="hint-text" value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("aria-describedby", "hint-text");
});

test("should call `onChange` callback prop when value changes", async () => {
  const handleChange = jest.fn();
  render(<Input value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "a");
  expect(handleChange).toHaveBeenCalled();
});

test("should call `onBlur` callback prop when input loses focus", async () => {
  const handleBlur = jest.fn();
  render(<Input value="" onChange={() => {}} onBlur={handleBlur} />);

  const input = screen.getByRole("textbox");
  fireEvent.blur(input);
  expect(handleBlur).toHaveBeenCalled();
});

test("should call `onFocus` callback prop when input gains focus", async () => {
  const handleFocus = jest.fn();
  render(<Input value="" onChange={() => {}} onFocus={handleFocus} />);

  const input = screen.getByRole("textbox");
  fireEvent.focus(input);
  expect(handleFocus).toHaveBeenCalled();
});

test("should render with `required` prop", () => {
  render(<Input required value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toBeRequired();
});

test("should focus input when `autoFocus` prop is set", async () => {
  render(<Input autoFocus value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});

test.each([
  ["small", "var(--global-size-s)"],
  ["medium", "var(--global-size-m)"],
  ["large", "var(--global-size-l)"],
] as const)("should render with %s `size` prop", (size, expectedHeight) => {
  render(<Input size={size} value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule("min-height", expectedHeight);
});

test("should apply error border styling when `error` prop is true", () => {
  render(<Input error value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-s) solid var(--input-validation-border-error)",
  );
});

test("should apply default border when `error` prop is false", () => {
  render(<Input error={false} value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-default)",
  );
});

test("should apply disabled border when `disabled` prop is true", () => {
  render(<Input disabled value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-disabled)",
    { modifier: "&&&" },
  );
});

test("should apply readOnly border when `readOnly` prop is true", () => {
  render(<Input readOnly value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-read-only)",
    { modifier: "&&&" },
  );
});

test("should apply `disabled` prop border precedence over `error` prop", () => {
  render(<Input disabled error value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-disabled)",
    { modifier: "&&&" },
  );
});

test("should apply `readOnly` prop border precedence over `error` prop", () => {
  render(<Input readOnly error value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-read-only)",
    { modifier: "&&&" },
  );
});

test("should apply disabled background colour when `disabled` prop is true", () => {
  render(<Input disabled value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "background",
    "var(--input-typical-bg-disabled)",
    { modifier: "&&&" },
  );
});

test("should apply readOnly background colour when `readOnly` prop is true", () => {
  render(<Input readOnly value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "background",
    "var(--input-typical-bg-read-only)",
    { modifier: "&&&" },
  );
});

test("should render with icon when `inputIcon` prop is provided", async () => {
  const user = userEvent.setup();
  const onClickMock = jest.fn();
  render(
    <Input
      inputIcon={<InputIconToggle inputIcon="bin" onClick={onClickMock} />}
      value=""
      onChange={() => {}}
    />,
  );

  const icon = screen.getByTestId("icon");
  await user.click(icon);

  expect(icon).toHaveAttribute("type", "bin");
  expect(onClickMock).toHaveBeenCalled();
});

test("should render with prefix when `prefix` prop is provided", () => {
  render(<Input prefix="$" value="" onChange={() => {}} />);

  const prefix = screen.getByText("$");
  expect(prefix).toBeVisible();
});
