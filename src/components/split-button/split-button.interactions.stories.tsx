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

export const OpenPopover: Story = {
  render: () => (
    <Wrapper>
      <SplitButton buttonType="primary" text="Primary Action">
        <Button>Option 1</Button>
        <Button data-role="target">Option 2</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId(/toggle-button/i);

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
      <SplitButton text="Focus Test">
        <Button data-role="focus-target">Focus Me</Button>
        <Button>Another Button</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId(/toggle-button/i);

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
      <SplitButton text="With Disabled">
        <Button>Enabled</Button>
        <Button disabled data-role="focus-disabled">Disabled</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId(/toggle-button/i);
    await userEvent.click(toggleButton);
    await userInteractionPause(500);

    const disabledButton = canvas.getByText("Disabled");
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
      <SplitButton text="With Icons">
        <Button iconType="add">Add</Button>
        <Button iconType="delete" destructive>Delete</Button>
        <Button iconType="info" aria-label="Info" />
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId(/toggle-button/i);
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
      <SplitButton position="left" align="left" text="Left Aligned">
        <Button data-role="target">Left</Button>
      </SplitButton>
      <SplitButton position="right" align="right" text="Right Aligned">
        <Button data-role="target">Right</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

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
      <SplitButton size="small" text="Small">
        <Button size="small">Small Option</Button>
      </SplitButton>
      <SplitButton size="medium" text="Medium">
        <Button size="medium">Medium Option</Button>
      </SplitButton>
      <SplitButton size="large" text="Large">
        <Button size="large">Large Option</Button>
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

    for (const toggle of toggleButtons) {
      await userEvent.click(toggle);
      await userInteractionPause(500);
      await userEvent.keyboard("{Escape}");
      await userInteractionPause(300);
    }
  },
  decorators: [(StoryToRender) => <DefaultDecorator><StoryToRender /></DefaultDecorator>],
};
SizeVariations.storyName = "Size Variations";

export const Accessibility: Story = {
  render: () => (
    <Wrapper>
      <SplitButton buttonType="primary" text="Accessible Split">
        <Button data-role="target" aria-label="Save">Save</Button>
        <Button iconType="info" aria-label="More Info" />
      </SplitButton>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId(/toggle-button/i);
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
