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

  return (
    <>
      {sizes.map((size) => (
        <Number
          key={`Number - ${size}`}
          label={`Number - ${size}`}
          value="123456"
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};

export const Disabled = () => <Number label="Number" value="123456" disabled />;

export const ReadOnly = () => <Number label="Number" value="123456" readOnly />;

export const AutoFocus = () => (
  <Number label="Number" value="123456" autoFocus />
);
AutoFocus.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelInline = () => (
  <Number label="Number" value="123456" labelInline />
);
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelAlign = () => {
  const alignments: NumberProps["align"][] = ["right", "left"];

  return (
    <>
      {alignments.map((alignment) => (
        <Number
          label="Number"
          labelInline
          value="123456"
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};

export const WithCustomLabelWidthAndInputWidth = () => (
  <Number
    label="Number"
    value="123456"
    labelInline
    labelWidth={50}
    inputWidth={50}
  />
);

export const WithCustomMaxWidth = () => (
  <Number label="Number" value="123456" maxWidth="50%" />
);

export const WithFieldHelp = () => (
  <Number label="Number" value="123456" fieldHelp="Help" />
);

export const WithInputHint = () => (
  <Number label="Number" value="123456" inputHint="Hint text (optional)." />
);

export const WithLabelHelp = () => (
  <Number label="Number" value="123456" labelHelp="Help" helpAriaLabel="Help" />
);

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
