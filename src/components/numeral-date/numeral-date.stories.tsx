import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import CarbonProvider from "../carbon-provider";
import Box from "../box";
import NumeralDate from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof NumeralDate> = {
  title: "Numeral Date",
  component: NumeralDate,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof NumeralDate>;

export const Default: Story = () => {
  return (
    <NumeralDate
      defaultValue={{ dd: "01", mm: "02", yyyy: "2020" }}
      label="Default"
    />
  );
};
Default.storyName = "Default";

export const Controlled: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });

  return (
    <NumeralDate
      onChange={(e) => setValue(e.target.value)}
      label="Default"
      value={value}
    />
  );
};
Controlled.storyName = "Controlled";

export const AllowedDateFormats: Story = () => {
  return (
    <>
      <NumeralDate label="DD/MM/YYYY - default" />
      <NumeralDate label="MM/DD/YYYY" dateFormat={["mm", "dd", "yyyy"]} />
      <NumeralDate label="YYYY/MM/DD" dateFormat={["yyyy", "mm", "dd"]} />
      <NumeralDate label="DD/MM" dateFormat={["dd", "mm"]} />
      <NumeralDate label="MM/DD" dateFormat={["mm", "dd"]} />
      <NumeralDate label="MM/YYYY" dateFormat={["mm", "yyyy"]} />
    </>
  );
};
AllowedDateFormats.storyName = "Allowed Date Formats";

export const InternalValidationError: Story = () => {
  const [valueOld, setValueOld] = useState({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const [valueNew, setValueNew] = useState({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <>
      <NumeralDate
        enableInternalError
        onChange={(e) => setValueOld(e.target.value)}
        label="Default - legacy validation"
        value={valueOld}
      />
      <br />
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          enableInternalError
          label="Default - new validation"
          onChange={(e) => setValueNew(e.target.value)}
          value={valueNew}
        />
      </CarbonProvider>
    </>
  );
};
InternalValidationError.storyName = "Internal Validation Error";

export const InternalValidationWarning: Story = () => {
  const [valueOld, setValueOld] = useState({ dd: "", mm: "", yyyy: "" });
  const [valueNew, setValueNew] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <>
      <NumeralDate
        enableInternalWarning
        label="Default - legacy validation"
        onChange={(e) => setValueOld(e.target.value)}
        value={valueOld}
      />
      <br />
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          enableInternalWarning
          label="Default - new validation"
          onChange={(e) => setValueNew(e.target.value)}
          value={valueNew}
        />
      </CarbonProvider>
    </>
  );
};
InternalValidationWarning.storyName = "Internal Validation Warning";

export const Validation: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <>
      <NumeralDate
        mb={2}
        label="Validation as string"
        error="Error Message (Fix is required)"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        mb={2}
        label="Validation as string on label"
        error="Error Message (Fix is required)"
        validationOnLabel
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        mb={2}
        label="Validation as boolean"
        error
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        mb={2}
        label="Validation as string"
        warning="Warning Message (Fix is optional)"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        mb={2}
        label="Validation as string on label"
        warning="Warning Message (Fix is optional)"
        validationOnLabel
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        label="Validation as boolean"
        warning
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </>
  );
};
Validation.storyName = "Validation";

export const NewValidation: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box m={2}>
        <NumeralDate
          mb={2}
          label="Validation as string - Error"
          labelHelp="Label help"
          error="Error Message (Fix is required)"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <NumeralDate
          mb={2}
          label="Validation as boolean - Error"
          labelHelp="Label help"
          error
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <NumeralDate
          mb={2}
          label="Validation as string - Warning"
          labelHelp="Label help"
          warning="Warning Message (Fix is optional)"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <NumeralDate
          label="Validation as boolean - Warning"
          labelHelp="Label help"
          warning
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Box>
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";

export const InlineLabel: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      label="Inline"
      labelInline
      labelAlign="right"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
InlineLabel.storyName = "Inline Label";

export const EnablingAdaptiveBehaviour: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      adaptiveLabelBreakpoint={960}
      label="Adaptive behaviour"
      labelInline
      labelAlign="right"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
EnablingAdaptiveBehaviour.storyName = "Enabling Adaptive Behaviour";
EnablingAdaptiveBehaviour.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithLabelHelp: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      helpAriaLabel="Label help"
      label="With label help"
      labelHelp="Label help"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
WithLabelHelp.storyName = "With Label Help";

export const WithFieldHelp: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      label="With field help"
      fieldHelp="Field help"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
WithFieldHelp.storyName = "With Field Help";

export const Size: Story = () => {
  return (
    <>
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="small"
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="medium"
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="large"
      />
    </>
  );
};
Size.storyName = "Size";

export const Required: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      name="optional"
      id="optional"
      label="Date of Birth"
      labelAlign="right"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      required
    />
  );
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      name="optional"
      id="optional"
      label="Date of Birth"
      labelAlign="right"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      isOptional
    />
  );
};
IsOptional.storyName = "IsOptional";
