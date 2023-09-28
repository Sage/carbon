import React from "react";
import { ComponentStory } from "@storybook/react";

import MultiActionButton, { MultiActionButtonProps } from ".";
import Button from "../button";
import Box from "../box";
import { Accordion } from "../accordion";

export const DefaultStory: ComponentStory<typeof MultiActionButton> = (
  args
) => (
  <MultiActionButton {...args}>
    <Button href="#">Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </MultiActionButton>
);

DefaultStory.args = {
  text: "Multi Action Button",
};

DefaultStory.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled = DefaultStory.bind({});
Disabled.args = {
  text: "Multi Action Button",
  disabled: true,
};

export const Sizes = () => {
  return (["small", "medium", "large"] as const).map(
    (size: MultiActionButtonProps["size"]) => (
      <Box key={size} mb={3}>
        <MultiActionButton size={size} text={`Multi Action Button - ${size}`}>
          <Button size={size} href="#">
            Button 1
          </Button>
          <Button size={size}>Button 2</Button>
          <Button size={size}>Button 3</Button>
        </MultiActionButton>
      </Box>
    )
  );
};

export const CustomWidth: ComponentStory<typeof MultiActionButton> = (args) => (
  <MultiActionButton {...args}>
    <Button href="#">Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </MultiActionButton>
);

CustomWidth.args = {
  text: "Multi Action Button",
  width: 0.7,
};

export const ButtonTypes = () => {
  return (["primary", "secondary", "tertiary"] as const).map(
    (buttonType: MultiActionButtonProps["buttonType"]) => (
      <Box key={buttonType} mb={3}>
        <MultiActionButton
          buttonType={buttonType}
          text={`Multi Action Button - ${buttonType}`}
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    )
  );
};

export const ChildButtonTypes = () => {
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

ChildButtonTypes.parameters = { chromatic: { disableSnapshot: true } };

export const Alignment = () => {
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
    )
  );
};
Alignment.parameters = { chromatic: { disableSnapshot: true } };

export const Subtext = DefaultStory.bind({});
Subtext.args = {
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
};

export const InOverflowHiddenContainer = () => {
  return (
    <Accordion title="Heading">
      <Box p={4}>
        <MultiActionButton
          size="large"
          subtext="subtext"
          text="Multi Action Button"
        >
          <Button size="large" href="#">
            Button 1
          </Button>
          <Button size="large">Button 2</Button>
          <Button size="large">Button 3</Button>
        </MultiActionButton>
      </Box>
    </Accordion>
  );
};
InOverflowHiddenContainer.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithChildrenButtonsWithIcons: ComponentStory<
  typeof MultiActionButton
> = () => (
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

WithChildrenButtonsWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
