import React, { useState } from "react";
import { action } from "storybook/actions";
import { StoryObj } from "@storybook/react-vite";
import { format, startOfDay, subDays } from "date-fns";
import { zhCN, de, enUS, enGB } from "date-fns/locale";
import { userEvent, within } from "storybook/test";

import DateInput, { DateChangeEvent, DateInputProps } from "./date.component";
import Box from "../box";
import I18nProvider from "../i18n-provider";
import Typography, { List, ListItem } from "../typography";

const testDateValue = format(subDays(startOfDay(new Date()), 1), "dd/MM/yyyy");

export default {
  title: "Date Input/Test",
  component: DateInput,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [
        "onPickerOpen",
        "onPickerClose",
        "onClick",
        "onKeyDown",
        "onFocus",
        "onBlur",
        "onChange",
        "as",
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
    info: {
      control: {
        type: "text",
      },
    },
  },
};

const DateStoryExample = ({
  variant,
  ...args
}: DateInputProps & { variant: "legacy" | "typical" }) => {
  const [state, setState] = useState(testDateValue);
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      {...args}
      variant={variant}
      label="Date"
      name={`date-input-${variant}`}
      value={state}
      onChange={setValue}
      onBlur={(ev) => {
        action("onBlur")(ev.target.value);
      }}
      onKeyDown={(ev) =>
        action("onKeyDown")((ev.target as HTMLInputElement).value)
      }
      onClick={(ev) => action("onClick")((ev.target as HTMLInputElement).value)}
    />
  );
};

export const LegacyDateStory = (args: DateInputProps) => (
  <DateStoryExample {...args} variant="legacy" />
);
LegacyDateStory.storyName = "Legacy - Date Input";

export const TypicalDateStory: StoryObj<typeof DateInput> = {
  name: "Typical - Date Input",
  render: (args) => <DateStoryExample {...args} variant="typical" />,
};

interface ValidationInputProps {
  error?: string;
  name: string;
  validationMessagePositionTop?: boolean;
  variant: "legacy" | "typical";
  warning?: string;
}

const ValidationInput = ({
  error,
  name,
  validationMessagePositionTop,
  variant,
  warning,
}: ValidationInputProps) => {
  const [value, setValue] = useState(testDateValue);

  return (
    <DateInput
      variant={variant}
      validationMessagePositionTop={validationMessagePositionTop}
      label="Date"
      name={name}
      inputHint={error ? "Input hint" : undefined}
      error={error}
      warning={warning}
      value={value}
      onChange={(event) => setValue(event.target.value.formattedValue)}
      mb={2}
    />
  );
};

const ValidationExample = ({ variant }: { variant: "legacy" | "typical" }) => {
  return (
    <>
      <ValidationInput
        variant={variant}
        name={`${variant}-date-error-top`}
        error="Error Message"
      />
      <ValidationInput
        variant={variant}
        name={`${variant}-date-warning-top`}
        warning="Warning Message"
      />
      <ValidationInput
        variant={variant}
        name={`${variant}-date-error-bottom`}
        validationMessagePositionTop={false}
        error="Error Message"
      />
      <ValidationInput
        variant={variant}
        name={`${variant}-date-warning-bottom`}
        validationMessagePositionTop={false}
        warning="Warning Message"
      />
    </>
  );
};

export const Validation = () => <ValidationExample variant="legacy" />;
Validation.storyName = "Legacy - Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const TypicalValidation = () => <ValidationExample variant="typical" />;
TypicalValidation.storyName = "Typical - Validation";
TypicalValidation.parameters = Validation.parameters;

interface DateInputI18NProps extends DateInputProps {
  locale: "en-US" | "en-GB" | "zh-CN" | "de-DE";
}

const locales = {
  "en-US": enUS,
  "en-GB": enGB,
  "zh-CN": zhCN,
  "de-DE": de,
};

const I18NExample = ({
  locale,
  variant,
  ...args
}: DateInputI18NProps & { variant: "legacy" | "typical" }) => {
  const [state, setState] = useState(testDateValue);
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <I18nProvider
      locale={{
        locale: () => locale,
        date: {
          ariaLabels: {
            nextMonthButton: () => "foo",
            previousMonthButton: () => "foo",
            chooseMonth: () => "Choose the month",
            chooseYear: () => "Choose the year",
            closeButton: () => "Close",
          },
          dateFnsLocale: () => locales[locale],
        },
      }}
    >
      <DateInput
        variant={variant}
        name={`${variant}-date-i18n`}
        label={locale}
        m={2}
        {...args}
        value={state}
        onChange={setValue}
        onBlur={(ev) => {
          action("onBlur")(ev.target.value);
        }}
        onKeyDown={(ev) =>
          action("onKeyDown")((ev.target as HTMLInputElement).value)
        }
        onClick={(ev) =>
          action("onClick")((ev.target as HTMLInputElement).value)
        }
      />
    </I18nProvider>
  );
};

