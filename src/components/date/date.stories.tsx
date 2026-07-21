import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { format, startOfDay, subDays } from "date-fns";
import { zhCN, de, enGB, pl } from "date-fns/locale";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import DateInput, { DateChangeEvent, DateInputProps } from "./date.component";
import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DateInput> = {
  title: "Date Input",
  component: DateInput,
  tags: ["!autodocs"],
  argTypes: {
    ...styledSystemProps,
  },
  args: {
    onBlur: action("onBlur"),
    onChange: action("onChange"),
    variant: "typical",
  },
  decorators: (StoryToRender) => (
    <Box minHeight="460px" p={4}>
      <StoryToRender />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof DateInput>;
const storyDateValue = format(subDays(startOfDay(new Date()), 1), "dd/MM/yyyy");

const PairedDateInputs = ({
  initialValue = storyDateValue,
  labelDetail,
  ...props
}: Partial<DateInputProps> & {
  initialValue?: string;
  labelDetail?: string;
}) => {
  const [typicalValue, setTypicalValue] = useState(initialValue);
  const [legacyValue, setLegacyValue] = useState(initialValue);
  const sizeLabel = props.size ? ` - ${props.size}` : "";
  const detailLabel = labelDetail ? ` - ${labelDetail}` : "";

  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing300)">
      <DateInput
        {...props}
        label={`Typical date${sizeLabel}${detailLabel}`}
        name="date-input-typical"
        value={typicalValue}
        onChange={(event) => setTypicalValue(event.target.value.formattedValue)}
      />
      <DateInput
        {...props}
        variant="legacy"
        label={`Legacy date${sizeLabel}${detailLabel}`}
        name="date-input-legacy"
        value={legacyValue}
        onChange={(event) => setLegacyValue(event.target.value.formattedValue)}
      />
    </Box>
  );
};

export const Default: Story = () => {
  const [typicalValue, setTypicalValue] = useState(storyDateValue);
  const [legacyValue, setLegacyValue] = useState(storyDateValue);

  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing300)">
      <DateInput
        label="Typical date"
        name="date-input-typical"
        value={typicalValue}
        onChange={(event) => setTypicalValue(event.target.value.formattedValue)}
      />
      <DateInput
        variant="legacy"
        label="Legacy date"
        name="date-input-legacy"
        value={legacyValue}
        onChange={(event) => setLegacyValue(event.target.value.formattedValue)}
      />
    </Box>
  );
};
Default.storyName = "Default";
Default.parameters = { chromatic: { disableSnapshot: true } };

export const InputHint: Story = () => {
  return <PairedDateInputs inputHint="Hint text" />;
};
InputHint.storyName = "Input Hint";

export const Sizes: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing400)">
      {(["small", "medium", "large"] as const).map((size) => (
        <PairedDateInputs key={size} size={size} />
      ))}
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return <PairedDateInputs disabled />;
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  return <PairedDateInputs readOnly />;
};
ReadOnly.storyName = "Read Only";

export const Empty: Story = () => {
  const [typicalValue, setTypicalValue] = useState("");
  const [legacyValue, setLegacyValue] = useState("");

  const setValues = (value: string) => {
    setTypicalValue(value);
    setLegacyValue(value);
  };

  return (
    <>
      <Box mb={2}>
        <Button onClick={() => setValues("")}>Set empty dates</Button>
        <Button onClick={() => setValues(storyDateValue)} ml={2}>
          Set dates to yesterday
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="var(--spacing300)">
        <DateInput
          label="Typical date"
          name="date-input-typical"
          value={typicalValue}
          onChange={(event) =>
            setTypicalValue(event.target.value.formattedValue)
          }
          allowEmptyValue
        />
        <DateInput
          variant="legacy"
          label="Legacy date"
          name="date-input-legacy"
          value={legacyValue}
          onChange={(event) =>
            setLegacyValue(event.target.value.formattedValue)
          }
          allowEmptyValue
        />
      </Box>
    </>
  );
};
Empty.storyName = "Empty";

export const DisabledDatesInCalendar: Story = () => {
  const isWeekend = (day: Date) => [0, 6].includes(day.getDay());

  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing300)">
      <Typography variant="p">
        Saturdays and Sundays are disabled in both calendars.
      </Typography>
      <PairedDateInputs
        labelDetail="weekends disabled"
        pickerProps={{
          disabled: [isWeekend],
        }}
      />
    </Box>
  );
};
DisabledDatesInCalendar.storyName = "Disabled Dates in Calendar";
DisabledDatesInCalendar.parameters = {
  chromatic: { disableSnapshot: false },
};

export const WithLabelInline: Story = () => {
  return <PairedDateInputs labelInline />;
};
WithLabelInline.storyName = "With Label Inline";

export const WithCustomWidth: Story = () => {
  return <PairedDateInputs maxWidth="300px" />;
};
WithCustomWidth.storyName = "With Custom Width";

export const WithFieldHelp: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing400)">
      <Typography variant="p">
        The deprecated fieldHelp and labelHelp string props are mapped to
        inputHint in the typical variant. Legacy retains its existing help
        presentation.
      </Typography>
      <PairedDateInputs
        labelDetail="fieldHelp"
        fieldHelp="Help supplied through deprecated fieldHelp"
      />
      <PairedDateInputs
        labelDetail="labelHelp"
        labelHelp="Help supplied through deprecated labelHelp"
      />
    </Box>
  );
};
WithFieldHelp.storyName = "With Help";

