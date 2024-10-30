import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton, RadioButtonGroup } from "..";
import CarbonProvider from "../../carbon-provider";
import Logger from "../../../__internal__/utils/logger";
import { mockMatchMedia } from "../../../__spec_helper__/__internal__/test-utils";

test("logs a deprecation warning for uncontrolled behaviour", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});
  render(
    <RadioButtonGroup name="group">
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Radio Button` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("renders with provided `RadioButton` children", () => {
  render(
    <RadioButtonGroup name="group" onChange={() => {}}>
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const radioButton = screen.getByRole("radio", { name: "Radio Button 1" });

  expect(radioButton).toBeInTheDocument();
});

test("renders with RadioButton and non-`RadioButton` children when passed as an array", () => {
  render(
    <RadioButtonGroup name="group" onChange={() => {}}>
      {[
        <RadioButton key="radio1" value="radio1" label="Radio Button 1" />,
        null,
        undefined,
        "foo",
        <RadioButton key="radio2" value="radio2" label="Radio Button 2" />,
      ]}
    </RadioButtonGroup>
  );

  expect(screen.getAllByRole("radio")).toHaveLength(2);
  expect(screen.getByText("foo")).toBeVisible();
});

test("renders fieldset with provided `legend`", () => {
  render(
    <RadioButtonGroup
      name="group"
      legend="Radio Group Legend"
      onChange={() => {}}
    >
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const fieldset = screen.getByRole("group", { name: "Radio Group Legend" });

  expect(fieldset).toBeVisible();
});

test("checks the correct `RadioButton` child when a value is passed", () => {
  render(
    <RadioButtonGroup name="group" value="radio2" onChange={() => {}}>
      <RadioButton value="radio1" label="Radio Button 1" />
      <RadioButton value="radio2" label="Radio Button 2" />
    </RadioButtonGroup>
  );

  const radio1 = screen.getByRole("radio", { name: "Radio Button 1" });
  const radio2 = screen.getByRole("radio", { name: "Radio Button 2" });

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("calls `onChange` when a `RadioButton` child is checked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <RadioButtonGroup name="group" onChange={onChange}>
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const radioButton = screen.getByRole("radio");

  await user.click(radioButton);

  expect(onChange).toHaveBeenCalled();
});

test("calls `onBlur` when a `RadioButton` child is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <RadioButtonGroup name="group" onChange={() => {}} onBlur={onBlur}>
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  await user.tab();
  await user.tab();

  expect(onBlur).toHaveBeenCalled();
});

test("renders required `RadioButton` children when `required` prop is true", () => {
  render(
    <RadioButtonGroup name="group" required onChange={() => {}}>
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const radioButton = screen.getByRole("radio", { name: "Radio Button 1" });

  expect(radioButton).toBeRequired();
});

test("renders with inline legend when screen is larger than `adaptiveLegendBreakpoint`", () => {
  mockMatchMedia(true);
  render(
    <RadioButtonGroup
      name="group"
      legend="Radio Group Legend"
      adaptiveLegendBreakpoint={450}
      onChange={() => {}}
    >
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const legend = screen.getByTestId("legend");

  expect(legend).toHaveStyle({ float: "left" });
});

test("renders with legend on top when screen is smaller than `adaptiveLegendBreakpoint`", () => {
  mockMatchMedia(false);
  render(
    <RadioButtonGroup
      name="group"
      legend="Radio Group Legend"
      adaptiveLegendBreakpoint={450}
      onChange={() => {}}
    >
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const legend = screen.getByTestId("legend");

  expect(legend).not.toHaveStyle({ float: "left" });
});

test("renders with provided margin-left when screen is larger than `adaptiveSpacingBreakpoint`", () => {
  mockMatchMedia(true);
  render(
    <RadioButtonGroup
      name="group"
      ml="20%"
      adaptiveSpacingBreakpoint={450}
      onChange={() => {}}
    >
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveStyle({ marginLeft: "20%" });
});

test("does not render with provided margin-left when screen is smaller than `adaptiveSpacingBreakpoint`", () => {
  mockMatchMedia(false);
  render(
    <RadioButtonGroup
      name="group"
      ml="20%"
      adaptiveSpacingBreakpoint={450}
      onChange={() => {}}
    >
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveStyle({ marginLeft: "0" });
});

// coverage
describe("when `validationRedesignOptIn` flag is true", () => {
  it("renders with provided `error`", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          name="group"
          error="Error message"
          onChange={() => {}}
        >
          <RadioButton value="radio1" label="Radio Button 1" />
        </RadioButtonGroup>
      </CarbonProvider>
    );

    expect(screen.getByText("Error message")).toBeVisible();
  });

  it("renders with provided `warning`", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          name="group"
          warning="Warning message"
          onChange={() => {}}
        >
          <RadioButton value="radio1" label="Radio Button 1" />
        </RadioButtonGroup>
      </CarbonProvider>
    );

    expect(screen.getByText("Warning message")).toBeVisible();
  });

  it("renders `legendHelp` as hint text", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          name="group"
          legendHelp="Hint message"
          onChange={() => {}}
        >
          <RadioButton value="radio1" label="Radio Button 1" />
        </RadioButtonGroup>
      </CarbonProvider>
    );

    const hintText = screen.getByText("Hint message");

    expect(hintText).toBeVisible();
    expect(hintText).toHaveStyle({
      marginTop: "-4px",
      marginBottom: "8px",
      fontSize: "14px",
    });
    expect(hintText).toHaveStyleRule("color", "var(--colorsUtilityYin055)");
  });

  it("renders ErrorBorder with expected styles when `inline` is true", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          name="group"
          error="Error message"
          inline
          onChange={() => {}}
        >
          <RadioButton value="radio1" label="Radio Button 1" />
        </RadioButtonGroup>
      </CarbonProvider>
    );

    const errorBorder = screen.getByTestId("radio-error-border");

    expect(errorBorder).toHaveStyle({
      bottom: "10px",
    });
  });

  it("renders with RadioButton and non-`RadioButton` children when passed as an array", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup name="group" onChange={() => {}}>
          {[
            <RadioButton key="radio1" value="radio1" label="Radio Button 1" />,
            null,
            undefined,
            "foo",
            <RadioButton key="radio2" value="radio2" label="Radio Button 2" />,
          ]}
        </RadioButtonGroup>
      </CarbonProvider>
    );

    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByText("foo")).toBeVisible();
  });

  it("renders legend with default styling when `legendInline` is set", () => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          name="group"
          data-role="radio-group-inline"
          onChange={() => {}}
          legendInline
        >
          {[
            <RadioButton key="radio1" value="radio1" label="Radio Button 1" />,
            null,
            undefined,
            "foo",
            <RadioButton key="radio2" value="radio2" label="Radio Button 2" />,
          ]}
        </RadioButtonGroup>
      </CarbonProvider>
    );

    expect(screen.getByTestId("radio-group-inline")).not.toHaveStyle({
      marginTop: "4px",
    });
  });
});
