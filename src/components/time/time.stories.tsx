import React, { useState, useRef } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import I18nProvider from "../i18n-provider";
import Box from "../box";
import Button from "../button";
import {
  TimeHandle,
  TimeInputEvent,
  TimeProps,
  TimeValue,
} from "./time.component";
import { Time } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<TimeProps>>;

const meta: Meta<typeof Time> = {
  title: "Time",
  component: Time,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Time>;

export const Default: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time value={value} onChange={handleChange} label="Time" />
    </Box>
  );
};
Default.storyName = "Default";
Default.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AmPmToggle: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time value={value} onChange={handleChange} label="Time" />
    </Box>
  );
};
AmPmToggle.storyName = "AM/PM Toggle";
AmPmToggle.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InputHint: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
      />
    </Box>
  );
};
InputHint.storyName = "Input Hint";
InputHint.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Required: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time required value={value} onChange={handleChange} label="Time" />
    </Box>
  );
};
Required.storyName = "Required";
Required.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const IsOptional: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time isOptional value={value} onChange={handleChange} label="Time" />
    </Box>
  );
};
IsOptional.storyName = "Is Optional";
IsOptional.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Disabled: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
        disabled
      />
    </Box>
  );
};
Disabled.storyName = "Disabled";
Disabled.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ReadOnly: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
        readOnly
      />
    </Box>
  );
};
ReadOnly.storyName = "Read Only";
ReadOnly.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Sizes: Story = () => {
  const [value, setValue] = useState<{
    small: TimeValue;
    medium: TimeValue;
    large: TimeValue;
  }>({
    small: {
      hours: "",
      minutes: "",
      period: "AM",
    },
    medium: {
      hours: "",
      minutes: "",
      period: "AM",
    },
    large: {
      hours: "",
      minutes: "",
      period: "AM",
    },
  });

  const handleChange = (
    ev: TimeInputEvent,
    size: "small" | "medium" | "large",
  ) => {
    setValue((p) => ({
      ...p,
      [size]: ev.target.value,
    }));
  };

  return (
    <Box p={2}>
      <Time
        size="small"
        value={value.small}
        onChange={(ev) => handleChange(ev, "small")}
        label="Time - small"
        inputHint="Hint text"
        mb={1}
      />
      <Time
        size="medium"
        value={value.medium}
        onChange={(ev) => handleChange(ev, "medium")}
        label="Time - medium"
        inputHint="Hint text"
        mb={1}
      />
      <Time
        size="large"
        value={value.large}
        onChange={(ev) => handleChange(ev, "large")}
        label="Time - large"
        inputHint="Hint text"
        mb={1}
      />
    </Box>
  );
};
Sizes.storyName = "Sizes";
Sizes.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Validation: Story = () => {
  const valueInvalidHours: TimeValue = {
    hours: "13",
    minutes: "30",
    period: "AM",
  };
  const valueInvalidMinutes: TimeValue = {
    hours: "12",
    minutes: "61",
    period: "AM",
  };
  const valueInvalidBoth: TimeValue = {
    hours: "13",
    minutes: "61",
    period: "AM",
  };

  return (
    <Box p={2}>
      <Time
        value={valueInvalidHours}
        onChange={() => {}}
        label="Time - with error on hours"
        hoursInputProps={{ error: "Hours value must be in AM/PM format." }}
        mb={1}
      />
      <Time
        value={valueInvalidMinutes}
        onChange={() => {}}
        label="Time - with error on minutes"
        minutesInputProps={{ error: "Minutes value must be in  AM/PM format." }}
        mb={1}
      />
      <Time
        value={valueInvalidBoth}
        onChange={() => {}}
        label="Time - with error on both"
        hoursInputProps={{ error: "Hours value must be in AM/PM format." }}
        minutesInputProps={{ error: "Minutes value must be in  AM/PM format." }}
        mb={2}
      />
      <Time
        value={valueInvalidHours}
        onChange={() => {}}
        label="Time - with warning on hours"
        hoursInputProps={{ warning: "Hours value must be in AM/PM format." }}
        mb={1}
      />
      <Time
        value={valueInvalidMinutes}
        onChange={() => {}}
        label="Time - with warning on minutes"
        minutesInputProps={{
          warning: "Minutes value must be in  AM/PM format.",
        }}
        mb={1}
      />
      <Time
        value={valueInvalidBoth}
        onChange={() => {}}
        label="Time - with warning on both"
        hoursInputProps={{ warning: "Hours value must be in AM/PM format." }}
        minutesInputProps={{
          warning: "Minutes value must be in  AM/PM format.",
        }}
      />
    </Box>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FocusingInputs: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const ref = useRef<TimeHandle>(null);

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Button mr={1} onClick={() => ref.current?.focusHoursInput()}>
        Focus hours input
      </Button>
      <Button onClick={() => ref.current?.focusMinutesInput()}>
        Focus minutes input
      </Button>
      <Time
        ref={ref}
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
      />
    </Box>
  );
};
FocusingInputs.storyName = "Focusing Inputs Programmatically";
FocusingInputs.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LocaleOverride: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <I18nProvider
        locale={{
          time: {
            amText: () => "A",
            pmText: () => "P",
            hoursLabelText: () => "Hours",
            minutesLabelText: () => "Minutes",
            hoursAriaLabelText: () => "Hours input",
            minutesAriaLabelText: () => "Minutes input",
          },
        }}
      >
        <Time value={value} onChange={handleChange} label="Time" />
      </I18nProvider>
    </Box>
  );
};
LocaleOverride.storyName = "Locale Override";
LocaleOverride.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
