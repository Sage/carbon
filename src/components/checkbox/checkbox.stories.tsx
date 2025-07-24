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
  return (
    <>
      <Checkbox
        mb={2}
        label="Small"
        key="checkbox-small"
        name="checkbox-small"
        size="small"
        onChange={() => {}}
        checked
      />
      <Checkbox
        label="Large"
        key="checkbox-large"
        name="checkbox-large"
        size="large"
        onChange={() => {}}
        checked
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
      checked
    />
  );
};
Disabled.storyName = "Disabled";

export const Reversed: Story = () => {
  return (
    <Checkbox
      label="Reversed checkbox"
      name="checkbox-reverse"
      reverse
      onChange={() => {}}
      checked
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
  return (
    <>
      <Checkbox
        fieldHelp="This text provides help for the input."
        label="With fieldHelp"
        key="checkbox-fieldhelp"
        name="checkbox-fieldhelp"
        onChange={() => {}}
        checked
      />
      <Checkbox
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        label="With inline fieldHelp"
        key="checkbox-fieldhelp-inline"
        name="checkbox-fieldhelp-inline"
        onChange={() => {}}
        checked
      />
    </>
  );
};
WithFieldHelp.storyName = "With fieldHelp";

export const CustomLabelWidth: Story = () => {
  return (
    <Checkbox
      label="With custom labelWidth"
      labelWidth={100}
      name="checkbox-custom-label"
      onChange={() => {}}
      checked
    />
  );
};

export const LegacyLabelHelp: Story = () => {
  return (
    <Checkbox
      helpAriaLabel="This text provides more information for the label."
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      name="checkbox-labelHelp"
      onChange={() => {}}
      checked
    />
  );
};
LegacyLabelHelp.storyName = "With labelHelp";
