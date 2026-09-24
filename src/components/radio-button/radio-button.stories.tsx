import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { RadioButton, RadioButtonGroup, RadioButtonGroupProps } from ".";

import Box from "../box";
import Textbox from "../textbox";
import Icon from "../icon";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

type RadioButtonGroupStoryArgs = RadioButtonGroupProps & {
  inputHint?: string;
  progressiveDisclosure?: string;
};

const meta: Meta<RadioButtonGroupStoryArgs> = {
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
    chromatic: { disableSnapshot: true },
    controls: {
      exclude: ["children", "onBlur", "onChange", "value", "name"],
    },
  },
};

export default meta;
type Story = StoryObj<RadioButtonGroupStoryArgs>;

export const Playground: Story = {
  render: (args) => {
    const { inputHint, progressiveDisclosure, ...groupProps } = args;
    const [value, setValue] = useState("");
    return (
      <RadioButtonGroup
        {...groupProps}
        name="playground-group"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <RadioButton
          id="playground-1"
          value="radio1"
          label="Radio Option 1"
          inputHint={inputHint}
          progressiveDisclosure={progressiveDisclosure}
        />
        <RadioButton id="playground-2" value="radio2" label="Radio Option 2" />
        <RadioButton id="playground-3" value="radio3" label="Radio Option 3" />
      </RadioButtonGroup>
    );
  },
  args: {
    legend: "RadioButtonGroup Legend",
    legendHint: "Choose one option",
    inline: false,
    disabled: false,
    required: false,
    size: "medium",
    error: "",
    inputHint: "Option hint",
    progressiveDisclosure: "Additional content for option 1",
  },
};
Playground.storyName = "Playground";

export const ProgressiveDisclosure: Story = () => {
  const [value, setValue] = useState("radio1");
  const [textboxValue, setTextboxValue] = useState("");

  const progressiveDisclosure = (
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
        progressiveDisclosure={progressiveDisclosure}
      />
      <RadioButton
        id="progressive-radio-2"
        value="radio2"
        label="Radio Option 2"
        progressiveDisclosure={progressiveDisclosure}
      />
      <RadioButton
        id="progressive-radio-3"
        value="radio3"
        label="Radio Option 3"
        progressiveDisclosure={progressiveDisclosure}
      />
    </RadioButtonGroup>
  );
};
ProgressiveDisclosure.storyName = "Progressive Disclosure";

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
WithCustomLabels.parameters = {
  chromatic: { disableSnapshot: false },
};
