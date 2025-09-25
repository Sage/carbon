import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Help from ".";
import Icon from "../icon";
import { assertDeprecationWarning } from "../../__spec_helper__/__internal__/test-utils";

test("displays a deprecation warning when used", () => {
  assertDeprecationWarning({
    component: <Help>Foo</Help>,
    deprecationMessage:
      "The `Help` component is deprecated and will soon be removed.",
  });
});

test("renders tooltip when help button is hovered and removes tooltip when unhovered", async () => {
  const user = userEvent.setup();
  render(<Help>foo</Help>);

  await user.hover(screen.getByRole("button", { name: "help" }));

  expect(screen.getByRole("tooltip", { name: "foo" })).toBeVisible();

  await user.unhover(screen.getByRole("button", { name: "help" }));

  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("renders tooltip when help button is focused and removes tooltip when blurred", async () => {
  const user = userEvent.setup();
  render(<Help>foo</Help>);

  await user.click(screen.getByRole("button", { name: "help" }));

  expect(screen.getByRole("tooltip", { name: "foo" })).toBeVisible();

  await user.tab();

  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("removes tooltip when Escape key is pressed", async () => {
  const user = userEvent.setup();
  render(<Help>foo</Help>);

  act(() => {
    screen.getByRole("button", { name: "help" }).focus();
  });

  expect(await screen.findByRole("tooltip", { name: "foo" })).toBeVisible();

  await user.keyboard("{Escape}");

  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("does not remove tooltip when Enter key is pressed", async () => {
  const user = userEvent.setup();
  render(<Help>foo</Help>);

  act(() => {
    screen.getByRole("button", { name: "help" }).focus();
  });

  const tooltip = await screen.findByRole("tooltip", { name: "foo" });

  expect(tooltip).toBeVisible();

  await user.keyboard("{Enter}");

  expect(tooltip).toBeVisible();
});

test("renders help button with the tooltip content as its accessible description", async () => {
  const user = userEvent.setup();
  render(<Help>foo</Help>);

  const helpButton = screen.getByRole("button", { name: "help" });

  await user.hover(helpButton);

  expect(helpButton).toHaveAccessibleDescription("foo");
});

test("composed content is rendered inside the tooltip", async () => {
  const user = userEvent.setup();
  render(
    <Help>
      <Icon type="info" />
      <span>foo</span>
    </Help>,
  );

  await user.hover(screen.getByRole("button", { name: "help" }));

  expect(screen.getByRole("tooltip", { name: "foo" })).toBeVisible();
});

test("does not render tooltip when children are not provided", async () => {
  const user = userEvent.setup();
  render(<Help />);

  await user.hover(screen.getByRole("button", { name: "help" }));

  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("renders with custom data tags", () => {
  render(<Help data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
});

test("renders as a link when `href` is provided", () => {
  render(<Help href="http://carbon.sage.com" />);

  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "http://carbon.sage.com",
  );
});

test("renders with provided `aria-label` as the help button's accessible name", () => {
  render(<Help aria-label="foo" />);

  expect(screen.getByRole("button")).toHaveAccessibleName("foo");
});

test("renders with provided `helpId` and `tooltipId`", async () => {
  const user = userEvent.setup();
  render(
    <Help helpId="foo" tooltipId="bar">
      foo
    </Help>,
  );

  const helpButton = screen.getByRole("button", { name: "help" });

  expect(helpButton).toHaveAttribute("id", "foo");

  await user.hover(helpButton);

  expect(screen.getByRole("tooltip", { name: "foo" })).toHaveAttribute(
    "id",
    "bar",
  );
});
