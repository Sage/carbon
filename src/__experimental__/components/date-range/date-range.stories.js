import React, { useState } from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import DateRange from "./date-range.component";

export default {
  title: "Experimental/Date Range/Test",
  component: DateRange,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [state, setState] = useState(["2016-10-01", "2016-10-30"]);
  const startLabel = text("startLabel", "");
  const endLabel = text("endLabel", "");
  const labelsInline =
    startLabel || endLabel ? boolean("labelsInline", false) : undefined;

  const handleChange = (evt) => {
    const newValue = [
      evt.target.value[0].rawValue,
      evt.target.value[1].rawValue,
    ];
    setState(newValue);
    action("changed")(evt.target.value);
  };

  return (
    <DateRange
      onChange={handleChange}
      endLabel={endLabel}
      value={state}
      startLabel={startLabel}
      labelsInline={labelsInline}
      onBlur={(ev) => action("blur")(ev)}
    />
  );
};

Default.story = {
  name: "default",
};
