import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";

test("should render input element", () => {
  render(<Input value="" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
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

test("should apply `inputWidth` prop as percentage", () => {
  render(<Input inputWidth={50} value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule("width", "50%");
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
  );
});

test("should apply readOnly border when `readOnly` prop is true", () => {
  render(<Input readOnly value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-read-only)",
  );
});

test("should apply `disabled` prop border precedence over `error` prop", () => {
  render(<Input disabled error value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-disabled)",
  );
});

test("should apply `readOnly` prop border precedence over `error` prop", () => {
  render(<Input readOnly error value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-read-only)",
  );
});

test("should apply disabled background colour when `disabled` prop is true", () => {
  render(<Input disabled value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "background",
    "var(--input-typical-bg-disabled)",
  );
});

test("should apply readOnly background colour when `readOnly` prop is true", () => {
  render(<Input readOnly value="" onChange={() => {}} />);

  const inputContainer = screen.getByTestId("input-container");
  expect(inputContainer).toHaveStyleRule(
    "background",
    "var(--input-typical-bg-read-only)",
  );
});

test("should apply disabled text colour when `disabled` prop is true", () => {
  render(<Input disabled value="text" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveStyle("color: var(--input-typical-txt-disabled)");
});

test("should apply readOnly text colour when `readOnly` prop is true", () => {
  render(<Input readOnly value="text" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveStyle("color: var(--input-typical-txt-read-only)");
});

test.each([
  ["small", "var(--global-font-static-body-regular-m)"],
  ["medium", "var(--global-font-static-body-regular-m)"],
  ["large", "var(--global-font-static-body-regular-l)"],
] as const)(
  "should apply %s `size` prop font size to input",
  (size, expectedFontSize) => {
    render(<Input size={size} value="text" onChange={() => {}} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveStyle(`font-size: ${expectedFontSize}`);
  },
);

test.each([
  ["small", "0 var(--global-space-comp-s)"],
  ["medium", "0 var(--global-space-comp-m)"],
  ["large", "0 var(--global-space-comp-l)"],
] as const)(
  "should apply %s `size` prop padding to input text container",
  (size, expectedPadding) => {
    render(<Input size={size} value="" onChange={() => {}} />);

    const inputTextContainer = screen.getByTestId("input-text-container");
    expect(inputTextContainer).toHaveStyle(`padding: ${expectedPadding}`);
  },
);

test.each([
  ["small", "var(--global-space-comp-xs)"],
  ["medium", "var(--global-space-comp-s)"],
  ["large", "var(--global-space-comp-m)"],
] as const)(
  "should apply %s `size` prop gap to input text container",
  (size, expectedGap) => {
    render(<Input size={size} value="" onChange={() => {}} />);

    const inputTextContainer = screen.getByTestId("input-text-container");
    expect(inputTextContainer).toHaveStyle(`gap: ${expectedGap}`);
  },
);

test("should render with icon when `inputIcon` prop is provided", () => {
  render(<Input inputIcon="bin" value="" onChange={() => {}} />);

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveAttribute("type", "bin");
});
