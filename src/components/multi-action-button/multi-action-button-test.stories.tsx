import React, { useState } from "react";
import { action } from "storybook/actions";
import { StoryObj } from "@storybook/react-vite";
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

type Story = StoryObj<typeof MultiActionButton>;

// Documentation regression stories moved from the public docs.

export const DefaultStory: Story = {
  render: (args: MultiActionButtonProps) => {
    return (
      <MultiActionButton {...args}>
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    );
  },
  args: { text: "Multi Action Button" },
  name: "Default",
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Disabled: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, text: "Multi Action Button", disabled: true },
  name: "Disabled",
};

export const Sizes: Story = () => {
  return (["small", "medium", "large"] as const).map(
    (size: MultiActionButtonProps["size"]) => (
      <Box key={size} mb={3}>
        <MultiActionButton size={size} text={`Multi Action Button - ${size}`}>
          <Button size={size} href="#">
            Button 1
          </Button>
          <Button size={size}>Button 2</Button>
          <Button size={size}>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
Sizes.storyName = "Sizes";

export const CustomWidth: Story = (args: MultiActionButtonProps) => {
  return (
    <MultiActionButton {...args}>
      <Button href="#">Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </MultiActionButton>
  );
};
CustomWidth.storyName = "Custom Width";
CustomWidth.args = {
  text: "Multi Action Button",
  width: 0.7,
};

export const ButtonTypes: Story = () => {
  return (["primary", "secondary", "tertiary"] as const).map(
    (buttonType: MultiActionButtonProps["buttonType"]) => (
      <Box key={buttonType} mb={3}>
        <MultiActionButton
          buttonType={buttonType}
          text={`Multi Action Button - ${buttonType}`}
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
ButtonTypes.storyName = "Button Types";

export const ChildButtonTypes: Story = () => {
  return (
    <MultiActionButton text="Multi Action Button">
      <Button>Default button</Button>
      <Button buttonType="primary">Primary</Button>
      <Button buttonType="primary" destructive>
        Primary - destructive
      </Button>
      <Button buttonType="secondary">Secondary</Button>
      <Button buttonType="secondary" destructive>
        Secondary - destructive
      </Button>
      <Button buttonType="tertiary">Tertiary</Button>
      <Button buttonType="tertiary" destructive>
        Tertiary - destructive
      </Button>
      <Button disabled>Disabled</Button>
    </MultiActionButton>
  );
};
ChildButtonTypes.storyName = "Child Button Types";
ChildButtonTypes.parameters = { chromatic: { disableSnapshot: true } };

export const Alignment: Story = () => {
  return (["left", "right"] as const).map(
    (align: MultiActionButtonProps["align"]) => (
      <Box key={align} mb={3}>
        <MultiActionButton
          align={align}
          text={`Multi Action Button - ${align}`}
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
Alignment.storyName = "Alignment";
Alignment.parameters = { chromatic: { disableSnapshot: true } };

export const Position: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <MultiActionButton position="left" text="Left position">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>

      <MultiActionButton position="right" text="Right position">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    </Box>
  );
};
Position.storyName = "Position";
Position.parameters = { chromatic: { disableSnapshot: true } };

export const Subtext: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    size: "large",
    text: "Multi Action Button",
    subtext: "subtext",
    children: (
      <>
        <Button size="large" href="#">
          Button 1
        </Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </>
    ),
  },
  name: "Subtext",
};

Disabled.parameters = { chromatic: { disableSnapshot: false } };
Sizes.parameters = { chromatic: { disableSnapshot: false } };
CustomWidth.parameters = { chromatic: { disableSnapshot: false } };
ButtonTypes.parameters = { chromatic: { disableSnapshot: false } };
Subtext.parameters = { chromatic: { disableSnapshot: false } };

const documentationDecorator = (StoryToRender: React.ComponentType) => (
  <Box mb="150px">
    <StoryToRender />
  </Box>
);

DefaultStory.decorators = [documentationDecorator];
Disabled.decorators = [documentationDecorator];
Sizes.decorators = [documentationDecorator];
CustomWidth.decorators = [documentationDecorator];
ButtonTypes.decorators = [documentationDecorator];
ChildButtonTypes.decorators = [documentationDecorator];
Alignment.decorators = [documentationDecorator];
Position.decorators = [documentationDecorator];
Subtext.decorators = [documentationDecorator];
