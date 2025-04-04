import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

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

export const LabelAlign: Story = ({ ...args }) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    console.log("onChange:", ev);
    setValue(ev.target.value);
  };

  const handleBlur = (
    ev?: React.FocusEvent<HTMLInputElement>,
    timeValue?: TimeValue,
  ) => {
    console.log("onBlur:", ev, timeValue);
  };

  return (
    <Box ml={2}>
      <Time
        mb={2}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label="labelAlign left"
        {...args}
      />
      <Time
        mb={2}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label="labelAlign right"
        labelAlign="right"
        {...args}
      />
      <Time
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label="labelAlign right and fieldLabelsAlign right"
        labelAlign="right"
        fieldLabelsAlign="right"
        {...args}
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
        />
        <Textbox
          label="Minutes"
          onChange={(e) => setTextboxMinutes(e.target.value)}
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
