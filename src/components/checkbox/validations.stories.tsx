import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const NewStringValidation: Story = () => {
  return (
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
};
NewStringValidation.storyName = "New String Validation";

export const NewStringValidationInline: Story = () => {
  return (
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
};
NewStringValidationInline.storyName = "New String Validation Inline";

export const NewInline: Story = () => {
  return (
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
};
NewInline.storyName = "New Inline";
