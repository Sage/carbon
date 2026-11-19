import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import DateRange, {
  CombinedDateRangeProps,
  DateRangeChangeEvent,
  DateRangeProps,
} from "./date-range.component";
import Box from "../box";
import { Select, Option, OptionGroupHeader } from "../select";
import Button from "../button/__next__";
import Fieldset from "../fieldset";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DateRange> = {
  title: "Date Range",
  component: DateRange,
  argTypes: {
    ...styledSystemProps,
  },
  decorators: (StoryToRender) => (
    <Box minHeight="460px" p={4}>
      <StoryToRender />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof DateRange>;
type StandardPlaygroundArgs = Omit<
  DateRangeProps,
  "value" | "onChange" | "rangeType" | "startDateProps" | "endDateProps"
> & {
  startDisabled: boolean;
  endDisabled: boolean;
  startReadOnly: boolean;
  endReadOnly: boolean;
};
type CombinedPlaygroundArgs = Omit<
  CombinedDateRangeProps,
  "value" | "onChange" | "rangeType"
>;

const initialRange = ["15/07/2025", "28/07/2025"];

const toFormattedValues = (ev: DateRangeChangeEvent) => [
  ev.target.value[0].formattedValue,
  ev.target.value[1].formattedValue,
];

const StandardDateRangeWithState = ({
  initialValue = initialRange,
  ...props
}: Omit<DateRangeProps, "value" | "onChange" | "rangeType"> & {
  initialValue?: string[];
}) => {
  const [state, setState] = useState(initialValue);

  return (
    <DateRange
      startLabel="Start date"
      endLabel="End date"
      value={state}
      onChange={(ev) => setState(toFormattedValues(ev))}
      {...props}
    />
  );
};

const CombinedDateRangeWithState = ({
  initialValue = ["", ""],
  ...props
}: Omit<CombinedDateRangeProps, "value" | "onChange" | "rangeType"> & {
  initialValue?: string[];
}) => {
  const [state, setState] = useState(initialValue);

  return (
    <DateRange
      rangeType="combined"
      value={state}
      onChange={(ev) => setState(toFormattedValues(ev))}
      {...props}
    />
  );
};

export const StandardPlayground: StoryObj<StandardPlaygroundArgs> = {
  render: ({
    startDisabled,
    endDisabled,
    startReadOnly,
    endReadOnly,
    ...args
  }) => (
    <StandardDateRangeWithState
      {...args}
      startDateProps={{ disabled: startDisabled, readOnly: startReadOnly }}
      endDateProps={{ disabled: endDisabled, readOnly: endReadOnly }}
    />
  ),
  args: {
    startLabel: "Start date",
    endLabel: "End date",
    size: "medium",
    required: false,
    labelsInline: false,
    validationMessagePositionTop: true,
    startDisabled: false,
    endDisabled: false,
    startReadOnly: false,
    endReadOnly: false,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: {
      include: [
        "startLabel",
        "endLabel",
        "size",
        "required",
        "labelsInline",
        "validationMessagePositionTop",
        "startDisabled",
        "endDisabled",
        "startReadOnly",
        "endReadOnly",
        "startError",
        "endError",
        "startWarning",
        "endWarning",
        "dateFormatOverride",
      ],
    },
  },
};
StandardPlayground.storyName = "Playground - Standard";

export const CombinedPlayground: StoryObj<CombinedPlaygroundArgs> = {
  render: (args) => <CombinedDateRangeWithState {...args} />,
  args: {
    label: "Date range",
    size: "medium",
    required: false,
    disabled: false,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: {
      include: [
        "label",
        "inputHint",
        "size",
        "required",
        "disabled",
        "error",
        "warning",
        "minDate",
        "maxDate",
        "dateFormatOverride",
      ],
    },
  },
};
CombinedPlayground.storyName = "Playground - Combined";

export const DefaultStory: Story = () => <StandardDateRangeWithState />;
DefaultStory.storyName = "Default";
DefaultStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Sizes: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    {(["small", "medium", "large"] as const).map((size) => (
      <StandardDateRangeWithState key={size} size={size} />
    ))}
    {(["small", "medium", "large"] as const).map((size) => (
      <Box key={size}>
        <CombinedDateRangeWithState label="Date range" size={size} />
      </Box>
    ))}
  </Box>
);
Sizes.storyName = "Sizes";
Sizes.parameters = {
  chromatic: { disableSnapshot: true },
};

export const PreventEndDateBeforeStartDate: Story = () => {
  const [state, setState] = useState(["15/07/2025", ""]);
  const [startIso, setStartIso] = useState<string | undefined>("2025-07-15");

  // The end date's calendar starts at the chosen start date.
  const handleChange = (ev: DateRangeChangeEvent) => {
    setState(toFormattedValues(ev));
    setStartIso(ev.target.value[0].rawValue || undefined);
  };

  return (
    <Box>
      <Typography mb={2}>
        Start dates before 1 July 2025 are unavailable. After selecting a start
        date, earlier dates are unavailable in the end-date calendar.
      </Typography>
      <DateRange
        startLabel="Start date"
        endLabel="End date"
        value={state}
        onChange={handleChange}
        startDateProps={{ minDate: "2025-07-01" }}
        endDateProps={{ minDate: startIso }}
      />
    </Box>
  );
};
PreventEndDateBeforeStartDate.storyName = "Prevent End Date Before Start Date";
PreventEndDateBeforeStartDate.parameters = {
  chromatic: { disableSnapshot: true },
};

export const DateFormatOverride: Story = () => (
  <Box display="flex" flexDirection="column" gap={4}>
    <StandardDateRangeWithState
      dateFormatOverride="d-M-yyyy"
      initialValue={["15-7-2025", "28-7-2025"]}
    />
    <Box>
      <CombinedDateRangeWithState
        label="Date range"
        dateFormatOverride="d-M-yyyy"
        initialValue={["15-7-2025", "28-7-2025"]}
      />
    </Box>
  </Box>
);
DateFormatOverride.storyName = "Date Format Override";
DateFormatOverride.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Validation: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <StandardDateRangeWithState
      startError="Start date must be a weekday"
      endError="End date must be after the start date"
    />
    <StandardDateRangeWithState
      startWarning="Start date is in the past"
      endWarning="End date is a bank holiday"
    />
    <StandardDateRangeWithState
      startError="Start date must be a weekday"
      endWarning="End date is a bank holiday"
      validationMessagePositionTop={false}
    />
  </Box>
);
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Combined: Story = () => (
  <Box>
    <CombinedDateRangeWithState
      label="Date range"
      inputHint="Select a start date and an end date"
    />
  </Box>
);
Combined.storyName = "Combined";
Combined.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CombinedValidation: Story = () => {
  const [state, setState] = useState(["15/07/2025", ""]);
  const [error, setError] = useState<string | undefined>("Select an end date");
  // The component shows no error itself: it reports a partial range on Apply, and the team sets `error`.
  const handleChange = (ev: DateRangeChangeEvent) => {
    const [start, end] = ev.target.value;
    setState([start.formattedValue, end.formattedValue]);

    if (start.rawValue && !end.rawValue) {
      setError("Select an end date");
    } else if (!start.rawValue && !end.rawValue) {
      setError("Select a date range");
    } else {
      setError(undefined);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <DateRange
        rangeType="combined"
        label="Date range"
        required
        value={state}
        onChange={handleChange}
        error={error}
      />
      <CombinedDateRangeWithState
        label="Date range"
        warning="Dates fall in different financial years"
      />
      <CombinedDateRangeWithState label="Date range" disabled />
    </Box>
  );
};
CombinedValidation.storyName = "Combined Validation";
CombinedValidation.parameters = {
  chromatic: { disableSnapshot: true },
};

// Preset is a pattern, not a range type: a Select of ranges your product defines, with a
// Custom range option that reveals a date range below it.
const CUSTOM_RANGE = "custom";

// Write the bold prefix in each option's children; `text` is what the field shows.
const presetOptions = [
  <OptionGroupHeader key="fy" label="Financial Years (FY)" />,
  <Option key="fy26" value="fy26" text="FY26: 1 Oct 2025 to 30 Sep 2026">
    <strong>FY26:</strong> 1 Oct 2025 to 30 Sep 2026
  </Option>,
  <Option key="fy25" value="fy25" text="FY25: 1 Oct 2024 to 30 Sep 2025">
    <strong>FY25:</strong> 1 Oct 2024 to 30 Sep 2025
  </Option>,
  <OptionGroupHeader key="q" label="Quarters (Q)" />,
  <Option key="q4" value="q4" text="Q4: 1 Jul 2026 to 30 Sep 2026">
    <strong>Q4:</strong> 1 Jul 2026 to 30 Sep 2026
  </Option>,
  <Option key="q3" value="q3" text="Q3: 1 Apr 2026 to 30 Jun 2026">
    <strong>Q3:</strong> 1 Apr 2026 to 30 Jun 2026
  </Option>,
  <Option key={CUSTOM_RANGE} value={CUSTOM_RANGE} text="Custom range" />,
];

type PresetFormProps = {
  selectId: string;
  initialPeriod: string;
  renderCustomRange: (args: {
    customDates: string[];
    setCustomDates: (dates: string[]) => void;
    showErrors: boolean;
  }) => React.ReactNode;
};

const PresetForm = ({
  selectId,
  initialPeriod,
  renderCustomRange,
}: PresetFormProps) => {
  const [period, setPeriod] = useState(initialPeriod);
  const [customDates, setCustomDates] = useState(["", ""]);
  const [submitted, setSubmitted] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const periodError = showErrors && !period ? "Select a date range" : undefined;

  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        setShowErrors(true);
        const data = new FormData(ev.currentTarget);
        setSubmitted(
          ["period", "custom-start", "custom-end"]
            .filter((key) => data.has(key))
            .map((key) => `${key}=${data.get(key)}`)
            .join(", "),
        );
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} maxWidth="400px">
        <Typography>
          This example is a form. Submit validates the fields and shows the
          submitted values below.
        </Typography>
        <Select
          id={selectId}
          label="Date range"
          inputHint="Choose a financial year, a quarter, or your own dates"
          placeholder="Select a date range"
          required
          size="medium"
          value={period}
          onChange={(ev) => {
            setPeriod(
              ev.target.value === "Custom range"
                ? CUSTOM_RANGE
                : ev.target.value,
            );
            setShowErrors(false);
          }}
          error={periodError}
        >
          {presetOptions}
        </Select>
        {/* Select submits the option's text, so a hidden input submits its value instead. */}
        <input type="hidden" name="period" value={period} />
        {/* Shown only while Custom range is chosen. The dates stay in state, so they come back. */}
        {period === CUSTOM_RANGE &&
          renderCustomRange({
            customDates,
            setCustomDates,
            showErrors,
          })}
        <Box>
          <Button type="submit">Submit</Button>
        </Box>
        {submitted && <Typography>Submitted: {submitted}</Typography>}
      </Box>
    </form>
  );
};

