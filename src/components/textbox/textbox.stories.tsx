import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import I18nProvider from "../i18n-provider";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Textbox from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Textbox> = {
  title: "Textbox",
  component: Textbox,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Textbox>;

const SIZES = ["small", "medium", "large"] as const;

export const Default: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} />;
};
Default.storyName = "Default";

export const CharacterCounter: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      inputHint="Hint text (optional)."
      value={state}
      onChange={setValue}
      characterLimit={10}
    />
  );
};
CharacterCounter.storyName = "Character Counter";

export const CharacterCounterTranslations: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        characterCount: {
          charactersLeft: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère restant`
              : `${formattedCount} caractères restants`,
          tooManyCharacters: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère de trop`
              : `${formattedCount} caractères de trop`,
          visuallyHiddenHint: (formattedCount) =>
            `Vous pouvez saisir jusqu'à ${formattedCount} caractères`,
        },
      }}
    >
      <Textbox
        label="Textbox"
        inputHint="Texte de l'indice (facultatif)."
        value={state}
        onChange={setValue}
        characterLimit={10}
      />
    </I18nProvider>
  );
};
CharacterCounterTranslations.storyName = "Character Counter Translations";

export const Prefix: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      prefix="prefix"
    />
  );
};
Prefix.storyName = "Prefix";

export const Sizes: Story = () => {
  return (
    <Box>
      {SIZES.map((size) => (
        <Textbox
          key={`Textbox - ${size}`}
          label={`Textbox - ${size}`}
          defaultValue="Textbox"
          size={size}
          mb={2}
        />
      ))}
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const Margins: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} m={4} />;
};
Margins.storyName = "Margins";

export const AutoFocus: Story = () => {
  return (
    <Box>
      <Textbox label="Textbox" value="Textbox" autoFocus />
      <Textbox label="Textbox" value="Textbox" autoFocus />
    </Box>
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: Story = () => {
  return <Textbox label="Textbox" value="Textbox" disabled />;
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  return <Textbox label="Textbox" value="Textbox" readOnly />;
};
ReadOnly.storyName = "Read Only";

export const WithLabelInline: Story = () => {
  return <Textbox label="Textbox" value="Textbox" labelInline />;
};
WithLabelInline.storyName = "With Label Inline";
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomLabelWidthAndInputWidth: Story = () => {
  return (
    <Textbox
      label="Textbox"
      value="Textbox"
      labelInline
      labelWidth={50}
      inputWidth={50}
    />
  );
};
WithCustomLabelWidthAndInputWidth.storyName =
  "With Custom Label Width And Input Width";

export const WithCustomMaxWidth: Story = () => {
  return <Textbox label="Textbox" value="Textbox" maxWidth="50%" />;
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithFieldHelp: Story = () => {
  return <Textbox label="Textbox" value="Textbox" fieldHelp="Help" />;
};
WithFieldHelp.storyName = "With Field Help";

export const WithInputHint: Story = () => {
  return (
    <Textbox
      label="Textbox"
      value="Textbox"
      inputHint="Hint text (optional)."
    />
  );
};
WithInputHint.storyName = "With Input Hint";

export const WithLabelHelp: Story = () => {
  return (
    <Textbox
      label="Textbox"
      value="Textbox"
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};
WithLabelHelp.storyName = "With Label Help";

export const Required: Story = () => {
  return <Textbox label="Textbox" value="Textbox" required />;
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  return <Textbox label="Textbox" value="Textbox" isOptional />;
};
IsOptional.storyName = "IsOptional";

export const LabelAlign: Story = () => {
  return (
    <Box>
      {(["right", "left"] as const).map((alignment) => (
        <Textbox
          label="Textbox"
          value="Textbox"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </Box>
  );
};
LabelAlign.storyName = "Label Align";
