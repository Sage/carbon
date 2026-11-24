import React, { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import setupSelectMocks from "../select/setup-select-mocks";
import I18nProvider from "../i18n-provider";
import { enUS } from "../../locales";
import ColorPicker, { ColorPickerColor, ColorPickerProps } from ".";

jest.mock("../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

beforeEach(() => {
  setupSelectMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const ControlledColorPicker = ({
  value: initialValue = "",
  onChange,
  ...props
}: Partial<ColorPickerProps>) => {
  const [value, setValue] = useState<ColorPickerColor | "">(initialValue);

  return (
    <ColorPicker
      label="Colour"
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
        onChange?.(ev);
      }}
      {...props}
    />
  );
};

const openList = async () => {
  const user = userEvent.setup();
  await user.click(screen.getByRole("combobox"));
  return user;
};

test("offers all ten colours in design system order by default", async () => {
  render(<ControlledColorPicker />);
  await openList();

  const options = screen.getAllByRole("option");

  expect(options.map((option) => option.textContent)).toEqual([
    "Blue",
    "Teal",
    "Green",
    "Lime",
    "Orange",
    "Red",
    "Pink",
    "Purple",
    "Grey",
    "Slate",
  ]);
});

test("offers only the colours passed to `colors`, in design system order", async () => {
  render(<ControlledColorPicker colors={["slate", "blue", "red"]} />);
  await openList();

  expect(
    screen.getAllByRole("option").map((option) => option.textContent),
  ).toEqual(["Blue", "Red", "Slate"]);
});

test("renders a swatch for every option", async () => {
  render(<ControlledColorPicker colors={["teal", "pink"]} />);
  await openList();

  const [teal, pink] = screen.getAllByRole("option");

  expect(within(teal).getByTestId("color-picker-swatch")).toHaveAttribute(
    "data-color",
    "teal",
  );
  expect(within(pink).getByTestId("color-picker-swatch")).toHaveAttribute(
    "data-color",
    "pink",
  );
});

test("uses the rich colour tokens by default", async () => {
  render(<ControlledColorPicker colors={["blue"]} />);
  await openList();

  expect(
    within(screen.getByRole("option")).getByTestId("color-picker-swatch"),
  ).toHaveStyleRule(
    "background-color",
    "var( --mode-color-status-custom-blue-default )",
  );
});

test("uses the muted colour tokens when `palette` is muted", async () => {
  render(<ControlledColorPicker colors={["blue"]} palette="muted" />);
  await openList();

  expect(
    within(screen.getByRole("option")).getByTestId("color-picker-swatch"),
  ).toHaveStyleRule(
    "background-color",
    "var( --mode-color-status-custom-blue-hover-alt )",
  );
});

test("shows the selected colour's name and swatch in the input", () => {
  render(<ControlledColorPicker value="green" palette="muted" />);

  const selectText = screen.getByTestId("select-text");
  const swatch = within(selectText).getByTestId("color-picker-swatch");

  expect(selectText).toHaveTextContent("Green");
  expect(swatch).toHaveAttribute("data-color", "green");
  expect(swatch).toHaveAttribute("aria-hidden", "true");
});

test("does not show a swatch in the input when no colour is selected", () => {
  render(<ControlledColorPicker />);

  expect(
    within(screen.getByTestId("select-text")).queryByTestId(
      "color-picker-swatch",
    ),
  ).not.toBeInTheDocument();
});

test("calls `onChange` with the selected colour name, `id` and `name`", async () => {
  const onChange = jest.fn();
  render(
    <ControlledColorPicker id="picker" name="favourite" onChange={onChange} />,
  );
  const user = await openList();

  await user.click(screen.getByRole("option", { name: "Purple" }));

  expect(onChange).toHaveBeenLastCalledWith({
    target: { id: "picker", name: "favourite", value: "purple" },
  });
  expect(screen.getByTestId("select-text")).toHaveTextContent("Purple");
});

test("calls `onChange` without `id` and `name` when they are not set", async () => {
  const onChange = jest.fn();
  render(<ControlledColorPicker onChange={onChange} />);
  const user = await openList();

  await user.click(screen.getByRole("option", { name: "Lime" }));

  expect(onChange).toHaveBeenLastCalledWith({
    target: { id: undefined, name: undefined, value: "lime" },
  });
});

test("translates colour names using the locale", async () => {
  render(
    <I18nProvider locale={enUS}>
      <ControlledColorPicker colors={["gray"]} />
    </I18nProvider>,
  );
  await openList();

  expect(screen.getByRole("option")).toHaveTextContent("Gray");
});

test.each([
  ["small", "var(--global-size-xs)"],
  ["medium", "var(--global-size-xs)"],
  ["large", "calc(var(--global-size-xs) + var(--global-size-5-xs))"],
] as const)("renders the %s swatch at %s", (size, expected) => {
  render(<ControlledColorPicker value="orange" size={size} />);

  const swatch = screen.getByTestId("color-picker-swatch");

  expect(swatch).toHaveStyleRule("width", expected);
  expect(swatch).toHaveStyleRule("height", expected);
});

test("does not forward props that are not part of its API", () => {
  const unsupportedProps = {
    isBlurBlocked: true,
    listMaxHeight: 20,
    "data-unsupported": "yes",
  } as unknown as ColorPickerProps;

  render(<ControlledColorPicker data-role="picker" {...unsupportedProps} />);

  const root = screen.getByTestId("picker");
  const input = screen.getByRole("combobox");

  [root, input].forEach((element) => {
    expect(element).not.toHaveAttribute("isBlurBlocked");
    expect(element).not.toHaveAttribute("isblurblocked");
    expect(element).not.toHaveAttribute("data-unsupported");
  });
});

test("renders the label, input hint and error message", () => {
  render(
    <ControlledColorPicker
      label="Select colour"
      inputHint="Pick a colour for the tag"
      error="Colour is required"
    />,
  );

  expect(
    screen.getByRole("combobox", { name: "Select colour" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Pick a colour for the tag")).toBeVisible();
  expect(screen.getByText("Colour is required")).toBeVisible();
});

test("does not open when disabled", async () => {
  render(<ControlledColorPicker disabled />);
  await openList();

  expect(screen.queryByRole("option")).not.toBeInTheDocument();
});

testStyledSystemMargin(
  (props) => (
    <ColorPicker
      {...props}
      data-role="my-color-picker"
      label="Colour"
      value=""
      onChange={() => {}}
    />
  ),
  () => screen.getByTestId("my-color-picker"),
);
