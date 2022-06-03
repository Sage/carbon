import React from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../../.storybook/utils/argTypes/specialCharacters";
import MultiActionButton, {
  MultiActionButtonProps,
} from "./multi-action-button.component";
import Button from "../button";
import {
  MULTI_ACTION_BUTTON_ALIGNMENTS,
  MULTI_ACTION_BUTTON_SIZES,
  MULTI_ACTION_BUTTON_THEMES,
} from "./multi-action-button.config";

export default {
  title: "Multi Action Button/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
    textSpecialCharacters: specialCharacters,
    subtextSpecialCharacters: specialCharacters,
  },
};

type MultiActionButtonStoryArgs = {
  buttonType?: MultiActionButtonProps["buttonType"];
  textContent: string;
  text: string;
  textSpecialCharacters: string;
  subtext: string;
  subtextSpecialCharacters: string;
};

export const MultiActionButtonStory = ({
  buttonType,
  text,
  textSpecialCharacters,
  subtext,
  subtextSpecialCharacters,
  ...args
}: MultiActionButtonStoryArgs) => (
  <MultiActionButton
    buttonType={buttonType}
    text={text || textSpecialCharacters}
    subtext={subtext || subtextSpecialCharacters}
    onClick={action("click")}
    {...args}
  >
    <Button {...args}>Example Button</Button>
    <Button {...args}>Example Button with long text</Button>
    <Button {...args}>Short</Button>
  </MultiActionButton>
);

MultiActionButtonStory.story = {
  name: "default",
  args: {
    align: "left",
    buttonType: "secondary",
    size: "medium",
    subtext: "",
    text: "Example Multi Action Button",
    textSpecialCharacters: undefined,
    subtextSpecialCharacters: undefined,
  },
};
