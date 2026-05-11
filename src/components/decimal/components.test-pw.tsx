import React, { useState } from "react";

import Decimal, { DecimalProps, CustomEvent } from ".";
import Box from "../box/box.component";

const DefaultStory = (
  args: Partial<DecimalProps> & { message?: string | boolean },
) => {
  const [state, setState] = useState("0.01");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <Decimal label="Decimal" value={state} onChange={setValue} {...args} />
  );
};

export const Required = () => <DefaultStory required />;

export const WithFieldHelp = (props: Partial<DecimalProps>) => (
  <DefaultStory fieldHelp="Help" {...props} />
);

export const Validations = () => {
  const [state, setState] = useState({
    error: "0.01",
    warning: "0.01",
  });
  const handleChange =
    (validation: "error" | "warning") => (e: CustomEvent) => {
      setState({ ...state, [validation]: e.target.value.rawValue });
    };
  return (
    <>
      {(["error", "warning"] as const).map((validationType) =>
        (["small", "medium", "large"] as const).map((size) => (
          <Box width="296px" key={`${size}-${validationType}`}>
            <Decimal
              label={`${size} - ${validationType}`}
              value={state[validationType]}
              size={size}
              onChange={handleChange(validationType)}
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <Decimal
              label={`readOnly - ${size} - ${validationType}`}
              value={state[validationType]}
              onChange={handleChange(validationType)}
              size={size}
              readOnly
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </Box>
        )),
      )}
    </>
  );
};
