import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";

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
import styledSystemProps from "../../../.storybook/utils/styled-system-props";

export default {
  title: "Multi Action Button/Test",
  includeStories: [
    "MultiActionButtonStory",
    "MultiActionButtonClick",
    "MultiActionButtonKeyboard",
  ],
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

// Play Functions
const meta: Meta<typeof MultiActionButton> = {
  title: "MultiActionButton",
  component: MultiActionButton,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };
type Story = StoryObj<typeof MultiActionButton>;

const MultiActionButtonDefaultComponent = () => {
  return (
    <MultiActionButton text="Multi Action Button">
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};

export const MultiActionButtonClick: Story = {
  render: () => <MultiActionButtonDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const ButtonComponent = canvas.getByRole("button");

    await userEvent.click(ButtonComponent);
  },
};

export const MultiActionButtonKeyboard: Story = {
  render: () => <MultiActionButtonDefaultComponent />,
  play: async () => {
    await userEvent.tab();
    await userEvent.keyboard("{arrowdown}");
    // wait for 300ms to simulate a user using a keyboard
    await waitFor(
      () =>
        new Promise((res) => {
          setTimeout(res, 300);
        })
    );
    await userEvent.keyboard("{arrowdown}");
    await waitFor(
      () =>
        new Promise((res) => {
          setTimeout(res, 300);
        })
    );
    await userEvent.keyboard("{arrowdown}");
    await waitFor(
      () =>
        new Promise((res) => {
          setTimeout(res, 300);
        })
    );
    await userEvent.keyboard("{arrowup}");
    await waitFor(
      () =>
        new Promise((res) => {
          setTimeout(res, 300);
        })
    );
    await userEvent.keyboard("{arrowup}");
  },
};
