import React, { useState, useRef } from "react";
import { ComponentStory } from "@storybook/react";

import { Time } from ".";
import Box from "../box";
import { TimeHandle, TimeInputEvent, TimeValue } from "./time.component";
import Button from "../button";
import I18nProvider from "../i18n-provider";

export const Default: ComponentStory<typeof Time> = () => {
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

Default.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AmPmToggle: ComponentStory<typeof Time> = () => {
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

AmPmToggle.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InputHint: ComponentStory<typeof Time> = () => {
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

InputHint.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Required: ComponentStory<typeof Time> = () => {
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

Required.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const IsOptional: ComponentStory<typeof Time> = () => {
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

IsOptional.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Disabled: ComponentStory<typeof Time> = () => {
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

Disabled.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ReadOnly: ComponentStory<typeof Time> = () => {
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

ReadOnly.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Sizes: ComponentStory<typeof Time> = () => {
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
    size: "small" | "medium" | "large"
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

Sizes.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Validation: ComponentStory<typeof Time> = () => {
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

Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FocusingInputs: ComponentStory<typeof Time> = () => {
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

Default.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LocaleOverride: ComponentStory<typeof Time> = () => {
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

LocaleOverride.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
