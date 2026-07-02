import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import NumeralDate, { NumeralDateHandle, NumeralDateProps } from ".";
import Button from "../button/__next__/button.component";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof NumeralDate> = {
  title: "Numeral Date",
  component: NumeralDate,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
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
      legend="Date of Birth"
    />
  );
};
Default.storyName = "Default";

export const ReadOnly: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      readOnly
    />
  );
};
ReadOnly.storyName = "Read-only";

export const Disabled: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      disabled
    />
  );
};
Disabled.storyName = "Disabled";

export const WithInputHint: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      legendHint="For example, 25 10 1998"
    />
  );
};
WithInputHint.storyName = "With Input Hint";

export const AllowedDateFormats: Story = () => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value4, setValue4] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value5, setValue5] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value6, setValue6] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="DD/MM/YYYY - default"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        legend="MM/DD/YYYY"
        dateFormat={["mm", "dd", "yyyy"]}
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        legend="YYYY/MM/DD"
        dateFormat={["yyyy", "mm", "dd"]}
        mb={2}
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
      <NumeralDate
        legend="DD/MM"
        dateFormat={["dd", "mm"]}
        mb={2}
        value={value4}
        onChange={(e) => setValue4(e.target.value)}
      />
      <NumeralDate
        legend="MM/DD"
        dateFormat={["mm", "dd"]}
        mb={2}
        value={value5}
        onChange={(e) => setValue5(e.target.value)}
      />
      <NumeralDate
        legend="MM/YYYY"
        dateFormat={["mm", "yyyy"]}
        mb={2}
        value={value6}
        onChange={(e) => setValue6(e.target.value)}
      />
    </>
  );
};
AllowedDateFormats.storyName = "Allowed Date Formats";
AllowedDateFormats.parameters = { chromatic: { disableSnapshot: false } };

export const InternalValidationError: Story = () => {
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
  });
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
      <NumeralDate
        enableInternalError
        legend="Default - new validation (top)"
        onChange={(e) => setValueNew(e.target.value)}
        value={valueNew}
      />
      <NumeralDate
        validationMessagePositionTop={false}
        enableInternalError
        legend="Default - new validation (bottom)"
        onChange={(e) => setValueNew(e.target.value)}
        value={valueNew}
      />
    </Box>
  );
};
InternalValidationError.storyName = "Internal Validation Error";

export const Size: Story = () => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="Small"
        dateFormat={["dd", "mm", "yyyy"]}
        size="small"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        legend="Medium"
        dateFormat={["dd", "mm", "yyyy"]}
        size="medium"
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        legend="Large"
        dateFormat={["dd", "mm", "yyyy"]}
        size="large"
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
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
      legend="Date of Birth"
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
        legend="Numeral date"
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
      />
    </>
  );
};

ProgrammaticFocus.storyName = "Programmatic Focus";

export const WithCustomFieldIds: Story = () => {
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
  };
  return (
    <NumeralDate
      value={dateValue}
      onChange={handleChange}
      legend="Default"
      inputIds={{
        day: "date-field-custom-id",
        month: "month-field-custom-id",
        year: "year-field-custom-id",
      }}
    />
  );
};
WithCustomFieldIds.storyName = "With Custom Field IDs";
