import React, { useState } from "react";
import { action } from "storybook/actions";
import NumeralDate from ".";
import Box from "../box";
import { NumeralDateProps } from "./numeral-date.component";

export default {
  title: "Numeral Date/Test",
  component: NumeralDate,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
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
        legend="Numeral date"
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
Default.parameters = { chromatic: { disableSnapshot: true } };

export const Validations = (args: NumeralDateProps) => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="Numeral date"
        error="Error Message"
        legendHint="Hint text"
        mb={2}
        {...args}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <NumeralDate
        validationMessagePositionTop={false}
        legend="Numeral date"
        error="Error Message"
        legendHint="Hint text"
        mb={2}
        {...args}
        value={value2}
        onChange={(ev) => setValue2(ev.target.value)}
      />
    </>
  );
};
Validations.storyName = "New validations";

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
      <form>
        <NumeralDate
          mb={2}
          legend="inline small"
          size="small"
          {...args}
          value={dateValue}
          onChange={(event) => setDateValue(event.target.value)}
          required
          labelHelp="labelHelp"
        />
        <NumeralDate
          mb={2}
          legend="inline medium"
          size="medium"
          {...args}
          value={dateValue2}
          onChange={(event) => setDateValue2(event.target.value)}
          required
          labelHelp="labelHelp"
        />
        <NumeralDate
          mb={2}
          legend="inline large"
          size="large"
          {...args}
          value={dateValue3}
          onChange={(event) => setDateValue3(event.target.value)}
          required
          labelHelp="labelHelp"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};
InlineLabelsSizes.storyName = "Inline labels sizes";
InlineLabelsSizes.args = {
  dateFormat: ["dd", "mm", "yyyy"],
  labelInline: true,
};
