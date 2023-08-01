/* eslint-disable no-console */
import React from "react";
import { RadioButtonGroup, RadioButton } from ".";
import Typography from "../typography";
import CarbonProvider from "../../components/carbon-provider";
import Box from "../../components/box";

export const Default = () => (
  <RadioButtonGroup name="legend-and-labels-group">
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);

export const WithLegendAndLabels = () => (
  <RadioButtonGroup
    name="legend-and-labels-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
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

export const WithInlineLegend = () => (
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

export const WithLeftMargin = () => (
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

export const EnableAdaptiveBehaviour = () => (
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

EnableAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };

export const DifferentLabelSpacing = () => (
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

export const InlineRadioButtons = () => (
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

export const ReverseRadioButtons = () => (
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

export const DisableRadioButtons = () => (
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

export const WithFieldHelp = () => (
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

export const WithLargeRadioButtons = () => (
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

export const WithCustomStyledLabels = () => (
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

export const NewValidationDefault = () => (
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

export const NewValidationDefaultGroup = () => (
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

export const NewValidationDefaultGroupInline = () => (
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
