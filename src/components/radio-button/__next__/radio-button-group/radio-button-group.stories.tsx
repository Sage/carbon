import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../../.storybook/utils/styled-system-props";

import { RadioButton, RadioButtonGroup, RadioButtonGroupProps } from "..";

import Box from "../../../box";
import Textbox from "../../../textbox";
import Icon from "../../../icon";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof RadioButtonGroup> = {
  title: "Radio Button",
  component: RadioButtonGroup,
  subcomponents: { RadioButton },
  argTypes: {
    ...styledSystemProps,
    error: { control: "text" },
    warning: { control: "text" },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children", "onBlur", "onChange", "value", "name"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

interface TemplateProps
  extends Omit<
    RadioButtonGroupProps,
    "children" | "value" | "onChange" | "name"
  > {
  id?: string;
}

const ControlledRadioButtonGroup = ({
  id = "default",
  ...args
}: TemplateProps) => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name={`${id}-group`}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      {...args}
    >
      <RadioButton id={`${id}-1`} value="radio1" label="Radio Option 1" />
      <RadioButton id={`${id}-2`} value="radio2" label="Radio Option 2" />
      <RadioButton id={`${id}-3`} value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};

export const Default: Story = {
  render: ControlledRadioButtonGroup,
};

export const WithLegend: Story = {
  ...Default,
  args: {
    ...Default.args,
    id: "with-legend",
    legend: "RadioButtonGroup Legend",
  },
};

export const WithLegendHint: Story = {
  ...Default,
  args: {
    ...Default.args,
    id: "with-legend-hint",
    legend: "RadioButtonGroup Legend",
    legendHint: "Legend Hint",
  },
};

export const WithInputHint: Story = ({ ...args }) => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="input-hint-group"
      legend="Radio Button Group Legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      {...args}
    >
      <RadioButton
        id="input-hint-radio-1"
        value="radio1"
        label="Radio Option 1"
        inputHint="Input Hint"
      />
      <RadioButton
        id="input-hint-radio-2"
        value="radio2"
        label="Radio Option 2"
        inputHint="Input Hint"
      />
      <RadioButton
        id="input-hint-radio-3"
        value="radio3"
        label="Radio Option 3"
        inputHint="Input Hint"
      />
    </RadioButtonGroup>
  );
};
WithInputHint.storyName = "With Input Hint";

export const InlineRadioButtons: Story = {
  ...Default,
  args: {
    ...Default.args,
    id: "inline",
    legend: "RadioButtonGroup Legend",
    legendHint: "Legend Hint",
    inline: true,
  },
};

export const Sizes: Story = () => {
  const [valueSmall, setValueSmall] = useState("");
  const [valueMedium, setValueMedium] = useState("");
  const [valueLarge, setValueLarge] = useState("");

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <RadioButtonGroup
        name="size-group-small"
        legend="Small Radio Buttons"
        value={valueSmall}
        onChange={(ev) => setValueSmall(ev.target.value)}
        size="small"
      >
        <RadioButton id="small-radio-1" value="small1" label="Radio Option 1" />
        <RadioButton id="small-radio-2" value="small2" label="Radio Option 2" />
        <RadioButton id="small-radio-3" value="small3" label="Radio Option 3" />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="size-group-medium"
        legend="Medium Radio Buttons"
        value={valueMedium}
        onChange={(ev) => setValueMedium(ev.target.value)}
        size="medium"
      >
        <RadioButton
          id="medium-radio-1"
          value="medium1"
          label="Radio Option 1"
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
      >
        <RadioButton id="large-radio-1" value="large1" label="Radio Option 1" />
        <RadioButton id="large-radio-2" value="large2" label="Radio Option 2" />
        <RadioButton id="large-radio-3" value="large3" label="Radio Option 3" />
      </RadioButtonGroup>
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const ProgressiveDisclosure: Story = () => {
  const [value, setValue] = useState("");
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
    <RadioButtonGroup
      legend="Progressive Disclosure"
      name="progressive-disclosure-group"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton
        id="progressive-radio-1"
        value="radio1"
        label="Radio Option 1"
        conditionalContent={conditionalContent}
      />
      <RadioButton
        id="progressive-radio-2"
        value="radio2"
        label="Radio Option 2"
        conditionalContent={conditionalContent}
      />
      <RadioButton
        id="progressive-radio-3"
        value="radio3"
        label="Radio Option 3"
        conditionalContent={conditionalContent}
      />
    </RadioButtonGroup>
  );
};
ProgressiveDisclosure.storyName = "Progressive Disclosure";
ProgressiveDisclosure.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithCustomLabels: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="custom-styled-label-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton
        id="custom-styled-label-radio-1"
        value="radio1"
        label={
          <>
            <Icon type="placeholder" aria-hidden />
            Radio Button 1
          </>
        }
      />
      <RadioButton
        id="custom-styled-label-radio-2"
        value="radio2"
        label={
          <>
            <Icon type="placeholder" aria-hidden />
            Radio Button 2
          </>
        }
      />
      <RadioButton
        id="custom-styled-label-radio-3"
        value="radio3"
        label={
          <>
            <Icon type="placeholder" aria-hidden />
            Radio Button 3
          </>
        }
      />
    </RadioButtonGroup>
  );
};
WithCustomLabels.storyName = "With Custom Labels";

export const Required: Story = {
  ...Default,
  args: {
    ...Default.args,
    id: "required",
    legend: "RadioButtonGroup Legend",
    required: true,
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    id: "disabled",
    legend: "RadioButtonGroup Legend",
    disabled: true,
  },
};
