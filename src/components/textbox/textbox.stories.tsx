import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import Textbox from ".";
import Box from "../box";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import I18nProvider from "../i18n-provider";

export const SIZES = ["small", "medium", "large"] as const;
export const VALIDATIONS = ["error", "warning", "info"] as const;

export const Default: ComponentStory<typeof Textbox> = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} />;
};

export const CharacterCounter: ComponentStory<typeof Textbox> = () => {
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

export const CharacterCounterTranslations: ComponentStory<
  typeof Textbox
> = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        characterCount: {
          tooManyCharacters: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère restant`
              : `${formattedCount} caractères restants`,
          charactersLeft: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère de trop`
              : `${formattedCount} personnages de trop`,
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

export const Prefix: ComponentStory<typeof Textbox> = () => {
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

export const Sizes: ComponentStory<typeof Textbox> = () => {
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

export const Margins: ComponentStory<typeof Textbox> = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} m={4} />;
};

export const AutoFocus: ComponentStory<typeof Textbox> = () => {
  return (
    <Box>
      <Textbox label="Textbox" value="Textbox" autoFocus />
      <Textbox label="Textbox" value="Textbox" autoFocus />
    </Box>
  );
};
AutoFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: ComponentStory<typeof Textbox> = () => {
  return <Textbox label="Textbox" value="Textbox" disabled />;
};

export const ReadOnly: ComponentStory<typeof Textbox> = () => {
  return <Textbox label="Textbox" value="Textbox" readOnly />;
};

export const WithLabelInline: ComponentStory<typeof Textbox> = () => {
  return <Textbox label="Textbox" value="Textbox" labelInline />;
};
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomLabelWidthAndInputWidth: ComponentStory<
  typeof Textbox
> = () => {
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

export const WithCustomMaxWidth: ComponentStory<typeof Textbox> = () => {
  return <Textbox label="Textbox" value="Textbox" maxWidth="50%" />;
};

export const WithFieldHelp: ComponentStory<typeof Textbox> = () => {
  return <Textbox label="Textbox" value="Textbox" fieldHelp="Help" />;
};

export const WithInputHint: ComponentStory<typeof Textbox> = () => {
  return (
    <Textbox
      label="Textbox"
      value="Textbox"
      inputHint="Hint text (optional)."
    />
  );
};

export const WithLabelHelp: ComponentStory<typeof Textbox> = () => {
  return (
    <Textbox
      label="Textbox"
      value="Textbox"
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};

export const Required: ComponentStory<typeof Textbox> = () => {
  return <Textbox label="Textbox" value="Textbox" required />;
};

export const LabelAlign: ComponentStory<typeof Textbox> = () => {
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

export const ValidationsAsAString: ComponentStory<typeof Textbox> = () => {
  return (
    <Box>
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
  );
};

export const ValidationsAsAStringWithTooltipCustom: ComponentStory<
  typeof Textbox
> = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </Box>
  );
};
ValidationsAsAStringWithTooltipCustom.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsAsAStringDisplayedOnLabel: ComponentStory<
  typeof Textbox
> = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textbox
            label="Textbox - readOnly"
            value="Textbox"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};

export const NewDesignsValidation: ComponentStory<typeof Textbox> = () => {
  return (
    <Box>
      <CarbonProvider validationRedesignOptIn>
        {(["error", "warning"] as const).map((validationType) =>
          SIZES.map((size) => (
            <div style={{ width: "296px" }} key={`${validationType}-${size}`}>
              <Textbox
                m={4}
                label={`${size} - ${validationType}`}
                defaultValue="Textbox"
                inputHint="Hint text (optional)."
                size={size}
                {...{ [validationType]: "Message" }}
              />
              <Textbox
                m={4}
                label={`readOnly - ${size} - ${validationType}`}
                defaultValue="Textbox"
                size={size}
                inputHint="Hint text (optional)."
                readOnly
                {...{ [validationType]: "Message" }}
              />
            </div>
          ))
        )}
      </CarbonProvider>
    </Box>
  );
};

export const ValidationsAsAStringWithTooltipDefault: ComponentStory<
  typeof Textbox
> = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </Box>
  );
};
ValidationsAsAStringWithTooltipDefault.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationsAsABoolean: ComponentStory<typeof Textbox> = () => {
  return (
    <Box>
      {VALIDATIONS.map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <Textbox
            label="Textbox"
            value="Textbox"
            {...{ [validationType]: true }}
            mb={2}
          />
          <Textbox
            label="Textbox - readOnly"
            value="Textbox"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </div>
      ))}
    </Box>
  );
};
