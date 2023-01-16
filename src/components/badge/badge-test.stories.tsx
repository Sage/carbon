import React from "react";
import { action } from "@storybook/addon-actions";

import Badge from "./badge.component";
import Button from "../button";

export default {
  title: "Badge/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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

DefaultStory.story = {
  name: "default",
  args: {
    counter: 1,
  },
};
