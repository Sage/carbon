import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { RadioButtonGroup, RadioButton } from ".";

import Typography from "../typography";
import CarbonProvider from "../carbon-provider";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof RadioButton> = {
  title: "Deprecated/Radio Button",
  component: RadioButton,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = () => {
  const [value, setValue] = useState("");

  return (
    <RadioButtonGroup
      name="legend-and-labels-group"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
Default.storyName = "Default";

export const WithLegendAndLabels: Story = () => {
  const [value, setValue] = React.useState("");
  return (
    <RadioButtonGroup
      name="legend-and-labels-group"
      onChange={(ev) => setValue(ev.target.value)}
      legend="Radio group legend"
      value={value}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
WithLegendAndLabels.storyName = "With Legend";

export const WithLegendHelp: Story = () => {
  const [value, setValue] = useState("");
  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="input-hint-group"
        legend="With legendHelp"
        legendHelp="Legend Help"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
        <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
        <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};
WithLegendHelp.storyName = "With Legend Help";

export const WithInlineLegend: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="inline-legend-group"
      legend="Radio group legend"
      legendInline
      legendWidth={10}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
WithInlineLegend.storyName = "With Inline Legend";

export const EnableAdaptiveBehaviour: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="enable-adaptive-behaviour-group"
      legend="Radio group legend"
      ml="20%"
      adaptiveLegendBreakpoint={960}
      adaptiveSpacingBreakpoint={960}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="different-label-spacing-group"
      legend="Radio group legend"
      labelSpacing={2}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
DifferentLabelSpacing.storyName = "Label Spacing";

export const InlineRadioButtons: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="inline-group"
      legend="Radio group legend"
      inline
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton id="inline-radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="inline-radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="inline-radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
InlineRadioButtons.storyName = "Inline Radio Buttons";

export const ReverseRadioButtons: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="reverse-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="disable-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="field-help-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="large-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="custom-styled-label-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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

export const Required: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="radio-group-required"
      required
      legend="Required"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
Required.storyName = "Required";
