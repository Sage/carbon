import React, { useState } from "react";
import { action } from "storybook/actions";
import DateRange, {
  DateRangeChangeEvent,
  DateRangeProps,
} from "./date-range.component";
import CarbonProvider from "../carbon-provider";

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
  datePickerStartAriaLabel: "start aria-label",
  datePickerStartAriaLabelledBy: "start aria-labelledby",
  datePickerEndAriaLabel: "end aria-label",
  datePickerEndAriaLabelledBy: "end aria-labelledby",
};

export const DateRangeCustom = ({
  onChange,
  onBlur,
  id,
  name,
  ...props
}: Partial<DateRangeProps>) => {
  const [state, setState] = React.useState(["01/10/2016", "30/10/2016"]);

  const handleChange = (evt: DateRangeChangeEvent) => {
    const newValue = [
      evt.target.value[0].formattedValue,
      evt.target.value[1].formattedValue,
    ];

    if (onChange) {
      onChange(evt);
    }

    setState(newValue);
  };

  const handleOnBlur = (evt: DateRangeChangeEvent) => {
    if (onBlur) {
      onBlur(evt);
    }
  };

  return (
    <DateRange
      startLabel="start label"
      endLabel="end label"
      onChange={handleChange}
      onBlur={handleOnBlur}
      value={state}
      name={name || "test-name"}
      id={id || "test-id"}
      {...props}
    />
  );
};

export const Validation = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);

  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <>
      <DateRange
        startLabel="Start"
        endLabel="End"
        startError="Start Error"
        endError="End Error"
        onChange={handleChange}
        value={state}
        mb={2}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startWarning="Start Warning"
        endWarning="End Warning"
        onChange={handleChange}
        value={state}
        mb={2}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startInfo="Start Info"
        endInfo="End Info"
        onChange={handleChange}
        value={state}
        mb={2}
      />

      <DateRange
        startLabel="Start"
        endLabel="End"
        startError="Start Error"
        endError="End Error"
        validationOnLabel
        onChange={handleChange}
        value={state}
        mb={2}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startWarning="Start Warning"
        endWarning="End Warning"
        validationOnLabel
        onChange={handleChange}
        value={state}
        mb={2}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startInfo="Start Info"
        endInfo="End Info"
        validationOnLabel
        onChange={handleChange}
        value={state}
        mb={2}
      />

      <DateRange
        startLabel="Start"
        endLabel="End"
        startError
        endError
        onChange={handleChange}
        value={state}
        mb={2}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startWarning
        endWarning
        onChange={handleChange}
        value={state}
        mb={2}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startInfo
        endInfo
        onChange={handleChange}
        value={state}
        mb={2}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);

  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      <DateRange
        startLabel="Start"
        endLabel="End"
        startError="Start Error with long text"
        endError="End Error"
        onChange={handleChange}
        value={state}
        mb={2}
        startDateProps={{ inputHint: "Start Date Hint" }}
        endDateProps={{ inputHint: "End Date Hint" }}
      />
      <DateRange
        startLabel="Start"
        endLabel="End"
        startWarning="Start Warning"
        endWarning="End Warning with long text"
        onChange={handleChange}
        value={state}
      />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
