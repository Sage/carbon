import React, { useState, useRef } from "react";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
import Button from "../button";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export const SIZES = ["small", "medium", "large"] as const;
export const VALIDATIONS = ["error", "warning", "info"] as const;

export const TextboxComponent = (props: Partial<TextboxProps>) => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox label="Textbox" value={state} onChange={setValue} {...props} />
  );
};

export const TextboxComponentRef = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <Box margin="0 25px">
      <Button
        onClick={() => {
          if (ref.current) ref.current?.focus();
        }}
      >
        Focus Textbox
      </Button>
      <Textbox ref={ref} />
    </Box>
  );
};

export const TextboxComponentWithLeftChildren = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      leftChildren={<Button>Test</Button>}
      onChange={setValue}
    />
  );
};

export const TextboxComponentWithPositionedChildren = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      positionedChildren={<Button>Test</Button>}
      onChange={setValue}
    />
  );
};

export const TextboxValidationsAsAStringWithTooltipDefault = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textbox
            label="Textbox"
            value="Textbox"
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

export const TextboxValidationsAsABoolean = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            {...{ [validationType]: true }}
            mb={2}
          />
          <Textbox
            label="Textbox - readOnly"
            value="Textbox"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};

export const TextboxValidationsAsAString = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textbox
            label="Textbox - readOnly"
            value="Textbox"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};

export const TextboxNewValidationsAsAStringOnGreyBackground = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box backgroundColor="var(--colorsUtilityMajor025)">
        {VALIDATIONS.map((validationType) => (
          <div key={`${validationType}-string-component`}>
            <Textbox
              label="Textbox"
              value="Textbox"
              {...{ [validationType]: "Message" }}
              mb={2}
            />
            <Textbox
              label="Textbox - readOnly"
              value="Textbox"
              readOnly
              {...{ [validationType]: "Message" }}
              mb={2}
            />
          </div>
        ))}
      </Box>
    </CarbonProvider>
  );
};

export const TextboxValidationsAsAStringWithTooltipCustom = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </Box>
  );
};

export const TextboxValidationsAsAStringDisplayedOnLabel = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textbox
            label="Textbox - readOnly"
            value="Textbox"
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

export const TextboxNewDesignsValidation = () => {
  return (
    <Box>
      <CarbonProvider validationRedesignOptIn>
        {(["error", "warning"] as const).map((validationType) =>
          SIZES.map((size) => (
            <div style={{ width: "296px" }} key={`${validationType}-${size}`}>
              <Textbox
                m={4}
                label={`${size} - ${validationType}`}
                defaultValue="Textbox"
                labelHelp="Hint text (optional)"
                size={size}
                {...{ [validationType]: "Message" }}
              />
              <Textbox
                m={4}
                label={`readOnly - ${size} - ${validationType}`}
                defaultValue="Textbox"
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

export const TextboxComponentWithCharacterLimit = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <>
      <Textbox
        label="Textbox"
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
