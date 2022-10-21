import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import NumeralDate from ".";
import Box from "../box";
import {
  DayMonthDate,
  FullDate,
  NumeralDateEvent,
  NumeralDateProps,
} from "./numeral-date.component";

export default {
  title: "Numeral Date/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = (args: NumeralDateProps) => {
  const [dateValue, setDateValue] = useState<FullDate>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange = (event: NumeralDateEvent) => {
    setDateValue(event.target.value as FullDate);
    action("change")(event);
  };
  const handleBlur = (event: NumeralDateEvent) => {
    action("blur")(event);
  };
  return (
    <Box mt="120px">
      <NumeralDate
        onChange={handleChange}
        label="Numeral date"
        onBlur={handleBlur}
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
        {...args}
      />
    </Box>
  );
};

Default.storyName = "default";
Default.args = {
  dateFormat: ["dd", "mm", "yyyy"],
};

export const Validations = (args: NumeralDateProps<DayMonthDate>) => {
  const validationTypes = ["error", "warning", "info"];
  const [dateValue, setDateValue] = useState({ dd: "", mm: "" });
  const handleChange = (event: NumeralDateEvent<DayMonthDate>) => {
    setDateValue({ ...dateValue });
    action("change")(event);
  };
  const handleBlur = (event: NumeralDateEvent<DayMonthDate>) => {
    action("blur")(event);
  };
  return (
    <>
      <h4>Validations as string</h4>
      {validationTypes.map((validation) => (
        <NumeralDate<DayMonthDate>
          key={`${validation}-string`}
          onChange={handleChange}
          label="Numeral date"
          {...{ [validation]: "Message" }}
          onBlur={handleBlur}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-string`}
          {...args}
        />
      ))}
      <h4>Validations as boolean</h4>
      {validationTypes.map((validation) => (
        <NumeralDate
          key={`${validation}-boolean`}
          onChange={handleChange}
          label="Numeral date"
          {...{ [validation]: true }}
          onBlur={handleBlur}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-boolean`}
          {...args}
        />
      ))}
    </>
  );
};

Validations.storyName = "validations";
