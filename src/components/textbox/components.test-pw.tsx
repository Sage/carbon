import React, { useState } from "react";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
import Button from "../button";

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

export const TextboxValidationsAsABoolean = () => {
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
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
    </Box>
  );
};

export const TextboxValidationsAsAString = () => {
  const [errorState, setErrorState] = useState("Textbox");
  const [warningState, setWarningState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "error") setErrorState(target.value);
    else if (size === "warning") setWarningState(target.value);
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
    </Box>
  );
};

export const TextboxNewValidationsAsAStringOnGreyBackground = () => {
  return (
    <Box backgroundColor="var(--colorsUtilityMajor025)">
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            {...{ [validationType]: "Message" }}
            mb={2}
            onChange={() => {}}
          />
          <Textbox
            label="Textbox - readOnly"
            value="Textbox"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
            onChange={() => {}}
          />
        </div>
      ))}
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