const i18nArgTypes = {
  locale: {
    control: {
      type: "select",
    },
    options: ["en-US", "en-GB", "zh-CN", "de-DE"],
  },
};
const i18nArgs = {
  locale: "en-US",
  dateFormatOverride: "dd/MM/yyyy",
};

export const LegacyI18N = (args: DateInputI18NProps) => (
  <I18NExample {...args} variant="legacy" />
);
LegacyI18N.storyName = "Legacy - i18n";
LegacyI18N.argTypes = i18nArgTypes;
LegacyI18N.args = i18nArgs;

export const TypicalI18N = (args: DateInputI18NProps) => (
  <I18NExample {...args} variant="typical" />
);
TypicalI18N.storyName = "Typical - i18n";
TypicalI18N.argTypes = i18nArgTypes;
TypicalI18N.args = i18nArgs;

const AutoFocusExample = ({ variant }: { variant: "legacy" | "typical" }) => {
  const [state, setState] = useState(testDateValue);
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      variant={variant}
      label="Date"
      value={state}
      onChange={setValue}
      autoFocus
    />
  );
};

const autoFocusParameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const LegacyAutoFocus = () => <AutoFocusExample variant="legacy" />;
LegacyAutoFocus.storyName = "Legacy - Auto Focus";
LegacyAutoFocus.parameters = autoFocusParameters;

export const TypicalAutoFocus = () => <AutoFocusExample variant="typical" />;
TypicalAutoFocus.storyName = "Typical - Auto Focus";
TypicalAutoFocus.parameters = autoFocusParameters;

const RegressionDateInput = ({
  variant = "typical",
  ...props
}: Partial<DateInputProps>) => {
  const [value, setValue] = useState(props.value || testDateValue);

  return (
    <DateInput
      {...props}
      variant={variant}
      label={props.label || "Date"}
      name={`date-input-regression-${variant}`}
      value={value}
      onChange={(event) => setValue(event.target.value.formattedValue)}
    />
  );
};

