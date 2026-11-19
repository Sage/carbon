import React, { useState } from "react";
import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import DateRange, {
  CombinedDateRangeProps,
  DateRangeChangeEvent,
  DateRangeProps,
} from "./date-range.component";
import Box from "../box";
import Typography from "../typography";

export default {
  title: "Date Range/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const filledRange = ["15/07/2025", "28/07/2025"];
const sizes = ["small", "medium", "large"] as const;
const standardVariants = ["typical", "legacy"] as const;

const toFormattedValues = (ev: DateRangeChangeEvent) => [
  ev.target.value[0].formattedValue,
  ev.target.value[1].formattedValue,
];

const Standard = ({
  variant,
  initialValue = filledRange,
  startDateProps,
  endDateProps,
  ...props
}: Omit<DateRangeProps, "value" | "onChange" | "rangeType"> & {
  variant: (typeof standardVariants)[number];
  initialValue?: string[];
}) => {
  const [state, setState] = useState(initialValue);

  return (
    <DateRange
      startLabel="Start date"
      endLabel="End date"
      value={state}
      onChange={(ev) => setState(toFormattedValues(ev))}
      startDateProps={{ variant, allowEmptyValue: true, ...startDateProps }}
      endDateProps={{ variant, allowEmptyValue: true, ...endDateProps }}
      mb={2}
      {...props}
    />
  );
};

const Combined = ({
  initialValue = filledRange,
  ...props
}: Omit<CombinedDateRangeProps, "value" | "onChange" | "rangeType"> & {
  initialValue?: string[];
}) => {
  const [state, setState] = useState(initialValue);

  return (
    <Box mb={2}>
      <DateRange
        rangeType="combined"
        value={state}
        onChange={(ev) => setState(toFormattedValues(ev))}
        {...props}
      />
    </Box>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={4}>
    <Typography variant="h4" mb={2}>
      {title}
    </Typography>
    {children}
  </Box>
);

const variantTitle = (variant: (typeof standardVariants)[number]) =>
  `Standard (${variant === "typical" ? "Typical" : "Legacy"})`;

export const RangeTypes = () => (
  <>
    {standardVariants.map((variant) => (
      <Section key={variant} title={variantTitle(variant)}>
        {sizes.map((size) => (
          <Standard key={size} variant={variant} size={size} />
        ))}
        <Standard variant={variant} initialValue={["", ""]} />
        <Standard variant={variant} required />
        <Standard
          variant={variant}
          startDateProps={{ disabled: true }}
          endDateProps={{ disabled: true }}
        />
        <Standard
          variant={variant}
          startDateProps={{ readOnly: true }}
          endDateProps={{ readOnly: true }}
        />
      </Section>
    ))}
    <Section title="Combined">
      {sizes.map((size) => (
        <Combined key={size} label="Date range" size={size} />
      ))}
      <Combined label="Date range" initialValue={["", ""]} />
      <Combined label="Date range" initialValue={["15/07/2025", ""]} />
      <Combined label="Date range" required inputHint="Hint text" />
      <Combined label="Date range" disabled />
    </Section>
  </>
);
RangeTypes.storyName = "Visual - Range Types";
RangeTypes.parameters = {
  chromatic: { disableSnapshot: false },
};

export const Validation = () => (
  <>
    {standardVariants.map((variant) => (
      <Section key={variant} title={variantTitle(variant)}>
        {[true, false].map((positionTop) => (
          <React.Fragment key={String(positionTop)}>
            <Standard
              variant={variant}
              validationMessagePositionTop={positionTop}
              startError="Start error with long text"
              endError="End error"
              startDateProps={{ inputHint: "Start date hint" }}
              endDateProps={{ inputHint: "End date hint" }}
            />
            <Standard
              variant={variant}
              validationMessagePositionTop={positionTop}
              startWarning="Start warning"
              endWarning="End warning with long text"
              startDateProps={{ inputHint: "Start date hint" }}
              endDateProps={{ inputHint: "End date hint" }}
            />
          </React.Fragment>
        ))}
      </Section>
    ))}
    <Section title="Combined">
      {sizes.map((size) => (
        <Combined
          key={size}
          label="Date range"
          size={size}
          error="Select an end date"
        />
      ))}
      <Combined
        label="Date range"
        warning="Dates fall in different financial years"
      />
      <Combined label="Date range" error />
      <Combined label="Date range" warning />
    </Section>
  </>
);
Validation.storyName = "Visual - Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LabelsInline = () => (
  <>
    {standardVariants.map((variant) => (
      <Section key={variant} title={variantTitle(variant)}>
        <Standard
          variant={variant}
          startLabel="From"
          endLabel="To"
          labelsInline
        />
        <Standard
          variant={variant}
          startLabel="From"
          endLabel="To"
          labelsInline
          startError="Start error"
          endWarning="End warning"
        />
      </Section>
    ))}
  </>
);
LabelsInline.storyName = "Visual - Labels Inline (Legacy)";
LabelsInline.parameters = {
  chromatic: { disableSnapshot: false },
};

export const CombinedCalendar: StoryObj<typeof DateRange> = {
  name: "Visual - Combined Calendar",
  render: () => (
    <Combined
      label="Date range"
      initialValue={["15/07/2025", "20/07/2025"]}
      minDate="2025-07-05"
      maxDate="2025-07-25"
      pickerProps={{ disabled: new Date(2025, 6, 18) }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("combobox", { name: /^Date range/ }),
    );

    await expect(canvas.getByRole("dialog")).toBeVisible();
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
