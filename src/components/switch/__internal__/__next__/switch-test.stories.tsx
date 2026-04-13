import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Switch } from ".";

const meta: Meta<typeof Switch> = {
  title: "Switch/Test",
  component: Switch,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const AllVariants: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    {/* Default / Checked */}
    <Switch
      label="Default (unchecked)"
      inputHint="Hint text"
      checked={false}
      onChange={() => {}}
    />
    <Switch
      label="Default (checked)"
      inputHint="Hint text"
      checked
      onChange={() => {}}
    />

    {/* Disabled */}
    <Switch
      label="Disabled (unchecked)"
      inputHint="Hint text"
      checked={false}
      disabled
      onChange={() => {}}
    />
    <Switch
      label="Disabled (checked)"
      inputHint="Hint text"
      checked
      disabled
      onChange={() => {}}
    />

    {/* Large size */}
    <Switch
      label="Large size (unchecked)"
      size="large"
      checked={false}
      onChange={() => {}}
    />
    <Switch
      label="Large size (checked)"
      size="large"
      checked
      onChange={() => {}}
    />
    <Switch
      label="Large size (unchecked)"
      inputHint="Hint text"
      size="large"
      checked={false}
      onChange={() => {}}
    />
    <Switch
      label="Large size (checked)"
      inputHint="Hint text"
      size="large"
      checked
      onChange={() => {}}
    />

    {/* Large size — disabled */}
    <Switch
      label="Large size, disabled (unchecked)"
      size="large"
      checked={false}
      disabled
      onChange={() => {}}
    />
    <Switch
      label="Large size, disabled (checked)"
      size="large"
      checked
      disabled
      onChange={() => {}}
    />

    {/* Label inline */}
    <Switch
      label="Label inline (unchecked)"
      labelInline
      checked={false}
      onChange={() => {}}
    />
    <Switch
      label="Label inline (checked)"
      labelInline
      checked
      onChange={() => {}}
    />

    {/* Label inline — labelSpacing */}
    <Switch
      label="Label inline, labelSpacing=1"
      labelInline
      labelSpacing={1}
      checked={false}
      onChange={() => {}}
    />
    <Switch
      label="Label inline, labelSpacing=2"
      labelInline
      labelSpacing={2}
      checked={false}
      onChange={() => {}}
    />

    {/* Label inline — labelWidth */}
    <Switch
      label="Label inline, labelWidth=30%"
      labelInline
      labelWidth={30}
      checked={false}
      onChange={() => {}}
    />

    {/* Label inline — with inputHint */}
    <Switch
      label="Label inline, with hint (unchecked)"
      inputHint="Hint text below the label"
      labelInline
      checked={false}
      onChange={() => {}}
    />
    <Switch
      label="Label inline, with hint (checked)"
      inputHint="Hint text below the label"
      labelInline
      checked
      onChange={() => {}}
    />

    {/* Loading — small */}
    <Switch
      label="Loading, small (unchecked)"
      checked={false}
      loading
      onChange={() => {}}
    />
    <Switch
      label="Loading, small (checked)"
      checked
      loading
      onChange={() => {}}
    />

    {/* Loading — large */}
    <Switch
      label="Loading, large (unchecked)"
      size="large"
      checked={false}
      loading
      onChange={() => {}}
    />
    <Switch
      label="Loading, large (checked)"
      size="large"
      checked
      loading
      onChange={() => {}}
    />

    {/* Loading — custom processingLabel */}
    <Switch
      label="Loading, custom processingLabel"
      checked={false}
      loading
      processingLabel="Saving changes..."
      onChange={() => {}}
    />

    {/* Loading — processingLabel below switch */}
    <Switch
      label="Loading, processingLabel below switch"
      checked={false}
      loading
      processingLabelBelowSwitch
      onChange={() => {}}
    />

    {/* Loading — processingLabel below switch, large */}
    <Switch
      label="Loading, processingLabel below switch (large)"
      size="large"
      checked={false}
      loading
      processingLabelBelowSwitch
      onChange={() => {}}
    />

    {/* Required — default size */}
    <Switch
      label="Required (unchecked)"
      checked={false}
      required
      onChange={() => {}}
    />
    <Switch label="Required (checked)" checked required onChange={() => {}} />

    {/* Required — large size */}
    <Switch
      label="Required, large (unchecked)"
      size="large"
      checked={false}
      required
      onChange={() => {}}
    />
    <Switch
      label="Required, large (checked)"
      size="large"
      checked
      required
      onChange={() => {}}
    />

    {/* No label */}
    <Switch checked={false} onChange={() => {}} />
    <Switch checked size="large" onChange={() => {}} />
  </div>
);
AllVariants.storyName = "All variants";
AllVariants.parameters = { chromatic: { disableSnapshot: false } };

export const Focused: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    <Switch
      label="Small (unchecked)"
      checked={false}
      data-role="switch-small-unchecked"
      onChange={() => {}}
    />
    <Switch
      label="Small (checked)"
      checked
      data-role="switch-small-checked"
      onChange={() => {}}
    />
    <Switch
      label="Large (unchecked)"
      size="large"
      checked={false}
      data-role="switch-large-unchecked"
      onChange={() => {}}
    />
    <Switch
      label="Large (checked)"
      size="large"
      checked
      data-role="switch-large-checked"
      onChange={() => {}}
    />
  </div>
);
Focused.storyName = "Focused";
Focused.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    focusWithin: true,
  },
};
