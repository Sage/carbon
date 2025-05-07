import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Box from "../box";
import Switch from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="switch-name"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
Default.storyName = "Default";

export const WithInputHint: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch
        label="Label"
        name="switch-name"
        labelHelp="Label Help"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </CarbonProvider>
  );
};
WithInputHint.storyName = "With Input Hint";

export const Sizes: Story = () => {
  return (
    <>
      <Switch label="small" name="switch-small" size="small" mb={2} />
      <Switch label="large" name="switch-large" size="large" />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return (
    <>
      <Switch label="Disabled switch" disabled />
      <Switch label="Disabled switch" disabled checked mt={2} />
    </>
  );
};
Disabled.storyName = "Disabled";

export const Required: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="required"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      required
    />
  );
};
Required.storyName = "Required";

export const Reversed: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Reversed switch"
      name="reversed"
      reverse={false}
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
Reversed.storyName = "Reversed";

export const IsOptional: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="switch-name"
      checked={isChecked}
      isOptional
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
IsOptional.storyName = "IsOptional";

export const Loading: Story = () => {
  return (
    <>
      <Switch checked label="small on" size="small" loading mb={2} />
      <Switch label="small off" size="small" loading mb={2} />
      <Switch checked label="large on" size="large" loading mb={2} />
      <Switch label="large off" size="large" loading mb={2} />
    </>
  );
};
Loading.storyName = "Loading";

export const WithLabelInline: Story = () => {
  return (
    <>
      <Switch label="With labelInline" labelInline mb={2} />
      <Switch
        label="With labelInline and reversed"
        labelInline
        reverse={false}
      />
    </>
  );
};
WithLabelInline.storyName = "With labelInline";

export const WithFieldHelp: Story = () => {
  return (
    <>
      <Switch
        label="With fieldHelp"
        fieldHelp="This text provides help for the input."
      />
      <Switch
        label="With inline fieldHelp"
        labelInline
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        mt={2}
      />
    </>
  );
};
WithFieldHelp.storyName = "With fieldHelp";

export const WithLabelHelp: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      helpAriaLabel="This text provides more information for the label."
      name="with-label-help"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
WithLabelHelp.storyName = "With labelHelp";

export const WithDarkBackground: Story = () => {
  return (
    <Box m={2} padding={3} backgroundColor="#000000">
      <CarbonProvider validationRedesignOptIn>
        <Switch label="Example Switch" isDarkBackground mb="2" />
        <Switch
          label="Example Switch"
          labelHelp="Hint text"
          error="Error message"
          isDarkBackground
        />
      </CarbonProvider>
    </Box>
  );
};
WithDarkBackground.storyName = "With Dark Background";
