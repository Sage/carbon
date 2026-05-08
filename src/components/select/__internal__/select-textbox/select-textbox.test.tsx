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

test("does not focus the input when the disabled prop is true and user clicks on the SelectText component", async () => {
  const user = userEvent.setup();
  render(
    <ControlledSelectTextbox
      selectType="simple"
      label="Select Colour"
      disabled
    />,
  );

  await user.click(screen.getByTestId("select-text"));

  expect(
    screen.getByRole("combobox", { name: /Select Colour/i }),
  ).not.toHaveFocus();
});

test("focuses the input when the readOnly prop is true and user clicks on the SelectText component, but does not call onClick", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <ControlledSelectTextbox
      selectType="simple"
      label="Select Colour"
      readOnly
      onClick={onClick}
    />,
  );

  await user.click(screen.getByTestId("select-text"));

  expect(screen.getByRole("textbox", { name: /Select Colour/i })).toHaveFocus();
  expect(onClick).not.toHaveBeenCalled();
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

describe("when selectType is 'simple'", () => {
  it("applies correct styles when transparent", () => {
    render(
      <ControlledSelectTextbox
        transparent
        formattedValue="foo"
        selectType="simple"
      />,
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      textAlign: "right",
      fontWeight: "500",
    });
  });

  it("calls onClick callback when overlay is clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<ControlledSelectTextbox label="Textbox" onClick={onClick} />);

    await user.click(screen.getByText("Please Select..."));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("hides the combobox overlay from assistive technologies", () => {
    render(
      <ControlledSelectTextbox
        formattedValue="You can't see me"
        selectType="simple"
      />,
    );

    expect(screen.getByTestId("select-text")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("displays the placeholder text in an overlay when the combobox has no value", () => {
    render(
      <ControlledSelectTextbox placeholder="foobaz" selectType="simple" />,
    );

    expect(screen.getByRole("combobox")).not.toHaveTextContent("foobaz");
    expect(screen.getByText("foobaz")).toBeVisible();
  });

  it("renders formattedValue in an overlay instead of the combobox", () => {
    render(
      <ControlledSelectTextbox
        label="Textbox"
        formattedValue="foo"
        selectType="simple"
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Textbox" }),
    ).not.toHaveTextContent("foo");
    expect(screen.getByText("foo")).toBeVisible();
  });
});

describe.each(["filterable", "multi"] as const)(
  "when input is rendered as part of %s select",
  (selectType) => {
    it("does not render the `select-text` overlay", () => {
      render(
        <ControlledSelectTextbox
          formattedValue="foo"
          selectType={selectType}
        />,
      );

      expect(screen.queryByTestId("select-text")).not.toBeInTheDocument();
    });

    it("combobox has placeholder text when it has no value", () => {
      render(<ControlledSelectTextbox selectType={selectType} />);

      expect(screen.getByRole("combobox")).toHaveAttribute(
        "placeholder",
        "Please Select...",
      );
    });

    it("combobox has custom placeholder text when it has no value and a custom placeholder is provided", () => {
      render(
        <ControlledSelectTextbox
          selectType={selectType}
          placeholder="foobar"
        />,
      );

      expect(screen.getByRole("combobox")).toHaveAttribute(
        "placeholder",
        "foobar",
      );
    });

    it("renders combobox without autocomplete", () => {
      render(<ControlledSelectTextbox label="Textbox" />);

      const combobox = screen.getByRole("combobox", { name: "Textbox" });
      expect(combobox).toHaveAttribute("autocomplete", "off");
    });

    it("calls onClick callback when input is clicked", async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(<ControlledSelectTextbox label="Textbox" onClick={onClick} />);

      await user.click(screen.getByText("Please Select..."));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  },
);
