import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectTextbox from ".";

test("renders as a combobox", () => {
  render(<SelectTextbox label="Select Colour" />);

  expect(
    screen.getByRole("combobox", { name: /Select Colour/i }),
  ).toBeVisible();
});

test("renders as a readonly textbox if readOnly prop is true", () => {
  render(<SelectTextbox label="Select Colour" readOnly />);

  const input = screen.getByRole("textbox", { name: /Select Colour/i });
  expect(input).toBeVisible();
  expect(input).toHaveAttribute("readonly");
});

test("renders as a disabled combobox if disabled prop is true", () => {
  render(<SelectTextbox label="Select Colour" disabled />);

  const input = screen.getByRole("combobox", { name: /Select Colour/i });
  expect(input).toBeVisible();
  expect(input).toBeDisabled();
});

test("combobox has correct accessible name when ariaLabel prop is provided", () => {
  render(<SelectTextbox ariaLabel="Label" />);

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("combobox has correct accessible name when ariaLabelledBy prop is provided", () => {
  render(
    <>
      <h3 id="label">Label</h3>
      <SelectTextbox ariaLabelledby="label" />
    </>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("combobox has correct accessible name when accessibilityLabelId prop is provided", () => {
  render(
    <>
      <h3 id="label">Label</h3>
      <SelectTextbox accessibilityLabelId="label" />
    </>,
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("renders dropdown icon", () => {
  render(<SelectTextbox />);

  expect(screen.getByTestId("icon")).toHaveAttribute("type", "dropdown");
});

test("calls onFocus callback when combobox is focused", () => {
  const onFocus = jest.fn();
  render(<SelectTextbox label="Textbox" onFocus={onFocus} />);

  screen.getByRole("combobox", { name: "Textbox" }).focus();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("does not call onFocus callback when combobox is disabled", () => {
  const onFocus = jest.fn();
  render(<SelectTextbox label="Textbox" onFocus={onFocus} disabled />);

  screen.getByRole("combobox", { name: "Textbox" }).focus();

  expect(onFocus).not.toHaveBeenCalled();
});

test("calls onBlur callback when combobox is blurred", () => {
  const onBlur = jest.fn();
  render(<SelectTextbox label="Textbox" onBlur={onBlur} />);

  const combobox = screen.getByRole("combobox", { name: "Textbox" });
  combobox.focus();
  combobox.blur();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("combobox has placeholder text when it has no value and hasTextCursor prop is true", () => {
  render(<SelectTextbox hasTextCursor />);

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select...",
  );
});

test("combobox has custom placeholder text when it has no value, hasTextCursor prop is true and a custom placeholder is provided", () => {
  render(<SelectTextbox hasTextCursor placeholder="foobar" />);

  expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "foobar");
});

test("does not call onFocus callback when textbox is read only", () => {
  const onFocus = jest.fn();
  render(<SelectTextbox label="Textbox" onFocus={onFocus} readOnly />);

  screen.getByRole("textbox", { name: "Textbox" }).focus();

  expect(onFocus).not.toHaveBeenCalled();
});

describe("when hasTextCursor prop is false", () => {
  it("renders formattedValue in an overlay instead of the combobox", () => {
    render(
      <SelectTextbox
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
    render(<SelectTextbox placeholder="foobaz" hasTextCursor={false} />);

    expect(screen.getByRole("combobox")).not.toHaveTextContent("foobaz");
    expect(screen.getByText("foobaz")).toBeVisible();
  });

  it("renders combobox without autocomplete", () => {
    render(<SelectTextbox label="Textbox" />);

    const combobox = screen.getByRole("combobox", { name: "Textbox" });
    expect(combobox).toHaveAttribute("autocomplete", "off");
  });

  it("hides the combobox overlay from assistive technologies", () => {
    render(
      <SelectTextbox formattedValue="You can't see me" hasTextCursor={false} />,
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
      <SelectTextbox label="Textbox" onClick={onClick} hasTextCursor={false} />,
    );

    await user.click(screen.getByText("Please Select..."));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("truncates the displayed text of the selected option with ellipsis", () => {
    render(<SelectTextbox formattedValue="foo" hasTextCursor={false} />);

    expect(screen.getByText("foo")).toHaveStyle({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
  });

  it("applies correct styles when disabled", () => {
    render(
      <SelectTextbox disabled formattedValue="foo" hasTextCursor={false} />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "not-allowed",
      color: "var(--colorsUtilityYin030)",
      textShadow: "none",
    });
  });

  it("applies correct styles when read-only", () => {
    render(
      <SelectTextbox readOnly formattedValue="foo" hasTextCursor={false} />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "default",
      color: "var(--colorsUtilityYin065)",
      textShadow: "none",
    });
  });

  it("applies correct styles when transparent", () => {
    render(
      <SelectTextbox transparent formattedValue="foo" hasTextCursor={false} />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      textAlign: "right",
      fontWeight: "500",
    });
  });
});
