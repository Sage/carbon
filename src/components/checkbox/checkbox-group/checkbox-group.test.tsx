import React from "react";
import { render, screen } from "@testing-library/react";
import { Checkbox, CheckboxGroup } from "..";
import CarbonProvider from "../../carbon-provider";
import {
  testStyledSystemMargin,
  assertDeprecationWarning,
} from "../../../__spec_helper__/__internal__/test-utils";

test("displays a deprecation warning if `legendHelp` is used", () => {
  assertDeprecationWarning({
    component: (
      <CheckboxGroup legendHelp="legendHelp">
        <Checkbox value="1" label="label-1" onChange={() => {}} checked />
        <Checkbox value="2" label="label-2" onChange={() => {}} checked />
      </CheckboxGroup>
    ),
    deprecationMessage:
      "The `legendHelp` prop in `CheckboxGroup` is deprecated and will soon be removed.",
  });
});

test("displays a deprecation warning if `legendInline` is used", () => {
  assertDeprecationWarning({
    component: (
      <CheckboxGroup legendInline>
        <Checkbox value="1" label="label-1" onChange={() => {}} checked />
        <Checkbox value="2" label="label-2" onChange={() => {}} checked />
      </CheckboxGroup>
    ),
    deprecationMessage:
      "The `legendInline` prop in `CheckboxGroup` is deprecated and will soon be removed.",
  });
});

test("displays a deprecation warning if `legendWidth` is used", () => {
  assertDeprecationWarning({
    component: (
      <CheckboxGroup legendWidth={200}>
        <Checkbox value="1" label="label-1" onChange={() => {}} checked />
        <Checkbox value="2" label="label-2" onChange={() => {}} checked />
      </CheckboxGroup>
    ),
    deprecationMessage:
      "The `legendWidth` prop in `CheckboxGroup` is deprecated and will soon be removed.",
  });
});

test("displays a deprecation warning if `legendAlign` is used and set to 'right'", () => {
  assertDeprecationWarning({
    component: (
      <CheckboxGroup legendAlign="right">
        <Checkbox value="1" label="label-1" onChange={() => {}} checked />
        <Checkbox value="2" label="label-2" onChange={() => {}} checked />
      </CheckboxGroup>
    ),
    deprecationMessage:
      "The `legendAlign` prop in `CheckboxGroup` is deprecated and will soon be removed.",
  });
});

test("should render with the provided children", () => {
  render(
    <CheckboxGroup>
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByText("label-1")).toBeVisible();
  expect(screen.getByText("label-2")).toBeVisible();
});

test("should render with the provided legend", () => {
  render(
    <CheckboxGroup legend="legend">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByText("legend")).toBeVisible();
});

test("should render required checkbox children when required prop is set", () => {
  render(
    <CheckboxGroup legend="legend" required>
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[0]).toBeRequired();
  expect(checkboxes[1]).toBeRequired();
});

it("should render with accessible description when `error` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" error="error message">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(fieldset).toHaveAccessibleDescription("error message");
});

it("should render with accessible description when `warning` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" warning="warning message">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(fieldset).toHaveAccessibleDescription("warning message");
});

it("should render with accessible description when `info` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" info="info message">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(fieldset).toHaveAccessibleDescription("info message");
});

test("should render with expected styles when legendInline is true", () => {
  render(
    <CheckboxGroup legend="legend" legendInline>
      <Checkbox
        data-role="checkbox-1"
        value="1"
        label="label-1"
        onChange={() => {}}
        checked
      />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByTestId("checkbox-1")).toHaveStyle({ paddingTop: "4px" });
});

test("should render with expected styles when inline is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="legend" inline>
        <Checkbox value="1" label="label-1" onChange={() => {}} checked />
        <Checkbox value="2" label="label-2" onChange={() => {}} checked />
      </CheckboxGroup>
    </CarbonProvider>,
  );

  expect(screen.getByTestId("checkbox-group")).toHaveStyle({
    flexDirection: "row",
  });
});

describe("when the `validationRedesignOptIn` flag is true", () => {
  it("should render `legendHelp` as a hint text", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup legend="legend" legendHelp="legendHelp">
          <Checkbox value="1" label="label" onChange={() => {}} checked />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });
    expect(screen.getByText("legendHelp")).toBeVisible();
    expect(fieldset).toHaveAccessibleDescription("legendHelp");
  });

  it("should render with error message when `error` prop is set", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup legend="legend" error="error message">
          <Checkbox value="1" label="label" onChange={() => {}} checked />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });

    expect(screen.getByText("error message")).toBeVisible();
    expect(fieldset).toHaveAccessibleDescription("error message");
  });

  it("should render with warning message when `warning` prop is set", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup legend="legend" warning="warning message">
          <Checkbox value="1" label="label" onChange={() => {}} checked />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });

    expect(screen.getByText("warning message")).toBeVisible();
    expect(fieldset).toHaveAccessibleDescription("warning message");
  });

  it("should describe the group with the error and legendHelp text when the validationMessagePositionTop is false", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup
          legend="legend"
          error="error message"
          legendHelp="Legend Help"
          validationMessagePositionTop={false}
        >
          <Checkbox value="1" label="label" onChange={() => {}} checked />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });

    expect(screen.getByText("error message")).toBeVisible();
    expect(fieldset).toHaveAccessibleDescription("Legend Help error message");
  });

  it("should describe the group with the warning and legendHelp text when the validationMessagePositionTop is false", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup
          legend="legend"
          warning="warning message"
          legendHelp="Legend Help"
          validationMessagePositionTop={false}
        >
          <Checkbox value="1" label="label" onChange={() => {}} checked />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });

    expect(screen.getByText("warning message")).toBeVisible();
    expect(fieldset).toHaveAccessibleDescription("Legend Help warning message");
  });

  it("should render with combined validation and legendHelp messages as the fieldset's accessible description", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup
          legend="legend"
          legendHelp="legendHelp"
          error="error message"
        >
          <Checkbox value="1" label="label" onChange={() => {}} checked />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });

    expect(fieldset).toHaveAccessibleDescription("error message legendHelp");
  });
});

testStyledSystemMargin(
  (props) => (
    <CheckboxGroup
      data-role="checkbox-group-wrapper"
      legend="legend"
      {...props}
    >
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>
  ),
  () => screen.getByTestId("checkbox-group-wrapper"),
);
