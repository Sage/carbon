import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import I18nProvider from "../i18n-provider";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Textbox from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Textbox> = {
  title: "Textbox",
  component: Textbox,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Textbox>;

export const Playground: Story = {
  render: (args) => {
    const [state, setState] = useState("");
    const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setState(target.value);
    };
    return <Textbox {...args} value={state} onChange={setValue} />;
  },
  args: {
    label: "Textbox",
    placeholder: "Placeholder",
    disabled: false,
    readOnly: false,
    required: false,
    size: "medium",
    inputHint: "Hint text",
    prefix: "£",
    inputIcon: "search",
    inputWidth: 100,
    maxWidth: "100%",
    labelInline: false,
    characterLimit: 50,
    error: "",
    warning: "",
  },
};
Playground.storyName = "Playground";

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
