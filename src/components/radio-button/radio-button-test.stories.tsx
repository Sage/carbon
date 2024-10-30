/* eslint-disable no-console */
import React from "react";
import { StoryFn } from "@storybook/react";
import { RadioButtonGroup, RadioButton } from ".";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
import { RadioButtonProps } from "./radio-button.component";
import CarbonProvider from "../carbon-provider";
import Box from "../box";

export default {
  title: "Radio Button/Test",
  includeStories: [
    "Required",
    "WithValidationsOnButtons",
    "WithValidationsOnRadioGroup",
    "WithTooltipPosition",
    "WithTooltipPositionOnRadioGroup",
    "WithNewValidationLegendInline",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Required: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup name="required" legend="Radio group legend" required>
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);

Required.storyName = "required";

export const WithValidationsOnButtons: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="validations-on-buttons-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
  >
    <RadioButton
      id="validations-on-buttons-radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      fieldHelp="Some help text for this input."
    />
    <RadioButton
      id="validations-on-buttons-radio-2"
      value="radio2"
      label="Radio Option 2"
      warning="message"
    />
    <RadioButton
      id="validations-on-buttons-radio-3"
      value="radio3"
      label="Radio Option 3"
      info="message"
    />
  </RadioButtonGroup>
);

WithValidationsOnButtons.storyName = "with validations on RadioButton";

export const WithValidationsOnRadioGroup: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="validations-on-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
    error="Error message"
  >
    <RadioButton
      id="validations-on-group-radio-1"
      value="radio1"
      label="Radio Option 1"
    />
    <RadioButton
      id="validations-on-group-radio-2"
      value="radio2"
      label="Radio Option 2"
    />
    <RadioButton
      id="validations-on-group-radio-3"
      value="radio3"
      label="Radio Option 3"
    />
  </RadioButtonGroup>
);

WithValidationsOnRadioGroup.storyName = "with validations on RadioGroup";

export const WithTooltipPosition: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="tooltip-position"
    onChange={() => console.log("change")}
    legend="Radio group legend"
  >
    <RadioButton
      id="radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      tooltipPosition="right"
    />
  </RadioButtonGroup>
);

WithTooltipPosition.storyName = "with tooltip position";

export const WithTooltipPositionOnRadioGroup: StoryFn<
  typeof RadioButton
> = () => (
  <RadioButtonGroup
    name="validations-on-group-group-tooltip-position-override"
    onChange={() => console.log("change")}
    legend="Radio group legend"
    error="Error message"
    tooltipPosition="top"
  >
    <RadioButton
      id="validations-on-group-radio-1-tooltip-position-override"
      value="radio1"
      label="Radio Option 1"
    />
    <RadioButton
      id="validations-on-group-radio-2-tooltip-position-override"
      value="radio2"
      label="Radio Option 2"
    />
    <RadioButton
      id="validations-on-group-radio-3-tooltip-position-override"
      value="radio3"
      label="Radio Option 3"
    />
  </RadioButtonGroup>
);

WithTooltipPositionOnRadioGroup.storyName =
  "with tooltip position on RadioGroup";

const radioContainerWidth = 400;

export const RadioButtonComponent = (props: Partial<RadioButtonProps>) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
        width: radioContainerWidth,
      }}
    >
      <RadioButton
        id="radio-1"
        value="radio1"
        label="Radiobutton 1"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        {...props}
      />
    </div>
  );
};

export const RadioButtonGroupComponent = ({
  children,
  ...props
}: Partial<RadioButtonGroupProps>) => {
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <RadioButtonGroup
        name="radiobuttongroup"
        legend="Radio group legend"
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />

        {children}
      </RadioButtonGroup>
    </div>
  );
};

export const WithNewValidationLegendInline = () => {
  return (
    <Box m={2}>
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          legend="Label"
          legendHelp="Hint Text"
          name="error-validations-group-inline"
          error="Error Message (Fix is required)"
          legendInline
        >
          <RadioButton
            id="radio-one-1"
            value="radioOne1"
            label="Radio Option 1"
          />
          <RadioButton
            id="radio-one-2"
            value="radioOne2"
            label="Radio Option 2"
          />
          <RadioButton
            id="radio-one-3"
            value="radioOne3"
            label="Radio Option 3"
          />
        </RadioButtonGroup>

        <RadioButtonGroup
          mt={2}
          legend="Label"
          legendHelp="Hint Text"
          name="warning-validations-group-inline"
          warning="Warning Message (Fix is optional)"
        >
          <RadioButton
            id="radio-two-1"
            value="radioTwo1"
            label="Radio Option 1"
          />
          <RadioButton
            id="radio-two-2"
            value="radioTwo2"
            label="Radio Option 2"
          />
          <RadioButton
            id="radio-two-3"
            value="radioTwo3"
            label="Radio Option 3"
          />
        </RadioButtonGroup>
      </CarbonProvider>
    </Box>
  );
};

WithNewValidationLegendInline.storyName =
  "with new validation - legend inline ";
