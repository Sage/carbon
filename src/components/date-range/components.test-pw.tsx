import React, { useState } from "react";
import DateRange, {
  CombinedDateRangeProps,
  DateRangeChangeEvent,
  DateRangeProps,
} from "./date-range.component";
import CarbonProvider from "../carbon-provider";

interface DateRangeExampleProps {
  initialDates: string[];
  allowEmptyValueOnStartDate: boolean;
  allowEmptyValueOnEndDate: boolean;
}

export const DateRangeExample = ({
  initialDates,
  allowEmptyValueOnStartDate,
  allowEmptyValueOnEndDate,
  startLabel,
  endLabel,
  ...props
}: Partial<DateRangeProps> & DateRangeExampleProps) => {
  const [state, setState] = useState(initialDates);
  const handleChange = (evt: DateRangeChangeEvent) => {
    const newValue = [
      evt.target.value[0].formattedValue,
      evt.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      onChange={(evt) => handleChange(evt)}
      value={state}
      startDateProps={{
        allowEmptyValue: allowEmptyValueOnStartDate,
      }}
      endDateProps={{
        allowEmptyValue: allowEmptyValueOnEndDate,
      }}
      startLabel={startLabel}
      endLabel={endLabel}
      {...props}
    />
  );
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

export const DateRangeNewValidation = () => {
  const [state, setState] = React.useState(["01/10/2016", "30/10/2016"]);

  const handleChange = ({ target }: DateRangeChangeEvent) => {
    const newValue = [
      target.value[0].formattedValue,
      target.value[1].formattedValue,
    ];

    setState(newValue);
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      {[
        {
          startError: "Start error with long text string",
          endError: "End error",
        },
        {
          startWarning: "Start warning",
          endWarning: "End warning with long text string",
        },
      ].map((validation) => (
        <DateRange
          key={`${Object.keys(validation)[0]}-string-component`}
          startLabel="Start"
          endLabel="End"
          onChange={handleChange}
          value={state}
          {...validation}
          m={4}
        />
      ))}
    </CarbonProvider>
  );
};

export const DateRangeCombined = ({
  initialValue = ["", ""],
  onChange,
  ...props
}: Partial<Omit<CombinedDateRangeProps, "rangeType">> & {
  initialValue?: string[];
}) => {
  const [state, setState] = useState(initialValue);

  return (
    <DateRange
      rangeType="combined"
      label="Date range"
      inputHint="Select a start date and an end date"
      value={state}
      onChange={(evt) => {
        setState([
          evt.target.value[0].formattedValue,
          evt.target.value[1].formattedValue,
        ]);
        onChange?.(evt);
      }}
      {...props}
    />
  );
};

export const DateRangeCombinedInForm = ({
  onSubmit,
}: {
  onSubmit: (start: string, end: string) => void;
}) => (
  <form
    onSubmit={(ev) => {
      ev.preventDefault();
      const data = new FormData(ev.currentTarget);
      onSubmit(
        String(data.get("booking-start")),
        String(data.get("booking-end")),
      );
    }}
    style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
  >
    <div style={{ width: "320px" }}>
      <DateRangeCombined name="booking" />
    </div>
    <button type="submit">Submit</button>
  </form>
);

export const DateRangeSizes = () => (
  <>
    {(["small", "large"] as const).map((size) => (
      <DateRange
        key={size}
        data-role={`date-range-${size}`}
        size={size}
        startLabel="Start"
        endLabel="End"
        value={["15/07/2025", "28/07/2025"]}
        onChange={() => {}}
        endDateProps={{ size: "medium" }}
      />
    ))}
  </>
);
