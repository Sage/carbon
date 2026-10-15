import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NextSelectList, { NextSelectListProps } from ".";
import ActionOption from "../../../action-option";
import Option from "../../../option";
import OptionGroupHeader from "../../../option-group-header";

const renderSelectList = ({
  children,
  onSelect = () => {},
  onClose = () => {},
  ...props
}: Partial<NextSelectListProps> = {}) =>
  render(
    <NextSelectList
      open
      onSelect={onSelect}
      onClose={onClose}
      popoverControl={(ref, controlProps) => (
        <input aria-label="Select options" ref={ref} {...controlProps} />
      )}
      {...props}
    >
      {children}
    </NextSelectList>,
  );

test("positions the list against the viewport rather than an overflowing parent", async () => {
  renderSelectList({
    children: <Option text="Amber" value="amber" />,
  });

  const menuWrapper = screen.getByTestId("menu-wrapper");
  await waitFor(() =>
    expect(menuWrapper).toHaveAttribute("data-floating-placement", "bottom"),
  );
  expect(menuWrapper).toHaveAttribute("data-element", "select-list-wrapper");
  expect(menuWrapper).toHaveStyle({ position: "fixed" });
  expect(screen.getByTestId("select-list-popover-menu")).toHaveStyleRule(
    "z-index",
    "var(--carbon-zindex-popover)",
    { modifier: '& [data-element="select-list-wrapper"]' },
  );
  const listbox = screen.getByRole("listbox");
  expect(listbox).toHaveAttribute("tabindex", "-1");
  expect(listbox).toHaveStyleRule(
    "max-height",
    "calc(5.5 * var(--global-size-m))",
  );
});

