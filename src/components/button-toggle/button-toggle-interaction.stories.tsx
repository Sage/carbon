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

const ControlledButtonToggleGroup = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  function onChangeHandler1(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue1(selectedValue ?? "");
  }

  function onChangeHandler2(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue2(selectedValue ?? "");
  }

  return (
    <>
      <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
        <ButtonToggleGroup
          label="Enabled Group"
          id="button-toggle-group-id1"
          value={value1}
          onChange={onChangeHandler1}
        >
          <ButtonToggle value="foo">Foo</ButtonToggle>
          <ButtonToggle value="bar">Bar</ButtonToggle>
          <ButtonToggle disabled value="baz">
            Baz
          </ButtonToggle>
        </ButtonToggleGroup>
      </Box>
      <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
        <ButtonToggleGroup
          label="Disabled Group"
          id="button-toggle-group-id2"
          value={value2}
          onChange={onChangeHandler2}
          disabled
        >
          <ButtonToggle value="foo">Foo</ButtonToggle>
          <ButtonToggle value="bar">Bar</ButtonToggle>
          <ButtonToggle value="baz">Baz</ButtonToggle>
        </ButtonToggleGroup>
      </Box>
    </>
  );
};

export const FocusAndHoverStates: Story = {
  render: ControlledButtonToggleGroup,
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
    hover: "#button-toggle-group-id1 button:first-of-type",
  },
};
