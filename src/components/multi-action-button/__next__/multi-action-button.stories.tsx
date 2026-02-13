import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Divider from "../../divider";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import MultiActionButton, {
  MultiActionButtonProps,
  MultiActionButtonHandle,
} from ".";
import Button from "../../button";
import Box from "../../box";

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

export const DefaultStory: Story = {
  render: (args: MultiActionButtonProps) => {
    return (
      <MultiActionButton {...args}>
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    );
  },
  args: { text: "Multi Action Button" },
  name: "Default",
  parameters: { chromatic: { disableSnapshot: true } },
};

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

export const Disabled: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, text: "Multi Action Button", disabled: true },
  name: "Disabled",
};

export const Sizes: Story = () => {
  return (["small", "medium", "large"] as const).map(
    (size: MultiActionButtonProps["size"]) => (
      <Box key={size} mb={3}>
        <MultiActionButton size={size} text={`Multi Action Button - ${size}`}>
          <Button size={size} href="#">
            Button 1
          </Button>
          <Button size={size}>Button 2</Button>
          <Box px={3}>
            <Divider type="horizontal" my={1} px={1} />
          </Box>
          <Button size={size}>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
Sizes.storyName = "Sizes";

export const CustomWidth: Story = (args: MultiActionButtonProps) => {
  return (
    <MultiActionButton {...args}>
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};
CustomWidth.storyName = "Custom Width";
CustomWidth.args = {
  text: "Multi Action Button",
  menuWidth: 0.7,
};

export const ChildButtonTypes: Story = () => {
  return (
    <MultiActionButton text="Multi Action Button">
      <Button>Default button</Button>
      <Button buttonType="primary">Primary</Button>
      <Button buttonType="primary" destructive>
        Primary - destructive
      </Button>
      <Button buttonType="secondary">Secondary</Button>
      <Button buttonType="secondary" destructive>
        Secondary - destructive
      </Button>
      <Button buttonType="tertiary">Tertiary</Button>
      <Button buttonType="tertiary" destructive>
        Tertiary - destructive
      </Button>
      <Button disabled>Disabled</Button>
    </MultiActionButton>
  );
};
ChildButtonTypes.storyName = "Child Button Types";
ChildButtonTypes.parameters = { chromatic: { disableSnapshot: true } };

export const Alignment: Story = () => {
  return (["left", "right"] as const).map(
    (align: MultiActionButtonProps["align"]) => (
      <Box key={align} mb={3}>
        <MultiActionButton
          align={align}
          text={`Multi Action Button - ${align}`}
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
Alignment.storyName = "Alignment";
Alignment.parameters = { chromatic: { disableSnapshot: true } };

export const Position: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <MultiActionButton position="left" text="Left position">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>

      <MultiActionButton position="right" text="Right position">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    </Box>
  );
};
Position.storyName = "Position";
Position.parameters = { chromatic: { disableSnapshot: true } };

export const Subtext: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    size: "large",
    text: "Multi Action Button",
    subtext: "subtext",
    children: (
      <>
        <Button size="large" href="#">
          Button 1
        </Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </>
    ),
  },
  name: "Subtext",
};

export const WithChildrenButtonsWithIcons: Story = () => {
  return (
    <>
      {(["before", "after"] as const).map((iconPosition) => (
        <MultiActionButton
          align={iconPosition === "before" ? "left" : "right"}
          text="Multi Action Button"
        >
          <Button iconPosition={iconPosition} iconType="add">
            Child Button 1
          </Button>
          <Button iconPosition={iconPosition} iconType="upload">
            Child Button 2
          </Button>
          <Button iconPosition={iconPosition} iconType="clock">
            Child Button 3
          </Button>
        </MultiActionButton>
      ))}
    </>
  );
};
WithChildrenButtonsWithIcons.storyName = "With Children Buttons With Icons";
WithChildrenButtonsWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
