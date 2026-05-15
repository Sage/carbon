import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonToggle, ButtonToggleGroup } from "..";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

test("should render with provided children", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      value="foo"
      onChange={() => {}}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button", { name: "Foo" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Bar" })).toBeVisible();
});

test("should render with provided label and use it as its accessible name", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Group Label"
      onChange={() => {}}
      value="foo"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByText("Group Label")).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleName("Group Label");
});

test("should render with aria-label as its accessible name when the label is not set", () => {
  render(
    <ButtonToggleGroup
      value="foo"
      id="button-toggle-group-id"
      aria-label="Group Aria Label"
      onChange={() => {}}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("group")).toHaveAccessibleName("Group Aria Label");
});

test("should render with provided hintText and use it as the accessible description for each child button", () => {
  render(
    <ButtonToggleGroup
      value="foo"
      id="button-toggle-group-id"
      inputHint="Group Hint Text"
      onChange={() => {}}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByText("Group Hint Text")).toBeVisible();
  expect(
    screen.getByRole("button", { name: "Foo" }),
  ).toHaveAccessibleDescription("Group Hint Text");
  expect(
    screen.getByRole("button", { name: "Bar" }),
  ).toHaveAccessibleDescription("Group Hint Text");
});

test("should render labelHelp as hintText", () => {
  render(
    <ButtonToggleGroup
      value="foo"
      id="button-toggle-group-id"
      labelHelp="LabelHelp"
      onChange={() => {}}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByText("LabelHelp")).toBeVisible();
});

test("should render fieldHelp as hintText", () => {
  render(
    <ButtonToggleGroup
      value="foo"
      id="button-toggle-group-id"
      fieldHelp="FieldHelp"
      onChange={() => {}}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByText("FieldHelp")).toBeVisible();
});

test("should call onChange with the value of the ButtonToggle that is clicked", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={onChange}
      value="bar"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button", { name: "Foo" }));
  // expect MouseEvent to be the first arg
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), "foo");
});

test("should call onChange with null value when allowDeselect is set and a selected ButtonToggle is clicked", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={onChange}
      value="foo"
      allowDeselect
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(screen.getByRole("button", { name: "Foo" }));
  // expect MouseEvent to be the first arg
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), undefined);
});

test("should render with disabled child buttons when disabled prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      inputHint="Group Hint Text"
      onChange={() => {}}
      disabled
      value=""
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button", { name: "Foo" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Bar" })).toBeDisabled();
});

test("should render with expected styles when fullWidth prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      fullWidth
      value="foo"
    >
      <ButtonToggle value="foo" data-role="foo">
        Foo
      </ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("group")).toHaveStyle({ width: "100%" });
});

test("should render with expected styles when inputWidth prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      inputWidth={50}
      value="foo"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("group")).toHaveStyle({ width: "50%" });
});

test("should only allow the first button to be tabbable when none are selected", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup id="button-toggle-group-id" onChange={() => {}} value="">
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.click(document.body);
  await user.tab();
  expect(screen.getByRole("button", { name: "Foo" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Bar" })).not.toHaveFocus();
});

test("should only allow a selected button to be tabbable", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="bar"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.tab();
  expect(screen.getByRole("button", { name: "Bar" })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole("button", { name: "Foo" })).not.toHaveFocus();
  expect(screen.getByRole("button", { name: "Baz" })).not.toHaveFocus();
});

test("should focus the previous button of the currently focused button when the left arrow key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="bar"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.tab();
  await user.keyboard("{arrowleft}");
  expect(screen.getByRole("button", { name: "Foo" })).toHaveFocus();
});

test("should focus the last button when the first button is focused and the left arrow key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="foo"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.tab();
  await user.keyboard("{arrowleft}");
  expect(screen.getByRole("button", { name: "Baz" })).toHaveFocus();
});

test("should focus the next button of the currently focused button when the right arrow key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="bar"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.tab();
  await user.keyboard("{arrowright}");
  expect(screen.getByRole("button", { name: "Baz" })).toHaveFocus();
});

test("should focus the first button when the last button is focused and the right arrow key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="baz"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.tab();
  await user.keyboard("{arrowright}");
  expect(screen.getByRole("button", { name: "Foo" })).toHaveFocus();
});

test("should not change focus when a non arrow key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="bar"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>,
  );

  await user.tab();
  await user.keyboard("{a}");
  expect(screen.getByRole("button", { name: "Bar" })).toHaveFocus();
});

test("should render with provided data- tags", () => {
  render(
    <ButtonToggleGroup
      id="test"
      value=""
      onChange={() => {}}
      data-element="test-element"
      data-role="test-role"
    >
      <ButtonToggle>Button</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByTestId("test-role")).toHaveAttribute(
    "data-element",
    "test-element",
  );
});

testStyledSystemMargin(
  (props) => (
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      data-role="button-toggle-group"
      value="foo"
      {...props}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
    </ButtonToggleGroup>
  ),
  () => screen.getByTestId("button-toggle-group"),
);
