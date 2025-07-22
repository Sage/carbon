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
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box margin="0 25px">
      <Button
        onClick={() => {
          if (ref.current) ref.current?.focus();
        }}
      >
        Focus Textbox
      </Button>
      <Textbox ref={ref} value={state} onChange={setValue} />
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
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const [infoState, setInfoState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
    else if (size === "info") setInfoState(target.value);
  };

  return (
    <Box>
      <div key={`error-string-label`}>
        <Textbox
          label="Textbox"
          value={errorState}
          onChange={(e) => setValue(e, "error")}
          validationOnLabel
          error="Message"
          mb={2}
          tooltipPosition="bottom"
        />
      </div>
      <div key={`warning-string-label`}>
        <Textbox
          label="Textbox"
          value={warningState}
          onChange={(e) => setValue(e, "warning")}
          validationOnLabel
          warning="Message"
          mb={2}
          tooltipPosition="bottom"
        />
      </div>
      <div key={`info-string-label`}>
        <Textbox
          label="Textbox"
          value={infoState}
          onChange={(e) => setValue(e, "info")}
          validationOnLabel
          info="Message"
          mb={2}
          tooltipPosition="bottom"
        />
      </div>
    </Box>
  );
};

export const TextboxValidationsAsABoolean = () => {
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const [infoState, setInfoState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
    else if (size === "info") setInfoState(target.value);
  };

  return (
    <Box>
      <div key={`error-string-label`}>
        <Textbox
          label="Textbox"
          value={errorState}
          onChange={(e) => setValue(e, "error")}
          error
          mb={2}
        />
      </div>
      <div key={`warning-string-label`}>
        <Textbox
          label="Textbox"
          value={warningState}
          onChange={(e) => setValue(e, "warning")}
          warning
          mb={2}
        />
      </div>
      <div key={`info-string-label`}>
        <Textbox
          label="Textbox"
          value={infoState}
          onChange={(e) => setValue(e, "info")}
          info
          mb={2}
        />
      </div>
    </Box>
  );
};

export const TextboxValidationsAsAString = () => {
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const [infoState, setInfoState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
    else if (size === "info") setInfoState(target.value);
  };

  return (
    <Box>
      <div key={`error-string-label`}>
        <Textbox
          label="Textbox"
          value={errorState}
          onChange={(e) => setValue(e, "error")}
          error
          mb={2}
        />
      </div>
      <div key={`warning-string-label`}>
        <Textbox
          label="Textbox"
          value={warningState}
          onChange={(e) => setValue(e, "warning")}
          warning
          mb={2}
        />
      </div>
      <div key={`info-string-label`}>
        <Textbox
          label="Textbox"
          value={infoState}
          onChange={(e) => setValue(e, "info")}
          info
          mb={2}
        />
      </div>
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
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const [infoState, setInfoState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
    else if (size === "info") setInfoState(target.value);
  };

  return (
    <Box>
      <div key={`error-string-component`}>
        <Textbox
          label="Textbox"
          error="Message"
          value={errorState}
          onChange={(e) => setValue(e, "error")}
          mb={2}
          tooltipPosition="bottom"
        />
      </div>

      <div key={`warning-string-component`}>
        <Textbox
          label="Textbox"
          warning="Message"
          value={warningState}
          onChange={(e) => setValue(e, "error")}
          mb={2}
          tooltipPosition="bottom"
        />
      </div>

      <div key={`info-string-component`}>
        <Textbox
          label="Textbox"
          info="Message"
          value={infoState}
          onChange={(e) => setValue(e, "info")}
          mb={2}
          tooltipPosition="bottom"
        />
      </div>
    </Box>
  );
};

export const TextboxValidationsAsAStringDisplayedOnLabel = () => {
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const [infoState, setInfoState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
    else if (size === "info") setInfoState(target.value);
  };

  return (
    <Box>
      <div key={`error-string-label`}>
        <Textbox
          label="Textbox"
          value={errorState}
          onChange={(e) => setValue(e, "error")}
          validationOnLabel
          error="Message"
          mb={2}
        />
        <Textbox
          label="Textbox - readOnly"
          value={errorState}
          onChange={(e) => setValue(e, "error")}
          validationOnLabel
          readOnly
          error="Message"
          mb={2}
        />
      </div>

      <div key={`warning-string-label`}>
        <Textbox
          label="Textbox"
          value={warningState}
          onChange={(e) => setValue(e, "warning")}
          validationOnLabel
          warning="Message"
          mb={2}
        />
        <Textbox
          label="Textbox - readOnly"
          value={warningState}
          onChange={(e) => setValue(e, "warning")}
          validationOnLabel
          readOnly
          warning="Message"
          mb={2}
        />
      </div>

      <div key={`info-string-label`}>
        <Textbox
          label="Textbox"
          value={infoState}
          onChange={(e) => setValue(e, "info")}
          validationOnLabel
          info="Message"
          mb={2}
        />
        <Textbox
          label="Textbox - readOnly"
          value={infoState}
          onChange={(e) => setValue(e, "info")}
          validationOnLabel
          readOnly
          info="Message"
          mb={2}
        />
      </div>
    </Box>
  );
};

export const TextboxNewDesignsValidation = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box>
      <CarbonProvider validationRedesignOptIn>
        {(["error", "warning"] as const).map((validationType) =>
          SIZES.map((size) => (
            <div style={{ width: "296px" }} key={`${validationType}-${size}`}>
              <Textbox
                m={4}
                label={`${size} - ${validationType}`}
                value={state}
                onChange={setValue}
                labelHelp="Hint text (optional)"
                size={size}
                {...{ [validationType]: "Message" }}
              />
              <Textbox
                m={4}
                label={`readOnly - ${size} - ${validationType}`}
                value={state}
                onChange={setValue}
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
