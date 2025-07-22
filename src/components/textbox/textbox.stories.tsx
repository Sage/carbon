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

export const Default: Story = () => {
  const [state, setState] = useState("");
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
  const [smallState, setSmallState] = useState("Textbox");
  const [mediumState, setMediumState] = useState("Textbox");
  const [largeState, setLargeState] = useState("Textbox");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "small") setSmallState(target.value);
    else if (size === "medium") setMediumState(target.value);
    else if (size === "large") setLargeState(target.value);
  };
  return (
    <Box>
      <Textbox
        key={`Textbox - Small`}
        label={`Textbox - Small`}
        value={smallState}
        size={"small"}
        mb={2}
        onChange={(e) => setValue(e, "small")}
      />

      <Textbox
        key={`Textbox - Medium`}
        label={`Textbox - Medium`}
        value={mediumState}
        size={"medium"}
        mb={2}
        onChange={(e) => setValue(e, "medium")}
      />

      <Textbox
        key={`Textbox - Large`}
        label={`Textbox - Large`}
        value={largeState}
        size={"large"}
        mb={2}
        onChange={(e) => setValue(e, "large")}
      />
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

export const Disabled: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" disabled value={state} onChange={setValue} />;
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" readOnly value={state} onChange={setValue} />;
};
ReadOnly.storyName = "Read Only";

export const WithLabelInline: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox label="Textbox" labelInline value={state} onChange={setValue} />
  );
};
WithLabelInline.storyName = "With Label Inline";
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomLabelWidthAndInputWidth: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      labelInline
      labelWidth={50}
      inputWidth={50}
    />
  );
};
WithCustomLabelWidthAndInputWidth.storyName =
  "With Custom Label Width And Input Width";

export const WithCustomMaxWidth: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox label="Textbox" value={state} onChange={setValue} maxWidth="50%" />
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      fieldHelp="Help"
    />
  );
};
WithFieldHelp.storyName = "With Field Help";

export const WithInputHint: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      inputHint="Hint text (optional)."
    />
  );
};
WithInputHint.storyName = "With Input Hint";

export const WithLabelHelp: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};
WithLabelHelp.storyName = "With Label Help";

export const Required: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} required />;
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox label="Textbox" value={state} onChange={setValue} isOptional />
  );
};
IsOptional.storyName = "IsOptional";

export const LabelAlign: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box>
      {(["right", "left"] as const).map((alignment) => (
        <Textbox
          label="Textbox"
          value={state}
          onChange={setValue}
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
