import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import DateRange, {
  DateRangeChangeEvent,
  DateRangeProps,
} from "./date-range.component";

export default {
  title: "Date Range/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

interface DateRangeStoryProps {
  initialDates: string[];
  allowEmptyValueOnStartDate: boolean;
  allowEmptyValueOnEndDate: boolean;
}

export const DateRangeStory = ({
  initialDates,
  allowEmptyValueOnStartDate,
  allowEmptyValueOnEndDate,
  startLabel,
  endLabel,
  ...args
}: Partial<DateRangeProps> & DateRangeStoryProps) => {
  const [state, setState] = useState(initialDates);
  const handleChange = (evt: DateRangeChangeEvent) => {
    const newValue = [
      evt.target.value[0].formattedValue,
      evt.target.value[1].formattedValue,
    ];
    setState(newValue);
    action("change")(evt.target.value);
  };
  return (
    <DateRange
      onChange={(evt) => handleChange(evt)}
      value={state}
      onBlur={(evt) => action("blur")(evt.target.value)}
      startDateProps={{
        allowEmptyValue: allowEmptyValueOnStartDate,
      }}
      endDateProps={{
        allowEmptyValue: allowEmptyValueOnEndDate,
      }}
      startLabel={startLabel}
      endLabel={endLabel}
      {...args}
    />
  );
};

DateRangeStory.args = {
  initialDates: ["2016-10-01", "2016-10-30"],
  startLabel: "",
  endLabel: "",
  allowEmptyValueOnStartDate: undefined,
  allowEmptyValueOnEndDate: undefined,
  labelsInline: false,
};
