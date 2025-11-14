import React, { useState } from "react";
import { Meta } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import Box from "../../box";
import TextInput from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof TextInput> = {
  title: "TextInput",
  component: TextInput,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;

export const Default = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <TextInput label="TextInput" value={state} onChange={setValue} />;
};
Default.storyName = "Default";

export const Required = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <TextInput label="TextInput" required value={state} onChange={setValue} />
  );
};

Required.storyName = "Required";

export const Placeholder = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <TextInput
      label="TextInput"
      placeholder="Placeholder text"
      value={state}
      onChange={setValue}
    />
  );
};

Placeholder.storyName = "Placeholder";

export const WithInputHint = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <TextInput
      label="TextInput"
      inputHint="Hint text (optional)."
      value={state}
      onChange={setValue}
    />
  );
};

WithInputHint.storyName = "With Input Hint";

export const WithPrefix = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <TextInput label="TextInput" prefix="£" value={state} onChange={setValue} />
  );
};

WithPrefix.storyName = "With Prefix";

export const WithCharacterLimit = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <TextInput
      label="TextInput"
      characterLimit={50}
      value={state}
      onChange={setValue}
    />
  );
};

WithCharacterLimit.storyName = "With Character Limit";

export const Disabled = () => {
  return (
    <TextInput
      label="TextInput"
      disabled
      placeholder="Placeholder text"
      value="Disabled value"
      onChange={() => {}}
    />
  );
};

Disabled.storyName = "Disabled";

export const ReadOnly = () => {
  return (
    <TextInput
      label="TextInput"
      readOnly
      placeholder="Placeholder text"
      value="Read-only value"
      onChange={() => {}}
    />
  );
};

ReadOnly.storyName = "Read-Only";

export const LabelInline = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <TextInput
      label="TextInput"
      labelInline
      placeholder="TextInput"
      value={state}
      onChange={setValue}
    />
  );
};

LabelInline.storyName = "Label Inline";

export const InputWidth = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box gap={2}>
      <TextInput
        label="Width: 80"
        inputWidth={80}
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Width: 60"
        inputWidth={60}
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Width: 40"
        inputWidth={40}
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Width: 80"
        labelInline
        inputWidth={80}
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Width: 60"
        labelInline
        inputWidth={60}
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Width: 40"
        labelInline
        inputWidth={40}
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
    </Box>
  );
};

InputWidth.storyName = "Input Width";

export const Sizes = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Box gap={2}>
      <TextInput
        label="Small"
        size="small"
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Medium"
        size="medium"
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Large"
        size="large"
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Small"
        size="small"
        labelInline
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Medium"
        size="medium"
        labelInline
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
      <TextInput
        label="Large"
        size="large"
        labelInline
        placeholder="TextInput"
        value={state}
        onChange={setValue}
      />
    </Box>
  );
};

Sizes.storyName = "Sizes";
