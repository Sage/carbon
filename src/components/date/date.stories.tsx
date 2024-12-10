import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { zhCN, de } from "date-fns/locale";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import CarbonProvider from "../carbon-provider/carbon-provider.component";
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

export const AutoFocus: Story = () => {
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
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  themeProvider: { chromatic: { fourColumnLayout: true } },
  chromatic: { viewports: [1800] },
};

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
      onBlur={(ev) => console.log("blur")}
    />
  );
};
DisabledDates.storyName = "Disabled Dates";
DisabledDates.parameters = { chromatic: { disableSnapshot: true } };

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
      labelInline
      labelWidth={20}
      inputWidth={70}
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

export const ValidationsStringComponent: Story = () => {
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
ValidationsStringComponent.storyName = "Validations - String - Component";

export const ValidationsStringWithTooltipPositionOverriddenComponent: Story =
  () => {
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
ValidationsStringWithTooltipPositionOverriddenComponent.storyName =
  "Validations - String - With Tooltip Position Overridden";
ValidationsStringWithTooltipPositionOverriddenComponent.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringLabel: Story = () => {
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
ValidationsStringLabel.storyName = "Validations - String - Label";

export const ValidationsStringWithTooltipPositionOverriddenLabel: Story =
  () => {
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
ValidationsStringWithTooltipPositionOverriddenLabel.storyName =
  "Validations - String - With Tooltip Position Overridden";
ValidationsStringWithTooltipPositionOverriddenLabel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsStringNewDesign: Story = () => {
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
              size={size}
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <DateInput
              label={`readOnly - ${size} - ${validationType}`}
              value={state2}
              onChange={setValue2}
              size={size}
              readOnly
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </div>
        )),
      )}
    </CarbonProvider>
  );
};
ValidationsStringNewDesign.storyName = "Validations - String - New Design";

export const ValidationsBoolean: Story = () => {
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
ValidationsBoolean.storyName = "Validations - Boolean";

export const ValidationsExampleImplementation: Story = () => {
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
ValidationsExampleImplementation.storyName =
  "Validations - Example Implementation";
ValidationsExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};

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
LocaleOverrideExampleImplementation.storyName =
  "Locale Override - Example Implementation";
LocaleOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LocaleFormatOverrideExampleImplementation: Story = ({
  ...args
}) => {
  const [state, setState] = useState("2022-04-05");
  const handleChange = (ev: DateChangeEvent) => {
    console.log(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <div style={{ display: "flex" }}>
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
        <DateInput
          label="Date `DE` locale"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
    </div>
  );
};
LocaleFormatOverrideExampleImplementation.storyName =
  "Locale Format Override - Example Implementation";
LocaleFormatOverrideExampleImplementation.parameters = {
  chromatic: { disableSnapshot: true },
};
LocaleFormatOverrideExampleImplementation.args = {
  dateFormatOverride: "d-M-yyyy",
};
