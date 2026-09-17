import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button/__next__";
import Box from "../box";
import SplitButton, { SplitButtonHandle } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof SplitButton> = {
  title: "Split Button",
  component: SplitButton,
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
type Story = StoryObj<typeof SplitButton>;

export const Default: Story = () => {
  return (
    <SplitButton text="Split button">
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};
Default.storyName = "Default";
Default.parameters = { chromatic: { disableSnapshot: true } };

export const ProgrammaticFocus: Story = () => {
  const splitButtonHandle = useRef<SplitButtonHandle>(null);

  return (
    <Box display="flex" gap={6}>
      <Box display="flex" gap={1}>
        <Button onClick={() => splitButtonHandle.current?.focusMainButton()}>
          Focus Main Button
        </Button>
        <Button onClick={() => splitButtonHandle.current?.focusToggleButton()}>
          Focus Toggle Button
        </Button>
      </Box>
      <SplitButton ref={splitButtonHandle} text="Split button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  );
};
ProgrammaticFocus.storyName =
  "Focusing Main and Toggle Buttons Programmatically";
ProgrammaticFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: Story = () => {
  return (
    <Box mb={3}>
      <SplitButton disabled text="Split button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  );
};
Disabled.storyName = "Disabled";

export const ChildButtonTypes: Story = () => {
  return (
    <SplitButton text="Split Button">
      <Button variant="default" variantType="primary">
        Primary
      </Button>
      <Button variant="default" variantType="secondary">
        Secondary
      </Button>
      <Button variant="default" variantType="tertiary">
        Tertiary
      </Button>
      <Button variant="destructive" variantType="primary">
        Destructive Primary
      </Button>
      <Button disabled>Disabled</Button>
    </SplitButton>
  );
};
ChildButtonTypes.storyName = "Child Button Types";
ChildButtonTypes.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <Box key={size} mb={3}>
          <SplitButton size={size} text={`Split button - ${size}`}>
            <Button size={size}>Button 1</Button>
            <Button size={size}>Button 2</Button>
            <Button size={size}>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
    </>
  );
};
Sizes.storyName = "Sizes";

export const CustomMenuWidth: Story = () => {
  return (
    <SplitButton menuWidth="320px" text="Split button">
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};
CustomMenuWidth.storyName = "Custom Menu Width";
CustomMenuWidth.parameters = { chromatic: { disableSnapshot: true } };

export const WithIcon: Story = () => {
  return (
    <>
      {(["before", "after"] as const).map((iconPosition) => (
        <Box key={iconPosition} mb={3}>
          <SplitButton
            iconType="add"
            iconPosition={iconPosition}
            text={`Split button - ${iconPosition}`}
          >
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
    </>
  );
};
WithIcon.storyName = "With Icon";
