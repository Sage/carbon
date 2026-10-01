import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import MultiActionButton, {
  MultiActionButtonProps,
  MultiActionButtonHandle,
} from ".";
import Button from "../button";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  width: true,
  margin: true,
});

const meta: Meta<typeof MultiActionButton> = {
  title: "Multi Action Button",
  component: MultiActionButton,
  argTypes: {
    ...styledSystemProps,
  },
  decorators: [
    (Story) => (
      <Box mb="150px">
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiActionButton>;

export const Playground: Story = {
  render: (args: MultiActionButtonProps) => {
    return (
      <MultiActionButton {...args}>
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    );
  },
  args: {
    text: "Multi Action Button",
    disabled: false,
    buttonType: "primary",
    size: "medium",
    subtext: "Additional information",
    width: "fit-content",
    align: "left",
    position: "left",
  },
};
Playground.storyName = "Playground";

export const ProgrammaticFocus: Story = () => {
  const multiActionButtonHandle = useRef<MultiActionButtonHandle>(null);

  return (
    <Box display="flex" gap={2}>
      <Button
        onClick={() => multiActionButtonHandle.current?.focusMainButton()}
      >
        Focus Button
      </Button>
      <MultiActionButton
        ref={multiActionButtonHandle}
        text="Multi Action Button"
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    </Box>
  );
};
ProgrammaticFocus.storyName = "Focusing Main Button Programmatically";
ProgrammaticFocus.parameters = { chromatic: { disableSnapshot: true } };

export const WithChildrenButtonsWithIcons: Story = () => {
  return (
    <>
      <MultiActionButton align="left" text="Multi Action Button">
        <Button iconPosition="before" iconType="add">
          Child Button 1
        </Button>
        <Button iconPosition="before" iconType="upload">
          Child Button 2
        </Button>
        <Button iconPosition="before" iconType="clock">
          Child Button 3
        </Button>
      </MultiActionButton>

      <MultiActionButton align="right" text="Multi Action Button">
        <Button iconPosition="after" iconType="add">
          Child Button 1
        </Button>
        <Button iconPosition="after" iconType="upload">
          Child Button 2
        </Button>
        <Button iconPosition="after" iconType="clock">
          Child Button 3
        </Button>
      </MultiActionButton>
    </>
  );
};
WithChildrenButtonsWithIcons.storyName = "With Children Buttons With Icons";
WithChildrenButtonsWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
