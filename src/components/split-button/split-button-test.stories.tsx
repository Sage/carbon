import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

import Button from "../button";
import Box from "../box";
import { ICONS } from "../icon/icon-config";
import {
  SPLIT_BUTTON_ALIGNMENTS,
  SPLIT_BUTTON_ICON_POSITIONS,
  SPLIT_BUTTON_SIZES,
  SPLIT_BUTTON_THEMES,
  SPLIT_BUTTON_POSITIONS,
} from "./split-button.config";
import SplitButton, { SplitButtonProps } from "./split-button.component";

export default {
  title: "Split Button/Test",
  includeStories: [
    "SplitButtonStory",
    "SplitButtonClick",
    "SplitButtonKeyboard",
    "SplitButtonKeyboardNavDown",
  ],
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
    position: {
      options: SPLIT_BUTTON_POSITIONS,
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

// Play Functions
const meta: Meta<typeof SplitButton> = {
  title: "SplitButton",
  component: SplitButton,
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof SplitButton>;

const SplitDefaultComponent = () => {
  return (
    <SplitButton text="Multi Action Button">
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};

export const SplitButtonClick: Story = {
  render: () => <SplitDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ButtonComponent = canvas.getByRole("button", { name: "Show more" });

    await userEvent.click(ButtonComponent);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

SplitButtonClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const SplitButtonKeyboard: Story = {
  render: () => <SplitDefaultComponent />,
  play: async () => {
    await userEvent.tab();
    await userInteractionPause(300);
    await userEvent.tab();
    await userInteractionPause(300);

    await userEvent.keyboard("{enter}");
  },
};

export const SplitButtonKeyboardNavDown: Story = {
  render: () => <SplitDefaultComponent />,
  play: async () => {
    await userEvent.tab();
    await userInteractionPause(300);
    await userEvent.tab();
    await userInteractionPause(300);
    await userEvent.keyboard("{enter}");
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowdown}");
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowdown}");
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

SplitButtonKeyboardNavDown.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
