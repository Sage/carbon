import React from "react";
import { ComponentStory } from "@storybook/react";

import SplitButton from ".";
import Button from "../button";
import Box from "../box";
import { Accordion } from "../accordion";

export const Default: ComponentStory<typeof SplitButton> = () => (
  <SplitButton text="Split button">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </SplitButton>
);
Default.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: ComponentStory<typeof SplitButton> = () => (
  <SplitButton disabled text="Split button">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </SplitButton>
);

export const ButtonTypes: ComponentStory<typeof SplitButton> = () => {
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

export const Sizes: ComponentStory<typeof SplitButton> = () => {
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

export const Align: ComponentStory<typeof SplitButton> = () => {
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
Align.parameters = { chromatic: { disableSnapshot: true } };

export const Subtext: ComponentStory<typeof SplitButton> = () => (
  <SplitButton size="large" subtext="subtext" text="Split button">
    <Button size="large">Button 1</Button>
    <Button size="large">Button 2</Button>
    <Button size="large">Button 3</Button>
  </SplitButton>
);

export const WithIcon: ComponentStory<typeof SplitButton> = () => {
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

export const InOverflowHiddenContainer: ComponentStory<
  typeof SplitButton
> = () => (
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
InOverflowHiddenContainer.parameters = { chromatic: { disableSnapshot: true } };
