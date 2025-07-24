import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import CarbonProvider from "../carbon-provider";
import NumeralDate, { NumeralDateHandle, NumeralDateProps } from ".";
import Button from "../button";

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
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Default"
    />
  );
};
Default.storyName = "Default";

export const WithInputHint: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });

  return (
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="With label help"
        labelHelp="Label help"
      />
    </CarbonProvider>
  );
};
WithInputHint.storyName = "With Input Hint";

export const AllowedDateFormats: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });

  return (
    <>
      <NumeralDate
        label="DD/MM/YYYY - default"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="MM/DD/YYYY"
        dateFormat={["mm", "dd", "yyyy"]}
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="YYYY/MM/DD"
        dateFormat={["yyyy", "mm", "dd"]}
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="DD/MM"
        dateFormat={["dd", "mm"]}
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="MM/DD"
        dateFormat={["mm", "dd"]}
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="MM/YYYY"
        dateFormat={["mm", "yyyy"]}
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
AllowedDateFormats.storyName = "Allowed Date Formats";

export const InternalValidationError: Story = () => {
  const [valueOld, setValueOld] = useState<NumeralDateProps["value"]>({
    dd: "33",
    mm: "01",
    yyyy: "1999",
  });
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
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
  const [valueOld, setValueOld] = useState<NumeralDateProps["value"]>({
    dd: "33",
    mm: "01",
    yyyy: "1999",
  });
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
  });
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

export const InlineLabel: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
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
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
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
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
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
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
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
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });

  return (
    <>
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="small"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="medium"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="large"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
Size.storyName = "Size";

export const Required: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <NumeralDate
      name="date-of-birth"
      label="Date of Birth"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      required
    />
  );
};
Required.storyName = "Required";

export const ProgrammaticFocus = () => {
  const ndRef = React.useRef<NumeralDateHandle>(null);
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
  };
  const handleClick = () => {
    ndRef.current?.focus();
  };
  return (
    <>
      <Button mb={2} onClick={handleClick}>
        Click me to focus NumeralDate
      </Button>
      <NumeralDate
        ref={ndRef}
        onChange={handleChange}
        label="Numeral date"
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
      />
    </>
  );
};

ProgrammaticFocus.storyName = "Programmatic Focus";
