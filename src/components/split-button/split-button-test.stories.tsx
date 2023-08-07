import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Button, { ButtonProps } from "../button";
import Box from "../box";
import { ICONS } from "../icon/icon-config";
import Dialog from "../dialog";
import {
  SPLIT_BUTTON_ALIGNMENTS,
  SPLIT_BUTTON_ICON_POSITIONS,
  SPLIT_BUTTON_SIZES,
  SPLIT_BUTTON_THEMES,
} from "./split-button.config";
import SplitButton, { SplitButtonProps } from "./split-button.component";

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
      options: SPLIT_BUTTON_ICON_POSITIONS,
      control: {
        type: "select",
      },
    },
    buttonType: {
      options: SPLIT_BUTTON_THEMES,
      control: {
        type: "select",
      },
    },
    size: {
      options: SPLIT_BUTTON_SIZES,
      control: {
        type: "select",
      },
    },
    align: {
      options: SPLIT_BUTTON_ALIGNMENTS,
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
      <Button {...args} onClick={action("click")}>
        Example Button
      </Button>
      <Button {...args} onClick={action("click")}>
        Example Button with long text
      </Button>
      <Button {...args} onClick={action("click")}>
        Short
      </Button>
    </SplitButton>
  </Box>
);

SplitButtonStory.story = {
  name: "default",
  args: {
    iconType: "",
    iconPosition: "before",
    buttonType: "secondary",
    dataElement: "data-element",
    dataRole: "",
    disabled: false,
    size: "medium",
    align: "left",
    text: "Example Split Button",
    subtext: "",
  },
};

export const SplitButtonList = (props: Partial<SplitButtonProps>) => {
  return (
    <SplitButton text="default text" {...props}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};

export const SplitButtonNestedInDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <SplitButton text="default text">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Dialog>
  );
};

const ButtonWrapper = (props: ButtonProps) => {
  return <Button {...props} />;
};

export const WithWrapper = (props: Partial<SplitButtonProps>) => (
  <SplitButton text="Split button" {...props}>
    <ButtonWrapper>Button 1</ButtonWrapper>
    <ButtonWrapper>Button 2</ButtonWrapper>
    <ButtonWrapper>Button 3</ButtonWrapper>
  </SplitButton>
);
