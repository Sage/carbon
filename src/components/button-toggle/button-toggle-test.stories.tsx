import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleGroupProps } from ".";
import Icon from "../icon";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ButtonToggleGroup> = {
  title: "Button Toggle/Test",
  component: ButtonToggleGroup,
  subcomponents: { ButtonToggle },
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children", "onChange", "value"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonToggleGroup>;

export const HoverAndFocus: Story = ({ ...args }: ButtonToggleGroupProps) => {
  const [value, setValue] = useState("active");

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValue(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id="hover"
      value={value}
      onChange={handleOnChange}
      mb={2}
    >
      <ButtonToggle data-role="hover" value="default">
        <Icon aria-hidden type="placeholder" />
        Button Default
      </ButtonToggle>
      <ButtonToggle data-role="hover" value="active">
        <Icon aria-hidden type="placeholder" />
        Button Active
      </ButtonToggle>
      <ButtonToggle data-role="hover" value="disabled" disabled>
        <Icon aria-hidden type="placeholder" />
        Button Disabled
      </ButtonToggle>
      <ButtonToggle data-role="focus" value="default">
        <Icon aria-hidden type="placeholder" />
        Button Default
      </ButtonToggle>
    </ButtonToggleGroup>
  );
};
HoverAndFocus.storyName = "Hover And Focus";
HoverAndFocus.parameters = {
  pseudo: {
    hover: '[data-role="hover"]',
    focus: '[data-role="focus"]',
  },
};

export const WrappedButtons: Story = ({ ...args }: ButtonToggleGroupProps) => {
  const [value1, setValue1] = useState("button-2");
  const [value2, setValue2] = useState("button-2");

  const handleOnChange1 = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValue1(selectedValue as string);
  };

  const handleOnChange2 = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValue2(selectedValue as string);
  };

  return (
    <Box width="400px">
      Default
      <ButtonToggleGroup
        {...args}
        id="wrapped"
        value={value1}
        onChange={handleOnChange1}
        mb={2}
      >
        <ButtonToggle value="button-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="button-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="button-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
        <ButtonToggle value="button-4">
          <Icon aria-hidden type="placeholder" />
          Button 4
        </ButtonToggle>
        <ButtonToggle value="button-5">
          <Icon aria-hidden type="placeholder" />
          Button 5
        </ButtonToggle>
        <ButtonToggle value="button-6">
          <Icon aria-hidden type="placeholder" />
          Button 6
        </ButtonToggle>
      </ButtonToggleGroup>
      With FullWidth
      <ButtonToggleGroup
        {...args}
        id="fullwidth-wrapped"
        value={value2}
        onChange={handleOnChange2}
        fullWidth
        mb={2}
      >
        <ButtonToggle value="button-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="button-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="button-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
        <ButtonToggle value="button-4">
          <Icon aria-hidden type="placeholder" />
          Button 4
        </ButtonToggle>
        <ButtonToggle value="button-5">
          <Icon aria-hidden type="placeholder" />
          Button 5
        </ButtonToggle>
        <ButtonToggle value="button-6">
          <Icon aria-hidden type="placeholder" />
          Button 6
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
WrappedButtons.storyName = "Wrapped Buttons";
