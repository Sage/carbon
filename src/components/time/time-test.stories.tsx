import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { TimeInputEvent, TimeValue } from "./time.component";
import { Time } from ".";

import Box from "../box";
import InlineInputs from "../inline-inputs";
import Textbox from "../textbox";
import Button from "../button";

const meta: Meta<typeof Time> = {
  component: Time,
  title: "Time/Test",
  parameters: {
    controls: {
      exclude: ["value", "onChange", "onBlur"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Time>;

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
        mb={1}
      />
      <Time
        validationMessagePositionTop={false}
        value={valueInvalidHours}
        onChange={() => {}}
        label="Time - with error on hours"
        hoursInputProps={{ error: "Hours value must be in AM/PM format." }}
        mb={1}
      />
      <Time
        validationMessagePositionTop={false}
        value={valueInvalidMinutes}
        onChange={() => {}}
        label="Time - with error on minutes"
        minutesInputProps={{ error: "Minutes value must be in  AM/PM format." }}
        mb={1}
      />
      <Time
        validationMessagePositionTop={false}
        value={valueInvalidBoth}
        onChange={() => {}}
        label="Time - with error on both"
        hoursInputProps={{ error: "Hours value must be in AM/PM format." }}
        minutesInputProps={{ error: "Minutes value must be in  AM/PM format." }}
        mb={2}
      />
      <Time
        validationMessagePositionTop={false}
        value={valueInvalidHours}
        onChange={() => {}}
        label="Time - with warning on hours"
        hoursInputProps={{ warning: "Hours value must be in AM/PM format." }}
        mb={1}
      />
      <Time
        validationMessagePositionTop={false}
        value={valueInvalidMinutes}
        onChange={() => {}}
        label="Time - with warning on minutes"
        minutesInputProps={{
          warning: "Minutes value must be in  AM/PM format.",
        }}
        mb={1}
      />
      <Time
        validationMessagePositionTop={false}
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

export const LabelAlign: Story = ({ ...args }) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  return (
    <Box ml={2}>
      <Time
        {...args}
        mb={2}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          action("onChange")(ev);
        }}
        onBlur={action("onBlur")}
        label="labelAlign left"
      />
      <Time
        {...args}
        mb={2}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          action("onChange")(ev);
        }}
        onBlur={action("onBlur")}
        label="labelAlign right"
        labelAlign="right"
      />
      <Time
        {...args}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          action("onChange")(ev);
        }}
        onBlur={action("onBlur")}
        label="labelAlign right and fieldLabelsAlign right"
        labelAlign="right"
        fieldLabelsAlign="right"
      />
    </Box>
  );
};
LabelAlign.storyName = "Label Align";

export const HintTextAlignment: Story = ({ ...args }) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box ml={2}>
      {["left", "right"].map((labelAlign) => (
        <Box>
          <Time
            mb={2}
            value={value}
            onChange={handleChange}
            label="labelAlign left"
            inputHint="hint"
            labelAlign={labelAlign as "left" | "right"}
            {...args}
          />
        </Box>
      ))}
    </Box>
  );
};
HintTextAlignment.storyName = "Hint Text Alignment";

export const WithValueModifiers: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const [textboxHours, setTextboxHours] = useState("");
  const [textboxMinutes, setTextboxMinutes] = useState("");

  const handleChange = (e: TimeInputEvent) => {
    const {
      hours: updatedHrs,
      minutes: updatedMins,
      formattedHours,
      formattedMinutes,
    } = e.target.value;

    setValue(({ minutes: currentMins, hours: currentHrs }) => {
      const updates = { minutes: currentMins, hours: currentHrs };
      if (formattedMinutes !== currentMins) {
        updates.minutes = updatedMins;
      }

      if (formattedHours !== currentHrs) {
        updates.hours = updatedHrs;
      }

      return updates;
    });
  };

  const handleBlur = (
    e?: React.FocusEvent<HTMLInputElement, Element>,
    timeValue?: TimeValue,
  ) => {
    if (timeValue) {
      setValue({
        hours: timeValue.formattedHours || timeValue.hours,
        minutes: timeValue.formattedMinutes || timeValue.minutes,
      });
    }
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Time"
      />
      <InlineInputs
        label="Set time"
        labelId="inline-inputs-required"
        inputWidth={35}
        gutter="small"
        mt={60}
      >
        <Textbox
          label="Hours"
          onChange={(e) => setTextboxHours(e.target.value)}
          value={textboxHours}
        />
        <Textbox
          label="Minutes"
          onChange={(e) => setTextboxMinutes(e.target.value)}
          value={textboxHours}
        />
        <Button
          onClick={() =>
            setValue({ hours: textboxHours, minutes: textboxMinutes })
          }
          mt={2}
        >
          Set Time
        </Button>
      </InlineInputs>
    </Box>
  );
};
WithValueModifiers.storyName = "With Value Modifiers";
WithValueModifiers.parameters = {
  chromatic: { disableSnapshot: true },
};
