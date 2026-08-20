import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OptionTile, OptionTileGroup } from ".";

const ControlledMultipleTile = ({
  label = "Enable option",
  disabled,
  onChange,
}: {
  label?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <OptionTile
      variant="multiple"
      label={label}
      disabled={disabled}
      checked={checked}
      onChange={(next) => {
        setChecked(next);
        onChange?.(next);
      }}
    />
  );
};

const ControlledCustomTile = ({
  disabled,
  onCustomActiveChange,
  onCustomValueChange,
}: {
  disabled?: boolean;
  onCustomActiveChange?: (isActive: boolean) => void;
  onCustomValueChange?: (value: string) => void;
}) => {
  const [customValue, setCustomValue] = useState("");

  return (
    <OptionTile
      variant="custom"
      title="Something else"
      inputAriaLabel="Custom option value"
      inputPlaceholder="Type a custom value"
      disabled={disabled}
      customValue={customValue}
      onCustomValueChange={(next) => {
        setCustomValue(next);
        onCustomValueChange?.(next);
      }}
      onCustomActiveChange={onCustomActiveChange}
    />
  );
};

test("renders single variant as a button with number and title", () => {
  render(
    <OptionTile
      variant="single"
      number={1}
      title="Select this option"
      data-role="single-tile"
    />,
  );

  const button = screen.getByRole("button", { name: /Select this option/i });

  expect(button).toBeVisible();
  expect(screen.getByText("1")).toBeVisible();
  expect(button).toHaveAttribute("data-role", "single-tile");
});

test("calls onClick for single variant", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <OptionTile
      variant="single"
      number={2}
      title="Proceed"
      onClick={onClick}
    />,
  );

  await user.click(screen.getByRole("button", { name: /Proceed/i }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("toggles multiple selection through click and Space", async () => {
  const user = userEvent.setup();
  render(<ControlledMultipleTile />);

  const tile = screen.getByRole("checkbox", { name: "Enable option" });

  expect(tile).not.toBeChecked();

  await user.click(tile);

  expect(tile).toBeChecked();

  await user.keyboard(" ");

  expect(tile).not.toBeChecked();
});

test("toggles multiple selection with Enter and ignores other keys", async () => {
  const user = userEvent.setup();
  render(<ControlledMultipleTile />);

  const tile = screen.getByRole("checkbox", { name: "Enable option" });

  await user.tab();

  expect(tile).toHaveFocus();

  await user.keyboard("{Enter}");

  expect(tile).toBeChecked();

  await user.keyboard("a");

  expect(tile).toBeChecked();
});

test("marks checkbox decoration as hidden from accessibility tree", () => {
  render(
    <OptionTile
      variant="multiple"
      label="Decorative icon check"
      checked
      onChange={() => {}}
    />,
  );

  const tile = screen.getByRole("checkbox", { name: "Decorative icon check" });

  expect(tile).toBeVisible();
  expect(tile).toHaveAttribute("tabindex", "0");
  expect(screen.getAllByRole("checkbox", { hidden: true })).toHaveLength(1);
  expect(tile.querySelector('[data-role="option-tile-checkbox"]')).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

test("does not toggle a disabled multiple tile", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <ControlledMultipleTile
      label="Disabled option"
      disabled
      onChange={onChange}
    />,
  );

  const tile = screen.getByRole("checkbox", { name: "Disabled option" });

  expect(tile).not.toHaveAttribute("tabindex");
  expect(tile).toHaveAttribute("aria-disabled", "true");

  await user.click(tile);

  expect(onChange).not.toHaveBeenCalled();
  expect(tile).not.toBeChecked();
});

test("renders a decorative pencil icon on the custom variant", () => {
  render(<ControlledCustomTile />);

  expect(screen.getByRole("button", { name: "Something else" })).toBeVisible();

  const icon = screen.getByTestId("option-tile-icon");

  expect(icon).toHaveAttribute("type", "edit");
  expect(icon).toHaveAttribute("aria-hidden", "true");
});

test("custom variant activates on Enter, focuses input, and deactivates on Escape", async () => {
  const user = userEvent.setup();
  render(<ControlledCustomTile />);

  await user.tab();
  await user.keyboard("{Enter}");

  const input = screen.getByRole("textbox", { name: "Custom option value" });

  expect(input).toHaveFocus();

  await user.keyboard("{Escape}");

  expect(screen.getByRole("button", { name: "Something else" })).toBeVisible();
});

test("custom variant deactivates when focus moves outside", async () => {
  const user = userEvent.setup();
  render(
    <>
      <ControlledCustomTile />
      <button type="button">Outside</button>
    </>,
  );

  await user.click(screen.getByRole("button", { name: "Something else" }));

  expect(
    screen.getByRole("textbox", { name: "Custom option value" }),
  ).toHaveFocus();

  await user.click(screen.getByRole("button", { name: "Outside" }));

  expect(screen.getByRole("button", { name: "Something else" })).toBeVisible();
});

test("updates the custom input value as the user types", async () => {
  const user = userEvent.setup();
  const onCustomValueChange = jest.fn();

  render(<ControlledCustomTile onCustomValueChange={onCustomValueChange} />);

  await user.click(screen.getByRole("button", { name: "Something else" }));

  const input = screen.getByRole("textbox", { name: "Custom option value" });

  await user.type(input, "abc");

  expect(onCustomValueChange).toHaveBeenLastCalledWith("abc");
  expect(input).toHaveValue("abc");
});

test("calls onCustomActiveChange when the custom tile activates and deactivates", async () => {
  const user = userEvent.setup();
  const onCustomActiveChange = jest.fn();

  render(<ControlledCustomTile onCustomActiveChange={onCustomActiveChange} />);

  await user.click(screen.getByRole("button", { name: "Something else" }));

  expect(onCustomActiveChange).toHaveBeenCalledWith(true);

  await user.keyboard("{Escape}");

  expect(onCustomActiveChange).toHaveBeenCalledWith(false);
});

test("does not activate a disabled custom tile", async () => {
  const user = userEvent.setup();
  const onCustomActiveChange = jest.fn();

  render(
    <ControlledCustomTile
      disabled
      onCustomActiveChange={onCustomActiveChange}
    />,
  );

  const button = screen.getByRole("button", { name: "Something else" });

  expect(button).toBeDisabled();

  await user.click(button);

  expect(onCustomActiveChange).not.toHaveBeenCalled();
  expect(
    screen.queryByRole("textbox", { name: "Custom option value" }),
  ).not.toBeInTheDocument();
});

test("ignores keys other than Enter on the inactive custom tile", async () => {
  const user = userEvent.setup();
  render(<ControlledCustomTile />);

  await user.tab();
  await user.keyboard("a");

  expect(
    screen.queryByRole("textbox", { name: "Custom option value" }),
  ).not.toBeInTheDocument();
});

test("ignores keys other than Escape on the active custom tile", async () => {
  const user = userEvent.setup();
  render(<ControlledCustomTile />);

  await user.click(screen.getByRole("button", { name: "Something else" }));

  const input = screen.getByRole("textbox", { name: "Custom option value" });

  await user.keyboard("{ArrowLeft}");

  expect(input).toBeInTheDocument();
});

test("throws when the custom variant is used in a multiple selection group", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);

  expect(() =>
    render(
      <OptionTileGroup selectionType="multiple" aria-label="Options">
        <OptionTile
          variant="custom"
          title="Something else"
          inputAriaLabel="Custom option value"
          customValue=""
          onCustomValueChange={() => {}}
        />
      </OptionTileGroup>,
    ),
  ).toThrow(
    "OptionTile with variant='custom' can only be used within a single selection OptionTileGroup.",
  );

  consoleSpy.mockRestore();
});

