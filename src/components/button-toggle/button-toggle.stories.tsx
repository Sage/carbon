import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleGroupProps } from ".";
import { Loader } from "../loader/__next__/loader.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ButtonToggleGroup> = {
  title: "Button Toggle",
  component: ButtonToggleGroup,
  subcomponents: { ButtonToggle },
  argTypes: {
    ...styledSystemProps,
    label: {
      control: "text",
    },
    inputHint: {
      control: "text",
    },
    fullWidth: {
      control: "boolean",
    },
    allowDeselect: {
      control: "boolean",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
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

export const Playground: Story = {
  render: (args) => {
    const [selectedButton, setSelectedButton] = useState("playground-2");

    const handleOnChange = (
      ev: React.MouseEvent<HTMLButtonElement>,
      selectedValue?: string,
    ) => {
      setSelectedButton(selectedValue as string);
    };

    return (
      <ButtonToggleGroup
        {...args}
        id="playground"
        value={selectedButton}
        onChange={handleOnChange}
      >
        <ButtonToggle value="playground-1">Button 1</ButtonToggle>
        <ButtonToggle value="playground-2">Button 2</ButtonToggle>
        <ButtonToggle value="playground-3">Button 3</ButtonToggle>
      </ButtonToggleGroup>
    );
  },
  args: {
    label: "Label",
    inputHint: "",
    fullWidth: false,
    allowDeselect: false,
    disabled: false,
    size: "medium",
    inputWidth: 100,
  },
};
Playground.storyName = "Playground";

export const Single: Story = () => {
  const [isPressed, setIsPressed] = useState(true);

  const handleClick = () => {
    setIsPressed(!isPressed);
  };

  return (
    <ButtonToggle pressed={isPressed} onClick={handleClick}>
      ButtonToggle
    </ButtonToggle>
  );
};
Single.storyName = "Single";

export const Loading: Story = ({ ...args }: ButtonToggleGroupProps) => {
  const [value, setValue] = useState("");

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    if (selectedValue === "loading-2") return;
    setValue(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id="loading"
      value={value}
      onChange={handleOnChange}
      mb={2}
    >
      <ButtonToggle value="loading-1">Button 1</ButtonToggle>
      <ButtonToggle value="loading-2" aria-busy="true">
        <Loader
          variant="inline"
          loaderType="ring"
          size="extra-small"
          showLabel={false}
        />
      </ButtonToggle>
      <ButtonToggle value="loading-3">Button 3</ButtonToggle>
    </ButtonToggleGroup>
  );
};
Loading.storyName = "Loading";
