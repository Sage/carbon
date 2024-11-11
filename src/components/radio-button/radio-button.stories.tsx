/* eslint-disable no-console */
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { RadioButtonGroup, RadioButton } from ".";
import Typography from "../typography";
import CarbonProvider from "../carbon-provider";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof RadioButton> = {
  title: "Radio Button",
  component: RadioButton,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = () => {
  return (
    <RadioButtonGroup name="legend-and-labels-group">
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
Default.storyName = "Default";

export const WithLegendAndLabels: Story = () => {
  const [value, setValue] = React.useState("radio1");
  return (
    <RadioButtonGroup
      name="legend-and-labels-group"
      onChange={(ev) => setValue(ev.target.value)}
      legend="Radio group legend"
      value={value}
    >
      <RadioButton
        id="radio-1"
        value="radio1"
        label="Radio Option 1"
        labelHelp="first option"
      />
      <RadioButton
        id="radio-2"
        value="radio2"
        label="Radio Option 2"
        labelHelp="second option"
      />
      <RadioButton
        id="radio-3"
        value="radio3"
        label="Radio Option 3"
        labelHelp="third option"
      />
    </RadioButtonGroup>
  );
};
WithLegendAndLabels.storyName = "With Legend and Labels";

export const WithInlineLegend: Story = () => {
  return (
    <RadioButtonGroup
      name="inline-legend-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
      legendInline
      legendWidth={10}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
WithInlineLegend.storyName = "With Inline Legend";

export const WithLeftMargin: Story = () => {
  return (
    <RadioButtonGroup
      name="left-margin-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
      ml="20%"
    >
      <RadioButton
        id="left-margin-radio-1"
        value="radio1"
        label="Radio Option 1"
      />
      <RadioButton
        id="left-margin-radio-2"
        value="radio2"
        label="Radio Option 2"
      />
      <RadioButton
        id="left-margin-radio-3"
        value="radio3"
        label="Radio Option 3"
      />
    </RadioButtonGroup>
  );
};
WithLeftMargin.storyName = "With Left Margin";

export const EnableAdaptiveBehaviour: Story = () => {
  return (
    <RadioButtonGroup
      name="enable-adaptive-behaviour-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
      ml="20%"
      adaptiveLegendBreakpoint={960}
      adaptiveSpacingBreakpoint={960}
    >
      <RadioButton
        id="enable-adaptive-behaviour-radio-1"
        value="radio1"
        label="Radio Option 1"
      />
      <RadioButton
        id="enable-adaptive-behaviour-radio-2"
        value="radio2"
        label="Radio Option 2"
      />
      <RadioButton
        id="enable-adaptive-behaviour-radio-3"
        value="radio3"
        label="Radio Option 3"
      />
    </RadioButtonGroup>
  );
};
EnableAdaptiveBehaviour.storyName = "Enable Adaptive Behaviour";
EnableAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };

export const DifferentLabelSpacing: Story = () => {
  return (
    <RadioButtonGroup
      name="different-label-spacing-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
      labelSpacing={2}
    >
      <RadioButton
        id="different-label-spacing-radio-1"
        value="radio1"
        label="Radio Option 1"
      />
      <RadioButton
        id="different-label-spacing-radio-2"
        value="radio2"
        label="Radio Option 2"
      />
      <RadioButton
        id="different-label-spacing-radio-3"
        value="radio3"
        label="Radio Option 3"
      />
    </RadioButtonGroup>
  );
};
DifferentLabelSpacing.storyName = "Different Label Spacing";

export const InlineRadioButtons: Story = () => {
  return (
    <RadioButtonGroup
      name="inline-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
      inline
    >
      <RadioButton id="inline-radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="inline-radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="inline-radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
InlineRadioButtons.storyName = "Inline Radio Buttons";

export const ReverseRadioButtons: Story = () => {
  return (
    <RadioButtonGroup
      name="reverse-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
    >
      <RadioButton
        id="reverse-radio-1"
        value="radio1"
        label="Radio Option 1"
        reverse
      />
      <RadioButton
        id="reverse-radio-2"
        value="radio2"
        label="Radio Option 2"
        reverse
      />
      <RadioButton
        id="reverse-radio-3"
        value="radio3"
        label="Radio Option 3"
        reverse
      />
    </RadioButtonGroup>
  );
};
ReverseRadioButtons.storyName = "Reverse Radio Buttons";

export const DisableRadioButtons: Story = () => {
  return (
    <RadioButtonGroup
      name="disable-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
    >
      <RadioButton
        id="disable-radio-1"
        value="radio1"
        label="Radio Option 1"
        disabled
      />
      <RadioButton
        id="disable-radio-2"
        value="radio2"
        label="Radio Option 2"
        disabled
      />
      <RadioButton
        id="disable-radio-3"
        value="radio3"
        label="Radio Option 3"
        disabled
      />
    </RadioButtonGroup>
  );
};
DisableRadioButtons.storyName = "Disable Radio Buttons";

export const WithFieldHelp: Story = () => {
  return (
    <RadioButtonGroup
      name="field-help-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
    >
      <RadioButton
        id="field-help-radio-1"
        value="radio1"
        label="Radio Option 1"
        fieldHelp="Some help text for this input."
      />
      <RadioButton
        id="field-help-radio-2"
        value="radio2"
        label="Radio Option 2"
        fieldHelp="Some help text for this input."
      />
      <RadioButton
        id="field-help-radio-3"
        value="radio3"
        label="Radio Option 3"
        fieldHelp="Some help text for this input."
      />
    </RadioButtonGroup>
  );
};
WithFieldHelp.storyName = "With Field Help";

export const WithLargeRadioButtons: Story = () => {
  return (
    <RadioButtonGroup
      name="large-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
    >
      <RadioButton
        id="large-radio-1"
        value="radio1"
        label="Radio Option 1"
        size="large"
        fieldHelp="Some help text for this input."
      />
      <RadioButton
        id="large-radio-2"
        value="radio2"
        label="Radio Option 2"
        size="large"
        fieldHelp="Some help text for this input."
      />
      <RadioButton
        id="large-radio-3"
        value="radio3"
        label="Radio Option 3"
        size="large"
        fieldHelp="Some help text for this input."
      />
    </RadioButtonGroup>
  );
};
WithLargeRadioButtons.storyName = "With Large Radio Buttons";

export const WithCustomStyledLabels: Story = () => {
  return (
    <RadioButtonGroup
      name="custom-styled-label-group"
      onChange={() => console.log("change")}
      legend="Radio group legend"
    >
      <RadioButton
        id="custom-styled-label-radio-1"
        value="radio1"
        label={
          <>
            <Typography variant="b">Bold </Typography>
            <Typography as="span">regular </Typography>
            <Typography variant="em">emphasized</Typography>
          </>
        }
      />
      <RadioButton
        id="custom-styled-label-radio-2"
        value="radio2"
        label={
          <>
            <Typography variant="b">Bold </Typography>
            <Typography as="span">regular </Typography>
            <Typography variant="em">emphasized</Typography>
          </>
        }
      />
      <RadioButton
        id="custom-styled-label-radio-3"
        value="radio3"
        label={
          <>
            <Typography variant="b">Bold </Typography>
            <Typography as="span">regular </Typography>
            <Typography variant="em">emphasized</Typography>
          </>
        }
      />
    </RadioButtonGroup>
  );
};
WithCustomStyledLabels.storyName = "With Custom Styled Labels";

export const NewValidationDefault: Story = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButton
        id="radio-error-1"
        value="radioError1"
        label="Radio Option 1 - Error"
        error
      />
      <RadioButton
        id="radio-default-2"
        value="radioDefault2"
        label="Radio Option 2 - Default"
      />
      <RadioButton
        id="radio-warning-3"
        value="radioWarning3"
        label="Radio Option 3 - Warning"
        warning
      />
    </CarbonProvider>
  );
};
NewValidationDefault.storyName = "New Validation";

export const NewValidationDefaultGroup: Story = () => {
  return (
    <Box m={2}>
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          legend="Label"
          legendHelp="Hint Text"
          name="error-validations-group"
          error="Error Message (Fix is required)"
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
          name="warning-validations-group"
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
NewValidationDefaultGroup.storyName = "New Validation Group - String";

export const NewValidationDefaultGroupInline: Story = () => {
  return (
    <Box m={2}>
      <CarbonProvider validationRedesignOptIn>
        <RadioButtonGroup
          legend="Label"
          legendHelp="Hint Text"
          name="error-validations-group-inline"
          error="Error Message (Fix is required)"
          inline
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
          inline
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
NewValidationDefaultGroupInline.storyName = "New Validation Group - Inline";

export const Required: Story = () => (
  <RadioButtonGroup name="radio-group-required" required legend="Required">
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);
Required.storyName = "Required";

export const IsOptional: Story = () => (
  <RadioButtonGroup name="radio-group-optional" isOptional legend="Optional">
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);
IsOptional.storyName = "IsOptional";
