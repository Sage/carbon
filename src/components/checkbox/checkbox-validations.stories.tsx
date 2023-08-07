import React from "react";
import { ComponentStory } from "@storybook/react";
import { Checkbox, CheckboxGroup } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

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
      key="checkbox_info"
      label="Example checkbox (info)"
      name="checkbox_info"
      info="Message"
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

export const NewStringValidation: ComponentStory<typeof Checkbox> = () => (
  <CarbonProvider validationRedesignOptIn>
    <CheckboxGroup
      error="Error message (Fix is required)"
      legend="Label"
      legendHelp="Hint Text"
      required
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
      mt={2}
      warning="Warning message (Fix is optional)"
      legend="Label"
      legendHelp="Hint text"
      required
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
  </CarbonProvider>
);

export const NewStringValidationInline: ComponentStory<
  typeof Checkbox
> = () => (
  <CarbonProvider validationRedesignOptIn>
    <CheckboxGroup
      error="Error message (Fix is required)"
      legend="Label"
      legendHelp="Hint Text"
      required
      inline
    >
      <Checkbox
        id="checkbox-one-error-inline"
        key="checkbox-one-error-inline"
        label="Example checkbox one"
        name="checkbox-one-error-inline"
      />
      <Checkbox
        id="checkbox-two-error-inline"
        key="checkbox-two-error-inline"
        label="Example checkbox two"
        name="checkbox-two-error-inline"
      />
      <Checkbox
        id="checkbox-three-error-inline"
        key="checkbox-three-error-inline"
        label="Example checkbox three"
        name="checkbox-three-error-inline"
      />
    </CheckboxGroup>
    <CheckboxGroup
      mt={2}
      warning="Warning message (Fix is optional)"
      legend="Label"
      legendHelp="Hint text"
      required
      inline
    >
      <Checkbox
        id="checkbox-one-warning-inline"
        key="checkbox-one-warning-inline"
        label="Example checkbox one"
        name="checkbox-one-warning-inline"
      />
      <Checkbox
        id="checkbox-two-warning-inline"
        key="checkbox-two-warning-inline"
        label="Example checkbox two"
        name="checkbox-two-warning-inline"
      />
      <Checkbox
        id="checkbox-three-warning-inline"
        key="checkbox-three-warning-inline"
        label="Example checkbox three"
        name="checkbox-three-warning-inline"
      />
    </CheckboxGroup>
  </CarbonProvider>
);

export const NewInline: ComponentStory<typeof Checkbox> = () => (
  <CarbonProvider validationRedesignOptIn>
    <CheckboxGroup legend="Label" legendHelp="Hint Text" required inline>
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
  </CarbonProvider>
);

export const NewBooleanValidation: ComponentStory<typeof Checkbox> = () => (
  <CarbonProvider validationRedesignOptIn>
    <Checkbox
      error="message"
      id="checkbox-one-error-boolean"
      key="checkbox-one-error-boolean"
      label="Example checkbox one - Error"
      name="checkbox-one-error-boolean"
    />
    <Checkbox
      warning
      id="checkbox-two-warning-boolean"
      key="checkbox-two-warning-boolean"
      label="Example checkbox two - Warning"
      name="checkbox-two-warning-boolean"
    />
  </CarbonProvider>
);
