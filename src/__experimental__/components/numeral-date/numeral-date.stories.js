import React, { useState } from "react";
import { array, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import NumeralDate from ".";

export default {
  title: "Design System/Numeral Date/Test",
  component: NumeralDate,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
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
    <NumeralDate
      onChange={handleChange}
      label="Numeral date"
      onBlur={handleBlur}
      dateFormat={dateFormat}
      value={dateValue}
      name="numeralDate_name"
      id="numeralDate_id"
    />
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

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

Validations.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
