import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import Number, { NumberProps } from ".";

export const Default: ComponentStory<typeof Number> = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Number label="Number" value={state} onChange={setValue} />;
};

export const Sizes: ComponentStory<typeof Number> = () => {
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

export const Disabled: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" disabled />
);

export const ReadOnly: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" readOnly />
);

export const AutoFocus: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" autoFocus />
);
AutoFocus.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelInline: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" labelInline />
);
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelAlign: ComponentStory<typeof Number> = () => {
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

export const WithCustomLabelWidthAndInputWidth: ComponentStory<
  typeof Number
> = () => (
  <Number
    label="Number"
    value="123456"
    labelInline
    labelWidth={50}
    inputWidth={50}
  />
);

export const WithCustomMaxWidth: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" maxWidth="50%" />
);

export const WithFieldHelp: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" fieldHelp="Help" />
);

export const WithInputHint: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" inputHint="Hint text (optional)." />
);

export const WithLabelHelp: ComponentStory<typeof Number> = () => (
  <Number label="Number" value="123456" labelHelp="Help" helpAriaLabel="Help" />
);
