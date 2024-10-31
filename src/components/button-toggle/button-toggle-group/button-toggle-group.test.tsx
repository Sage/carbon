import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonToggle, ButtonToggleGroup } from "..";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";
import { testStyledSystemMarginRTL } from "../../../__spec_helper__/__internal__/test-utils";

test("should render with provided children", () => {
  render(
    <ButtonToggleGroup id="button-toggle-group-id" onChange={() => {}}>
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button", { name: "Foo" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Bar" })).toBeVisible();
});

test("should throw an error when children are not of type ButtonToggle", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <ButtonToggleGroup id="button-toggle-group-id" onChange={() => {}}>
        <div>Foo</div>
      </ButtonToggleGroup>,
    ),
  ).toThrow("`ButtonToggleGroup` only accepts children of type `ButtonToggle`");

  consoleSpy.mockRestore();
});

test("should render with provided label and use it as its accessible name", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Group Label"
      aria-label="Group Aria Label"
      onChange={() => {}}
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

test("should call onChange with the value of the ButtonToggle that is clicked", async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup id="button-toggle-group-id" onChange={onChange}>
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

test("should render with disabled child buttons and expected styles when disabled prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Group Label"
      inputHint="Group Hint Text"
      onChange={() => {}}
      disabled
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("button", { name: "Foo" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Bar" })).toBeDisabled();
  expect(screen.getByRole("group")).toHaveStyleRule(
    "box-shadow",
    "inset 0px 0px 0px 1px var(--colorsActionDisabled600)",
  );
  expect(screen.getByRole("group")).toHaveStyleRule("cursor: not-allowed");

  expect(screen.getByText("Group Hint Text")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin030)",
  );
});

test("should render with expected styles when fullWidth prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Group Label"
      onChange={() => {}}
      fullWidth
    >
      <ButtonToggle value="foo" data-role="foo">
        Foo
      </ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("group")).toHaveStyle({ width: "100%" });
  expect(screen.getByTestId("foo")).toHaveStyle({ flex: "auto" });
});

test("should render with expected styles when inputWidth prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Group Label"
      onChange={() => {}}
      inputWidth={50}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("group")).toHaveStyle({ width: "50%" });
});

test("should render with expected styles when labelInline prop is set", () => {
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="Group Label"
      onChange={() => {}}
      labelInline
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(screen.getByRole("group")).toHaveStyle({ flexWrap: "nowrap" });
});

test("should not render labelHelp or filedHelp when validationRedesignOptIn is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Group Label"
        labelHelp="Label Help"
        fieldHelp="Field Help"
        onChange={() => {}}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
      </ButtonToggleGroup>
    </CarbonProvider>,
  );

  expect(screen.queryByText("Label Help")).not.toBeInTheDocument();
  expect(screen.queryByText("Field Help")).not.toBeInTheDocument();
});

test("should only allow the first button to be tabbable when none are selected", async () => {
  const user = userEvent.setup();
  render(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value={undefined}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

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

testStyledSystemMarginRTL(
  (props) => (
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      data-role="button-toggle-group"
      {...props}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
    </ButtonToggleGroup>
  ),
  // we are setting the data- attributes on more than one element
  // FE-6834 raised to address this
  () => screen.getAllByTestId("button-toggle-group")[0],
  undefined,
  { modifier: "&&&" },
);
