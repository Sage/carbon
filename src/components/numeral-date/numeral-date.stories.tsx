import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import NumeralDate from ".";
import Box from "../box";
import CarbonProvider from "../carbon-provider";

export const Default: ComponentStory<typeof NumeralDate> = () => (
  <NumeralDate
    defaultValue={{ dd: "01", mm: "02", yyyy: "2020" }}
    label="Default"
  />
);

export const Controlled: ComponentStory<typeof NumeralDate> = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });

  return (
    <NumeralDate
      onChange={(e) => setValue(e.target.value)}
      label="Default"
      value={value}
    />
  );
};

export const AllowedDateFormats: ComponentStory<typeof NumeralDate> = () => (
  <>
    <NumeralDate label="DD/MM/YYYY - default" />
    <NumeralDate label="MM/DD/YYYY" dateFormat={["mm", "dd", "yyyy"]} />
    <NumeralDate label="YYYY/MM/DD" dateFormat={["yyyy", "mm", "dd"]} />
    <NumeralDate label="DD/MM" dateFormat={["dd", "mm"]} />
    <NumeralDate label="MM/DD" dateFormat={["mm", "dd"]} />
    <NumeralDate label="MM/YYYY" dateFormat={["mm", "yyyy"]} />
  </>
);

export const InternalValidationError: ComponentStory<
  typeof NumeralDate
> = () => {
  const [value, setValue] = useState({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <NumeralDate
      enableInternalError
      onChange={(e) => setValue(e.target.value)}
      label="Default"
      value={value}
    />
  );
};

export const InternalValidationWarning: ComponentStory<
  typeof NumeralDate
> = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <NumeralDate
      enableInternalWarning
      label="Default"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export const Validation: ComponentStory<typeof NumeralDate> = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <>
      <NumeralDate
        label="Validation as string"
        error="Error Message (Fix is required)"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        label="Validation as string on label"
        error="Error Message (Fix is required)"
        validationOnLabel
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        label="Validation as boolean"
        error
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
        label="Validation as string"
        warning="Warning Message (Fix is optional)"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <NumeralDate
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

export const NewValidation: ComponentStory<typeof NumeralDate> = () => {
  const [value, setValue] = useState({ dd: "", mm: "", yyyy: "" });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box m={2}>
        <NumeralDate
          label="Validation as string - Error"
          labelHelp="Label help"
          error="Error Message (Fix is required)"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <NumeralDate
          label="Validation as boolean - Error"
          labelHelp="Label help"
          error
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <NumeralDate
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

export const InlineLabel: ComponentStory<typeof NumeralDate> = () => {
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

export const EnablingAdaptiveBehaviour: ComponentStory<
  typeof NumeralDate
> = () => {
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

EnablingAdaptiveBehaviour.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithLabelHelp: ComponentStory<typeof NumeralDate> = () => {
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

export const WithFieldHelp: ComponentStory<typeof NumeralDate> = () => {
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

export const Size: ComponentStory<typeof NumeralDate> = () => (
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
