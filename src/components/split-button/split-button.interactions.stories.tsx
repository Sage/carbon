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

export const PrimaryButtonType: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton buttonType="primary" text="Split button - primary">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
PrimaryButtonType.storyName = "Primary Button";

export const SecondaryButtonType: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton buttonType="secondary" text="Split button - secondary">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
SecondaryButtonType.storyName = "Secondary Button";

export const SecondaryWhiteButtonType: Story = {
  render: () => (
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
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
SecondaryWhiteButtonType.storyName = "Secondary White Button";

export const SmallSize: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton size="small" text="Split button - small">
        <Button size="small">Button 1</Button>
        <Button size="small">Button 2</Button>
        <Button size="small">Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
SmallSize.storyName = "Small Size";

export const MediumSize: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton size="medium" text="Split button - medium">
        <Button size="medium">Button 1</Button>
        <Button size="medium">Button 2</Button>
        <Button size="medium">Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MediumSize.storyName = "Medium Size";

export const LargeSize: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton size="large" text="Split button - large">
        <Button size="large">Button 1</Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
LargeSize.storyName = "Large Size";

export const ChildButtonFocusState: Story = {
  render: () => (
    <Wrapper>
      <Box mb={3}>
        <SplitButton text="Child Focus Test">
          <Button data-role="first-child">First Child</Button>
          <Button data-role="second-child">Second Child</Button>
          <Button data-role="third-child">Third Child</Button>
        </SplitButton>
      </Box>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);

    const childButtons = [
      canvasElement.querySelector('[data-role="first-child"]'),
      canvasElement.querySelector('[data-role="second-child"]'),
      canvasElement.querySelector('[data-role="third-child"]'),
    ].filter(Boolean);

    expect(childButtons).toHaveLength(3);

    await userEvent.tab();
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
    expect(childButtons[2]).toHaveFocus();

    await userInteractionPause(300);
    expect(toggleButton).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ChildButtonFocusState.storyName = "Child Button Focus States";

export const ChildButtonDisabledState: Story = {
  render: () => (
    <Wrapper>
      <Box mb={3}>
        <SplitButton text="Disabled Child Test">
          <Button>Enabled Child</Button>
          <Button disabled>Disabled Child</Button>
          <Button>Another Enabled Child</Button>
        </SplitButton>
      </Box>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);

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
    await userInteractionPause(300);
    expect(disabledChild).toBeDisabled();

    await userEvent.click(disabledChild);
    await userInteractionPause(300);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ChildButtonDisabledState.storyName = "Child Button Disabled States";

export const ButtonsWithIcons: Story = {
  render: () => (
    <Wrapper>
      <Box mb={3}>
        <SplitButton text="Split button">
          <Button iconType="add">Add</Button>
          <Button iconType="delete" destructive>
            Delete
          </Button>
          <Button iconType="info" aria-label="Info" />
        </SplitButton>
      </Box>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });
    await userEvent.click(toggleButton);
    await userInteractionPause(500);

    const iconOnly = canvas.getByLabelText("Info");
    await userEvent.hover(iconOnly);
    await userInteractionPause(500);

    expect(iconOnly).toHaveAccessibleName("Info");
    expect(iconOnly).toHaveAttribute("aria-label", "Info");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ButtonsWithIcons.storyName = "Child Buttons with Icons";

export const PopoverPositioningLeft: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton position="left" text="Split button - left">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
PopoverPositioningLeft.storyName = "Popover Positioning Left";

export const PopoverPositioningRight: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton position="right" text="Split button - right">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(500);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
PopoverPositioningRight.storyName = "Popover Positioning Right";
