import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiActionButton from "./multi-action-button.component";
import Button from "../button";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

test("should render with provided 'text'", () => {
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByRole("button", { name: "Main Button" })).toBeVisible();
});

test("should render with provided 'subtext' when 'size' is 'large'", () => {
  render(
    <MultiActionButton text="Main Button" subtext="Subtext" size="large">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByText("Subtext")).toBeVisible();
});

test("should render when children are non-Carbon Button children", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <span>First</span>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  expect(screen.getByText("First")).toBeVisible();
});

test("should render with provided 'data-' tags", () => {
  render(
    <MultiActionButton text="Main Button" data-element="foo" data-role="bar">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "foo");
});

test("should render with provided 'id'", () => {
  render(
    <MultiActionButton text="Main Button" id="test">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByRole("button", { name: "Main Button" })).toHaveAttribute(
    "id",
    "test",
  );
});

test("should call 'onClick' when the main button is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button" onClick={onClick}>
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should open additional buttons when the main button is clicked and focus on the first child", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
      <Button>Second</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  const button = screen.getByRole("button", { name: "First" });

  expect(button).toBeVisible();
  expect(button).toHaveFocus();
});

test("should close additional buttons when a child button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  await user.click(screen.getByRole("button", { name: "First" }));

  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
});

test("should close additional buttons when a click occurs outside the component", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  await user.click(document.body);

  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
});

test("should render main button as disabled when 'disabled' prop is true", () => {
  render(
    <MultiActionButton text="Main Button" disabled>
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByRole("button", { name: "Main Button" })).toBeDisabled();
});

test("should render with expected styles when 'width' prop is set", () => {
  render(
    <MultiActionButton
      text="Main Button"
      width="50%"
      data-role="multi-action-button"
    >
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByTestId("multi-action-button")).toHaveStyle({
    width: "50%",
  });
  expect(screen.getByRole("button", { name: "Main Button" })).toHaveStyle({
    width: "100%",
    justifyContent: "space-between",
  });
});

testStyledSystemMargin(
  (props) => (
    <MultiActionButton data-role="multi-action-button" text="Test" {...props}>
      <Button>Test</Button>
    </MultiActionButton>
  ),
  () => screen.getByTestId("multi-action-button"),
);