test("selects a single tile in a group when its number key is pressed", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <OptionTileGroup selectionType="single" aria-label="Options">
      <OptionTile variant="single" number={1} title="First" />
      <OptionTile
        variant="single"
        number={2}
        title="Second"
        onClick={onClick}
      />
    </OptionTileGroup>,
  );

  await user.tab();
  await user.keyboard("2");

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("does not set a number hotkey when the number prop is not numeric", () => {
  render(
    <OptionTileGroup selectionType="single" aria-label="Options">
      <OptionTile variant="single" number="A" title="First" />
    </OptionTileGroup>,
  );

  expect(screen.getByRole("button", { name: /First/i })).not.toHaveAttribute(
    "data-option-tile-hotkey",
  );
});

test("ignores number keys in a multiple selection group", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <OptionTileGroup selectionType="multiple" aria-label="Options">
      <OptionTile
        variant="multiple"
        label="First"
        checked={false}
        onChange={onChange}
      />
    </OptionTileGroup>,
  );

  await user.tab();
  await user.keyboard("1");

  expect(onChange).not.toHaveBeenCalled();
});

test("ignores non-numeric keys and numbers without a matching tile", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <OptionTileGroup selectionType="single" aria-label="Options">
      <OptionTile variant="single" number={1} title="First" onClick={onClick} />
    </OptionTileGroup>,
  );

  await user.tab();
  await user.keyboard("a");
  await user.keyboard("9");

  expect(onClick).not.toHaveBeenCalled();
});

test.each([
  ["an input", <input aria-label="free text" key="input" />],
  ["a textarea", <textarea aria-label="free text" key="textarea" />],
])(
  "does not trigger a number hotkey while typing in %s inside the group",
  async (_, field) => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <OptionTileGroup selectionType="single" aria-label="Options">
        <OptionTile
          variant="single"
          number={1}
          title="First"
          onClick={onClick}
        />
        {field}
      </OptionTileGroup>,
    );

    await user.click(screen.getByLabelText("free text"));
    await user.keyboard("1");

    expect(onClick).not.toHaveBeenCalled();
  },
);

test("does not select a disabled tile through its number key", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <OptionTileGroup selectionType="single" aria-label="Options">
      <OptionTile variant="single" number={1} title="First" />
      <OptionTile
        variant="single"
        number={2}
        title="Second"
        disabled
        onClick={onClick}
      />
    </OptionTileGroup>,
  );

  await user.tab();
  await user.keyboard("2");

  expect(onClick).not.toHaveBeenCalled();
});

test("renders a group container for single selection type", () => {
  render(
    <OptionTileGroup
      selectionType="single"
      aria-label="Options"
      data-role="group"
    >
      <OptionTile variant="single" title="First" />
      <OptionTile variant="single" title="Second" />
    </OptionTileGroup>,
  );

  const group = screen.getByRole("group", { name: "Options" });

  expect(group).toBeVisible();
  expect(group).toHaveAttribute("data-role", "group");
  expect(group).toHaveAttribute("data-selection-type", "single");
});

test("renders a group container for multiple selection type", () => {
  render(
    <OptionTileGroup selectionType="multiple" aria-label="Options">
      <OptionTile
        variant="multiple"
        label="First"
        checked={false}
        onChange={() => {}}
      />
    </OptionTileGroup>,
  );

  expect(screen.getByRole("group", { name: "Options" })).toBeVisible();
});
