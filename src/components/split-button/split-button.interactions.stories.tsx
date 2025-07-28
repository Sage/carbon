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
    const toggleButtons = canvas.getAllByRole("button", { name: /show more/i });

    for (const toggle of toggleButtons) {
      await userEvent.click(toggle);
      await userInteractionPause(500);
      await userEvent.keyboard("{Escape}");
      await userInteractionPause(300);
    }
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

export const SizeVariations: Story = {
  render: () => {
    return (
      <>
        {(["small", "medium", "large"] as const).map((size) => (
          <Box key={size} mb={3}>
            <SplitButton size={size} text={`Split button - ${size}`}>
              <Button size={size}>Button 1</Button>
              <Button size={size}>Button 2</Button>
              <Button size={size}>Button 3</Button>
            </SplitButton>
          </Box>
        ))}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByRole("button", { name: /show more/i });

    for (const toggle of toggleButtons) {
      await userEvent.click(toggle);
      await userInteractionPause(500);
      await userEvent.keyboard("{Escape}");
      await userInteractionPause(300);
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
SizeVariations.storyName = "Sizes";

export const OpenPopover: Story = {
  render: () => (
    <Wrapper>
      <Box mb={3}>
        <SplitButton buttonType="primary" text="Split button">
          <Button>Option 1</Button>
          <Button data-role="target">Option 2</Button>
        </SplitButton>
      </Box>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /show more/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(600);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveAttribute("aria-controls");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
OpenPopover.storyName = "Open Popover";

export const FocusStates: Story = {
  render: () => (
    <Wrapper>
      <Box mb={3}>
        <SplitButton text="Split button">
          <Button data-role="focus-target">Focus Me</Button>
          <Button>Another Button</Button>
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

    const focusTarget = canvas.getByText("Focus Me");
    focusTarget.focus();
    await userInteractionPause(600);

    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);

    const toggleButtonElement = canvasElement.querySelector(
      '[data-element="toggle-button"]',
    );
    expect(document.activeElement).toBe(toggleButtonElement);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusStates.storyName = "Focus Management";

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

    await userEvent.keyboard("{Escape}");
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

    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);
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

export const PopoverPositioning: Story = {
  render: () => (
    <Wrapper>
      <>
        {(["left", "right"] as const).map((align) => (
          <Box key={align} mb={3}>
            <SplitButton align={align} text={`Split button - ${align}`}>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </SplitButton>
          </Box>
        ))}
      </>
    </Wrapper>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const toggleButtons = canvas.getAllByRole("button", { name: /show more/i });

    await userEvent.click(toggleButtons[0]);
    await userInteractionPause(500);
    await userEvent.keyboard("{Escape}");
    await userInteractionPause(300);

    await userEvent.click(toggleButtons[1]);
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
PopoverPositioning.storyName = "Popover Positioning";
