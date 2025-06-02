/* eslint-disable no-console */
import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { zhCN, de } from "date-fns/locale";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import DateInput, { DateChangeEvent } from "./date.component";
import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DateInput> = {
  title: "Date Input",
  component: DateInput,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      onChange={setValue}
    />
  );
};
Default.storyName = "Default";
Default.parameters = { chromatic: { disableSnapshot: true } };

export const InputHint: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      inputHint="Hint text"
      name="date-input"
      value={state}
      onChange={setValue}
    />
  );
};
InputHint.storyName = "Input Hint";

export const Sizes: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <DateInput
          key={`Date - ${size}`}
          label={`Date - ${size}`}
          value={state}
          onChange={setValue}
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} disabled />;
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} readOnly />;
};
ReadOnly.storyName = "Read Only";

export const Empty: Story = () => {
  const [state, setState] = useState("");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      <Box mb={2}>
        <Button onClick={() => setState("")}>Set empty date</Button>
        <Button onClick={() => setState("01/04/2019")} ml={2}>
          Set 2019-04-01
        </Button>
      </Box>
      <DateInput
        label="Date"
        name="dateinput"
        value={state}
        onChange={setValue}
        allowEmptyValue
      />
    </>
  );
};
Empty.storyName = "Empty";

export const DisabledDates: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      minDate="2019-04-04"
      maxDate="2019-05-31"
      onChange={setValue}
      onBlur={(ev) => console.log("blur", ev)}
    />
  );
};
DisabledDates.storyName = "Disabled Dates";
DisabledDates.parameters = { chromatic: { disableSnapshot: true } };

export const DisabledDatesUsingPickerProps: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };

  const isWeekend = (day: Date) => [0, 6].includes(day.getDay());

  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      onChange={setValue}
      pickerProps={{
        disabled: [
          isWeekend,
          {
            from: new Date(2019, 3, 1),
            to: new Date(2019, 3, 15),
          },
          { before: new Date(2019, 2, 15) },
          { after: new Date(2019, 4, 15) },
        ],
      }}
    />
  );
};
DisabledDatesUsingPickerProps.storyName = "Disabled Dates using pickerProps";
DisabledDatesUsingPickerProps.parameters = {
  chromatic: { disableSnapshot: false },
};

export const WithLabelInline: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      value={state}
      onChange={setValue}
      labelInline
      name="dateinput"
    />
  );
};
WithLabelInline.storyName = "With Label Inline";

export const WithCustomWidth: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      value={state}
      onChange={setValue}
      maxWidth="300px"
    />
  );
};
WithCustomWidth.storyName = "With Custom Width";

export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      value={state}
      onChange={setValue}
      fieldHelp="Help"
      name="dateinput"
    />
  );
};
WithFieldHelp.storyName = "With Field Help";

export const WithLabelHelp: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      value={state}
      onChange={setValue}
      labelHelp="Help"
      name="dateinput"
      helpAriaLabel="Help"
    />
  );
};
WithLabelHelp.storyName = "With Label Help";

export const WithDisabledPortal: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput label="Date" value={state} onChange={setValue} disablePortal />
  );
};
WithDisabledPortal.storyName = "With Disabled Portal";
WithDisabledPortal.parameters = { chromatic: { disableSnapshot: true } };

export const Required: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} required />;
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput label="Date" value={state} onChange={setValue} isOptional />
  );
};
IsOptional.storyName = "IsOptional";

export const LocaleOverrideExampleImplementation: Story = () => {
  const [state, setState] = useState("2022-04-05");
  const handleChange = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("2022-04-05");
  const handleChange2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <Box display="flex" justifyContent="space-around">
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
          },
        }}
      >
        <DateInput
          label="Date `DE` locale"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
      <I18nProvider
        locale={{
          locale: () => "zh-CN",
          date: {
            dateFnsLocale: () => zhCN,
            ariaLabels: {
              previousMonthButton: () => "上个月",
              nextMonthButton: () => "下个月",
            },
          },
        }}
      >
        <DateInput
          label="Date `zh-CN` locale"
          value={state2}
          onChange={handleChange2}
        />
      </I18nProvider>
    </Box>
  );
};
LocaleOverrideExampleImplementation.storyName = "Locale Override";
LocaleOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LocaleFormatOverrideExampleImplementation: Story = () => {
  const [stateKey, setStateKey] = useState("2019-04-05");
  const handleChangeKey = (ev: DateChangeEvent) => {
    console.log(ev.target.value);
    setStateKey(ev.target.value.formattedValue);
  };

  const [stateProp, setStateProp] = useState("05/04/2019");
  const handleChangeProp = (ev: DateChangeEvent) => {
    console.log(ev.target.value);
    setStateProp(ev.target.value.formattedValue);
  };

  return (
    <Box display="flex" justifyContent="space-around">
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
            dateFormatOverride: "yyyy-MM-dd",
          },
        }}
      >
        <DateInput
          label="With dateFormatOverride translation key"
          value={stateKey}
          onChange={handleChangeKey}
          mb={2}
        />

        <DateInput
          label="With dateFormatOverride prop"
          value={stateProp}
          onChange={handleChangeProp}
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
