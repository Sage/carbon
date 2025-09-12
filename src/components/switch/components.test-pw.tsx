import React from "react";
import Switch, { SwitchProps } from "./switch.component";
import Box from "../box";

export const SwitchComponent = (props: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <Box mt={8} ml={8}>
        <Switch
          label="Label"
          name="switch-name"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </Box>
    </>
  );
};

export const SwitchComponentValidations = (props: Partial<SwitchProps>) => {
  const [, setIsChecked] = React.useState(false);
  return (
    <Box>
      {["error", "warning", "info"].map((type) => (
        <Switch
          id={`switch${type}`}
          key={`switch-${type}`}
          {...{ [type]: `${type}` }}
          label={`Example switch (${type})`}
          name={`switch-${type}`}
          onChange={() => setIsChecked((state) => !state)}
          {...props}
        />
      ))}
    </Box>
  );
};

export const WithMargin = () => {
  return (
    <>
      <Switch
        label="With labelHelp"
        labelHelp="This text provides more information for the label."
        m={2}
      />
      <Switch
        label="With labelHelp"
        labelHelp="This text provides more information for the label."
        m={4}
      />
      <Switch
        label="With labelHelp"
        labelHelp="This text provides more information for the label."
        m="9px"
      />
    </>
  );
};
