import React, { useState } from "react";
import Password, { PasswordProps } from ".";
import Box from "../box";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export const SIZES = ["small", "medium", "large"] as const;
export const VALIDATIONS = ["error", "warning", "info"] as const;

export const PasswordComponent = ({ onChange, ...props }: PasswordProps) => {
  const [state, setState] = useState("test");
  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
    if (onChange) {
      onChange(ev);
    }
  };
  return (
    <Password label="Password" value={state} onChange={setValue} {...props} />
  );
};

export const PasswordValidationsAsAStringWithTooltipDefault = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Password
            label="Password"
            value="Password"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </Box>
  );
};

export const PasswordValidationsAsABoolean = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <Password
            label="Password"
            value="Password"
            {...{ [validationType]: true }}
            mb={2}
          />
          <Password
            label="Password - readOnly"
            value="Password"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};

export const PasswordValidationsAsAString = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Password
            label="Password"
            value="Password"
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Password
            label="Password - readOnly"
            value="Password"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};

export const PasswordValidationsAsAStringWithTooltipCustom = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Password
            label="Password"
            value="Password"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </Box>
  );
};

export const PasswordValidationsAsAStringDisplayedOnLabel = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Password
            label="Password"
            value="Password"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Password
            label="Password - readOnly"
            value="Password"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};

export const PasswordNewDesignsValidation = () => {
  return (
    <Box>
      <CarbonProvider validationRedesignOptIn>
        {(["error", "warning"] as const).map((validationType) =>
          SIZES.map((size) => (
            <div style={{ width: "296px" }} key={`${validationType}-${size}`}>
              <Password
                m={4}
                label={`${size} - ${validationType}`}
                defaultValue="Password"
                labelHelp="Hint text (optional)"
                size={size}
                {...{ [validationType]: "Message" }}
              />
              <Password
                m={4}
                label={`readOnly - ${size} - ${validationType}`}
                defaultValue="Password"
                size={size}
                labelHelp="Hint text (optional)"
                readOnly
                {...{ [validationType]: "Message" }}
              />
            </div>
          )),
        )}
      </CarbonProvider>
    </Box>
  );
};

export const PasswordComponentWithCharacterCount = ({
  onChange,
}: PasswordProps) => {
  const [state, setState] = useState("test");
  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
    if (onChange) {
      onChange(ev);
    }
  };
  return (
    <>
      <Password
        label="Password"
        value={state}
        onChange={setValue}
        characterLimit={69}
      />
      <button type="button" onClick={() => {}}>
        Click Me
      </button>
    </>
  );
};
