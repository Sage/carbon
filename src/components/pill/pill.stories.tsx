import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import Pill from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Pill> = {
  title: "Pill",
  component: Pill,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    ...styledSystemProps,
    colorVariant: {
      control: false,
    },
    isDarkBackground: {
      control: false,
    },
    pillRole: {
      control: false,
    },
    size: {
      options: ["S", "M", "L"],
      control: { type: "radio" },
    },
    children: {
      control: "text",
    },
    onDelete: {
      options: ["none", "removable"],
      mapping: {
        none: undefined,
        removable: action("onDelete"),
      },
      control: { type: "radio" },
    },
    icon: {
      options: ["none", "info"],
      mapping: {
        none: undefined,
        info: <Icon type="info" />,
      },
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Playground: Story = {
  render: (args) => {
    return (
      <Box mb={1}>
        <Pill {...args}>{args.children}</Pill>
      </Box>
    );
  },
  args: {
    children: "Label",
    variant: "grey",
    size: "M",
    fill: true,
    inverse: false,
    onDelete: undefined,
    icon: undefined,
  },
};
Playground.storyName = "Playground";

export const Wrapped: Story = () => {
  return (
    <Box mb={1}>
      <Pill maxWidth="65px" wrapText>
        Wrapped pill
      </Pill>
      <Pill ml={1} maxWidth="55px" wrapText>
        Hyphe&shy;nated&shy;pill
      </Pill>
    </Box>
  );
};
Wrapped.storyName = "Wrapped";

export const WithRemoveButton: Story = () => {
  const [isPillVisible, setIsPillVisible] = useState(true);
  const hidePill = () => setIsPillVisible(false);
  const showPill = () => setIsPillVisible(true);
  return (
    <>
      <Button onClick={showPill}>Reset example</Button>
      <Box m={1}>{isPillVisible && <Pill onDelete={hidePill}>Pill</Pill>}</Box>
    </>
  );
};
WithRemoveButton.storyName = "With Remove Button";

export const InverseOnDarkBackground: Story = {
  render: (args) => {
    return (
      <Box backgroundColor="#262626" p={2} display="flex" gap={1}>
        <Pill {...args} inverse>
          {args.children}
        </Pill>
        <Pill {...args} inverse fill>
          {args.children}
        </Pill>
      </Box>
    );
  },
  args: {
    children: "Label",
    variant: "blue",
    size: "M",
    onDelete: undefined,
    icon: undefined,
  },
};
InverseOnDarkBackground.storyName = "Inverse on Dark Background";
