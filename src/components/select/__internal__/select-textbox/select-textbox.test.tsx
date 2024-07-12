import React from "react";
import { render, screen } from "@testing-library/react";
import SelectTextbox from ".";

test("renders combobox", () => {
  render(<SelectTextbox label="Select Colour" onChange={() => {}} />);

  expect(
    screen.getByRole("combobox", { name: /Select Colour/i })
  ).toBeVisible();
});

test("combobox has correct accessible name when ariaLabel prop is provided", () => {
  render(<SelectTextbox onChange={() => {}} ariaLabel="Label" />);

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("combobox has correct accessible name when ariaLabelledBy prop is provided", () => {
  render(
    <>
      <h3 id="label">Label</h3>
      <SelectTextbox onChange={() => {}} ariaLabelledby="label" />
    </>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("combobox has correct accessible name when accessibilityLabelId prop is provided", () => {
  render(
    <>
      <h3 id="label">Label</h3>
      <SelectTextbox onChange={() => {}} accessibilityLabelId="label" />
    </>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Label");
});

test("renders dropdown icon", () => {
  render(<SelectTextbox onChange={() => {}} />);

  expect(screen.getByTestId("icon")).toHaveAttribute("type", "dropdown");
});

test("calls onFocus callback when combobox is focused", () => {
  const onFocus = jest.fn();
  render(
    <SelectTextbox label="Textbox" onChange={() => {}} onFocus={onFocus} />
  );

  screen.getByRole("combobox", { name: "Textbox" }).focus();

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("calls onBlur callback when combobox is blurred", () => {
  const onBlur = jest.fn();
  render(<SelectTextbox label="Textbox" onChange={() => {}} onBlur={onBlur} />);

  const combobox = screen.getByRole("combobox", { name: "Textbox" });
  combobox.focus();
  combobox.blur();

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("combobox has placeholder text when it has no value and hasTextCursor prop is true", () => {
  render(<SelectTextbox onChange={() => {}} hasTextCursor />);

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select..."
  );
});

test("combobox has custom placeholder text when it has no value, hasTextCursor prop is true and a custom placeholder is provided", () => {
  render(
    <SelectTextbox onChange={() => {}} hasTextCursor placeholder="foobar" />
  );

  expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "foobar");
});

describe("when hasTextCursor prop is false", () => {
  it("renders formattedValue in an overlay instead of the combobox", () => {
    render(
      <SelectTextbox
        label="Textbox"
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(
      screen.getByRole("combobox", { name: "Textbox" })
    ).not.toHaveTextContent("foo");
    expect(screen.getByText("foo")).toBeInTheDocument();
  });

  it("displays the placeholder text in an overlay when the combobox has no value", () => {
    render(
      <SelectTextbox
        placeholder="foobaz"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("combobox")).not.toHaveTextContent("foobaz");
    expect(screen.getByText("foobaz")).toBeInTheDocument();
  });

  it("renders combobox without autocomplete", () => {
    render(<SelectTextbox label="Textbox" onChange={() => {}} />);

    const combobox = screen.getByRole("combobox", { name: "Textbox" });
    expect(combobox).toHaveAttribute("autocomplete", "off");
  });

  it("hides the combobox overlay from assistive technologies", () => {
    render(
      <SelectTextbox
        formattedValue="You can't see me"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("truncates the displayed text of the selected option with ellipsis", () => {
    render(
      <SelectTextbox
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("foo")).toHaveStyle({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
  });

  it("applies correct styles when disabled", () => {
    render(
      <SelectTextbox
        disabled
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "not-allowed",
      color: "var(--colorsUtilityYin030)",
      textShadow: "none",
    });
  });

  it("applies correct styles when read-only", () => {
    render(
      <SelectTextbox
        readOnly
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "default",
      color: "var(--colorsUtilityYin065)",
      textShadow: "none",
    });
  });

  it("applies correct styles when transparent", () => {
    render(
      <SelectTextbox
        transparent
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      textAlign: "right",
      fontWeight: "900",
    });
  });
});