test("closes when focus leaves the select control", () => {
  const onClose = jest.fn();
  renderSelectList({
    onClose,
    children: <Option text="Amber" value="amber" />,
  });

  const input = screen.getByRole("combobox", { name: "Select options" });
  input.focus();
  document.body.focus();
  input.blur();

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("calls `onListScrollBottom` only when the list reaches the bottom", () => {
  const onListScrollBottom = jest.fn();
  renderSelectList({
    onListScrollBottom,
    children: <Option text="Amber" value="amber" />,
  });

  const listbox = screen.getByRole("listbox");
  Object.defineProperties(listbox, {
    clientHeight: { configurable: true, value: 100 },
    scrollHeight: { configurable: true, value: 300 },
    scrollTop: { configurable: true, writable: true, value: 100 },
  });

  fireEvent.scroll(listbox);
  expect(onListScrollBottom).not.toHaveBeenCalled();

  listbox.scrollTop = 200;
  fireEvent.scroll(listbox);
  expect(onListScrollBottom).toHaveBeenCalledTimes(1);
});

test("renders a selected option with its leading content, prefix, subtext and divider", () => {
  renderSelectList({
    selectedValue: "amber",
    children: (
      <Option
        id="amber"
        text="Amber"
        value="amber"
        leading={<span>Colour</span>}
        prefix="Warm"
        subtext="A yellow-orange colour"
        divider
      />
    ),
  });

  expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
  expect(screen.getByText("Colour")).toBeVisible();
  expect(screen.getByText("A yellow-orange colour")).toBeVisible();
  expect(screen.getByTestId("divider")).toBeVisible();
});

test("forwards supported Option attributes without overriding listbox semantics", () => {
  renderSelectList({
    selectedValue: "amber",
    children: (
      <Option
        aria-describedby="amber-description"
        aria-label="Custom amber label"
        className="consumer-option"
        data-element="custom-option"
        data-role="colour-option"
        role="presentation"
        style={{ color: "red" }}
        text="Amber"
        title="Warm colour"
        value="amber"
      />
    ),
  });

  const option = screen.getByRole("option", { name: "Custom amber label" });
  expect(option).toHaveAttribute("aria-selected", "true");
  expect(option).toHaveClass("consumer-option");
  expect(option).toHaveAttribute("data-element", "custom-option");
  expect(option).toHaveAttribute("data-role", "colour-option");
  expect(option).toHaveAttribute("aria-describedby", "amber-description");
  expect(option).toHaveAttribute("title", "Warm colour");
  expect(option).toHaveStyle({ color: "rgb(255, 0, 0)" });
});

test("preserves Option keys when object-valued options are reordered", () => {
  const renderOptions = (reversed = false) => {
    const options = [
      <Option key="amber" text="Amber" value={{ colour: "amber" }} />,
      <Option key="blue" text="Blue" value={{ colour: "blue" }} />,
    ];

    return reversed ? options.reverse() : options;
  };

  const { rerender } = renderSelectList({ children: renderOptions() });
  const amberId = screen.getByRole("option", { name: "Amber" }).id;
  const blueId = screen.getByRole("option", { name: "Blue" }).id;

  rerender(
    <NextSelectList
      open
      onSelect={() => {}}
      onClose={() => {}}
      popoverControl={(ref, controlProps) => (
        <input aria-label="Select options" ref={ref} {...controlProps} />
      )}
    >
      {renderOptions(true)}
    </NextSelectList>,
  );

  expect(screen.getByRole("option", { name: "Amber" })).toHaveAttribute(
    "id",
    amberId,
  );
  expect(screen.getByRole("option", { name: "Blue" })).toHaveAttribute(
    "id",
    blueId,
  );
});

test("gives object-valued options and dividers distinct nested-array identities", () => {
  renderSelectList({
    children: [
      [
        <Option
          key="colour"
          text="Amber"
          value={{ colour: "amber" }}
          divider
        />,
        <Option text="Blue" value={{ colour: "blue" }} divider />,
      ],
      [
        <Option
          key="colour"
          text="Green"
          value={{ colour: "green" }}
          divider
        />,
        <Option text="Red" value={{ colour: "red" }} divider />,
      ],
    ],
  });

  const optionIds = screen.getAllByRole("option").map(({ id }) => id);

  expect(new Set(optionIds).size).toBe(optionIds.length);
  expect(screen.getAllByTestId("divider")).toHaveLength(4);
});

test("builds virtual rows for grouped options and options with dividers", () => {
  renderSelectList({
    enableVirtualScroll: true,
    children: [
      <Option key="ungrouped" text="Ungrouped" value="ungrouped" divider />,
      <OptionGroupHeader
        key="group"
        id="group"
        label="Grouped options"
        data-element="group-heading"
        data-role="group-heading"
        style={{ color: "red" }}
      />,
      <Option key="first" text="First grouped option" value="first" />,
      <Option key="second" text="Second grouped option" value="second" />,
    ],
  });

  expect(screen.getByTestId("virtual-scroll-spacer")).toBeInTheDocument();
});

test("renders an unkeyed informational Option", () => {
  renderSelectList({ children: <Option text="Informational" /> });

  expect(screen.getByRole("option", { name: "Informational" })).toBeVisible();
});

test.each([
  {
    children: (
      <OptionGroupHeader id="warm-colours">Custom heading</OptionGroupHeader>
    ),
    expectedText: "Custom heading",
  },
  {
    children: <OptionGroupHeader label="Cool colours" />,
    expectedText: "Cool colours",
  },
])(
  "renders an unkeyed OptionGroupHeader with $expectedText",
  ({ children, expectedText }) => {
    renderSelectList({ children });

    expect(screen.getByText(expectedText)).toBeVisible();
  },
);

test("passes selected option data to `onSelect` and `onClose`", async () => {
  const user = userEvent.setup();
  const onSelect = jest.fn();
  const onClose = jest.fn();
  renderSelectList({
    onSelect,
    onClose,
    children: <Option id="amber" text="Amber" value="amber" />,
  });

  await user.click(screen.getByRole("option", { name: "Amber" }));

  expect(onSelect).toHaveBeenCalledWith({
    id: "amber",
    text: "Amber",
    value: "amber",
  });
  expect(onClose).toHaveBeenCalledWith(undefined, "amber");
});

test("calls an ActionOption's `onClick` and closes without selecting it", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  const onSelect = jest.fn();
  const onClose = jest.fn();
  renderSelectList({
    onSelect,
    onClose,
    children: (
      <ActionOption text="Add an option" value="add" onClick={onClick} />
    ),
  });

  const action = screen.getByRole("option", { name: "Add an option" });
  expect(action).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-default)",
  );

  await user.click(action);

  expect(onClick).toHaveBeenCalledWith("add");
  expect(onSelect).not.toHaveBeenCalled();
  expect(onClose).toHaveBeenCalledWith(undefined, "add");
});

test.each([
  { value: "custom", closeValue: "custom", valueType: "string" },
  {
    value: { action: "custom" },
    closeValue: undefined,
    valueType: "object",
  },
])(
  "calls an ordinary Option's `onClick` with its $valueType value and closes without selecting it",
  async ({ value, closeValue }) => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const onSelect = jest.fn();
    const onClose = jest.fn();
    renderSelectList({
      onSelect,
      onClose,
      children: <Option text="Custom option" value={value} onClick={onClick} />,
    });

    const option = screen.getByRole("option", { name: "Custom option" });
    expect(option).not.toHaveStyleRule(
      "background-color",
      "var(--button-typical-secondary-bg-default)",
    );

    await user.click(option);

    expect(onClick).toHaveBeenCalledWith(value);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledWith(undefined, closeValue);
  },
);

