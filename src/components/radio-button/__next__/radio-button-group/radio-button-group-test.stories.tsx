import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../../.storybook/utils/styled-system-props";

import { RadioButton, RadioButtonGroup, RadioButtonGroupProps } from "..";

import Box from "../../../box";
import Textbox from "../../../textbox";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof RadioButtonGroup> = {
  title: "Radio Button/Test",
  component: RadioButtonGroup,
  subcomponents: { RadioButton },
  argTypes: {
    ...styledSystemProps,
    error: { control: "text" },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children", "onBlur", "onChange"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

interface RadioButtonGroupComponentProps
  extends Omit<RadioButtonGroupProps, "value" | "onChange" | "children"> {
  name: string;
  id: string;
}

const RadioButtonGroupComponent = ({
  name,
  id,
  ...args
}: RadioButtonGroupComponentProps) => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name={name}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      legendHint="Legend Hint"
      {...args}
    >
      <RadioButton id={`${id}-1`} value={`${id}-1`} label="Radio Option 1" />
      <RadioButton id={`${id}-2`} value={`${id}-2`} label="Radio Option 2" />
      <RadioButton
        id={`${id}-3`}
        value={`${id}-3`}
        label="Radio Option 3"
        inputHint="Input Hint"
      />
    </RadioButtonGroup>
  );
};

export const Validation = ({ ...args }) => {
  return (
    <Box m={2} display="flex" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <RadioButtonGroupComponent
          id="error-group-small"
          name="error-group-small"
          legend="With Error Small"
          error="Error Message"
          size="small"
          required
          {...args}
        />
        <RadioButtonGroupComponent
          id="error-bottom-small-group"
          name="error-bottom-small-group"
          legend="With Error at Bottom Small"
          error="Error Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <RadioButtonGroupComponent
          id="error-group"
          name="error-group"
          legend="With Error"
          error="Error Message"
          required
          {...args}
        />
        <RadioButtonGroupComponent
          id="error-bottom-group"
          name="error-bottom-group"
          legend="With Error at Bottom"
          error="Error Message"
          validationMessagePositionTop={false}
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <RadioButtonGroupComponent
          id="error-large-group"
          name="error-large-group"
          legend="With Error Large"
          error="Error Message"
          size="large"
          required
          {...args}
        />
        <RadioButtonGroupComponent
          id="error-bottom-large-group"
          name="error-bottom-large-group"
          legend="With Error at Bottom Large"
          error="Error Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
      </Box>
    </Box>
  );
};
Validation.storyName = "Validation";

export const ValidationInline: Story = {
  render: (args) => <Validation {...args} />,
  args: {
    inline: true,
  },
};

export const SizesWithProgressiveDisclosure: Story = ({ ...args }) => {
  const [valueSmall, setValueSmall] = useState("small1");
  const [valueMedium, setValueMedium] = useState("medium1");
  const [valueLarge, setValueLarge] = useState("large1");

  const [textboxValue, setTextboxValue] = useState("");

  const conditionalContent = (
    <Box mr={1} width="300px">
      <Textbox
        label="Revealed Textbox"
        value={textboxValue}
        onChange={(ev) => setTextboxValue(ev.target.value)}
      />
    </Box>
  );

  return (
    <Box m={2} display="flex" flexDirection="column" gap={2}>
      <RadioButtonGroup
        name="size-group-small"
        legend="Small Radio Buttons"
        value={valueSmall}
        onChange={(ev) => setValueSmall(ev.target.value)}
        size="small"
        {...args}
      >
        <RadioButton
          id="small-radio-1"
          value="small1"
          label="Radio Option 1"
          conditionalContent={conditionalContent}
        />
        <RadioButton id="small-radio-2" value="small2" label="Radio Option 2" />
        <RadioButton id="small-radio-3" value="small3" label="Radio Option 3" />
      </RadioButtonGroup>

      <RadioButtonGroup
        name="size-group-medium"
        legend="Medium Radio Buttons"
        value={valueMedium}
        onChange={(ev) => setValueMedium(ev.target.value)}
        size="medium"
        {...args}
      >
        <RadioButton
          id="medium-radio-1"
          value="medium1"
          label="Radio Option 1"
          conditionalContent={conditionalContent}
        />
        <RadioButton
          id="medium-radio-2"
          value="medium2"
          label="Radio Option 2"
        />
        <RadioButton
          id="medium-radio-3"
          value="medium3"
          label="Radio Option 3"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        name="size-group-large"
        legend="Large Radio Buttons"
        value={valueLarge}
        onChange={(ev) => setValueLarge(ev.target.value)}
        size="large"
        {...args}
      >
        <RadioButton
          id="large-radio-1"
          value="large1"
          label="Radio Option 1"
          conditionalContent={conditionalContent}
        />
        <RadioButton id="large-radio-2" value="large2" label="Radio Option 2" />
        <RadioButton id="large-radio-3" value="large3" label="Radio Option 3" />
      </RadioButtonGroup>
    </Box>
  );
};
SizesWithProgressiveDisclosure.storyName = "Sizes with Progressive Disclosure";
SizesWithProgressiveDisclosure.parameters = {
  chromatic: { delay: 500 },
};

export const LegendAlignment: Story = ({ ...args }) => {
  return (
    <Box m={2} display="flex" flexDirection="column" gap={4}>
      <RadioButtonGroupComponent
        id="radio-group-left"
        name="radio-group-left"
        legend="Group Left"
        legendHint="Legend Hint"
        legendAlign="left"
        {...args}
      />

      <RadioButtonGroupComponent
        id="radio-group-right"
        name="radio-group-right"
        legend="Group Right"
        legendHint="Legend Hint"
        legendAlign="right"
        {...args}
      />
    </Box>
  );
};
LegendAlignment.storyName = "Legend Alignment";
