import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryFn<typeof Checkbox>;

export const Default: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Example checkbox"
      name="checkbox-default"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
Default.storyName = "Default";

export const Sizes: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <>
      <Checkbox
        mb={2}
        label="Small"
        key="checkbox-small"
        name="checkbox-small"
        size="small"
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />
      <Checkbox
        label="Large"
        key="checkbox-large"
        name="checkbox-large"
        size="large"
        onChange={(e) => setIsChecked2(e.target.checked)}
        checked={isChecked2}
      />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return (
    <Checkbox
      disabled
      label="Disabled checkbox"
      name="checkbox-disabled"
      onChange={() => {}}
      checked={false}
    />
  );
};
Disabled.storyName = "Disabled";

export const Reversed: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Reversed checkbox"
      name="checkbox-reverse"
      reverse
      onChange={(e) => setIsChecked(e.target.checked)}
      checked={isChecked}
    />
  );
};
Reversed.storyName = "Reversed";

export const Required: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox"
      name="checkbox-required"
      required
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const WithFieldHelp: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  return (
    <>
      <Checkbox
        fieldHelp="This text provides help for the input."
        label="With fieldHelp"
        key="checkbox-fieldhelp"
        name="checkbox-fieldhelp"
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />
      <Checkbox
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        label="With inline fieldHelp"
        key="checkbox-fieldhelp-inline"
        name="checkbox-fieldhelp-inline"
        onChange={(e) => setIsChecked2(e.target.checked)}
        checked={isChecked2}
      />
    </>
  );
};
WithFieldHelp.storyName = "With fieldHelp";

export const CustomLabelWidth: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="With custom labelWidth"
      labelWidth={100}
      name="checkbox-custom-label"
      onChange={(e) => setIsChecked(e.target.checked)}
      checked={isChecked}
    />
  );
};

export const LegacyLabelHelp: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      helpAriaLabel="This text provides more information for the label."
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      name="checkbox-labelHelp"
      onChange={(e) => setIsChecked(e.target.checked)}
      checked={isChecked}
    />
  );
};
LegacyLabelHelp.storyName = "With labelHelp";
