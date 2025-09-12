import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectTextbox, { SelectTextboxProps } from ".";

const ControlledSelectTextbox = (
  props: Omit<SelectTextboxProps, "onChange" | "value">,
) => {
  const [value, setValue] = React.useState("");
  return (
    <SelectTextbox
      label="Select Colour"
      {...props}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

test("renders as a combobox", () => {
  render(<ControlledSelectTextbox label="Select Colour" />);

  expect(
    screen.getByRole("combobox", { name: /Select Colour/i }),
  ).toBeVisible();
});

test("renders as a readonly textbox if readOnly prop is true", () => {
  render(<ControlledSelectTextbox label="Select Colour" readOnly />);

  const input = screen.getByRole("textbox", { name: /Select Colour/i });
  expect(input).toBeVisible();
  expect(input).toHaveAttribute("readonly");
});

test("renders as a disabled combobox if disabled prop is true", () => {
  render(<ControlledSelectTextbox label="Select Colour" disabled />);

  const input = screen.getByRole("combobox", { name: /Select Colour/i });
  expect(input).toBeVisible();
  expect(input).toBeDisabled();
});

test("combobox has correct accessible name when ariaLabel prop is provided", () => {
  render(<ControlledSelectTextbox ariaLabel="Label" />);

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("combobox has correct accessible name when ariaLabelledBy prop is provided", () => {
  render(
    <>
      <h3 id="label">Label</h3>
      <ControlledSelectTextbox ariaLabelledby="label" />
    </>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("combobox has correct accessible name when accessibilityLabelId prop is provided", () => {
  render(
    <>
      <h3 id="label">Label</h3>
      <ControlledSelectTextbox accessibilityLabelId="label" />
    </>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("renders dropdown icon", () => {
  render(<ControlledSelectTextbox />);

  expect(screen.getByTestId("icon")).toHaveAttribute("type", "dropdown");
});

test("calls onFocus callback when combobox is focused", () => {
  const onFocus = jest.fn();
  render(<ControlledSelectTextbox label="Textbox" onFocus={onFocus} />);

  act(() => {
    screen.getByRole("combobox", { name: "Textbox" }).focus();
  });

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("does not call onFocus callback when combobox is disabled", () => {
  const onFocus = jest.fn();
  render(
    <ControlledSelectTextbox label="Textbox" onFocus={onFocus} disabled />,
  );

  screen.getByRole("combobox", { name: "Textbox" }).focus();

  expect(onFocus).not.toHaveBeenCalled();
});

test("calls onBlur callback when combobox is blurred", () => {
  const onBlur = jest.fn();
  render(<ControlledSelectTextbox label="Textbox" onBlur={onBlur} />);

  const combobox = screen.getByRole("combobox", { name: "Textbox" });
  act(() => {
    combobox.focus();
    combobox.blur();
  });

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("combobox has placeholder text when it has no value and hasTextCursor prop is true", () => {
  render(<ControlledSelectTextbox hasTextCursor />);

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select...",
  );
});

test("combobox has custom placeholder text when it has no value, hasTextCursor prop is true and a custom placeholder is provided", () => {
  render(<ControlledSelectTextbox hasTextCursor placeholder="foobar" />);

  expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "foobar");
});

test("does not call onFocus callback when textbox is read only", () => {
  const onFocus = jest.fn();
  render(
    <ControlledSelectTextbox label="Textbox" onFocus={onFocus} readOnly />,
  );

  act(() => {
    screen.getByRole("textbox", { name: "Textbox" }).focus();
  });

  expect(onFocus).not.toHaveBeenCalled();
});

describe("when hasTextCursor prop is false", () => {
  it("renders formattedValue in an overlay instead of the combobox", () => {
    render(
      <ControlledSelectTextbox
        label="Textbox"
        formattedValue="foo"
        hasTextCursor={false}
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Textbox" }),
    ).not.toHaveTextContent("foo");
    expect(screen.getByText("foo")).toBeVisible();
  });

  it("displays the placeholder text in an overlay when the combobox has no value", () => {
    render(
      <ControlledSelectTextbox placeholder="foobaz" hasTextCursor={false} />,
    );

    expect(screen.getByRole("combobox")).not.toHaveTextContent("foobaz");
    expect(screen.getByText("foobaz")).toBeVisible();
  });

  it("renders combobox without autocomplete", () => {
    render(<ControlledSelectTextbox label="Textbox" />);

    const combobox = screen.getByRole("combobox", { name: "Textbox" });
    expect(combobox).toHaveAttribute("autocomplete", "off");
  });

  it("hides the combobox overlay from assistive technologies", () => {
    render(
      <ControlledSelectTextbox
        formattedValue="You can't see me"
        hasTextCursor={false}
      />,
    );

    expect(screen.getByTestId("select-text")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("calls onClick callback when overlay is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <ControlledSelectTextbox
        label="Textbox"
        onClick={onClick}
        hasTextCursor={false}
      />,
    );

    await user.click(screen.getByText("Please Select..."));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("truncates the displayed text of the selected option with ellipsis", () => {
    render(
      <ControlledSelectTextbox formattedValue="foo" hasTextCursor={false} />,
    );

    expect(screen.getByText("foo")).toHaveStyle({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
  });

  it("applies correct styles when disabled", () => {
    render(
      <ControlledSelectTextbox
        disabled
        formattedValue="foo"
        hasTextCursor={false}
      />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "not-allowed",
      color: "var(--colorsUtilityYin030)",
      textShadow: "none",
    });
  });

  it("applies correct styles when read-only", () => {
    render(
      <ControlledSelectTextbox
        readOnly
        formattedValue="foo"
        hasTextCursor={false}
      />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "default",
      color: "var(--colorsUtilityYin065)",
      textShadow: "none",
    });
  });

  it("applies correct styles when transparent", () => {
    render(
      <ControlledSelectTextbox
        transparent
        formattedValue="foo"
        hasTextCursor={false}
      />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      textAlign: "right",
      fontWeight: "500",
    });
  });
});
