import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Button, { ButtonProps } from ".";
import Box from "../box";
import Loader from "../loader";
import Typography from "../typography";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

export default {
  title: "Button/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

type Story = StoryObj<typeof Button>;

export const OnClick: Story = {
  render: () => (
    <>
      <Button mt={2} buttonType="primary" size="medium" ml={2}>
        Primary
      </Button>
      <Box>
        <Button mt={2} buttonType="secondary" size="medium" ml={2}>
          Secondary
        </Button>
      </Box>
      <Button mt={2} buttonType="tertiary" size="medium" ml={2}>
        Tertiary
      </Button>
      <Box>
        <Button mt={2} buttonType="primary" size="medium" ml={2} destructive>
          Primary Destructive
        </Button>
      </Box>
      <Button mt={2} buttonType="secondary" size="medium" ml={2} destructive>
        Secondary Destructive
      </Button>
      <Box>
        <Button mt={2} buttonType="tertiary" size="medium" ml={2} destructive>
          Tertiary Destructive
        </Button>
      </Box>
      <Box>
        <Button mt={2} buttonType="gradient-white" size="medium" ml={2}>
          Gradient White
        </Button>
      </Box>
      <Box>
        <Button mt={2} buttonType="gradient-grey" size="medium" ml={2}>
          Gradient Grey
        </Button>
      </Box>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");
    await userEvent.click(button[0]);
    await expect(button[0]).toHaveFocus();
    await userEvent.click(button[1]);
    await expect(button[1]).toHaveFocus();
    await userEvent.click(button[2]);
    await expect(button[2]).toHaveFocus();
    await userEvent.click(button[3]);
    await expect(button[3]).toHaveFocus();
    await userEvent.click(button[4]);
    await expect(button[4]).toHaveFocus();
    await userEvent.click(button[5]);
    await expect(button[5]).toHaveFocus();
    await userEvent.click(button[6]);
    await expect(button[6]).toHaveFocus();
    await userEvent.click(button[7]);
    await expect(button[7]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
OnClick.storyName = "On Click";

export const FocusAndHoverStates: Story = {
  render: () => (
    <>
      <Button mt={2} buttonType="primary" size="medium" data-role="target">
        Primary
      </Button>
      <Box>
        <Button mt={2} buttonType="secondary" size="medium" data-role="target">
          Secondary
        </Button>
      </Box>
      <Button mt={2} buttonType="tertiary" size="medium" data-role="target">
        Tertiary
      </Button>
      <Box>
        <Button
          mt={2}
          buttonType="primary"
          size="medium"
          destructive
          data-role="target"
        >
          Primary Destructive
        </Button>
      </Box>
      <Button
        mt={2}
        buttonType="secondary"
        size="medium"
        destructive
        data-role="target"
      >
        Secondary Destructive
      </Button>
      <Box>
        <Button
          mt={2}
          buttonType="tertiary"
          size="medium"
          destructive
          data-role="target"
        >
          Tertiary Destructive
        </Button>
      </Box>
      <Box>
        <Button
          mt={2}
          buttonType="gradient-white"
          size="medium"
          data-role="target"
        >
          Gradient White
        </Button>
      </Box>
      <Box>
        <Button
          mt={2}
          buttonType="gradient-grey"
          size="medium"
          data-role="target"
        >
          Gradient Grey
        </Button>
      </Box>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");
    await userEvent.hover(button[0]);
    await userEvent.click(button[0]);
    await expect(button[0]).toHaveFocus();
    await userEvent.hover(button[1]);
    await userEvent.tab();
    await expect(button[1]).toHaveFocus();
    await userEvent.hover(button[2]);
    await userEvent.tab();
    await expect(button[2]).toHaveFocus();
    await userEvent.hover(button[3]);
    await userEvent.tab();
    await expect(button[3]).toHaveFocus();
    await userEvent.hover(button[4]);
    await userEvent.tab();
    await expect(button[4]).toHaveFocus();
    await userEvent.hover(button[5]);
    await userEvent.tab();
    await expect(button[5]).toHaveFocus();
    await userEvent.hover(button[6]);
    await userEvent.tab();
    await expect(button[6]).toHaveFocus();
    await userEvent.hover(button[7]);
    await userEvent.tab();
    await expect(button[7]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusAndHoverStates.storyName = "Focus and Hover States";
FocusAndHoverStates.parameters = {
  pseudo: {
    hover: '[data-role="target"]',
    focus: '[data-role="target"]',
  },
};

export const DisabledFocus: Story = {
  render: () => (
    <>
      <Button mt={2} buttonType="primary" size="medium" ml={2}>
        Button
      </Button>
      <Box>
        <Button mt={2} buttonType="secondary" size="medium" ml={2} disabled>
          Disabled
        </Button>
      </Box>
      <Box>
        <Button mt={2} buttonType="secondary" size="medium" ml={2}>
          Button
        </Button>
      </Box>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");

    await userEvent.tab();
    await expect(button[0]).toHaveFocus();
    await userEvent.tab();
    await expect(button[1]).not.toHaveFocus();
    await expect(button[2]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DisabledFocus.storyName = "Disabled Button Focus";

export const KeyboardInteraction: Story = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    action("click")();
  };

  return (
    <>
      <Button onClick={handleClick} subtext={subtext} {...args}>
        {children}
        Button
      </Button>
      <Box>
        <Typography variant="p"> Button clicked: {count} </Typography>
      </Box>
    </>
  );
};
KeyboardInteraction.play = async ({ canvasElement }) => {
  if (!allowInteractions()) {
    return;
  }

  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  const clickedText = canvas.getByRole("paragraph");

  await userEvent.tab();
  await expect(button).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  await expect(clickedText).toHaveTextContent("Button clicked: 1");
  await userEvent.type(button, "{space}");
  await expect(clickedText).toHaveTextContent("Button clicked: 2");
};
KeyboardInteraction.decorators = [
  (StoryToRender) => (
    <DefaultDecorator>
      <StoryToRender />
    </DefaultDecorator>
  ),
];
KeyboardInteraction.storyName = "Keyboard Interaction";

export const ButtonLoader: Story = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mimicLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleButtonClick = () => {
    mimicLoading();
  };
  const buttonContent = isLoading ? <Loader isInsideButton /> : "Click Me";

  return (
    <>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={handleButtonClick}>
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={handleButtonClick}>
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={handleButtonClick}>
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button
          m={2}
          buttonType="primary"
          onClick={handleButtonClick}
          destructive
        >
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button
          m={2}
          buttonType="secondary"
          onClick={handleButtonClick}
          destructive
        >
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button
          m={2}
          buttonType="tertiary"
          onClick={handleButtonClick}
          destructive
        >
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={handleButtonClick}>
          {buttonContent}
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-white" onClick={handleButtonClick}>
          {buttonContent}
        </Button>
      </Box>
    </>
  );
};
ButtonLoader.play = async ({ canvasElement }) => {
  if (!allowInteractions()) {
    return;
  }

  const canvas = within(canvasElement);
  const button = canvas.getAllByRole("button");
  await userEvent.click(button[0]);
  await expect(button[0]).toHaveTextContent("Loading");
};
ButtonLoader.decorators = (StoryToRender) => (
  <DefaultDecorator>
    <StoryToRender />
  </DefaultDecorator>
);
ButtonLoader.storyName = "Button Loader";
ButtonLoader.parameters = { chromatic: { disableSnapshot: true } };
