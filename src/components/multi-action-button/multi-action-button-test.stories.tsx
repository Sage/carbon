import React from "react";
import { action } from "storybook/actions";
import MultiActionButton, {
  MultiActionButtonProps,
} from "./multi-action-button.component";
import Button from "../button";
import Box from "../box";
import {
  MULTI_ACTION_BUTTON_ALIGNMENTS,
  MULTI_ACTION_BUTTON_SIZES,
  MULTI_ACTION_BUTTON_THEMES,
  MULTI_ACTION_BUTTON_POSITIONS,
} from "./multi-action-button.config";

export default {
  title: "Multi Action Button/Test",
  includeStories: ["MultiActionButtonStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    align: {
      options: MULTI_ACTION_BUTTON_ALIGNMENTS,
      control: {
        type: "select",
      },
    },
    buttonType: {
      options: MULTI_ACTION_BUTTON_THEMES,
      control: {
        type: "select",
      },
    },
    size: {
      options: MULTI_ACTION_BUTTON_SIZES,
      control: {
        type: "select",
      },
    },
    position: {
      options: MULTI_ACTION_BUTTON_POSITIONS,
      control: {
        type: "select",
      },
    },
  },
};

type MultiActionButtonStoryArgs = {
  buttonType?: MultiActionButtonProps["buttonType"];
  textContent: string;
  text: string;
  subtext: string;
};

export const MultiActionButtonStory = ({
  buttonType,
  text,
  subtext,
  ...args
}: MultiActionButtonStoryArgs) => (
  <Box height={400} mt={100} ml={100}>
    <MultiActionButton
      buttonType={buttonType}
      text={text}
      subtext={subtext}
      onClick={action("click")}
      {...args}
    >
      <Button {...args}>Example Button</Button>
      <Button {...args}>Example Button with long text</Button>
      <Button {...args}>Short</Button>
    </MultiActionButton>
  </Box>
);

MultiActionButtonStory.story = {
  name: "default",
  args: {
    align: "left",
    buttonType: "secondary",
    size: "medium",
    subtext: "",
    text: "Multi Action Button",
    position: "left",
  },
};
