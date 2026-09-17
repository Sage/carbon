import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import MultiActionButton, {
  MultiActionButtonProps,
  MultiActionButtonHandle,
} from ".";
import Button from "../button/__next__";
import Box from "../box";
import Loader from "../../components/loader/__next__";
import { Badge } from "../..";

import MultiActionButtonDivider from "./multi-action-button-divider/multi-action-button-divider.component";

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
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
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
          <Button size={size}>Button 1</Button>
          <Button size={size}>Button 2</Button>
          <Button size={size}>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
Sizes.storyName = "Sizes";

export const Scrollable: Story = () => {
  return (["small", "medium", "large"] as const).map(
    (size: MultiActionButtonProps["size"]) => (
      <Box key={size} mb={3}>
        <MultiActionButton size={size} text={`Multi Action Button - ${size}`}>
          <Button size={size}>Button 1</Button>
          <Button size={size}>Button 2</Button>
          <Button size={size}>Button 3</Button>
          <Button size={size}>Button 4</Button>
          <Button size={size}>Button 5</Button>
          <Button size={size}>Button 6</Button>
          <Button size={size}>Button 7</Button>
          <Button size={size}>Button 8</Button>
          <Button size={size}>Button 9</Button>
          <Button size={size}>Button 10</Button>
          <Button size={size}>Button 11</Button>
          <Button size={size}>Button 12</Button>
          <Button size={size}>Button 13</Button>
          <Button size={size}>Button 14</Button>
          <Button size={size}>Button 15</Button>
          <Button size={size}>Button 16</Button>
          <Button size={size}>Button 17</Button>
          <Button size={size}>Button 18</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
Scrollable.storyName = "Scrollable";

export const CustomWidth: Story = (args: MultiActionButtonProps) => {
  return (
    <MultiActionButton {...args} width="30%" menuWidth="180px">
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};
CustomWidth.storyName = "Custom Width";
CustomWidth.args = {
  text: "Multi Action Button",
};

export const MenuWidth: Story = (args: MultiActionButtonProps) => {
  return (
    <MultiActionButton {...args} menuWidth="350px">
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};
MenuWidth.storyName = "Menu Width";
MenuWidth.args = {
  text: "Multi Action Button",
};

export const FullWidth: Story = (args: MultiActionButtonProps) => {
  return (
    <MultiActionButton {...args}>
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};
FullWidth.storyName = "Full Width";
FullWidth.args = {
  text: "Multi Action Button",
  fullWidth: true,
};

export const ButtonTypes: Story = () => {
  return (["primary", "secondary", "tertiary", "subtle"] as const).map(
    (buttonType: MultiActionButtonProps["variantType"]) => (
      <Box key={buttonType} mb={3}>
        <MultiActionButton
          variantType={buttonType}
          text={`Multi Action Button - ${buttonType}`}
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
ButtonTypes.storyName = "Button Types";

export const LoadingState: Story = () => {
  return (["primary", "secondary", "tertiary"] as const).map(
    (buttonType: MultiActionButtonProps["buttonType"]) => (
      <Box key={buttonType} mb={3}>
        <Button>
          <Loader variant="inline" loaderType="ring" size="extra-small" />
        </Button>
        <Button>
          <Loader
            variant="inline"
            loaderType="ring"
            loaderLabel="Chargement..."
            size="extra-small"
          />
        </Button>
      </Box>
    ),
  );
};
LoadingState.storyName = "Loading State";

export const BadgeState: Story = () => {
  return (
    <Box mb={3}>
      <Badge
        id="badge-custom-color"
        counter={9}
        onClick={() => {}}
        aria-label={`Remove 9 filters.`}
        variant="subtle"
      >
        <MultiActionButton buttonType="primary" text="Multi Action Button">
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Badge>
    </Box>
  );
};
BadgeState.storyName = "With Badge";

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
  return (
    <Box>
      <Box mb={3}>
        <MultiActionButton
          align="right"
          text={`Multi Action Button - right`}
          menuWidth="180px"
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
      <Box mb={3}>
        <MultiActionButton
          align="left"
          text={`Multi Action Button - left`}
          menuWidth="180px"
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    </Box>
  );
};
Alignment.storyName = "Alignment";
Alignment.parameters = { chromatic: { disableSnapshot: true } };

export const Position: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <MultiActionButton position="left" text="Left position" menuWidth="220px">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>

      <MultiActionButton
        position="right"
        text="Right position"
        menuWidth="220px"
      >
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

export const WithDivider: Story = () => {
  return (
    <>
      <MultiActionButton text="Multi Action Button" menuWidth="150px">
        <Button iconPosition="before" iconType="add">
          Child Button 1
        </Button>
        <Button iconPosition="before" iconType="upload">
          Child Button 2
        </Button>
        <MultiActionButtonDivider />
        <Button iconPosition="before" iconType="clock">
          Child Button 3
        </Button>
      </MultiActionButton>
    </>
  );
};
WithDivider.storyName = "With Divider";
WithDivider.parameters = {
  chromatic: { disableSnapshot: true },
};

export const IconOnly: Story = () => {
  return (
    <>
      <MultiActionButton text="Multi Action Button" iconOnly>
        <Button iconPosition="before" iconType="add">
          Child Button 1
        </Button>
        <Button iconPosition="before" iconType="upload">
          Child Button 2
        </Button>
        <MultiActionButtonDivider />
        <Button iconPosition="before" iconType="clock">
          Child Button 3
        </Button>
      </MultiActionButton>
    </>
  );
};
IconOnly.storyName = "Icon Only";
IconOnly.parameters = {
  chromatic: { disableSnapshot: true },
};
