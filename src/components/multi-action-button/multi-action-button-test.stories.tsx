import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Dialog from "../dialog";
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
);

MultiActionButtonStory.story = {
  name: "default",
  args: {
    align: "left",
    buttonType: "secondary",
    size: "medium",
    subtext: "",
    text: "Example Multi Action Button",
  },
};

export const MultiActionButtonList = (
  props: Partial<MultiActionButtonProps>
) => {
  return (
    <div>
      <MultiActionButton text="Multi Action Button" {...props}>
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </div>
  );
};

export const MultiActionNestedInDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <MultiActionButton text="default text">
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </Dialog>
  );
};

export const MultiActionWithHrefChildren = () => (
  <MultiActionButton text="default text">
    <Button href="#">Button 1</Button>
    <Button>Button 2</Button>
    <Button href="#">Button 3</Button>
  </MultiActionButton>
);

export const MultiActionButtonWithOneChild = () => (
  <MultiActionButton text="default text">
    <Button>Button 1</Button>
  </MultiActionButton>
);
