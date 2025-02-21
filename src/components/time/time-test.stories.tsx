import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { TimeInputEvent, TimeValue } from "./time.component";
import { Time } from ".";
import Box from "../box";

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