const LabelsetWrappingExamples = ({
  variant,
}: {
  variant: "legacy" | "typical";
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    gap="var(--spacing500)"
  >
    {[undefined, "240px", "420px"].map((width) => (
      <Box key={width || "natural"} width={width}>
        <RegressionDateInput
          variant={variant}
          required
          label="Date of the service agreement completion"
          inputHint="Use the format DD/MM/YYYY and include the exact completion date from the signed service agreement document."
        />
      </Box>
    ))}
    <Box width="600px">
      <RegressionDateInput
        variant={variant}
        required
        labelInline
        labelWidth={55}
        inputWidth={45}
        label="Date of the service agreement completion"
        inputHint="Use the format DD/MM/YYYY and include the exact completion date from the signed service agreement document."
      />
    </Box>
  </Box>
);

export const LabelsetWrapping = () => (
  <Box display="flex" flexDirection="column" gap="var(--spacing500)">
    {(["typical", "legacy"] as const).map((variant) => (
      <Box key={variant}>
        <Typography variant="h4" mb={2}>
          {variant === "typical" ? "Typical" : "Legacy"}
        </Typography>
        <LabelsetWrappingExamples variant={variant} />
      </Box>
    ))}
  </Box>
);
LabelsetWrapping.storyName = "Visual - Labelset Wrapping";

const InlineStateExamples = ({
  variant,
}: {
  variant: "legacy" | "typical";
}) => (
  <>
    <RegressionDateInput
      variant={variant}
      labelInline
      size="small"
      required
      warning="Caution message (fix is optional)"
      inputHint="Required caution state hint"
      mb={3}
    />
    <RegressionDateInput
      variant={variant}
      labelInline
      size="medium"
      error="Enter a valid date"
      mb={3}
    />
    <RegressionDateInput
      variant={variant}
      labelInline
      size="medium"
      label="Date with caution below"
      inputHint="Check that the date is correct"
      warning="Caution message (fix is optional)"
      validationMessagePositionTop={false}
      mb={3}
    />
    <RegressionDateInput
      variant={variant}
      labelInline
      size="medium"
      label="Date with error below"
      inputHint="Use the format DD/MM/YYYY"
      error="Enter a valid date"
      validationMessagePositionTop={false}
      mb={3}
    />
    <RegressionDateInput
      variant={variant}
      labelInline
      size="large"
      readOnly
      mb={3}
    />
    <RegressionDateInput variant={variant} labelInline size="medium" disabled />
  </>
);

export const InlineStates = () => (
  <Box display="flex" flexDirection="column" gap="var(--spacing500)">
    {(["typical", "legacy"] as const).map((variant) => (
      <Box key={variant}>
        <Typography variant="h4" mb={2}>
          {variant === "typical" ? "Typical" : "Legacy"}
        </Typography>
        <InlineStateExamples variant={variant} />
      </Box>
    ))}
  </Box>
);
InlineStates.storyName = "Visual - States with Inline Label";

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatStoryDate = (date: Date) =>
  [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map((part, index) => (index < 2 ? String(part).padStart(2, "0") : part))
    .join("/");

const todayRangeStartDate = startOfDay(new Date());

const RangePreview = ({
  label,
  variant,
  rangeStart,
  rangeEnd,
  value = formatStoryDate(todayRangeStartDate),
}: {
  label: string;
  variant: "legacy" | "typical";
  rangeStart: Date;
  rangeEnd: Date;
  value?: string;
}) => (
  <Box mb={3}>
    <DateInput
      variant={variant}
      label={label}
      name={`${variant}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      value={value}
      allowEmptyValue
      onChange={() => {}}
      pickerProps={{
        modifiers: {
          range_start: rangeStart,
          range_middle: { after: rangeStart, before: rangeEnd },
          range_end: rangeEnd,
        },
      }}
    />
  </Box>
);

const RangeStateExamples = ({ variant }: { variant: "legacy" | "typical" }) => (
  <>
    <RangePreview
      variant={variant}
      label="Today as selected range start"
      rangeStart={todayRangeStartDate}
      rangeEnd={addDays(todayRangeStartDate, 7)}
    />
    <RangePreview
      variant={variant}
      label="Today as selected range end"
      rangeStart={addDays(todayRangeStartDate, -7)}
      rangeEnd={todayRangeStartDate}
    />
    <RangePreview
      variant={variant}
      label="Today in selected range"
      rangeStart={addDays(todayRangeStartDate, -5)}
      rangeEnd={addDays(todayRangeStartDate, 5)}
      value=""
    />
  </>
);

export const RangeStates = () => (
  <Box display="flex" flexDirection="column" gap="var(--spacing500)">
    <Box>
      <Typography variant="p" mb={1}>
        Visual regression coverage for DateRange calendar highlighting.
      </Typography>
      <List mb={2}>
        <ListItem>The highlighted ranges are fixed picker modifiers.</ListItem>
        <ListItem>DateRange owns the interactive range behaviour.</ListItem>
      </List>
    </Box>
    {(["typical", "legacy"] as const).map((variant) => (
      <Box key={variant}>
        <Typography variant="h4" mb={2}>
          {variant === "typical" ? "Typical" : "Legacy"}
        </Typography>
        <RangeStateExamples variant={variant} />
      </Box>
    ))}
  </Box>
);
RangeStates.storyName = "Visual - Range States";

const crossMonthRangeStart = new Date(2026, 6, 22);
const crossMonthRangeEnd = new Date(2026, 7, 4);

export const CrossMonthRangeRegression: StoryObj<typeof DateInput> = {
  name: "Visual - Cross-Month Range Regression",
  render: () => (
    <Box>
      <Typography variant="p" mb={1}>
        Regression coverage for a typical range spanning calendar rows and a
        month boundary.
      </Typography>
      <List mb={2}>
        <ListItem>Only the real range endpoints have rounded edges.</ListItem>
        <ListItem>Range edges at row wraps remain square.</ListItem>
        <ListItem>
          Highlighting continues through the visible August outside days.
        </ListItem>
      </List>
      <RangePreview
        variant="typical"
        label="Selected range from 22 July to 4 August"
        rangeStart={crossMonthRangeStart}
        rangeEnd={crossMonthRangeEnd}
        value={formatStoryDate(crossMonthRangeStart)}
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "calendar" }));
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};
