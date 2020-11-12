import React from "react";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Badge from "./badge.component";
import Button from "../button";

export default {
  title: "Design system/Badge/Test",
  component: Badge,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Basic = () => {
  const counter = number("counter", 1);
  const handleClick = () => {
    action("click")();
  };

  return (
    <Badge counter={counter} onClick={handleClick}>
      <Button style={{ marginRight: 0 }} buttonType="tertiary">
        Filter
      </Button>
    </Badge>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