export const PresetWithCombinedCustomRange: Story = () => (
  <PresetForm
    selectId="period"
    initialPeriod=""
    renderCustomRange={({ customDates, setCustomDates, showErrors }) => (
      <Box>
        <DateRange
          rangeType="combined"
          id="custom-range"
          name="custom"
          label="Custom range"
          inputHint="Select a start date and an end date"
          required
          size="medium"
          value={customDates}
          onChange={(ev) => setCustomDates(toFormattedValues(ev))}
          error={
            showErrors && !(customDates[0] && customDates[1])
              ? "Select a start and end date"
              : undefined
          }
        />
      </Box>
    )}
  />
);
PresetWithCombinedCustomRange.storyName = "Preset With Combined Custom Range";
PresetWithCombinedCustomRange.parameters = {
  chromatic: { disableSnapshot: true },
};

export const PresetWithStandardCustomRange: Story = () => (
  <PresetForm
    selectId="period-standard"
    initialPeriod={CUSTOM_RANGE}
    renderCustomRange={({ customDates, setCustomDates, showErrors }) => (
      <DateRange
        id="custom-range-standard"
        name="custom"
        startLabel="Start date"
        endLabel="End date"
        required
        size="medium"
        value={customDates}
        onChange={(ev) => setCustomDates(toFormattedValues(ev))}
        startError={
          showErrors && !customDates[0] ? "Select a start date" : undefined
        }
        endError={
          showErrors && !customDates[1] ? "Select an end date" : undefined
        }
      />
    )}
  />
);
PresetWithStandardCustomRange.storyName = "Preset With Standard Custom Range";
PresetWithStandardCustomRange.parameters = {
  chromatic: { disableSnapshot: true },
};

