import React from "react";
import { StoryObj, StoryFn } from "@storybook/react-vite";
import { userEvent, within, expect } from "storybook/test";

import SplitButton from ".";
import Button from "../button/__next__";
import Box from "../box";
import { InOverflowHiddenContainer } from "./split-button-test.stories";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof SplitButton>;

export default {
  title: "Split Button/Interactions",
  component: SplitButton,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <Box mb="150px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
};

export const DefaultSplitButton: Story = {
  render: () => (
    <SplitButton text="Split button - default">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const primaryToggle = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(primaryToggle);
    expect(primaryToggle).toHaveAttribute("aria-expanded", "true");
  },
};

export const SmallSplitButton: Story = {
  render: () => (
    <SplitButton size="small" text="Split button - small">
      <Button size="small">Small Button 1</Button>
      <Button size="small">Small Button 2</Button>
      <Button size="small">Small Button 3</Button>
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const smallToggle = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(smallToggle);
    await expect(smallToggle).toHaveAttribute("aria-expanded", "true");
  },
};

export const MediumSplitButton: Story = {
  render: () => (
    <SplitButton size="medium" text="Split button - medium">
      <Button size="medium">Medium Button 1</Button>
      <Button size="medium">Medium Button 2</Button>
      <Button size="medium">Medium Button 3</Button>
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const mediumToggle = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(mediumToggle);
    await expect(mediumToggle).toHaveAttribute("aria-expanded", "true");
  },
};

export const LargeSplitButton: Story = {
  render: () => (
    <SplitButton size="large" text="Split button - large">
      <Button size="large">Large Button 1</Button>
      <Button size="large">Large Button 2</Button>
      <Button size="large">Large Button 3</Button>
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const largeToggle = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(largeToggle);
    await expect(largeToggle).toHaveAttribute("aria-expanded", "true");
  },
};

export const DisabledChildSplitButton: Story = {
  render: () => (
    <SplitButton text="Disabled Child Test">
      <Button>Enabled Child</Button>
      <Button disabled>Disabled Child</Button>
      <Button>Another Enabled Child</Button>
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const toggle = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggle);

    const allChildButtons = canvas
      .getAllByRole("button")
      .filter(
        (btn) =>
          !btn.getAttribute("data-element") &&
          btn.textContent?.includes("Child"),
      );

    expect(allChildButtons).toHaveLength(3);

    const enabledChild1 = allChildButtons[0];
    const disabledChild = allChildButtons[1];
    const enabledChild2 = allChildButtons[2];

    expect(enabledChild1).not.toBeDisabled();
    expect(disabledChild).toBeDisabled();
    expect(enabledChild2).not.toBeDisabled();

    await userEvent.hover(disabledChild);
    await expect(disabledChild).toBeDisabled();
  },
};

export const IconsSplitButton: Story = {
  render: () => (
    <SplitButton text="Split button with icons">
      <Button iconType="add">Add</Button>
      <Button iconType="delete" destructive>
        Delete
      </Button>
      <Button iconType="info" aria-label="Info" />
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const toggle = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggle);

    const iconOnly = canvas.getByLabelText("Info");
    await userEvent.hover(iconOnly);

    await expect(iconOnly).toHaveAccessibleName("Info");
    await expect(iconOnly).toHaveAttribute("aria-label", "Info");
  },
};

export const ChildButtonFocusState: Story = {
  render: () => (
    <SplitButton text="Child Focus Test">
      <Button data-role="first-child">First Child</Button>
      <Button data-role="second-child">Second Child</Button>
      <Button data-role="third-child">Third Child</Button>
    </SplitButton>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);

    const childButtons = [
      canvasElement.querySelector('[data-role="first-child"]'),
      canvasElement.querySelector('[data-role="second-child"]'),
      canvasElement.querySelector('[data-role="third-child"]'),
    ].filter(Boolean) as HTMLElement[];

    expect(childButtons).toHaveLength(3);
    expect(childButtons[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(childButtons[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(childButtons[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(childButtons[1]).toHaveFocus();

    await userEvent.keyboard("{Home}");
    expect(childButtons[0]).toHaveFocus();

    await userEvent.keyboard("{End}");
    await expect(childButtons[2]).toHaveFocus();

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  },
};

export const InOverflowContainer: Story = {
  render: () => <InOverflowHiddenContainer />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    // Expand the accordion to reveal the SplitButton
    const accordionButton = canvas.getByRole("button", { name: /heading/i });
    await userEvent.click(accordionButton);

    const splitButtonToggle = canvas.getByRole("button", {
      name: /show more/i,
    });

    await userEvent.click(splitButtonToggle);
    await expect(splitButtonToggle).toHaveAttribute("aria-expanded", "true");
  },
};
