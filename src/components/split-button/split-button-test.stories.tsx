import React from "react";
import { action } from "storybook/actions";
import Button from "../button/__next__";
import Box from "../box";
import { ICONS } from "../icon/icon-config";

import SplitButton, { SplitButtonProps } from "./split-button.component";
import { Accordion } from "../..";

export default {
  title: "Split Button/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    iconType: {
      options: ["", ...ICONS],
      control: {
        type: "select",
      },
    },
    iconPosition: {
      options: ["before", "after"],
      control: {
        type: "select",
      },
    },
    buttonType: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
    menuWidth: {
      control: {
        type: "text",
      },
    },
    align: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    position: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
  },
};

export const SplitButtonStory = ({
  buttonType,
  subtext,
  ...args
}: Partial<SplitButtonProps>) => (
  <Box height={400} mt={100} ml={100}>
    <SplitButton
      buttonType={buttonType}
      text="text"
      subtext={subtext}
      {...args}
      onClick={action("click")}
    >
      <Button onClick={action("click")}>Example Button</Button>
      <Button onClick={action("click")}>Example Button with long text</Button>
      <Button onClick={action("click")}>Short</Button>
    </SplitButton>
  </Box>
);

SplitButtonStory.story = {
  name: "default",
  args: {
    iconType: "",
    iconPosition: "before",
    buttonType: "primary",
    dataElement: "data-element",
    dataRole: "",
    disabled: false,
    size: "medium",
    align: "left",
    text: "Example Split Button",
    subtext: "",
  },
};

export const InOverflowHiddenContainer = () => (
  <Accordion title="Heading">
    <Box p={4}>
      <SplitButton size="large" text="Split button">
        <Button size="large">Button 1</Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </SplitButton>
    </Box>
  </Accordion>
);
InOverflowHiddenContainer.storyName = "In Overflow Hidden Container";
InOverflowHiddenContainer.parameters = { chromatic: { disableSnapshot: true } };
