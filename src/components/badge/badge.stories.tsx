import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Badge from ".";
import Button from "../button/__next__";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

type BadgeStoryArgs = React.ComponentProps<typeof Badge> & {
  withButton?: boolean;
};

const meta: Meta<BadgeStoryArgs> = {
  title: "Badge",
  component: Badge,
  argTypes: {
    ...styledSystemProps,
    counter: {
      control: {
        type: "text",
      },
    },
    size: {
      control: { type: "radio" },
    },
    variant: {
      control: { type: "radio" },
    },
  },
  decorators: [
    (Story) => (
      <Box
        p={3}
        display="flex"
        justifyContent="center"
        gap={2}
        backgroundColor="--colorsUtilityMajor025"
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: StoryObj<BadgeStoryArgs> = {
  render: (args) => {
    const { withButton, ...badgeProps } = args;
    return (
      <Box mb={1}>
        <Badge
          id="badge-playground"
          {...badgeProps}
          counter={badgeProps.counter ?? 0}
        >
          {withButton && (
            <Button
              inverse={badgeProps.inverse}
              variantType="secondary"
              aria-describedby="badge-playground"
            >
              Filter
            </Button>
          )}
        </Badge>
      </Box>
    );
  },
  args: {
    counter: 99,
    size: "medium",
    variant: "typical",
    inverse: false,
    withButton: false,
  },
  argTypes: {
    withButton: {
      control: { type: "boolean" },
      description: "Render Badge with a Button child",
    },
  },
  decorators: [
    (Story, { args }) => (
      <Box
        p={3}
        display="flex"
        justifyContent="center"
        gap={2}
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

export const Default: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-default-1" counter={9} {...args} />
      <Badge id="badge-default-2" counter={99} {...args} />
      <Badge id="badge-default-3" counter="99+" {...args} />
      <Badge id="badge-default-4" counter="999+" {...args} />
    </>
  );
};
Default.storyName = "Default";
