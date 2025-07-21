import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import SplitButton from ".";
import Button from "../button";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof SplitButton>;

export default {
  title: "Split Button/Interactions",
  component: SplitButton,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const Wrapper = (props: { children: React.ReactNode }) => (
  <Box display="flex" flexDirection="column" gap="32px">
    {props.children}
  </Box>
);

export const ButtonTypes: Story = {
  render: () => (
    <Wrapper>
      {(["primary", "secondary"] as const).map((buttonType) => (
        <Box key={buttonType} mb={3}>
          <SplitButton
            buttonType={buttonType}
            text={`Split button - ${buttonType}`}
          >
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
      <Box p={2} width="298px" backgroundColor="#000">
        <SplitButton
          buttonType="secondary"
          text="Split button - secondary - white"
          isWhite
        >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SplitButton>
      </Box>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByRole('button', { name: /show more/i });

    for (const toggle of toggleButtons) {
      await userEvent.click(toggle);
      await userInteractionPause(500);
      await userEvent.keyboard("{Escape}");
      await userInteractionPause(300);
    }
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
ButtonTypes.storyName = "Button Types";

export const OpenPopover: Story = {
  render: () => (
    <Wrapper>
      <SplitButton buttonType="primary" text="Split button">
        <Button>Option 1</Button>
        <Button data-role="target">Option 2</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(600);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveAttribute("aria-controls");

    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
OpenPopover.storyName = "Open Popover";

export const FocusStates: Story = {
  render: () => (
    <Wrapper>
      <SplitButton text="Split button">
        <Button data-role="focus-target">Focus Me</Button>
        <Button>Another Button</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);

    const focusTarget = canvas.getByText("Focus Me");
    focusTarget.focus();
    await userInteractionPause(600);

    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);

    expect(document.activeElement).toHaveAttribute("data-element", "toggle-button");
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
FocusStates.storyName = "Focus Management";

export const DisabledState: Story = {
  render: () => (
    <Wrapper>
      <SplitButton disabled text="Split button">
        <Button>Enabled</Button>
        <Button data-role="focus-disabled">Disabled</Button>
      </SplitButton>

       <Box p={2} width="298px" backgroundColor="#000">
        <SplitButton
          buttonType="secondary"
          text="Split button - secondary - white"
          isWhite
          disabled
        >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SplitButton>
      </Box>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /show more/i });
    await userEvent.click(toggleButton);
    await userInteractionPause(500);

    const disabledButton = canvas.getByRole('button', { name: 'Disabled' });
    await userEvent.hover(disabledButton);
    await userInteractionPause(500);

    expect(disabledButton).toBeDisabled();
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
DisabledState.storyName = "Disabled Child Buttons";

export const ButtonsWithIcons: Story = {
  render: () => (
    <Wrapper>
      <SplitButton text="Split button">
        <Button iconType="add">Add</Button>
        <Button iconType="delete" destructive>Delete</Button>
        <Button iconType="info" aria-label="Info" />
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /show more/i });
    await userEvent.click(toggleButton);
    await userInteractionPause(500);

    const iconOnly = canvas.getByLabelText("Info");
    await userEvent.hover(iconOnly);
    await userInteractionPause(500);

    expect(iconOnly).toHaveAccessibleName("Info");
    expect(iconOnly).toHaveAttribute("aria-label", "Info");
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
ButtonsWithIcons.storyName = "Child Buttons with Icons";

export const PopoverPositioning: Story = {
  render: () => (
    <Box display="flex" justifyContent="space-between">
      <SplitButton position="left" align="left" text="Split button">
        <Button data-role="target">Left</Button>
      </SplitButton>
      <SplitButton position="right" align="right" text="Split button">
        <Button data-role="target">Right</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByRole('button', { name: /show more/i });

    await userEvent.click(toggleButtons[0]);
    await userInteractionPause(500);
    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);

    await userEvent.click(toggleButtons[1]);
    await userInteractionPause(500);
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
PopoverPositioning.storyName = "Popover Positioning";

export const SizeVariations: Story = {
  render: () => (
    <Wrapper>
      <SplitButton size="small" text="Split button = small">
        <Button size="small">Small Option</Button>
      </SplitButton>
      <SplitButton size="medium" text="Split button = medium">
        <Button size="medium">Medium Option</Button>
      </SplitButton>
      <SplitButton size="large" text="Split button = large">
        <Button size="large">Large Option</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByRole('button', { name: /show more/i });

    for (const toggle of toggleButtons) {
      await userEvent.click(toggle);
      await userInteractionPause(500);
      await userEvent.keyboard("{Escape}");
      await userInteractionPause(300);
    }
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
SizeVariations.storyName = "Sizes";

export const Accessibility: Story = {
  render: () => (
    <Wrapper>
      <SplitButton buttonType="primary" text="Split button">
        <Button data-role="target" aria-label="Save">Save</Button>
        <Button iconType="info" aria-label="More Info" />
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /show more/i });
    await userEvent.click(toggleButton);
    await userInteractionPause(600);

    const infoButton = canvas.getByLabelText("More Info");
    expect(infoButton).toHaveAttribute("aria-label", "More Info");
    expect(infoButton).toHaveAttribute("role", "button");

    await userEvent.tab();
    expect(document.activeElement).toHaveAttribute("data-element", "main-button");

    await userEvent.tab();
    expect(document.activeElement).toHaveAttribute("data-element", "toggle-button");
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
Accessibility.storyName = "Accessibility (ARIA, Role, Tab Order)";