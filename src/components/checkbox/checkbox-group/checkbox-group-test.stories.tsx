import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import { CheckboxGroup, Checkbox, CheckboxGroupProps } from "..";
import Box from "../../box";
import { Tabs, Tab, TabList, TabPanel } from "../../tabs/__next__";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta = {
  title: "Checkbox Group/Test",
  component: CheckboxGroup,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const ControlledCheckboxGroup = (
  args: Omit<CheckboxGroupProps, "children">,
) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues((prev) => [...prev, value]);
    } else {
      setSelectedValues((prev) => prev.filter((val) => val !== value));
    }
  };
  return (
    <CheckboxGroup {...args}>
      {["1", "2", "3"].map((option) => (
        <Checkbox
          key={option}
          label={`Checkbox ${option}`}
          value={`checkbox-${option}`}
          checked={selectedValues.includes(`checkbox-${option}`)}
          onChange={handleChange}
        />
      ))}
    </CheckboxGroup>
  );
};

export const Validation: Story = {
  render: (args) => (
    <Box m={2} display="flex" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckboxGroup
          legend="With Error Small"
          error="Error Message"
          size="small"
          required
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning Small"
          warning="Warning Message"
          size="small"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Error at Bottom Small"
          error="Error Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning at Bottom Small"
          warning="Warning Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckboxGroup
          legend="With Error"
          error="Error Message"
          required
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning"
          warning="Warning Message"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Error at Bottom"
          error="Error Message"
          validationMessagePositionTop={false}
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning at Bottom"
          warning="Warning Message"
          validationMessagePositionTop={false}
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckboxGroup
          legend="With Error Large"
          error="Error Message"
          size="large"
          required
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning Large"
          warning="Warning Message"
          size="large"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Error at Bottom Large"
          error="Error Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
        <ControlledCheckboxGroup
          legend="With Warning at Bottom Large"
          warning="Warning Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
      </Box>
    </Box>
  ),
  args: {
    legendHint: "Hint Text",
  },
};

export const ValidationInline: Story = {
  ...Validation,
  args: {
    ...Validation.args,
    inline: true,
  },
};

export const InTabs: Story = () => {
  return (
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab with Error" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab with Warning" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <ControlledCheckboxGroup
          legend="With Error"
          error="Error Message"
          required
        />
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <ControlledCheckboxGroup
          legend="With Warning"
          warning="Warning Message"
          required
        />
      </TabPanel>
    </Tabs>
  );
};
InTabs.storyName = "In Tabs";
