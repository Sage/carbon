import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
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
import Dialog from "../dialog";

export default {
  title: "Multi Action Button/Test",
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

export const WithinDialog = {
  render: function WithinDialog() {
    const [open, setOpen] = useState(false);

    const handleClick = action("onClick");

    return (
      <>
        <MultiActionButton text="Multi Action Button" buttonType="primary">
          <Button onClick={handleClick}>Export file</Button>
        </MultiActionButton>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <MultiActionButton text="Multi Action Button" buttonType="primary">
            <Button onClick={handleClick}>Export file</Button>
          </MultiActionButton>
        </Dialog>
      </>
    );
  },
};
