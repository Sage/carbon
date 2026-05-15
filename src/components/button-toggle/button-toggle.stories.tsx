import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleGroupProps } from ".";
import Icon from "../icon";
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

const ControlledButtonToggleGroup = ({
  id = "default",
  children,
  value,
  ...args
}: Omit<ButtonToggleGroupProps, "onChange">) => {
  const [selectedButton, setSelectedButton] = useState(value);

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setSelectedButton(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id={id}
      value={selectedButton}
      onChange={handleOnChange}
    >
      <ButtonToggle value={`${id}-1`}>Button 1</ButtonToggle>
      <ButtonToggle value={`${id}-2`}>Button 2</ButtonToggle>
      <ButtonToggle value={`${id}-3`}>Button 3</ButtonToggle>
    </ButtonToggleGroup>
  );
};

export const Default: Story = {
  render: ControlledButtonToggleGroup,
  args: {
    "aria-label": "Button Toggle Group",
    value: "default-2",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithLabelAndHint: Story = {
  ...Default,
  args: {
    id: "with-label",
    label: "Label",
    inputHint: "Hint Text",
    value: "with-label-2",
  },
};

export const WithIcon: Story = ({ ...args }: ButtonToggleGroupProps) => {
  const [value, setValue] = useState("icon-left");

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValue(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id="icon"
      value={value}
      onChange={handleOnChange}
      mb={2}
    >
      <ButtonToggle value="icon-left">
        <Icon aria-hidden type="placeholder" />
        Button with Left Icon
      </ButtonToggle>
      <ButtonToggle value="icon-right">
        Button with Right Icon
        <Icon aria-hidden type="placeholder" />
      </ButtonToggle>
    </ButtonToggleGroup>
  );
};
WithIcon.storyName = "With Icon";

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

export const Sizes: Story = ({ ...args }: ButtonToggleGroupProps) => {
  const [valueSmall, setValueSmall] = useState("small-2");
  const [valueMedium, setValueMedium] = useState("medium-2");
  const [valueLarge, setValueLarge] = useState("large-2");

  const handleOnChangeSmall = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueSmall(selectedValue as string);
  };

  const handleOnChangeMedium = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueMedium(selectedValue as string);
  };

  const handleOnChangeLarge = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueLarge(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="small"
        label="Small"
        value={valueSmall}
        onChange={handleOnChangeSmall}
        size="small"
        mb={2}
      >
        <ButtonToggle value="small-1">Button 1</ButtonToggle>
        <ButtonToggle value="small-2">Button 2</ButtonToggle>
        <ButtonToggle value="small-3">Button 3</ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="medium"
        label="Medium"
        value={valueMedium}
        onChange={handleOnChangeMedium}
        size="medium"
        mb={2}
      >
        <ButtonToggle value="medium-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="medium-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="medium-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="large"
        label="Large"
        value={valueLarge}
        onChange={handleOnChangeLarge}
        size="large"
      >
        <ButtonToggle value="large-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="large-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="large-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
};
Sizes.storyName = "Sizes";

export const IconOnly: Story = ({ ...args }: ButtonToggleGroupProps) => {
  const [valueMedium, setValueMedium] = useState("medium-2");
  const [valueLarge, setValueLarge] = useState("large-2");

  const handleOnChangeMedium = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueMedium(selectedValue as string);
  };

  const handleOnChangeLarge = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueLarge(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="medium"
        label="Medium"
        value={valueMedium}
        onChange={handleOnChangeMedium}
        size="medium"
        mb={2}
      >
        <ButtonToggle value="medium-1">
          <Icon ariaLabel="Placeholder 1" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="medium-2">
          <Icon ariaLabel="Placeholder 2" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="medium-3">
          <Icon ariaLabel="Placeholder 3" type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="large"
        label="Large"
        value={valueLarge}
        onChange={handleOnChangeLarge}
        size="large"
      >
        <ButtonToggle value="large-1">
          <Icon ariaLabel="Placeholder 1" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="large-2">
          <Icon ariaLabel="Placeholder 2" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="large-3">
          <Icon ariaLabel="Placeholder 3" type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
};
IconOnly.storyName = "Icon Only";

export const AllowDeselect: Story = {
  ...Default,
  args: {
    id: "allow-deselect",
    value: "allow-deselect-2",
    allowDeselect: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const FullWidth: Story = {
  ...Default,
  args: {
    id: "full-width",
    value: "full-width-2",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    id: "disabled",
    label: "Disabled",
    inputHint: "Hint Text",
    value: "disabled-2",
    disabled: true,
  },
};
