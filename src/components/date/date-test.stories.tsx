import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { StoryObj } from "@storybook/react";
import { de as deLocale } from "date-fns/locale/de";

import DateInput, { DateChangeEvent } from "./date.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Box from "../box";
import Confirm from "../confirm";
import I18nProvider from "../i18n-provider";

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
      {...getCommonTextboxArgsWithSpecialCharacters(args)}
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

export const Validation = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      <DateInput
        label="Date"
        name="date-input"
        error="Error Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        warning="Warning Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        info="Info Message"
        value={state}
        onChange={setValue}
        mb={2}
      />

      <DateInput
        label="Date"
        name="date-input"
        error="Error Message"
        validationOnLabel
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        warning="Warning Message"
        validationOnLabel
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        info="Info Message"
        validationOnLabel
        value={state}
        onChange={setValue}
        mb={2}
      />

      <DateInput
        label="Date"
        name="date-input"
        error
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        warning
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        info
        value={state}
        onChange={setValue}
        mb={2}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <DateInput
        label="Date"
        name="date-input"
        inputHint="Input hint"
        error="Error Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <DateInput
        label="Date"
        name="date-input"
        warning="Warning Message"
        value={state}
        onChange={setValue}
      />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const MultipleDates: StoryObj<typeof DateInput> = () => {
  const [date, setDate] = useState("01/01/24");
  const [date2, setDate2] = useState("01/01/24");
  const [showDialog, setShowDialog] = useState(false);
  const [active, setActive] = useState<null | number>(null);

  return (
    <Box
      padding="25px"
      display="flex"
      flexDirection="row"
      gap="var(--spacing200)"
      minWidth="320px"
      maxWidth="1024px"
      boxSizing="border-box"
    >
      <DateInput
        disablePortal
        label="Component A"
        onChange={(e) => setDate(e.target.value.formattedValue)}
        value={date}
        onPickerOpen={() => {
          setActive(1);
        }}
        onPickerClose={() => {
          setShowDialog(true);
        }}
        disabled={active === 2}
      />
      <DateInput
        disablePortal
        label="Component B"
        onChange={(e) => setDate2(e.target.value.formattedValue)}
        value={date2}
        onPickerOpen={() => {
          setActive(2);
        }}
        onPickerClose={() => {
          setShowDialog(true);
        }}
        disabled={active === 1}
      />
      <Confirm
        open={showDialog}
        onConfirm={() => {
          setShowDialog(false);
          setActive(null);
        }}
      >
        content
      </Confirm>
    </Box>
  );
};
MultipleDates.storyName =
  "Multiple Dates with onPickerOpen and onPickerClose callbacks";
MultipleDates.parameters = { chromatic: { disableSnapshot: true } };

interface I18nArgs extends CommonTextboxArgs {
  /** The format used to override te displayed date format */
  dateFormatOverride?: string;
}

export const I18NStory = (args: I18nArgs) => {
  const [state, setState] = useState("2019-04-05");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            ariaLabels: {
              nextMonthButton: () => "foo",
              previousMonthButton: () => "foo",
            },
            dateFnsLocale: () => deLocale,
            dateFormatOverride: args.dateFormatOverride || "dd/MM/yyyy",
          },
        }}
      >
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
          {...getCommonTextboxArgsWithSpecialCharacters(args)}
        />
      </I18nProvider>
    </CarbonProvider>
  );
};
I18NStory.storyName = "i18n Story";
I18NStory.args = {
  dateFormatOverride: "dd/MM/yyyy",
  ...getCommonTextboxArgs(),
};
