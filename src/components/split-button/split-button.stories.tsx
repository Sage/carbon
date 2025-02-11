import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button";
import Box from "../box";
import { Accordion } from "../accordion";
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
    <SplitButton disabled text="Split button">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};
Disabled.storyName = "Disabled";

export const ButtonTypes: Story = () => {
  return (
    <>
      {(["primary", "secondary"] as const).map((buttonType) => (
        <Box key={buttonType} mb={3}>
          <SplitButton
            buttonType={buttonType}
            text={`Split button - ${buttonType}`}
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
ButtonTypes.storyName = "Button Types";

export const ChildButtonTypes: Story = () => {
  return (
    <SplitButton text="Split Button">
      <Button>Default button</Button>
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

export const Align: Story = () => {
  return (
    <>
      {(["left", "right"] as const).map((align) => (
        <Box key={align} mb={3}>
          <SplitButton align={align} text={`Split button - ${align}`}>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
    </>
  );
};
Align.storyName = "Align";
Align.parameters = { chromatic: { disableSnapshot: true } };

export const Position: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <SplitButton position="left" text="Left position">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>

      <SplitButton position="right" text="Right position">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  );
};
Position.storyName = "Position";
Position.parameters = { chromatic: { disableSnapshot: true } };

export const Subtext: Story = () => {
  return (
    <SplitButton size="large" subtext="subtext" text="Split button">
      <Button size="large">Button 1</Button>
      <Button size="large">Button 2</Button>
      <Button size="large">Button 3</Button>
    </SplitButton>
  );
};
Subtext.storyName = "Subtext";

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

export const InOverflowHiddenContainer: Story = () => (
  <Accordion title="Heading">
    <Box p={4}>
      <SplitButton size="large" subtext="subtext" text="Split button">
        <Button size="large">Button 1</Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </SplitButton>
    </Box>
  </Accordion>
);
InOverflowHiddenContainer.storyName = "In Overflow Hidden Container";
InOverflowHiddenContainer.parameters = { chromatic: { disableSnapshot: true } };
