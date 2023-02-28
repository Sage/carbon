import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import NumeralDate from ".";

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
