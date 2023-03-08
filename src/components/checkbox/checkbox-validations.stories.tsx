import React from "react";
import { ComponentStory } from "@storybook/react";
import { Checkbox, CheckboxGroup } from ".";

export const StringValidation: ComponentStory<typeof Checkbox> = () => (
  <>
    <Checkbox
      error="Message"
      id="checkbox_error"
      key="checkbox_error"
      label="Example checkbox (error)"
      name="checkbox_error"
    />
    <Checkbox
      id="checkbox_warning"
      key="checkbox_warning"
      label="Example checkbox (warning)"
      name="checkbox_warning"
      warning="Message"
    />
    <Checkbox
      id="checkbox_info"
      info="Message"
      key="checkbox_info"
      label="Example checkbox (info)"
      name="checkbox_info"
    />
  </>
);

export const StringValidationWithTooltipPosition: ComponentStory<
  typeof Checkbox
> = () => (
  <>
    <Checkbox
      error="Message"
      id="checkbox_error-tooltipPosition-override"
      key="checkbox_error"
      label="Example checkbox (error)"
      name="checkbox_error-tooltipPosition-override"
      tooltipPosition="bottom"
    />
    <Checkbox
      id="checkbox_warning-tooltipPosition-override"
      key="checkbox_warning"
      label="Example checkbox (warning)"
      name="checkbox_warning-tooltipPosition-override"
      warning="Message"
      tooltipPosition="bottom"
    />
    <Checkbox
      id="checkbox_info-tooltipPosition-override"
      info="Message"
      key="checkbox_info"
      label="Example checkbox (info)"
      name="checkbox_info-tooltipPosition-override"
      tooltipPosition="bottom"
    />
  </>
);

StringValidationWithTooltipPosition.parameters = {
  chromatic: { disableSnapshot: true },
};

export const BooleanValidation: ComponentStory<typeof Checkbox> = () => (
  <>
    <Checkbox
      error
      id="checkbox_error-boolean"
      key="checkbox_error"
      label="Example checkbox (error)"
      name="checkbox_error-boolean"
    />
    <Checkbox
      id="checkbox_warning-boolean"
      key="checkbox_warning"
      label="Example checkbox (warning)"
      name="checkbox_warning-boolean"
      warning
    />
    <Checkbox
      id="checkbox_info-boolean"
      info
      key="checkbox_info"
      label="Example checkbox (info)"
      name="checkbox_info-boolean"
    />
  </>
);

export const CheckboxGroupStringValidation: ComponentStory<
  typeof Checkbox
> = () => (
  <>
    <CheckboxGroup error="Message" legend="Group error">
      <Checkbox
        id="checkbox-one-error"
        key="checkbox-one-error"
        label="Example checkbox one"
        name="checkbox-one-error"
      />
      <Checkbox
        id="checkbox-two-error"
        key="checkbox-two-error"
        label="Example checkbox two"
        name="checkbox-two-error"
      />
      <Checkbox
        id="checkbox-three-error"
        key="checkbox-three-error"
        label="Example checkbox three"
        name="checkbox-three-error"
      />
    </CheckboxGroup>
    <CheckboxGroup warning="Message" legend="Group warning">
      <Checkbox
        id="checkbox-one-warning"
        key="checkbox-one-warning"
        label="Example checkbox one"
        name="checkbox-one-warning"
      />
      <Checkbox
        id="checkbox-two-warning"
        key="checkbox-two-warning"
        label="Example checkbox two"
        name="checkbox-two-warning"
      />
      <Checkbox
        id="checkbox-three-warning"
        key="checkbox-three-warning"
        label="Example checkbox three"
        name="checkbox-three-warning"
      />
    </CheckboxGroup>
    <CheckboxGroup info="Message" legend="Group info">
      <Checkbox
        id="checkbox-one-info"
        key="checkbox-one-info"
        label="Example checkbox one"
        name="checkbox-one-info"
      />
      <Checkbox
        id="checkbox-two-info"
        key="checkbox-two-info"
        label="Example checkbox two"
        name="checkbox-two-info"
      />
      <Checkbox
        id="checkbox-three-info"
        key="checkbox-three-info"
        label="Example checkbox three"
        name="checkbox-three-info"
      />
    </CheckboxGroup>
  </>
);

