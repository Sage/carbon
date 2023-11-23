import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import DateRange, { DateRangeChangeEvent } from "./date-range.component";
import I18nProvider from "../i18n-provider";
import { fr } from "../../locales/date-fns-locales";

export const DefaultStory: ComponentStory<typeof DateRange> = () => {
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

export const LabelsInline: ComponentStory<typeof DateRange> = () => {
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

export const ValidationsStringComponent: ComponentStory<
  typeof DateRange
> = () => {
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

export const ValidationsStringWithTooltipPositionOverriddenComponent: ComponentStory<
  typeof DateRange
> = () => {
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

ValidationsStringWithTooltipPositionOverriddenComponent.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringLabel: ComponentStory<typeof DateRange> = () => {
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

export const ValidationsStringWithTooltipPositionOverriddenLabel: ComponentStory<
  typeof DateRange
> = () => {
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

ValidationsStringWithTooltipPositionOverriddenLabel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringNewDesign: ComponentStory<
  typeof DateRange
> = () => {
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

export const ValidationsBoolean: ComponentStory<typeof DateRange> = () => {
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

export const AllowEmptyValue: ComponentStory<typeof DateRange> = () => {
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

export const LocaleOverrideExampleImplementation: ComponentStory<
  typeof DateRange
> = () => {
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

LocaleOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};
