import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fr, de } from "date-fns/locale";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import CarbonProvider from "../carbon-provider/carbon-provider.component";
import I18nProvider from "../i18n-provider";

import DateRange, { DateRangeChangeEvent } from "./date-range.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DateRange> = {
  title: "Date Range",
  component: DateRange,
  argTypes: {
    ...styledSystemProps,
  },
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

export const ValidationsStringComponent: Story = () => {
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
      {[
        { startError: "Start Error", endError: "End Error" },
        { startWarning: "Start Warning", endWarning: "End Warning" },
        { startInfo: "Start Info", endInfo: "End Info" },
      ].map((validation) => (
        <DateRange
          key={`${Object.keys(validation)[0]}-string-component`}
          startLabel="Start"
          endLabel="End"
          onChange={handleChange}
          value={state}
          {...validation}
        />
      ))}
    </>
  );
};
ValidationsStringComponent.storyName = "Validations (string)";

export const ValidationsStringWithTooltipPositionOverriddenComponent: Story =
  () => {
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
        {[
          { startError: "Start Error", endError: "End Error" },
          { startWarning: "Start Warning", endWarning: "End Warning" },
          { startInfo: "Start Info", endInfo: "End Info" },
        ].map((validation) => (
          <DateRange
            key={`${Object.keys(validation)[0]}-string-component`}
            startLabel="Start"
            endLabel="End"
            value={state}
            onChange={handleChange}
            {...validation}
            tooltipPosition="top"
          />
        ))}
      </>
    );
  };
ValidationsStringWithTooltipPositionOverriddenComponent.storyName =
  "Validations (string) with tooltip position overridden";
ValidationsStringWithTooltipPositionOverriddenComponent.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringLabel: Story = () => {
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
      {[
        { startError: "Start Error", endError: "End Error" },
        { startWarning: "Start Warning", endWarning: "End Warning" },
        { startInfo: "Start Info", endInfo: "End Info" },
      ].map((validation) => (
        <DateRange
          key={`${Object.keys(validation)[0]}-string-label`}
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
          validationOnLabel
          {...validation}
        />
      ))}
    </>
  );
};
ValidationsStringLabel.storyName = "Validations (string) with label";

export const ValidationsStringWithTooltipPositionOverriddenLabel: Story =
  () => {
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
        {[
          { startError: "Start Error", endError: "End Error" },
          { startWarning: "Start Warning", endWarning: "End Warning" },
          { startInfo: "Start Info", endInfo: "End Info" },
        ].map((validation) => (
          <DateRange
            key={`${Object.keys(validation)[0]}-string-label`}
            startLabel="Start"
            endLabel="End"
            value={state}
            onChange={handleChange}
            validationOnLabel
            {...validation}
            tooltipPosition="top"
          />
        ))}
      </>
    );
  };
ValidationsStringWithTooltipPositionOverriddenLabel.storyName =
  "Validations (string) with label and tooltip position overridden";
ValidationsStringWithTooltipPositionOverriddenLabel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringNewDesign: Story = () => {
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
ValidationsStringNewDesign.storyName = "Validations (string) new design";

export const ValidationsBoolean: Story = () => {
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
      {[
        { startError: true, endError: true },
        { startWarning: true, endWarning: true },
        { startInfo: true, endInfo: true },
      ].map((validation) => (
        <DateRange
          key={`${Object.keys(validation)[0]}-boolean-component`}
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
          {...validation}
        />
      ))}
    </>
  );
};
ValidationsBoolean.storyName = "Validations (boolean)";

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
