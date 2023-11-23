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
    <Textbox
      label="Textbox"
      isOptional
      value={state}
      onChange={setValue}
      {...props}
    />
  );
};

export const TextboxComponentInputRef = () => {
  const ref = useRef(null);

  return (
    <Box margin="0 25px">
      <Button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (ref.current) ref.current.focus();
        }}
      >
        Focus Textbox
      </Button>
      <TextboxComponent
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputRef={(el: React.ChangeEvent<HTMLInputElement>) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref.current = el.current;
        }}
      />
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
          ))
        )}
      </CarbonProvider>
    </Box>
  );
};