export const InFieldset: Story = () => (
  <Box display="flex" flexDirection="column" gap={4}>
    <Fieldset legend="Standard booking" size="large" required>
      <StandardDateRangeWithState />
    </Fieldset>
    <Box>
      <Fieldset legend="Combined booking" size="large" required>
        <CombinedDateRangeWithState label="Date range" />
      </Fieldset>
    </Box>
  </Box>
);
InFieldset.storyName = "In a Fieldset";
InFieldset.parameters = {
  chromatic: { disableSnapshot: true },
};

export const InForm: Story = () => {
  const [submitted, setSubmitted] = useState<string[]>([]);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        setSubmitted([
          `Standard: ${data.get("standard-start")} to ${data.get("standard-end")}`,
          `Combined: ${data.get("combined-start")} to ${data.get("combined-end")}`,
        ]);
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <StandardDateRangeWithState name="standard" />
        <Box>
          <CombinedDateRangeWithState label="Date range" name="combined" />
        </Box>
        <Box>
          <Button type="submit">Submit</Button>
        </Box>
        {submitted.map((line) => (
          <Box key={line}>{line}</Box>
        ))}
      </Box>
    </form>
  );
};
InForm.storyName = "In a Form";
InForm.parameters = {
  chromatic: { disableSnapshot: true },
};
