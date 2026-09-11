import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { RadioButton, RadioButtonGroup, RadioButtonGroupProps } from ".";

import Box from "../box";
import Textbox from "../textbox";
import { Tabs, Tab, TabList, TabPanel } from "../tabs/__next__";

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
    warning: { control: "text" },
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
          id="warning-group-small"
          name="warning-group-small"
          legend="With Warning Small"
          warning="Warning Message"
          size="small"
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
        <RadioButtonGroupComponent
          id="warning-bottom-small-group"
          name="warning-bottom-small-group"
          legend="With Warning at Bottom Small"
          warning="Warning Message"
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
          id="warning-group"
          name="warning-group"
          legend="With Warning"
          warning="Warning Message"
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
        <RadioButtonGroupComponent
          id="warning-bottom-group"
          name="warning-bottom-group"
          legend="With Warning at Bottom"
          warning="Warning Message"
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
          id="warning-large-group"
          name="warning-large-group"
          legend="With Warning Large"
          warning="Warning Message"
          size="large"
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
        <RadioButtonGroupComponent
          id="warning-bottom-large-group"
          name="warning-bottom-large-group"
          legend="With Warning at Bottom Large"
          warning="Warning Message"
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
          progressiveDisclosure={progressiveDisclosure}
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
          progressiveDisclosure={progressiveDisclosure}
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
          progressiveDisclosure={progressiveDisclosure}
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

export const InTabs: Story = () => {
  return (
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab with Error" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab with Warning" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <RadioButtonGroupComponent
          id="error-group"
          name="error-group"
          legend="With Error"
          error="Error Message"
          required
        />
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <RadioButtonGroupComponent
          id="warning-group"
          name="warning-group"
          legend="With Warning"
          warning="Warning Message"
          required
        />
      </TabPanel>
    </Tabs>
  );
};
InTabs.storyName = "In Tabs";

// Documentation regression stories moved from the public docs.

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

export const WithLegend: Story = {
  render: ControlledRadioButtonGroup,
  args: {
    id: "with-legend",
    legend: "RadioButtonGroup Legend",
  },
};

export const WithLegendHint: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "with-legend-hint",
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
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "inline",
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

export const Required: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "required",
    required: true,
  },
};

export const Disabled: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "disabled",
    disabled: true,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

WithLegend.parameters = { chromatic: { disableSnapshot: true } };
WithLegendHint.parameters = { chromatic: { disableSnapshot: true } };
WithInputHint.parameters = { chromatic: { disableSnapshot: true } };
InlineRadioButtons.parameters = { chromatic: { disableSnapshot: true } };
Sizes.parameters = { chromatic: { disableSnapshot: true } };
Required.parameters = { chromatic: { disableSnapshot: true } };