test("treats an ActionOption without `onClick` as a selectable Option", async () => {
  const user = userEvent.setup();
  const onSelect = jest.fn();
  renderSelectList({
    onSelect,
    children: <ActionOption text="Add an option" value="add" />,
  });

  await user.click(screen.getByRole("option", { name: "Add an option" }));

  expect(onSelect).toHaveBeenCalledWith({
    id: undefined,
    text: "Add an option",
    value: "add",
  });
});

test("passes an object-valued ActionOption value to `onClick`", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  const onClose = jest.fn();
  const value = { action: "add" };
  renderSelectList({
    onClose,
    children: (
      <ActionOption text="Add an option" value={value} onClick={onClick} />
    ),
  });

  await user.click(screen.getByRole("option", { name: "Add an option" }));

  expect(onClick).toHaveBeenCalledWith(value);
  expect(onClose).toHaveBeenCalledWith(undefined, undefined);
});

test("does not select disabled options or options without a value", async () => {
  const user = userEvent.setup();
  const onSelect = jest.fn();
  renderSelectList({
    onSelect,
    children: [
      <Option key="disabled" text="Disabled" value="disabled" disabled />,
      <Option key="informational" text="Informational" />,
    ],
  });

  await user.click(screen.getByRole("option", { name: "Disabled" }));
  await user.click(screen.getByRole("option", { name: "Informational" }));

  expect(onSelect).not.toHaveBeenCalled();
});

test("closes without a value when an object-valued option is selected", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  const optionValue = { id: "amber" };
  renderSelectList({
    onClose,
    children: <Option text="Amber" value={optionValue} divider />,
  });

  await user.click(screen.getByRole("option", { name: "Amber" }));

  expect(onClose).toHaveBeenCalledWith(undefined, undefined);
});

test("groups options below an option group header", () => {
  renderSelectList({
    children: [
      <OptionGroupHeader key="warm" label="Warm colours" />,
      <Option
        key="amber"
        aria-describedby="amber-description"
        text="Amber"
        value="amber"
      />,
      <Option key="blue" text="Blue" value="blue" />,
    ],
  });

  const group = screen.getByRole("group", { name: "Warm colours" });
  const amber = screen.getByRole("option", { name: "Amber" });
  const blue = screen.getByRole("option", { name: "Blue" });

  expect(group).toContainElement(amber);
  expect(group).toContainElement(blue);
  expect(amber).toHaveAttribute(
    "aria-describedby",
    `amber-description ${group.getAttribute("aria-labelledby")}`,
  );
  expect(screen.getAllByRole("option")).toHaveLength(2);
});

test("renders a small option group header with an icon", () => {
  renderSelectList({
    size: "small",
    children: [
      <OptionGroupHeader key="warm" label="Warm colours" icon="home" />,
      <Option key="amber" text="Amber" value="amber" />,
    ],
  });

  expect(screen.getByRole("group", { name: "Warm colours" })).toBeVisible();
  expect(screen.getByTestId("text-with-icon")).toHaveStyleRule(
    "gap",
    "var(--global-space-comp-2-xs)",
  );
});

test("forwards custom group header content and attributes while ignoring non-option children", () => {
  renderSelectList({
    children: [
      <OptionGroupHeader
        key="group"
        id="custom"
        icon="home"
        data-element="custom-heading"
        data-role="colour-heading"
        style={{ color: "red" }}
      >
        Custom colours
      </OptionGroupHeader>,
      <Option key="amber" text="Amber" value="amber" />,
      "Ignored content",
    ],
  });

  const group = screen.getByRole("group", { name: "Custom colours" });
  expect(group).toHaveAttribute("id", "custom");
  expect(group).toHaveAttribute("data-element", "custom-heading");
  expect(group).toHaveAttribute("data-role", "colour-heading");
  expect(group).toHaveStyle({ color: "rgb(255, 0, 0)" });
  expect(screen.getByRole("option", { name: "Amber" })).toBeVisible();
});

test("renders a loader alongside available options", () => {
  renderSelectList({
    isLoading: true,
    size: "large",
    children: <Option text="Amber" value="amber" />,
  });

  expect(screen.getByRole("option", { name: "Amber" })).toBeVisible();
  expect(screen.getByTestId("select-list-loader")).toBeVisible();
});
