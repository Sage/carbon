import React from "react";

import Box from "../box";
import { RadioButtonGroup, RadioButton } from ".";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
import { RadioButtonProps } from "./radio-button.component";
import Typography from "../typography";

export const Required = () => (
  <RadioButtonGroup name="required" legend="Radio group legend" required>
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);

export const WithValidationsOnButtons = () => (
  <RadioButtonGroup
    name="validations-on-buttons-group"
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

export const WithValidationsOnRadioGroup = () => (
  <RadioButtonGroup
    name="validations-on-group"
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

export const WithTooltipPosition = () => (
  <RadioButtonGroup name="tooltip-position" legend="Radio group legend">
    <RadioButton
      id="radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      tooltipPosition="right"
    />
  </RadioButtonGroup>
);

export const WithTooltipPositionOnRadioGroup = () => (
  <RadioButtonGroup
    name="validations-on-group-group-tooltip-position-override"
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

const radioContainerWidth = 400;

export const RadioButtonComponent = (props: Partial<RadioButtonProps>) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Box mt="64px" ml="64px" width={radioContainerWidth}>
      <RadioButton
        id="radio-1"
        value="radio1"
        label="Radiobutton 1"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        {...props}
      />
    </Box>
  );
};

export const RadioButtonGroupComponent = ({
  children,
  ...props
}: Partial<RadioButtonGroupProps>) => {
  return (
    <Box mt="64px" ml="64px">
      <RadioButtonGroup
        name="radiobuttongroup"
        legend="Radio group legend"
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />

        <>{children}</>
      </RadioButtonGroup>
    </Box>
  );
};

export const Default = () => {
  return (
    <RadioButtonGroup name="legend-and-labels-group">
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};

export const WithLegendAndLabels = () => {
  return (
    <RadioButtonGroup
      name="legend-and-labels-group"
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
};

export const WithInlineLegend = () => {
  return (
    <RadioButtonGroup
      name="inline-legend-group"
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

export const WithLeftMargin = () => {
  return (
    <RadioButtonGroup
      name="left-margin-group"
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

export const EnableAdaptiveBehaviour = () => {
  return (
    <RadioButtonGroup
      name="enable-adaptive-behaviour-group"
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

EnableAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };

export const DifferentLabelSpacing = () => {
  return (
    <RadioButtonGroup
      name="different-label-spacing-group"
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

export const InlineRadioButtons = () => {
  return (
    <RadioButtonGroup name="inline-group" legend="Radio group legend" inline>
      <RadioButton id="inline-radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="inline-radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="inline-radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};

export const ReverseRadioButtons = () => {
  return (
    <RadioButtonGroup name="reverse-group" legend="Radio group legend">
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

export const DisableRadioButtons = () => {
  return (
    <RadioButtonGroup name="disable-group" legend="Radio group legend">
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

export const WithFieldHelp = () => {
  return (
    <RadioButtonGroup name="field-help-group" legend="Radio group legend">
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

export const WithLargeRadioButtons = () => {
  return (
    <RadioButtonGroup name="large-group" legend="Radio group legend">
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

export const WithCustomStyledLabels = () => {
  return (
    <RadioButtonGroup
      name="custom-styled-label-group"
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
