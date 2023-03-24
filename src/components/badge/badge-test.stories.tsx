import React from "react";
import { action } from "@storybook/addon-actions";

import Badge from "./badge.component";
import Box from "../box";
import Button from "../button";

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

DefaultStory.storyName = "default";
DefaultStory.args = { counter: 1 };

DisplayOnlyStory.storyName = "display only";
DisplayOnlyStory.args = { counter: 1 };
