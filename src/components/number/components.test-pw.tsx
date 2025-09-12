import React, { useState } from "react";

import Number, { NumberProps } from ".";
import Button from "../button";

export const NumberInputComponent = (props: Partial<NumberProps>) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Number label="Number" value={state} onChange={setValue} {...props} />;
};

export const Default = (props: Partial<NumberProps>) => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Number label="Number" value={state} onChange={setValue} {...props} />;
};

export const Sizes = () => {
  const sizes: NumberProps["size"][] = ["small", "medium", "large"];
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      {sizes.map((size) => (
        <Number
          key={`Number - ${size}`}
          label={`Number - ${size}`}
          value={state}
          onChange={setValue}
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};

export const Disabled = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Number label="Number" value={state} onChange={setValue} disabled />;
};

export const ReadOnly = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number label="Number" value={state} onChange={setValue} readOnly />;
};

export const AutoFocus = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number label="Number" value={state} onChange={setValue} autoFocus />;
};
AutoFocus.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelInline = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number label="Number" value={state} onChange={setValue} labelInline />
  );
};
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelAlign = () => {
  const alignments: NumberProps["align"][] = ["right", "left"];
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      {alignments.map((alignment) => (
        <Number
          label="Number"
          labelInline
          value={state}
          onChange={setValue}
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};

export const WithCustomLabelWidthAndInputWidth = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number
      label="Number"
      value={state}
      onChange={setValue}
      labelInline
      labelWidth={50}
      inputWidth={50}
    />
  );
};

export const WithCustomMaxWidth = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number label="Number" value={state} onChange={setValue} maxWidth="50%" />
  );
};

export const WithFieldHelp = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number label="Number" value={state} onChange={setValue} fieldHelp="Help" />
  );
};

export const WithInputHint = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number
      label="Number"
      value={state}
      onChange={setValue}
      inputHint="Hint text (optional)."
    />
  );
};

export const WithLabelHelp = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number
      label="Number"
      value={state}
      onChange={setValue}
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};

export const WithPositionedChildren = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number
      label="Number"
      value={state}
      positionedChildren={<Button>Test</Button>}
      onChange={setValue}
    />
  );
};
