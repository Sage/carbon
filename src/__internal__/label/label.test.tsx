import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Label from ".";
import { InputContext, InputGroupContext } from "../input-behaviour";

test("renders with children", () => {
  render(<Label>foo</Label>);

  expect(screen.getByText("foo")).toBeVisible();
});

test("calls `onMouseEnter` and `onMouseLeave` callbacks passed from InputContext", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();
  render(
    <InputContext.Provider value={{ onMouseEnter, onMouseLeave }}>
      <Label>foo</Label>
    </InputContext.Provider>,
  );

  const label = screen.getByText("foo");
  await user.hover(label);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);

  await user.unhover(label);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("calls `onMouseEnter` and `onMouseLeave` callbacks passed from InputGroupContext", async () => {
  const user = userEvent.setup();
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();
  render(
    <InputGroupContext.Provider value={{ onMouseEnter, onMouseLeave }}>
      <Label>foo</Label>
    </InputGroupContext.Provider>,
  );

  const label = screen.getByText("foo");
  await user.hover(label);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);

  await user.unhover(label);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

test("renders Help icon with provided tooltip content when the `help` prop is passed", async () => {
  const user = userEvent.setup();
  render(<Label help="bar">foo</Label>);

  await user.hover(screen.getByRole("button", { name: "help" }));

  expect(screen.getByRole("tooltip", { name: "bar" })).toBeVisible();
});

test("Help icon is focusable", async () => {
  const user = userEvent.setup();
  render(<Label help="bar">foo</Label>);

  const help = screen.getByRole("button", { name: "help" });
  await user.click(help);

  expect(help).toHaveFocus();

  await user.tab();

  expect(help).not.toHaveFocus();
});

test("renders Help tooltip with provided `tooltipId`", async () => {
  const user = userEvent.setup();
  render(
    <Label help="bar" tooltipId="baz">
      foo
    </Label>,
  );

  await user.hover(screen.getByRole("button", { name: "help" }));
  const tooltip = screen.getByRole("tooltip", { name: "bar" });

  expect(tooltip).toBeVisible();
  expect(tooltip).toHaveAttribute("id", "baz");
});

test("renders label with provided `labelId`", () => {
  render(<Label labelId="baz">foo</Label>);

  expect(screen.getByText("foo")).toHaveAttribute("id", "baz");
});

test("uses `aria-label` prop as its accessible name when passed", () => {
  render(<Label aria-label="baz">foo</Label>);

  expect(screen.getByText("foo")).toHaveAccessibleName("baz");
});

test("does not render validation icon when `disabled` prop is true", () => {
  render(
    <Label error="error" disabled>
      foo
    </Label>,
  );

  expect(screen.queryByTestId("icon-error")).not.toBeInTheDocument();
});

test("renders with provided `htmlFor`", () => {
  render(<Label htmlFor="baz">foo</Label>);

  expect(screen.getByText("foo")).toHaveAttribute("for", "baz");
});

test("does not render with `htmlFor` when not rendered as a `<label>` element", () => {
  render(
    <Label as="span" htmlFor="baz">
      foo
    </Label>,
  );

  expect(screen.getByText("foo")).not.toHaveAttribute("for");
});

test.each(["error", "warning", "info"])(
  "renders %s tooltip with position set to 'top' when label is inline",
  async (validationProp) => {
    const user = userEvent.setup();
    render(
      <Label inline {...{ [validationProp]: "Message" }}>
        foo
      </Label>,
    );
    await user.hover(screen.getByTestId(`icon-${validationProp}`));
    expect(await screen.findByRole("tooltip")).toHaveAttribute(
      "data-placement",
      "top",
    );
  },
);

test.each(["error", "warning", "info"])(
  "renders %s tooltip with position set to 'right' when label is not inline",
  async (validationProp) => {
    const user = userEvent.setup();
    render(<Label {...{ [validationProp]: "Message" }}>foo</Label>);
    await user.hover(screen.getByTestId(`icon-${validationProp}`));
    expect(await screen.findByRole("tooltip")).toHaveAttribute(
      "data-placement",
      "right",
    );
  },
);

// coverage
test("renders with expected styles when `inline` is true and `align` is 'left'", () => {
  render(
    <Label inline align="left">
      foo
    </Label>,
  );

  expect(screen.getByTestId("label-container")).toHaveStyle({
    justifyContent: "flex-start",
  });
});
