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
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <Box mb="150px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
};

async function ensureAllTogglesOpen(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const toggles = canvas.getAllByRole("button", { name: /show more/i });
  for (const t of toggles) {
    if (t.getAttribute("aria-expanded") !== "true") {
      await userEvent.click(t);
      await userInteractionPause(250);
      expect(t).toHaveAttribute("aria-expanded", "true");
    }
  }
}

export const ButtonTypesAndInteraction: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px" mb={3}>
      <SplitButton buttonType="primary" text="Split button - primary">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>

      <SplitButton buttonType="secondary" text="Split button - secondary">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>

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
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const [primaryToggle, secondaryToggle, whiteToggle] = canvas.getAllByRole(
      "button",
      { name: /show more/i },
    );

    await userEvent.click(primaryToggle);
    await userInteractionPause(300);
    expect(primaryToggle).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(secondaryToggle);
    await userInteractionPause(300);
    expect(secondaryToggle).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(whiteToggle);
    await userInteractionPause(500);
    expect(whiteToggle).toHaveAttribute("aria-expanded", "true");

    await ensureAllTogglesOpen(canvasElement);
  },
};
ButtonTypesAndInteraction.storyName = "Button Types And Basic Interaction";

export const SizesAndKeyboardNavigation: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px" mb={3}>
      <SplitButton size="small" text="Split button - small">
        <Button size="small" data-role="small-first">
          Small Button 1
        </Button>
        <Button size="small" data-role="small-second">
          Small Button 2
        </Button>
        <Button size="small" data-role="small-third">
          Small Button 3
        </Button>
      </SplitButton>

      <SplitButton size="medium" text="Split button - medium">
        <Button size="medium">Medium Button 1</Button>
        <Button size="medium">Medium Button 2</Button>
        <Button size="medium">Medium Button 3</Button>
      </SplitButton>

      <SplitButton size="large" text="Split button - large">
        <Button size="large">Large Button 1</Button>
        <Button size="large">Large Button 2</Button>
        <Button size="large">Large Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const [smallToggle, mediumToggle, largeToggle] = canvas.getAllByRole(
      "button",
      { name: /show more/i },
    );

    await userEvent.click(smallToggle);
    await userInteractionPause(500);

    const smallChildButtons = [
      canvasElement.querySelector('[data-role="small-first"]'),
      canvasElement.querySelector('[data-role="small-second"]'),
      canvasElement.querySelector('[data-role="small-third"]'),
    ].filter(Boolean) as HTMLElement[];

    expect(smallChildButtons).toHaveLength(3);

    await userEvent.tab();
    expect(smallChildButtons[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(smallChildButtons[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(smallChildButtons[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(smallChildButtons[1]).toHaveFocus();

    await userEvent.keyboard("{Home}");
    expect(smallChildButtons[0]).toHaveFocus();

    await userEvent.keyboard("{End}");
    expect(smallChildButtons[2]).toHaveFocus();

    await userEvent.click(mediumToggle);
    await userInteractionPause(300);
    await userEvent.click(largeToggle);
    await userInteractionPause(500);

    await ensureAllTogglesOpen(canvasElement);
  },
};
SizesAndKeyboardNavigation.storyName = "Sizes And Keyboard Navigation";

export const DisabledStatesAndIcons: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px" mb={3}>
      <SplitButton text="Disabled Child Test">
        <Button>Enabled Child</Button>
        <Button disabled>Disabled Child</Button>
        <Button>Another Enabled Child</Button>
      </SplitButton>

      <SplitButton text="Split button with icons">
        <Button iconType="add">Add</Button>
        <Button iconType="delete" destructive>
          Delete
        </Button>
        <Button iconType="info" aria-label="Info" />
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const [disabledTestToggle, iconsToggle] = canvas.getAllByRole("button", {
      name: /show more/i,
    });

    await userEvent.click(disabledTestToggle);
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

    await userEvent.click(iconsToggle);
    await userInteractionPause(500);

    const iconOnly = canvas.getByLabelText("Info");
    await userEvent.hover(iconOnly);
    await userInteractionPause(500);

    expect(iconOnly).toHaveAccessibleName("Info");
    expect(iconOnly).toHaveAttribute("aria-label", "Info");

    await ensureAllTogglesOpen(canvasElement);
  },
};
DisabledStatesAndIcons.storyName = "Disabled States And Icons";

export const PopoverPositioning: Story = {
  render: () => (
    <Box display="flex" justifyContent="space-around" mb={3}>
      <SplitButton position="left" text="Left position">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>

      <SplitButton position="right" text="Right position">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const [leftToggle, rightToggle] = canvas.getAllByRole("button", {
      name: /show more/i,
    });

    await userEvent.click(leftToggle);
    await userInteractionPause(500);
    await userEvent.click(rightToggle);
    await userInteractionPause(500);

    await ensureAllTogglesOpen(canvasElement);
  },
};
PopoverPositioning.storyName = "Popover Positioning";

export const ChildButtonFocusState: Story = {
  render: () => (
    <Box mb={3}>
      <SplitButton text="Child Focus Test">
        <Button data-role="first-child">First Child</Button>
        <Button data-role="second-child">Second Child</Button>
        <Button data-role="third-child">Third Child</Button>
      </SplitButton>
    </Box>
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
    ].filter(Boolean) as HTMLElement[];

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
    await userInteractionPause(100);
    expect(childButtons[2]).toHaveFocus();

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  },
};
ChildButtonFocusState.storyName = "Child Button Focus States";
