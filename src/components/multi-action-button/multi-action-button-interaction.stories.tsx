import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import React from "react";

import MultiActionButton from ".";
import Button from "../button";
import Box from "../box";
import { Accordion } from "../accordion";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof MultiActionButton>;

export default {
  title: "Multi Action Button/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const ButtonTypes: Story = {
  render: () => (
    <MultiActionButton text="Multi Action Button">
      <Button onClick={() => {}} buttonType="primary" iconType="home">
        Button - primary
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        buttonType="primary"
        iconType="home"
      >
        Button - primary hover
      </Button>
      <Button
        onClick={() => {}}
        buttonType="primary"
        destructive
        iconType="home"
      >
        Button - primary destructive
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        buttonType="primary"
        destructive
        iconType="home"
      >
        Button - primary destructive hover
      </Button>
      <Button onClick={() => {}} iconType="home" buttonType="primary" disabled>
        Button - primary disabled
      </Button>
      <Button onClick={() => {}} buttonType="secondary" iconType="home">
        Button - secondary
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        buttonType="secondary"
        iconType="home"
      >
        Button - secondary hover
      </Button>
      <Button
        onClick={() => {}}
        buttonType="secondary"
        destructive
        iconType="home"
      >
        Button - secondary destructive
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        buttonType="secondary"
        destructive
        iconType="home"
      >
        Button - secondary destructive hover
      </Button>
      <Button
        onClick={() => {}}
        iconType="home"
        buttonType="secondary"
        disabled
      >
        Button - secondary disabled
      </Button>
      <Button onClick={() => {}} buttonType="tertiary" iconType="home">
        Button - tertiary
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        buttonType="tertiary"
        iconType="home"
      >
        Button - tertiary hover
      </Button>
      <Button
        onClick={() => {}}
        buttonType="tertiary"
        destructive
        iconType="home"
      >
        Button - tertiary destructive
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        buttonType="tertiary"
        destructive
        iconType="home"
      >
        Button - tertiary destructive hover
      </Button>
      <Button onClick={() => {}} iconType="home" buttonType="tertiary" disabled>
        Button - tertiary disabled
      </Button>
    </MultiActionButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Multi Action Button" });
    await userEvent.click(button);
    const menuButton = within(document.body).getByText("Button - primary");
    await expect(menuButton).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ButtonTypes.storyName = "Button Types";
ButtonTypes.parameters = {
  pseudo: {
    hover: "[data-role='target']",
  },
};

export const SmallLeft: Story = {
  render: () => (
    <MultiActionButton
      text="Multi Action Button"
      align="left"
      position="left"
      size="small"
    >
      <Button href="#" iconType="home" size="small">
        Button 1 with longer text
      </Button>
      <Button href="#" iconType="home" size="small">
        Button 2
      </Button>
      <Button data-role="target" href="#" iconType="home" size="small">
        Button 3
      </Button>
      <Button href="#" iconType="home" size="small">
        Button 4
      </Button>
    </MultiActionButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Multi Action Button" });
    await userEvent.click(button);

    await userEvent.tab();
    await userEvent.tab();
    const menuButton = within(document.body).getByText("Button 2");
    await expect(menuButton).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
SmallLeft.storyName = "Small with Align & Position Left";
SmallLeft.parameters = {
  pseudo: {
    hover: "[data-role='target']",
  },
};

export const LargeRight: Story = {
  render: () => (
    <MultiActionButton
      text="Multi Action Button"
      align="right"
      position="right"
      size="large"
    >
      <Button
        onClick={() => {}}
        iconType="home"
        iconPosition="after"
        size="large"
      >
        Button 1 with longer text
      </Button>
      <Button
        onClick={() => {}}
        iconType="home"
        iconPosition="after"
        size="large"
      >
        Button 2
      </Button>
      <Button
        data-role="target"
        onClick={() => {}}
        iconType="home"
        iconPosition="after"
        size="large"
      >
        Button 3
      </Button>
      <Button
        onClick={() => {}}
        iconType="home"
        iconPosition="after"
        size="large"
      >
        Button 4
      </Button>
    </MultiActionButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Multi Action Button" });
    await userEvent.click(button);

    await userEvent.tab();
    await userEvent.tab();
    const menuButton = within(document.body).getByText("Button 2");
    await expect(menuButton).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
LargeRight.storyName = "Large with Align & Position Right";
LargeRight.parameters = {
  pseudo: {
    hover: "[data-role='target']",
  },
};

export const InOverflowHiddenContainer: Story = {
  render: () => (
    <Accordion title="Heading">
      <Box p={4}>
        <MultiActionButton text="Multi Action Button" onClick={() => {}}>
          <Button onClick={() => {}}>Button 1</Button>
          <Button onClick={() => {}}>Button 2</Button>
          <Button onClick={() => {}}>Button 3</Button>
        </MultiActionButton>
      </Box>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const accordion = canvas.getByRole("button", { name: "Heading" });
    await userEvent.click(accordion, { delay: 500 });

    const button = canvas.getByRole("button", { name: "Multi Action Button" });
    await userEvent.click(button);
    const menuButton = within(document.body).getByText("Button 1");
    await expect(menuButton).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
InOverflowHiddenContainer.storyName = "In Overflow Hidden Container";
