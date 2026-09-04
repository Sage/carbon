import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
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
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
    },
    label: {
      control: "text",
    },
    inputHint: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: "Toggle notifications",
    inputHint: "Hint text",
    disabled: false,
    loading: false,
    required: false,
    size: "small",
    processingLabel: "Processing...",
    processingLabelBelowSwitch: false,
    labelInline: false,
    labelSpacing: 1,
    labelWidth: 30,
  },
};
Playground.storyName = "Playground";
