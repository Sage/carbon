import React from "react";
import { ComponentStory } from "@storybook/react";
import Badge from ".";
import Button from "../button";

export const DefaultStory: ComponentStory<typeof Badge> = () => {
  return (
    <div style={{ margin: "40px" }}>
      <Badge counter={9}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </div>
  );
};

export const BadgeCounterWithThreeDigits: ComponentStory<typeof Badge> = () => {
  return (
    <div style={{ margin: "40px" }}>
      <Badge counter={130}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </div>
  );
};

export const BadgeCounterZero: ComponentStory<typeof Badge> = () => {
  return (
    <div style={{ margin: "40px" }}>
      <Badge counter={0}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </div>
  );
};
