import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import { Checkbox, CheckboxGroup } from ".";

export const Default: ComponentStory<typeof Checkbox> = () => {
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

export const Sizes: ComponentStory<typeof Checkbox> = () => (
  <>
    <Checkbox
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

export const Disabled: ComponentStory<typeof Checkbox> = () => (
  <Checkbox disabled label="Disabled checkbox" name="checkbox-disabled" />
);

export const Reverse: ComponentStory<typeof Checkbox> = () => (
  <Checkbox label="Reversed checkbox" name="checkbox-reverse" reverse />
);

export const WithFieldHelp: ComponentStory<typeof Checkbox> = () => (
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

export const WithLabelHelp: ComponentStory<typeof Checkbox> = () => (
  <Checkbox
    helpAriaLabel="This text provides more information for the label."
    label="With labelHelp"
    labelHelp="This text provides more information for the label."
    name="checkbox-labelHelp"
  />
);

export const WithCustomLabelWidth: ComponentStory<typeof Checkbox> = () => (
  <Checkbox
    label="With custom labelWidth and label aligned to right"
    labelWidth={100}
    labelAlign="right"
    name="checkbox-custom-label"
  />
);

export const WithCheckboxGroup: ComponentStory<typeof Checkbox> = () => (
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

export const WithCheckboxGroupInlineLegend: ComponentStory<
  typeof Checkbox
> = () => (
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
