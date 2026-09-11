import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Icon, { ICON_COLOR_TYPES } from ".";
import Box from "../box";

import { ICONS } from "./icon-config";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
  argTypes: {
    ...styledSystemProps,
    type: {
      options: Object.keys(ICONS),
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    color: {
      options: ICON_COLOR_TYPES,
      control: { type: "select" },
    },
    inverse: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  render: (args) => <Icon {...args} />,
  args: {
    type: "add",
    size: "medium",
    color: "neutral",
    inverse: false,
  },
  decorators: [
    (Story, { args }) => (
      <Box
        p={2}
        backgroundColor={
          args.inverse
            ? "var(--mode-color-generic-bg-inverse-nought)"
            : "var(--mode-color-generic-bg-nought)"
        }
      >
        <Story />
      </Box>
    ),
  ],
};
Playground.storyName = "Playground";

export const ListOfIcons: Story = () => {
  return (
    <Box m={2} display="grid" gridTemplateColumns="repeat(4, 1fr)">
      {ICONS.sort().map((type) => {
        return (
          <Box m={1} key={`icon-${type}`}>
            <Icon m={1} type={type} />
            {type}
          </Box>
        );
      })}
    </Box>
  );
};
ListOfIcons.storyName = "List of Icons";
ListOfIcons.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};
