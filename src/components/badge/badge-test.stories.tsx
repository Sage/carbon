import React from "react";
import { action } from "storybook/actions";
import Badge from ".";
import Box from "../box";
import Button from "../button";
import MultiActionButton from "../multi-action-button";
import SplitButton from "../split-button";

export default {
  title: "Badge/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
interface BadgeStoryProps {
  counter?: string | number;
}

export const DefaultStory = ({ counter, ...args }: BadgeStoryProps) => {
  const handleClick = () => {
    action("click")();
  };
  return (
    <div style={{ margin: "40px" }}>
      <Badge onClick={handleClick} counter={counter} {...args}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </div>
  );
};
DefaultStory.storyName = "default";
DefaultStory.args = { counter: 1, color: "--colorsActionMajor500" };

export const DisplayOnlyStory = ({ counter, ...args }: BadgeStoryProps) => {
  return (
    <Box margin="40px">
      <Badge counter={counter} {...args}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
DisplayOnlyStory.storyName = "display only";
DisplayOnlyStory.args = { counter: 1, color: "--colorsActionMajor500" };

export const WithOtherButtons = () => {
  return (
    <>
      <Badge counter={2} onClick={() => {}}>
        <MultiActionButton text="Multi action">
          <Button onClick={() => {}}>Action</Button>
          <Button onClick={() => {}}>Action</Button>
        </MultiActionButton>
      </Badge>

      <Badge counter={2} onClick={() => {}}>
        <SplitButton text="Split button">
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SplitButton>
      </Badge>
    </>
  );
};
WithOtherButtons.parameters = {
  chromatic: { disableSnapshot: false },
};
