import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import DateInput, { DateChangeEvent } from "./date.component";
import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider";
import { zhCN, de } from "../../locales/date-fns-locales";

export const Default: ComponentStory<typeof DateInput> = () => {
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

Default.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: ComponentStory<typeof DateInput> = () => {
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

export const AutoFocus: ComponentStory<typeof DateInput> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <div style={{ height: 450, width: 450 }}>
      <DateInput label="Date" value={state} onChange={setValue} autoFocus />
    </div>
  );
};

AutoFocus.parameters = {
  themeProvider: { chromatic: { fourColumnLayout: true } },
  chromatic: { viewports: [1800] },
};

export const Disabled: ComponentStory<typeof DateInput> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} disabled />;
};

export const ReadOnly: ComponentStory<typeof DateInput> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} readOnly />;
};

export const Empty: ComponentStory<typeof DateInput> = () => {
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

export const WithLabelInline: ComponentStory<typeof DateInput> = () => {
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

export const WithCustomWidth: ComponentStory<typeof DateInput> = () => {
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
      labelWidth={20}
      inputWidth={70}
      maxWidth="300px"
    />
  );
};

export const WithFieldHelp: ComponentStory<typeof DateInput> = () => {
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

export const WithLabelHelp: ComponentStory<typeof DateInput> = () => {
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

export const WithDisabledPortal: ComponentStory<typeof DateInput> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput label="Date" value={state} onChange={setValue} disablePortal />
  );
};

WithDisabledPortal.parameters = { chromatic: { disableSnapshot: true } };

export const Required: ComponentStory<typeof DateInput> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} required />;
};

export const ValidationsStringComponent: ComponentStory<
  typeof DateInput
> = () => {
  const [state1, setState1] = useState("01/10/2016");
  const setValue1 = (ev: DateChangeEvent) => {
    setState1(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("01/10/2016");
  const setValue2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <DateInput
            label="Date"
            value={state1}
            onChange={setValue1}
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <DateInput
            label="Date - readOnly"
            value={state2}
            onChange={setValue2}
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsStringWithTooltipPositionOverriddenComponent: ComponentStory<
  typeof DateInput
> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <DateInput
            label="Date"
            value={state}
            onChange={setValue}
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </div>
      ))}
    </>
  );
};

ValidationsStringWithTooltipPositionOverriddenComponent.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringLabel: ComponentStory<typeof DateInput> = () => {
  const [state1, setState1] = useState("01/10/2016");
  const setValue1 = (ev: DateChangeEvent) => {
    setState1(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("01/10/2016");
  const setValue2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <DateInput
            label="Date"
            value={state1}
            onChange={setValue1}
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <DateInput
            label="Date"
            value={state2}
            onChange={setValue2}
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsStringWithTooltipPositionOverriddenLabel: ComponentStory<
  typeof DateInput
> = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <DateInput
            label="Date"
            value={state}
            onChange={setValue}
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </div>
      ))}
    </>
  );
};

ValidationsStringWithTooltipPositionOverriddenLabel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringNewDesign: ComponentStory<
  typeof DateInput
> = () => {
  const [state1, setState1] = useState("01/10/2016");
  const setValue1 = (ev: DateChangeEvent) => {
    setState1(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("01/10/2016");
  const setValue2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) =>
        (["small", "medium", "large"] as const).map((size) => (
          <div
            style={{ width: "296px" }}
            key={`${size}-${validationType}-string-label`}
          >
            <DateInput
              label={`${size} - ${validationType}`}
              value={state1}
              onChange={setValue1}
              validationOnLabel
              size={size}
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <DateInput
              label={`readOnly - ${size} - ${validationType}`}
              value={state2}
              onChange={setValue2}
              validationOnLabel
              size={size}
              readOnly
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </div>
        ))
      )}
    </CarbonProvider>
  );
};

export const ValidationsBoolean: ComponentStory<typeof DateInput> = () => {
  const [state1, setState1] = useState("01/10/2016");
  const setValue1 = (ev: DateChangeEvent) => {
    setState1(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("01/10/2016");
  const setValue2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <DateInput
            label="Date"
            value={state1}
            onChange={setValue1}
            {...{ [validationType]: true }}
          />
          <DateInput
            label="Date"
            value={state2}
            onChange={setValue2}
            readOnly
            {...{ [validationType]: true }}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsExampleImplementation: ComponentStory<
  typeof DateInput
> = () => {
  const [state, setState] = useState("05/04/2022");
  const [validationState, setValidationState] = useState("");
  const handleChange = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  const handleBlur = (ev: DateChangeEvent) => {
    if (!ev.target.value.rawValue) {
      setValidationState("Error Invalid Date");
    } else if (new Date(ev.target.value.rawValue).getFullYear() <= 2020) {
      setValidationState("Warning Date before 2020");
    }
  };
  return (
    <div>
      <DateInput
        label="Date"
        value={state}
        onChange={handleChange}
        onBlur={handleBlur}
        error={validationState.includes("Error") ? validationState : undefined}
        warning={
          validationState.includes("Warning") ? validationState : undefined
        }
      />
    </div>
  );
};

ValidationsExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LocaleOverrideExampleImplementation: ComponentStory<
  typeof DateInput
> = () => {
  const [state, setState] = useState("2022-04-05");
  const handleChange = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("2022-04-05");
  const handleChange2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
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
    </div>
  );
};

LocaleOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};
