import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import { ButtonToggle, ButtonToggleGroup } from ".";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof ButtonToggle>;

export default {
  title: "Button Toggle/Interactions",
  parameters: { themeProvider: { chromatic: { theme: "sage" } } },
};

export const OnClick: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    function onChangeHandler(
      event: React.MouseEvent<HTMLButtonElement>,
      selectedValue?: string,
    ) {
      setValue(selectedValue ?? "");
    }

    return (
      <>
        <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            id="button-toggle-group-id"
            value={value}
            onChange={onChangeHandler}
          >
            <ButtonToggle value="foo">Foo</ButtonToggle>
            <ButtonToggle value="bar">Bar</ButtonToggle>
            <ButtonToggle value="baz">Baz</ButtonToggle>
          </ButtonToggleGroup>
        </Box>
        <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            id="button-toggle-group-id"
            value={value}
            onChange={onChangeHandler}
          >
            <ButtonToggle value="fom" disabled>
              Foo
            </ButtonToggle>
            <ButtonToggle value="bam">Bar</ButtonToggle>
            <ButtonToggle value="bat">Baz</ButtonToggle>
          </ButtonToggleGroup>
        </Box>
        <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            id="button-toggle-group-id"
            disabled
            value={value}
            onChange={onChangeHandler}
          >
            <ButtonToggle value="far">Foo</ButtonToggle>
            <ButtonToggle value="bor">Bar</ButtonToggle>
            <ButtonToggle value="boz">Baz</ButtonToggle>
          </ButtonToggleGroup>
        </Box>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");
    await userEvent.click(button[0]);
    await expect(button[0]).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button[1]);
    await expect(button[1]).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button[2]);
    await expect(button[2]).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button[3]);
    await expect(button[3]).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button[4]);
    await expect(button[4]).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button[5]);
    await expect(button[5]).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button[6]);
    await expect(button[6]).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button[7]);
    await expect(button[7]).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button[8]);
    await expect(button[8]).toHaveAttribute("aria-pressed", "false");
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
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    function onChangeHandler(
      event: React.MouseEvent<HTMLButtonElement>,
      selectedValue?: string,
    ) {
      setValue(selectedValue ?? "");
    }

    return (
      <>
        <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            id="button-toggle-group-id"
            value={value}
            onChange={onChangeHandler}
          >
            <ButtonToggle value="foo">Foo</ButtonToggle>
            <ButtonToggle value="bar">Bar</ButtonToggle>
            <ButtonToggle value="baz">Baz</ButtonToggle>
          </ButtonToggleGroup>
        </Box>
      </>
    );
  },
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
    await userEvent.click(button[1]);
    await expect(button[1]).toHaveFocus();
    await userEvent.hover(button[2]);
    await userEvent.click(button[2]);
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
FocusAndHoverStates.storyName = "Focus and Hover States";

export const KeyboardInteraction: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    function onChangeHandler(
      event: React.MouseEvent<HTMLButtonElement>,
      selectedValue?: string,
    ) {
      setValue(selectedValue ?? "");
    }

    return (
      <>
        <button type="button">Button Before</button>
        <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            id="button-toggle-group-id"
            value={value}
            onChange={onChangeHandler}
          >
            <ButtonToggle value="foo">Foo</ButtonToggle>
            <ButtonToggle value="bar">Bar</ButtonToggle>
            <ButtonToggle value="baz">Baz</ButtonToggle>
          </ButtonToggleGroup>
        </Box>
        <button type="button">Button After</button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const allButtons = canvas.getAllByRole("button");
    const buttonBefore = allButtons[0];
    const toggleButtons = [allButtons[1], allButtons[2], allButtons[3]];
    const buttonAfter = allButtons[4];

    // Test arrow key navigation
    await userEvent.click(toggleButtons[0]);
    await userEvent.keyboard("{ArrowRight}");
    await expect(toggleButtons[1]).toHaveFocus();
    await userEvent.type(toggleButtons[1], "{space}");
    await expect(toggleButtons[1]).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard("{ArrowLeft}");
    await expect(toggleButtons[0]).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(toggleButtons[0]).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard("{ArrowLeft}");

    // Test Tab navigation - only first button is tabbable when none selected
    await buttonBefore.focus();
    await userEvent.tab();
    await expect(toggleButtons[0]).toHaveFocus();
    await userEvent.tab();
    await expect(buttonAfter).toHaveFocus();

    // Test Shift+Tab navigation
    await userEvent.tab({ shift: true });
    await expect(toggleButtons[0]).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(buttonBefore).toHaveFocus();

    // Test Tab navigation with selected button
    await userEvent.click(toggleButtons[1]);
    await buttonBefore.focus();
    await userEvent.tab();
    await expect(toggleButtons[1]).toHaveFocus();
    await userEvent.tab();
    await expect(buttonAfter).toHaveFocus();

    // Test Shift+Tab with selected button
    await userEvent.tab({ shift: true });
    await expect(toggleButtons[1]).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(buttonBefore).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
KeyboardInteraction.storyName = "Keyboard Interaction";
KeyboardInteraction.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Deselection: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    function onChangeHandler(
      event: React.MouseEvent<HTMLButtonElement>,
      selectedValue?: string,
    ) {
      setValue(selectedValue ?? "");
    }

    return (
      <>
        <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            id="button-toggle-group-id"
            value={value}
            onChange={onChangeHandler}
            allowDeselect
          >
            <ButtonToggle value="foo">Foo</ButtonToggle>
            <ButtonToggle value="bar">Bar</ButtonToggle>
            <ButtonToggle value="baz">Baz</ButtonToggle>
          </ButtonToggleGroup>
        </Box>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");
    await userEvent.click(button[2]);
    await expect(button[2]).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button[2]);
    await expect(button[2]).toHaveAttribute("aria-pressed", "false");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
Deselection.storyName = "Deselection";

export const WrappedButtons: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("bar");
    function onChangeHandler(
      event: React.MouseEvent<HTMLButtonElement>,
      selectedValue?: string,
    ) {
      setValue(selectedValue ?? "");
    }

    return (
      <>
        <Box width="375px" display="flex" flexWrap="nowrap">
          <ButtonToggleGroup
            m={4}
            id="button-toggle-group-wrapped-id"
            fullWidth
            value={value}
            onChange={onChangeHandler}
          >
            <ButtonToggle value="add" buttonIcon="add">
              Add
            </ButtonToggle>
            <ButtonToggle value="share" buttonIcon="share">
              Share
            </ButtonToggle>
            <ButtonToggle value="tick" buttonIcon="tick">
              Tick
            </ButtonToggle>
            <ButtonToggle value="email" buttonIcon="email">
              Email
            </ButtonToggle>
            <ButtonToggle value="alert" buttonIcon="alert">
              Alert
            </ButtonToggle>
            <ButtonToggle value="calendar" buttonIcon="calendar">
              Calendar
            </ButtonToggle>
          </ButtonToggleGroup>
        </Box>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");
    await userEvent.click(button[0]);
    for (let i = 0; i < 5; i++) {
      await userEvent.keyboard("{ArrowRight}");
    }
    await expect(button[5]).toHaveFocus();
    await expect(button[5]).toHaveStyle(
      "box-shadow: rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WrappedButtons.storyName = "Wrapped Buttons";
