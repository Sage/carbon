import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Switch from "./switch.component";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
Default.storyName = "Default";

export const Checked: Story = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
Checked.storyName = "Checked";

export const Disabled: Story = () => (
  <Switch
    label="Toggle notifications"
    inputHint="Hint text"
    checked={false}
    disabled
    onChange={() => {}}
  />
);
Disabled.storyName = "Disabled";

export const DisabledChecked: Story = () => (
  <Switch
    label="Toggle notifications"
    checked
    disabled
    inputHint="Hint text"
    onChange={() => {}}
  />
);
DisabledChecked.storyName = "Disabled (checked)";

export const Required: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      required
    />
  );
};
Required.storyName = "Required";

export const LargeSize: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      size="large"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
LargeSize.storyName = "Large size";

export const LabelInline: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      labelInline
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
LabelInline.storyName = "Label inline";

export const LabelInlineWithHint: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Label"
      inputHint="Hint text"
      labelInline
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
LabelInlineWithHint.storyName = "Label inline with hint";

export const Loading: Story = () => (
  <>
    <Switch
      label="Toggle notifications"
      checked={false}
      loading
      onChange={() => {}}
    />

    <Switch
      label="Toggle notifications"
      checked
      loading
      onChange={() => {}}
      ml="8px"
    />

    <Switch
      size="large"
      label="Toggle notifications"
      checked={false}
      loading
      onChange={() => {}}
      ml="8px"
    />

    <Switch
      size="large"
      label="Toggle notifications"
      checked
      loading
      onChange={() => {}}
      ml="8px"
    />
  </>
);
Loading.storyName = "Loading";

export const LoadingCustomLabel: Story = () => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabel="Saving changes..."
    onChange={() => {}}
  />
);
LoadingCustomLabel.storyName = "Loading with custom processingLabel";

export const LoadingLabelBelow: Story = () => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabelBelowSwitch
    onChange={() => {}}
  />
);
LoadingLabelBelow.storyName = "Loading with processingLabel below switch";