export const WithError: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing400)">
      <PairedDateInputs
        labelDetail="error above"
        inputHint="Date must be in DD/MM/YYYY format"
        error="Enter a valid date"
      />
      <PairedDateInputs
        labelDetail="error below"
        validationMessagePositionTop={false}
        inputHint="Date must be in DD/MM/YYYY format"
        error="Enter a valid date"
      />
    </Box>
  );
};
WithError.storyName = "With Error";

export const WithCaution: Story = () => (
  <Box display="flex" flexDirection="column" gap="var(--spacing400)">
    <PairedDateInputs
      labelDetail="caution above"
      inputHint="Check that the date is correct"
      warning="Caution message (fix is optional)"
    />
    <PairedDateInputs
      labelDetail="caution below"
      validationMessagePositionTop={false}
      inputHint="Check that the date is correct"
      warning="Caution message (fix is optional)"
    />
  </Box>
);
WithCaution.storyName = "With Caution";

export const WithoutPortal: Story = () => (
  <Box display="flex" flexDirection="column" gap="var(--spacing300)">
    <Typography variant="p">
      Deprecated compatibility behavior: disablePortal renders the calendar in
      the Date Input&apos;s local DOM tree instead of through a portal. Existing
      legacy and typical consumers remain supported, but new implementations
      should not adopt this prop.
    </Typography>
    <PairedDateInputs disablePortal />
  </Box>
);
WithoutPortal.storyName = "Without Portal (Deprecated)";
WithoutPortal.parameters = { chromatic: { disableSnapshot: true } };

export const Required: Story = () => {
  return <PairedDateInputs required />;
};
Required.storyName = "Required";

export const LocaleOverrideExampleImplementation: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing500)">
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
              chooseMonth: () => "Choose the month",
              chooseYear: () => "Choose the year",
              closeButton: () => "Close",
            },
          },
        }}
      >
        <PairedDateInputs initialValue="2022-04-05" labelDetail="DE locale" />
      </I18nProvider>
      <I18nProvider
        locale={{
          locale: () => "zh-CN",
          date: {
            dateFnsLocale: () => zhCN,
            ariaLabels: {
              previousMonthButton: () => "上个月",
              nextMonthButton: () => "下个月",
              chooseMonth: () => "Choose the month",
              chooseYear: () => "Choose the year",
              closeButton: () => "Close",
            },
          },
        }}
      >
        <PairedDateInputs
          initialValue="2022-04-05"
          labelDetail="zh-CN locale"
        />
      </I18nProvider>
      <I18nProvider
        locale={{
          locale: () => "pl-PL",
          date: {
            dateFnsLocale: () => pl,
            ariaLabels: {
              previousMonthButton: () => "Poprzedni miesiąc",
              nextMonthButton: () => "Następny miesiąc",
              chooseMonth: () => "Wybierz miesiąc",
              chooseYear: () => "Wybierz rok",
              closeButton: () => "Zamknij",
            },
          },
        }}
      >
        <PairedDateInputs
          initialValue="2022-04-05"
          labelDetail="pl-PL locale"
        />
      </I18nProvider>
      <I18nProvider
        locale={{
          locale: () => "en-GB",
          date: {
            dateFnsLocale: () => enGB,
            ariaLabels: {
              previousMonthButton: () => "Previous month",
              nextMonthButton: () => "Next month",
              chooseMonth: () => "Choose the month",
              chooseYear: () => "Choose the year",
              closeButton: () => "Close",
            },
          },
        }}
      >
        <PairedDateInputs
          initialValue="2022-04-05"
          labelDetail="en-GB locale"
        />
      </I18nProvider>
    </Box>
  );
};
LocaleOverrideExampleImplementation.storyName = "Locale Override";
LocaleOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LocaleFormatOverrideExampleImplementation: Story = ({
  onChange,
  ...args
}: DateInputProps) => {
  const [stateKey, setStateKey] = useState("2019-04-05");
  const handleChangeKey = (ev: DateChangeEvent) => {
    setStateKey(ev.target.value.formattedValue);
  };

  const [stateProp, setStateProp] = useState("05/04/2019");
  const handleChangeProp = (ev: DateChangeEvent) => {
    setStateProp(ev.target.value.formattedValue);
  };

  return (
    <Box display="flex" flexDirection="column" gap="var(--spacing400)">
      <Typography variant="p">
        Both fields use the German locale. The first uses the locale translation
        key, so it displays YYYY-MM-DD. The second passes dateFormatOverride
        directly, so that prop takes precedence and displays DD/MM/YYYY.
      </Typography>
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
              chooseMonth: () => "Choose the month",
              chooseYear: () => "Choose the year",
              closeButton: () => "Close",
            },
            dateFormatOverride: "yyyy-MM-dd",
          },
        }}
      >
        <DateInput
          {...args}
          variant="typical"
          label="Translation key format (YYYY-MM-DD)"
          value={stateKey}
          onChange={(ev) => {
            handleChangeKey(ev);
            onChange?.(ev);
          }}
          mb={2}
        />

        <DateInput
          {...args}
          variant="typical"
          label="Prop override format (DD/MM/YYYY)"
          value={stateProp}
          onChange={(ev) => {
            handleChangeProp(ev);
            onChange?.(ev);
          }}
          dateFormatOverride="dd/MM/yyyy"
        />
      </I18nProvider>
    </Box>
  );
};
LocaleFormatOverrideExampleImplementation.storyName = "Locale Format Override";
LocaleFormatOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};
