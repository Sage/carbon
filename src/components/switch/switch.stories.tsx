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
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Switch
        label="small"
        name="switch-small"
        size="small"
        mb={2}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        label="large"
        name="switch-large"
        size="large"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Switch
        label="Disabled switch"
        disabled
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        label="Disabled switch"
        disabled
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        mt={2}
      />
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

export const Loading: Story = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <>
      <Switch
        label="small on"
        size="small"
        loading
        mb={2}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        label="small off"
        size="small"
        loading
        mb={2}
        checked={false}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        checked={false}
        onChange={(e) => setIsChecked(e.target.checked)}
        label="large on"
        size="large"
        loading
        mb={2}
      />
      <Switch
        label="large off"
        size="large"
        checked={false}
        onChange={(e) => setIsChecked(e.target.checked)}
        loading
        mb={2}
      />
    </>
  );
};
Loading.storyName = "Loading";

export const WithLabelInline: Story = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <>
      <Switch
        label="With labelInline"
        labelInline
        mb={2}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        label="With labelInline and reversed"
        labelInline
        reverse={false}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </>
  );
};
WithLabelInline.storyName = "With labelInline";

export const WithFieldHelp: Story = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <>
      <Switch
        label="With fieldHelp"
        fieldHelp="This text provides help for the input."
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <Switch
        label="With inline fieldHelp"
        labelInline
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        mt={2}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
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
  const [isChecked, setIsChecked] = useState(true);
  return (
    <Box m={2} padding={3} backgroundColor="#000000">
      <CarbonProvider validationRedesignOptIn>
        <Switch
          label="Example Switch"
          isDarkBackground
          mb="2"
          fieldHelp="Field help text"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <Switch
          label="Example Switch"
          labelHelp="Hint text"
          error="Error message"
          fieldHelp="Field help text"
          isDarkBackground
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </CarbonProvider>
    </Box>
  );
};
WithDarkBackground.storyName = "With Dark Background";
