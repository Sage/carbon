import React, { useState } from "react";
import DateInput, { DateChangeEvent, DateInputProps } from "./date.component";
import { CommonTextboxArgs } from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Dialog from "../dialog";

export const DateInputCustom = ({
  onChange,
  onBlur,
  value,
  ...props
}: Partial<CommonTextboxArgs> & Partial<DateInputProps>) => {
  const [state, setState] = React.useState(
    value?.length !== undefined ? value : "01/05/2022",
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
        )),
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
    value?.length !== undefined ? value : "01/05/2022",
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

export const DateInputInsideDialog = ({
  onChange,
  onBlur,
  value,
  ...props
}: Partial<CommonTextboxArgs> & Partial<DateInputProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const [state, setState] = React.useState(
    value?.length !== undefined ? value : "01/05/2022",
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
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <DateInput
        label="Date"
        name="date-input"
        value={state}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...props}
      />
    </Dialog>
  );
};
