import React, { useState } from "react";
import { Time, ToggleValue } from ".";
import Box from "../box";
import { TimeInputEvent, TimeProps, TimeValue } from "./time.component";

interface AdditionalProps {
  onChangeCb?: () => void;
  onBlurCb?: () => void;
  toggleValue?: ToggleValue;
}

const TimeComponent = ({
  onChangeCb,
  onBlurCb,
  toggleValue,
  ...rest
}: Partial<TimeProps> & AdditionalProps) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: toggleValue,
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
    onChangeCb?.();
  };

  return (
    <Box p={2}>
      <Time value={value} onChange={handleChange} onBlur={onBlurCb} {...rest} />
    </Box>
  );
};

export default TimeComponent;
