import React from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Badge from "./badge.component";
import Button from "../button";

export default {
  title: "Badge/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
    counterSpecialCharacters: specialCharacters,
  },
};

interface BadgeStoryProps {
  counter?: string | number;
  counterSpecialCharacters?: string;
}

export const DefaultStory = ({
  counter,
  counterSpecialCharacters,
  ...args
}: BadgeStoryProps) => {
  const handleClick = () => {
    action("click")();
  };
  return (
    <div style={{ margin: "40px" }}>
      <Badge
        onClick={handleClick}
        counter={counter || counterSpecialCharacters}
        {...args}
      >
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
    counterSpecialCharacters: undefined,
  },
};