export const CheckboxGroupStringValidationTooltipPosition: ComponentStory<
  typeof Checkbox
> = () => (
  <>
    <CheckboxGroup
      error="Message"
      legend="Group error"
      tooltipPosition="bottom"
    >
      <Checkbox
        id="checkbox-one-error"
        key="checkbox-one-error"
        label="Example checkbox one"
        name="checkbox-one-error"
      />
      <Checkbox
        id="checkbox-two-error"
        key="checkbox-two-error"
        label="Example checkbox two"
        name="checkbox-two-error"
      />
      <Checkbox
        id="checkbox-three-error"
        key="checkbox-three-error"
        label="Example checkbox three"
        name="checkbox-three-error"
      />
    </CheckboxGroup>
    <CheckboxGroup
      warning="Message"
      legend="Group warning"
      tooltipPosition="bottom"
    >
      <Checkbox
        id="checkbox-one-warning"
        key="checkbox-one-warning"
        label="Example checkbox one"
        name="checkbox-one-warning"
      />
      <Checkbox
        id="checkbox-two-warning"
        key="checkbox-two-warning"
        label="Example checkbox two"
        name="checkbox-two-warning"
      />
      <Checkbox
        id="checkbox-three-warning"
        key="checkbox-three-warning"
        label="Example checkbox three"
        name="checkbox-three-warning"
      />
    </CheckboxGroup>
    <CheckboxGroup info="Message" legend="Group info" tooltipPosition="bottom">
      <Checkbox
        id="checkbox-one-info"
        key="checkbox-one-info"
        label="Example checkbox one"
        name="checkbox-one-info"
      />
      <Checkbox
        id="checkbox-two-info"
        key="checkbox-two-info"
        label="Example checkbox two"
        name="checkbox-two-info"
      />
      <Checkbox
        id="checkbox-three-info"
        key="checkbox-three-info"
        label="Example checkbox three"
        name="checkbox-three-info"
      />
    </CheckboxGroup>
  </>
);

CheckboxGroupStringValidationTooltipPosition.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CheckboxGroupBooleanValidation: ComponentStory<
  typeof Checkbox
> = () => (
  <>
    <CheckboxGroup error legend="Group error">
      <Checkbox
        id="checkbox-one-error"
        key="checkbox-one-error"
        label="Example checkbox one"
        name="checkbox-one-error"
      />
      <Checkbox
        id="checkbox-two-error"
        key="checkbox-two-error"
        label="Example checkbox two"
        name="checkbox-two-error"
      />
      <Checkbox
        id="checkbox-three-error"
        key="checkbox-three-error"
        label="Example checkbox three"
        name="checkbox-three-error"
      />
    </CheckboxGroup>
    <CheckboxGroup warning legend="Group warning">
      <Checkbox
        id="checkbox-one-warning"
        key="checkbox-one-warning"
        label="Example checkbox one"
        name="checkbox-one-warning"
      />
      <Checkbox
        id="checkbox-two-warning"
        key="checkbox-two-warning"
        label="Example checkbox two"
        name="checkbox-two-warning"
      />
      <Checkbox
        id="checkbox-three-warning"
        key="checkbox-three-warning"
        label="Example checkbox three"
        name="checkbox-three-warning"
      />
    </CheckboxGroup>
    <CheckboxGroup info legend="Group info">
      <Checkbox
        id="checkbox-one-info"
        key="checkbox-one-info"
        label="Example checkbox one"
        name="checkbox-one-info"
      />
      <Checkbox
        id="checkbox-two-info"
        key="checkbox-two-info"
        label="Example checkbox two"
        name="checkbox-two-info"
      />
      <Checkbox
        id="checkbox-three-info"
        key="checkbox-three-info"
        label="Example checkbox three"
        name="checkbox-three-info"
      />
    </CheckboxGroup>
  </>
);

export const Required: ComponentStory<typeof Checkbox> = () => (
  <Checkbox
    label="I agree to the Terms and Conditions"
    name="required"
    required
  />
);
