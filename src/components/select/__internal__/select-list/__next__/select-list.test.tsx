import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NextSelectList, { NextSelectListProps } from ".";
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

test("passes selected option data to onSelect and onClose", async () => {
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
      <Option key="amber" text="Amber" value="amber" />,
      <Option key="blue" text="Blue" value="blue" />,
    ],
  });

  expect(screen.getByText("Warm colours")).toBeVisible();
  expect(screen.getByRole("option", { name: "Amber" })).toBeVisible();
  expect(screen.getByRole("option", { name: "Blue" })).toBeVisible();
});

test("renders custom group header content with its icon and ignores non-option children", () => {
  renderSelectList({
    children: [
      <OptionGroupHeader key="group" id="custom" icon="home">
        Custom colours
      </OptionGroupHeader>,
      <Option key="amber" text="Amber" value="amber" />,
      "Ignored content",
    ],
  });

  expect(screen.getByText("Custom colours")).toBeVisible();
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
