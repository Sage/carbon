import React, { useState } from "react";
import DateInput, { DateChangeEvent, DateInputProps } from "./date.component";
import { CommonTextboxArgs } from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import I18nProvider from "../../components/i18n-provider";

export const DateInputCustom = ({
  onChange,
  onBlur,
  value,
  ...props
}: Partial<CommonTextboxArgs> & Partial<DateInputProps>) => {
  const [state, setState] = React.useState(
    value?.length !== undefined ? value : "01/05/2022"
  );

  const handleOnChange = (ev: DateChangeEvent) => {
    if (onChange) {
      onChange(ev);
    }

    setState(ev.target.value.formattedValue);
  };

  const handleOnBlur = (ev: DateChangeEvent) => {
    if (onBlur) {
      onBlur(ev);
    }
  };

  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      {...props}
    />
  );
};

export const DateInputValidationNewDesign = () => {
  const [state1, setState1] = React.useState("01/10/2016");
  const setValue1 = ({ target }: DateChangeEvent) => {
    setState1(target.value.formattedValue);
  };
  const [state2, setState2] = React.useState("01/10/2016");
  const setValue2 = ({ target }: DateChangeEvent) => {
    setState2(target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      {(["error", "warning"] as const).map((validationType) =>
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

export const DateInputWithButton = ({
  onChange,
  onBlur,
  value,
  ...props
}: Partial<CommonTextboxArgs> & Partial<DateInputProps>) => {
  const [state, setState] = React.useState(
    value?.length !== undefined ? value : "01/05/2022"
  );

  const handleOnChange = (ev: DateChangeEvent) => {
    if (onChange) {
      onChange(ev);
    }

    setState(ev.target.value.formattedValue);
  };

  const handleOnBlur = (ev: DateChangeEvent) => {
    if (onBlur) {
      onBlur(ev);
    }
  };

  return (
    <>
      <DateInput
        label="Date"
        name="date-input"
        value={state}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...props}
      />
      <button data-element="foo-button" type="button">
        foo
      </button>
    </>
  );
};

export const DateWithLocaleProvider = ({
  onChange,
  localeValue,
  dateFnsLocaleValue,
}: Partial<DateInputProps> & {
  localeValue: string;
  dateFnsLocaleValue: Locale;
  onChange: () => void;
}) => {
  const [state, setState] = useState("04/04/2019");
  const [rawValue, setRawValue] = useState<string | null>(null);
  const [formattedValue, setFormattedValue] = useState("");

  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
    setRawValue(ev.target.value.rawValue);
    setFormattedValue(ev.target.value.formattedValue);
    onChange();
  };
  return (
    <>
      <I18nProvider
        locale={{
          locale: () => localeValue,
          date: {
            dateFnsLocale: () => dateFnsLocaleValue,
            ariaLabels: {
              previousMonthButton: () => "Previous month",
              nextMonthButton: () => "Next month",
            },
          },
        }}
      >
        <DateInput
          label="Date"
          name="date-input"
          value={state}
          onChange={setValue}
        />
      </I18nProvider>
      <div data-testid="raw-value">{rawValue}</div>
      <div data-testid="formatted-value">{formattedValue}</div>
    </>
  );
};
