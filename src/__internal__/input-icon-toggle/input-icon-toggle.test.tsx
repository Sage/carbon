import React from "react";
import { render, screen, createEvent, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/react-dom";
import InputIconToggle, { InputIconToggleProps } from ".";

test.each(["error", "warning", "info"])(
  "renders only a validation icon when the validation prop is set to %s as a string and `useValidationIcon` is true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "Message",
          useValidationIcon: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.getByTestId(`icon-${validationProp}`);
    const icon = screen.queryByTestId("icon");
    expect(validationIcon).toBeVisible();
    expect(icon).not.toBeInTheDocument();
  },
);

test.each([
  ["left", "right"],
  ["right", "left"],
] as [InputIconToggleProps["align"], string][])(
  "when the align prop is passed as %s, the floating UI tooltip position should be set as %s",
  (tooltipAlign, tooltipPosition) => {
    const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");

    render(
      <InputIconToggle align={tooltipAlign} useValidationIcon error="error" />,
    );

    expect(useFloatingSpy).toHaveBeenCalledWith(
      expect.objectContaining({ placement: tooltipPosition }),
    );

    useFloatingSpy.mockRestore();
  },
);

test.each(["error", "warning", "info"])(
  "renders only a validation icon when the validation prop is set to %s as a string and both `useValidationIcon` and `readOnly` props are true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "Message",
          useValidationIcon: true,
          readOnly: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.getByTestId(`icon-${validationProp}`);
    const icon = screen.queryByTestId("icon");
    expect(validationIcon).toBeVisible();
    expect(icon).not.toBeInTheDocument();
  },
);

test.each(["error", "warning", "info"])(
  "renders only an input icon when the validation prop is set to %s as a string and both `useValidationIcon` and `disabled` props are true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "Message",
          useValidationIcon: true,
          disabled: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each(["error", "warning", "info"])(
  "renders only an input icon when the validation prop is set to %s as an empty string and `useValidationIcon` is true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "",
          useValidationIcon: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each(["error", "warning", "info"])(
  "renders only an input icon when the validation prop is set to %s as a boolean and `useValidationIcon` is true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: true,
          useValidationIcon: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each(["error", "warning", "info"])(
  "renders only an input icon when the validation prop is set to %s as a string and `useValidationIcon` is false",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "Message",
          useValidationIcon: false,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each(["error", "warning", "info"])(
  "renders an input icon, when the %s prop is null and `useValidationIcon` is true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: null,
          useValidationIcon: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each(["error", "warning", "info"])(
  "renders an input icon, when the %s prop is undefined and `useValidationIcon` is true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: undefined,
          useValidationIcon: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test("renders an input icon, when `disabled` prop is true, and no validation prop nor `useValidationIcon` is set", () => {
  render(<InputIconToggle disabled inputIcon="settings" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "settings");
});

test("renders only an input icon when the `readOnly` prop is true and no `validationProp` or `useValidationIcon` is set", () => {
  render(<InputIconToggle readOnly inputIcon="settings" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "settings");
});

test("renders only an input icon when both `readOnly` and `disabled` props are true and `useValidationIcon` is false", () => {
  render(
    <InputIconToggle
      readOnly
      disabled
      inputIcon="settings"
      useValidationIcon={false}
    />,
  );

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "settings");
});

test.each(["error", "warning", "info"])(
  "renders only an input icon when both `readOnly` and `disabled` props are true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "Message",
          useValidationIcon: true,
          readOnly: true,
          disabled: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each(["error", "warning", "info"])(
  "renders only an input icon when `useValidationIcon`, `readOnly`, and `disabled` props are true",
  (validationProp) => {
    render(
      <InputIconToggle
        {...{
          [validationProp]: "Message",
          useValidationIcon: true,
          readOnly: true,
          disabled: true,
          inputIcon: "settings",
        }}
      />,
    );

    const validationIcon = screen.queryByTestId(`icon-${validationProp}`);
    const icon = screen.getByTestId("icon");
    expect(validationIcon).not.toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "settings");
  },
);

test.each([
  ["Enter", "Enter"],
  ["Space", " "],
])(
  "prevents default action when pressing `%s` and `onClick` is set",
  async (keyname, key) => {
    render(<InputIconToggle inputIcon="settings" onClick={() => {}} />);

    const icon = screen.getByTestId("icon");
    const keydownEvent = createEvent.keyDown(icon, { key });

    fireEvent(icon, keydownEvent);

    expect(keydownEvent.defaultPrevented).toBeTruthy();
  },
);

test.each([
  ["Enter", "Enter"],
  ["Space", " "],
])(
  "does not prevent default action when pressing `%s` and `onClick` is not set",
  (keyname, key) => {
    render(<InputIconToggle inputIcon="settings" />);

    const icon = screen.getByTestId("icon");
    const keydownEvent = createEvent.keyDown(icon, { key });

    fireEvent(icon, keydownEvent);

    expect(keydownEvent.defaultPrevented).toBeFalsy();
  },
);

test("calls `onFocus` handler when the validation icon is focused", async () => {
  const mockOnFocus = jest.fn();
  render(
    <InputIconToggle error="error" onFocus={mockOnFocus} useValidationIcon />,
  );

  const validationIcon = screen.getByTestId("icon-error");
  validationIcon.focus();

  expect(mockOnFocus).toHaveBeenCalled();
});

test("calls `onBlur` handler when the validation icon loses focus", async () => {
  const mockOnBlur = jest.fn();
  render(
    <InputIconToggle error="error" onBlur={mockOnBlur} useValidationIcon />,
  );

  const validationIcon = screen.getByTestId("icon-error");
  const user = userEvent.setup();

  validationIcon.focus();
  await user.tab();

  expect(mockOnBlur).toHaveBeenCalled();
});

test("passes `validationIconId` to the tooltip when hovering over the validation icon", async () => {
  const validationIconId = "validation-id";

  render(
    <InputIconToggle
      error="Error"
      validationIconId={validationIconId}
      useValidationIcon
    />,
  );

  const user = userEvent.setup();
  const validationIcon = screen.getByTestId("icon-error");

  await user.hover(validationIcon);
  const tooltip = screen.getByRole("tooltip");

  expect(tooltip).toHaveAttribute("id", validationIconId);
});

test("renders no icons when `useValidationIcon`, `inputIcon`, and `validationProp` are all undefined", () => {
  render(<InputIconToggle />);

  const anyIcon = screen.queryByTestId(/^icon/);
  expect(anyIcon).not.toBeInTheDocument();
});
