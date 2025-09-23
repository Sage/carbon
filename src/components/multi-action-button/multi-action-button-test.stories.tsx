import React from "react";
import { action } from "@storybook/addon-actions";
import MultiActionButton, {
  MultiActionButtonProps,
} from "./multi-action-button.component";
import Button from "../button";
import Box from "../box";
import Dialog from "../dialog";
import {
  MULTI_ACTION_BUTTON_ALIGNMENTS,
  MULTI_ACTION_BUTTON_SIZES,
  MULTI_ACTION_BUTTON_THEMES,
  MULTI_ACTION_BUTTON_POSITIONS,
} from "./multi-action-button.config";
import { StoryObj } from "@storybook/react/*";

type Story = StoryObj<typeof MultiActionButton>;

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

const WithinDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [normalButtonToggled, setNormalButtonToggled] = React.useState(false);
  const [dialogButtonToggled, setDialogButtonToggled] = React.useState(false);

  return (
    <Box display={"flex"} gap="20px" mb="20px" flexDirection={"column"}>
      <>
        <div>
          Result of standard implementation interaction:{" "}
          {normalButtonToggled ? "on" : "off"}
        </div>
        <div>
          Result of dialog implementation interaction:{" "}
          {dialogButtonToggled ? "on" : "off"}
        </div>
        <MultiActionButton text="Normal Options" buttonType="primary">
          <Button onClick={() => setNormalButtonToggled((p) => !p)}>
            Toggle normal state value
          </Button>
        </MultiActionButton>
        <Box maxWidth={300} mt={20} mb={20}>
          <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
          <Dialog open={isOpen} onCancel={() => setIsOpen(false)}>
            <MultiActionButton text="Dialog Options" buttonType="primary">
              <Button onClick={() => setDialogButtonToggled((p) => !p)}>
                Toggle dialog state value
              </Button>
              <Button
                onClick={() => alert("A second button which also works.")}
              >
                Show alert
              </Button>
            </MultiActionButton>
          </Dialog>
        </Box>
      </>
    </Box>
  );
};

export const MultiActionButtonWithinDialog: Story = {
  render: () => <WithinDialog />,
};
MultiActionButtonWithinDialog.story = {
  name: "within a dialog",
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
