import React, { useState, useRef } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import I18nProvider from "../i18n-provider";
import Box from "../box";
import Button from "../button/__next__";
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
  parameters: {
    chromatic: { disableSnapshot: true },
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["value", "onChange", "onBlur"],
    },
  },
  argTypes: {
    ...styledSystemProps,
    showAmPmToggle: {
      control: "boolean",
      description: "Show AM/PM toggle",
      table: {
        category: "Story",
      },
    },
  } as never,
};

export default meta;
type Story = StoryObj<typeof Time>;

export const Playground: Story = {
  render: ({
    showAmPmToggle,
    ...args
  }: TimeProps & { showAmPmToggle?: boolean }) => {
    const [value, setValue] = useState<TimeValue>({
      hours: "",
      minutes: "",
      period: "AM",
    });

    const handleChange = (ev: TimeInputEvent) => {
      setValue(ev.target.value);
    };

    // Conditionally include or exclude the period based on the toggle
    const displayValue: TimeValue = showAmPmToggle
      ? value
      : { hours: value.hours, minutes: value.minutes };

    return (
      <Box p={2}>
        <Time {...args} value={displayValue} onChange={handleChange} />
      </Box>
    );
  },
  args: {
    label: "Time",
    disabled: false,
    readOnly: false,
    required: false,
    size: "medium",
    showAmPmToggle: true,
  } as never,
};
Playground.storyName = "Playground";

export const Default: Story = ({ ...args }) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time value={value} onChange={handleChange} label="Time" {...args} />
    </Box>
  );
};
Default.storyName = "Default";

export const AmPmToggle: Story = ({ ...args }) => {
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
      <Time value={value} onChange={handleChange} label="Time" {...args} />
    </Box>
  );
};
AmPmToggle.storyName = "AM/PM Toggle";
AmPmToggle.parameters = {
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
