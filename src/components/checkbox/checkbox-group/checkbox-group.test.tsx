import React from "react";
import { render, screen } from "@testing-library/react";
import { Checkbox, CheckboxGroup } from "..";
import CarbonProvider from "../../carbon-provider";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

import Logger from "../../../__internal__/utils/logger";

jest.mock("../../../__internal__/utils/logger");

test("should display deprecation warning once when rendered as optional", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");

  render(
    <>
      <CheckboxGroup isOptional>
        <Checkbox value="1" label="label-1" onChange={() => {}} />
        <Checkbox value="2" label="label-2" onChange={() => {}} />
      </CheckboxGroup>
      <CheckboxGroup isOptional>
        <Checkbox value="1" label="label-1" onChange={() => {}} />
        <Checkbox value="2" label="label-2" onChange={() => {}} />
      </CheckboxGroup>
    </>,
  );

  // Ensure the deprecation warning is logged only once
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  expect(loggerSpy).toHaveBeenNthCalledWith(
    1,
    "`isOptional` is deprecated in CheckboxGroup and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
  );

  loggerSpy.mockRestore();
});

test("should render with the provided children", () => {
  render(
    <CheckboxGroup>
      <Checkbox value="1" label="label-1" onChange={() => {}} />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByText("label-1")).toBeVisible();
  expect(screen.getByText("label-2")).toBeVisible();
});

test("should render with the provided legend", () => {
  render(
    <CheckboxGroup legend="legend">
      <Checkbox value="1" label="label" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByText("legend")).toBeVisible();
});

test("should render required checkbox children when required prop is set", () => {
  render(
    <CheckboxGroup legend="legend" required>
      <Checkbox value="1" label="label-1" onChange={() => {}} />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[0]).toBeRequired();
  expect(checkboxes[1]).toBeRequired();
});

it("should append (optional) text on the legend when isOptional prop is set", () => {
  render(
    <CheckboxGroup legend="legend" isOptional>
      <Checkbox value="1" label="label-1" onChange={() => {}} />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByText("legend")).toHaveStyleRule(
    "content",
    '"(optional)"',
    { modifier: "::after" },
  );
});

it("should render with accessible description when `error` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" error="error message">
      <Checkbox value="1" label="label" onChange={() => {}} />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(fieldset).toHaveAccessibleDescription("error message");
});

it("should render with accessible description when `warning` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" warning="warning message">
      <Checkbox value="1" label="label" onChange={() => {}} />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(fieldset).toHaveAccessibleDescription("warning message");
});

it("should render with accessible description when `info` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" info="info message">
      <Checkbox value="1" label="label" onChange={() => {}} />
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
      />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByTestId("checkbox-1")).toHaveStyle({ paddingTop: "4px" });
});

test("should render with expected styles when inline is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="legend" inline>
        <Checkbox value="1" label="label-1" onChange={() => {}} />
        <Checkbox value="2" label="label-2" onChange={() => {}} />
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
          <Checkbox value="1" label="label" onChange={() => {}} />
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
          <Checkbox value="1" label="label" onChange={() => {}} />
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
          <Checkbox value="1" label="label" onChange={() => {}} />
        </CheckboxGroup>
      </CarbonProvider>,
    );

    const fieldset = screen.getByRole("group", { name: "legend" });

    expect(screen.getByText("warning message")).toBeVisible();
    expect(fieldset).toHaveAccessibleDescription("warning message");
  });

  it("should render with combined validation and legendHelp messages as the fieldset's accessible description", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup
          legend="legend"
          legendHelp="legendHelp"
          error="error message"
        >
          <Checkbox value="1" label="label" onChange={() => {}} />
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
      <Checkbox value="1" label="label" onChange={() => {}} />
    </CheckboxGroup>
  ),
  () => screen.getByTestId("checkbox-group-wrapper"),
);
