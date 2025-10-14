import React, { useState } from "react";
import TextInput, { TextInputProps } from ".";

const MultipleTextInputComponents = (props: Partial<TextInputProps>) => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <>
      <TextInput
        label="TextInput-1"
        value={state}
        onChange={setValue}
        {...props}
      />
      <TextInput
        label="TextInput-2"
        value={state}
        onChange={setValue}
        {...props}
      />
    </>
  );
};

const TextInputComponent = (props: Partial<TextInputProps>) => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <TextInput label="TextInput" value={state} onChange={setValue} {...props} />
  );
};

const PrePopulatedTextInputComponent = (props: Partial<TextInputProps>) => {
  const [state, setState] = useState("test value");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <TextInput label="TextInput" value={state} onChange={setValue} {...props} />
  );
};

export {
  MultipleTextInputComponents,
  TextInputComponent,
  PrePopulatedTextInputComponent,
};
