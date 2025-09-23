import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Typography from "../typography";
import VerticalDivider from "../vertical-divider";
import Image from "../image";
import point from "../../../.assets/point.svg";

import DismissibleBox from ".";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof DismissibleBox> = {
  title: "Deprecated/Dismissible Box",
  component: DismissibleBox,
  render: (args) => (
    <DismissibleBox {...args}>
      <Box display="flex">
        <Typography mb={0}>
          Well, that's certainly good to know. Your head is not an artifact!
          Maybe if we felt any human loss as keenly as we feel one of those
          close to us, human history would be far less bloody. Wouldn't that
          bring about chaos? Shields up! Rrrrred alert! Travel time to the
          nearest starbase? I'm afraid I still don't understand, sir. You
          enjoyed that. The Enterprise computer system is controlled by three
          primary main processor cores, cross-linked with a redundant melacortz
          ramistat, fourteen kiloquad interface modules. Well, that's certainly
          good to know. Your head is not an artifact! Rrrrred alert! Rrrrred
          alert! Rrrrred alert!
        </Typography>
        <VerticalDivider p={0} px={2} />
        <Image alt="Example alt text" src={point} width="120px" />
      </Box>
    </DismissibleBox>
  ),
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof DismissibleBox>;

export const LightVariant: Story = {
  args: { onClose: () => {} },
};

export const DarkVariant: Story = {
  args: { variant: "dark", onClose: () => {} },
};

export const WithNoLeftBorderHighlight: Story = {
  args: { mb: 2, hasBorderLeftHighlight: false, onClose: () => {} },
};

export const WidthOverridden: Story = {
  args: { width: "650px", onClose: () => {} },
};
