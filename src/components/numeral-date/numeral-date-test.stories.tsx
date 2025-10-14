import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import NumeralDate from ".";
import Box from "../box";
import { NumeralDateProps } from "./numeral-date.component";

export default {
  title: "Numeral Date/Test",
  component: NumeralDate,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: [
        "value",
        "defaultValue",
        "onChange",
        "onBlur",
        "dayRef",
        "monthRef",
        "yearRef",
      ],
    },
  },
  argTypes: {
    fieldHelp: {
      control: {
        type: "text",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (args: NumeralDateProps) => {
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
    action("change")(event.target.value);
  };
  const handleBlur: NumeralDateProps["onBlur"] = (event) => {
    action("blur")(event.target.value);
  };
  return (
    <Box>
      <NumeralDate
        label="Numeral date"
        onBlur={handleBlur}
        name="numeralDate_name"
        id="numeralDate_id"
        {...args}
        onChange={handleChange}
        value={dateValue}
      />
    </Box>
  );
};
Default.storyName = "Default";
Default.args = {
  dateFormat: ["dd", "mm", "yyyy"],
};

export const Validations = (args: NumeralDateProps) => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value4, setValue4] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        label="Numeral date"
        error="Error Message"
        labelHelp="Hint text"
        mb={2}
        {...args}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <NumeralDate
        label="Numeral date"
        warning="Warning Message"
        mb={2}
        {...args}
        value={value2}
        onChange={(ev) => setValue2(ev.target.value)}
      />
      <NumeralDate
        validationMessagePositionTop={false}
        label="Numeral date"
        error="Error Message"
        labelHelp="Hint text"
        mb={2}
        {...args}
        value={value3}
        onChange={(ev) => setValue3(ev.target.value)}
      />
      <NumeralDate
        validationMessagePositionTop={false}
        label="Numeral date"
        warning="Warning Message"
        {...args}
        value={value4}
        onChange={(ev) => setValue4(ev.target.value)}
      />
    </>
  );
};

Validations.storyName = "New validations";
Validations.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InForm = () => {
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
    action("change")(event.target.value);
  };

  return (
    <form>
      <NumeralDate
        dateFormat={["dd", "mm", "yyyy"]}
        label="Label"
        value={dateValue}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
InForm.storyName = "In form";

export const InlineLabelsSizes = ({ ...args }) => {
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  const [dateValue2, setDateValue2] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  const [dateValue3, setDateValue3] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  return (
    <Box ml={2}>
      <NumeralDate
        mb={2}
        label="inline small"
        size="small"
        {...args}
        value={dateValue}
        onChange={(event) => setDateValue(event.target.value)}
      />
      <NumeralDate
        mb={2}
        label="inline medium"
        size="medium"
        {...args}
        value={dateValue2}
        onChange={(event) => setDateValue2(event.target.value)}
      />
      <NumeralDate
        mb={2}
        label="inline large"
        size="large"
        {...args}
        value={dateValue3}
        onChange={(event) => setDateValue3(event.target.value)}
      />
    </Box>
  );
};

InlineLabelsSizes.storyName = "Inline labels sizes";
InlineLabelsSizes.args = {
  dateFormat: ["dd", "mm", "yyyy"],
  labelInline: true,
};
InlineLabelsSizes.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
