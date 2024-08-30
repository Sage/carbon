import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

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
      />
      <Checkbox
        label="Large"
        key="checkbox-large"
        name="checkbox-large"
        size="large"
      />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return (
    <Checkbox disabled label="Disabled checkbox" name="checkbox-disabled" />
  );
};
Disabled.storyName = "Disabled";

export const Reversed: Story = () => {
  return <Checkbox label="Reversed checkbox" name="checkbox-reverse" reverse />;
};
Reversed.storyName = "Reversed";

export const WithFieldHelp: Story = () => {
  return (
    <>
      <Checkbox
        fieldHelp="This text provides help for the input."
        label="With fieldHelp"
        key="checkbox-fieldhelp"
        name="checkbox-fieldhelp"
      />
      <Checkbox
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        label="With inline fieldHelp"
        key="checkbox-fieldhelp-inline"
        name="checkbox-fieldhelp-inline"
      />
    </>
  );
};
WithFieldHelp.storyName = "With fieldHelp";

export const WithLabelHelp: Story = () => {
  return (
    <Checkbox
      helpAriaLabel="This text provides more information for the label."
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      name="checkbox-labelHelp"
    />
  );
};
WithLabelHelp.storyName = "With labelHelp";

export const WithCustomLabelWidth: Story = () => {
  return (
    <Checkbox
      label="With custom labelWidth"
      labelWidth={100}
      name="checkbox-custom-label"
    />
  );
};
WithCustomLabelWidth.storyName = "With custom labelWidth";

export const CheckboxGroupStory: Story = () => {
  return (
    <CheckboxGroup legend="Checkbox Group">
      {["One", "Two", "Three"].map((label) => (
        <Checkbox
          id={`checkbox-group-${label}`}
          key={`checkbox-group-${label}`}
          name={`checkbox-group-${label}`}
          label={label}
        />
      ))}
    </CheckboxGroup>
  );
};
CheckboxGroupStory.storyName = "CheckboxGroup";

export const NewInline: Story = () => {
  return (
    <CheckboxGroup legend="Label" inline>
      <Checkbox
        id="checkbox-one-new-inline"
        key="checkbox-one-new-inline"
        label="Example checkbox one"
        name="checkbox-one-new-inline"
      />
      <Checkbox
        id="checkbox-two-new-inline"
        key="checkbox-two-new-inline"
        label="Example checkbox two"
        name="checkbox-two-new-inline"
      />
      <Checkbox
        id="checkbox-three-new-inline"
        key="checkbox-three-new-inline"
        label="Example checkbox three"
        name="checkbox-three-new-inline"
      />
    </CheckboxGroup>
  );
};
NewInline.storyName = "Inline CheckboxGroup";

export const CheckboxGroupWithInlineLegend: Story = () => {
  return (
    <CheckboxGroup
      legend="Checkbox Group"
      legendSpacing={2}
      legendWidth={10}
      legendInline
    >
      {["One", "Two", "Three"].map((label) => (
        <Checkbox
          id={`checkbox-group-${label}`}
          key={`checkbox-group-${label}`}
          name={`checkbox-group-${label}`}
          label={label}
        />
      ))}
    </CheckboxGroup>
  );
};
CheckboxGroupWithInlineLegend.storyName = "CheckboxGroup with inline legend";

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
Required.storyName = "Required";

export const CheckboxGroupRequired: Story = () => (
  <CheckboxGroup required legend="Checkbox Group">
    {["One", "Two", "Three"].map((label) => (
      <Checkbox
        id={`checkbox-group-required-${label}`}
        key={`checkbox-group-required-${label}`}
        name={`checkbox-group-required-${label}`}
        label={label}
      />
    ))}
  </CheckboxGroup>
);
CheckboxGroupRequired.storyName = "CheckboxGroupRequired";

export const IsOptional: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox"
      name="checkbox-is-optional"
      isOptional
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
IsOptional.storyName = "IsOptional";

export const CheckboxGroupIsOptional: Story = () => (
  <CheckboxGroup isOptional legend="Checkbox Group">
    {["One", "Two", "Three"].map((label) => (
      <Checkbox
        id={`checkbox-group-is-optional-${label}`}
        key={`checkbox-group-is-optional-${label}`}
        name={`checkbox-group-is-optional-${label}`}
        label={label}
      />
    ))}
  </CheckboxGroup>
);
CheckboxGroupIsOptional.storyName = "CheckboxGroupIsOptional";
