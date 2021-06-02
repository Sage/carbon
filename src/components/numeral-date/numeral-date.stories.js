import React, { useState } from "react";
import { array, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import NumeralDate from ".";
import Box from "../box";

export default {
  title: "Design System/Numeral Date/Test",
  component: NumeralDate,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [dateValue, setDateValue] = useState({ dd: "", mm: "", yyyy: "" });
  const dateFormat = array("dateFormat", ["dd", "mm", "yyyy"]);

  const handleChange = (ev) => {
    setDateValue(ev.target.value);
    action("change")(ev);
  };

  const handleBlur = (ev) => {
    action("blur")(ev);
  };

  return (
    <Box mt="120px">
      <NumeralDate
        onChange={handleChange}
        label="Numeral date"
        onBlur={handleBlur}
        dateFormat={dateFormat}
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
      />
    </Box>
  );
};

export const Validations = () => {
  const validationTypes = ["error", "warning", "info"];
  const [dateValue, setDateValue] = useState({});
  const dateFormat = array("dateFormat", ["dd", "mm", "yyyy"]);

  const handleChange = (ev, itemId) => {
    setDateValue({ ...dateValue, [itemId]: ev.target.value });
    action("change")(ev);
  };

  const handleBlur = (ev) => {
    action("blur")(ev);
  };

  return (
    <>
      <h4>Validations as string</h4>
      {validationTypes.map((validation) => (
        <NumeralDate
          key={`${validation}-string`}
          onChange={handleChange}
          label="Numeral date"
          {...{ [validation]: "Message" }}
          onBlur={handleBlur}
          dateFormat={dateFormat}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-string`}
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
          dateFormat={dateFormat}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-boolean`}
        />
      ))}
    </>
  );
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

Validations.story = {
  name: "validations",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
