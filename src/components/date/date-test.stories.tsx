import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import DateInput, { DateChangeEvent, DateInputProps } from "./date.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCaracters,
} from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export default {
  title: "Date Input/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: commonTextboxArgTypes(),
};

export const DateStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      name="dateinput"
      value={state}
      onChange={setValue}
      onBlur={(ev) => {
        action("onBlur")(ev.target.value);
      }}
      onKeyDown={(ev) =>
        action("onKeyDown")((ev.target as HTMLInputElement).value)
      }
      onClick={(ev) => action("onClick")((ev.target as HTMLInputElement).value)}
      {...getCommonTextboxArgsWithSpecialCaracters(args)}
    />
  );
};

DateStory.args = {
  minDate: "",
  maxDate: "",
  allowEmptyValue: false,
  mt: 0,
  ...getCommonTextboxArgs(),
};

export const NewValidationStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <DateInput
        name="dateinput"
        m={2}
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
        {...getCommonTextboxArgsWithSpecialCaracters(args)}
      />
    </CarbonProvider>
  );
};

NewValidationStory.args = {
  minDate: "",
  maxDate: "",
  allowEmptyValue: false,
  mt: 0,
  ...getCommonTextboxArgs(),
};

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
