import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fr, de } from "date-fns/locale";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import I18nProvider from "../i18n-provider";

import DateRange, { DateRangeChangeEvent } from "./date-range.component";
import Box from "../box";

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

export const DefaultStory: Story = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
    />
  );
};
DefaultStory.storyName = "Default";

export const LabelsInline: Story = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
      labelsInline
    />
  );
};
LabelsInline.storyName = "Labels Inline";

export const AllowEmptyValue: Story = () => {
  const [state, setState] = useState(["", ""]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      value={state}
      startDateProps={{
        allowEmptyValue: true,
      }}
      endDateProps={{
        allowEmptyValue: true,
      }}
      onChange={handleChange}
    />
  );
};
AllowEmptyValue.storyName = "Allow Empty Value";

export const WithDisabledDates: Story = () => {
  const [state, setState] = useState(["2019-03-17", "2019-04-17"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  const isWeekend = (day: Date) => [0, 6].includes(day.getDay());

  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      value={state}
      startDateProps={{
        pickerProps: {
          disabled: [
            isWeekend,
            {
              from: new Date(2019, 3, 1),
              to: new Date(2019, 3, 15),
            },
            { before: new Date(2019, 2, 15) },
            { after: new Date(2019, 4, 15) },
          ],
        },
      }}
      endDateProps={{
        minDate: "2019-04-15",
      }}
      onChange={handleChange}
    />
  );
};
WithDisabledDates.storyName = "With Disabled Dates";

export const LocaleOverrideExampleImplementation: Story = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <div>
      <I18nProvider
        locale={{
          locale: () => "fr-FR",
          date: {
            dateFnsLocale: () => fr,
            ariaLabels: {
              previousMonthButton: () => "Mois précédent",
              nextMonthButton: () => "Mois prochain",
            },
          },
        }}
      >
        <DateRange
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
    </div>
  );
};
LocaleOverrideExampleImplementation.storyName =
  "Locale Override Example Implementation";
LocaleOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Required: Story = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
      required
    />
  );
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
      isOptional
    />
  );
};
IsOptional.storyName = "IsOptional";

export const LocaleFormatOverrideExampleImplementation: Story = ({
  ...args
}) => {
  const [state, setState] = useState(["2016-10-01", "2016-10-30"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <div>
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
            dateFormatOverride: args.dateFormatOverride || "dd-MM-yyyy",
          },
        }}
      >
        <DateRange
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
    </div>
  );
};
LocaleFormatOverrideExampleImplementation.storyName =
  "Locale Format Override Example Implementation";
LocaleFormatOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};
LocaleFormatOverrideExampleImplementation.args = {
  dateFormatOverride: "d-M-yyyy",
};
