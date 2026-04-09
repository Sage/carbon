import React from "react";
import Box from "../../../box";
import { Switch, SwitchProps } from ".";

export const SwitchComponent = (props: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Box mt={8}>
      <Switch
        label="Label"
        name="switch-name"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        {...props}
      />
    </Box>
  );
};

export const WithMargin = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <Switch
        label="With inputHint"
        inputHint="This text provides more information."
        m={2}
        onChange={() => setIsChecked((state) => !state)}
        checked={isChecked}
      />
      <Switch
        label="With inputHint"
        inputHint="This text provides more information."
        m={4}
        onChange={() => setIsChecked((state) => !state)}
        checked={isChecked}
      />
      <Switch
        label="With inputHint"
        inputHint="This text provides more information."
        m="9px"
        onChange={() => setIsChecked((state) => !state)}
        checked={isChecked}
      />
    </>
  );
};
