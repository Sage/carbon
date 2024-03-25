import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import CarbonProvider from "../carbon-provider/carbon-provider.component";

import Textarea from ".";
import I18nProvider from "../i18n-provider";
import Box from "../box";

export const DefaultStory: ComponentStory<typeof Textarea> = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textarea label="Textarea" value={state} onChange={setValue} />;
};

export const DisabledStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" disabled />;
};

export const LabelAlignStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {(["right", "left"] as const).map((alignment) => (
        <Textarea
          label="Textarea"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};

export const ReadOnlyStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" readOnly />;
};

export const AutoFocusStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" autoFocus />;
};
AutoFocusStory.parameters = { chromatic: { disableSnapshot: true } };

export const ExpandableStory: ComponentStory<typeof Textarea> = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
ExpandableStory.parameters = { chromatic: { disableSnapshot: true } };

export const CharacterLimitStory: ComponentStory<typeof Textarea> = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      inputHint="Hint text (optional)."
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
      characterLimit={50}
    />
  );
};

export const TranslationsCharacterLimitStory: ComponentStory<
  typeof Textarea
> = () => {
  const [value, setValue] = useState("");
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
      <Textarea
        label="Textarea"
        inputHint="Texte de l'indice (facultatif)."
        expandable
        value={value}
        onChange={({ target }) => setValue(target.value)}
        characterLimit={50}
      />
    </I18nProvider>
  );
};

export const LabelInlineStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" labelInline />;
};

export const CustomWidthStory: ComponentStory<typeof Textarea> = () => {
  return (
    <Textarea label="Textarea" labelInline labelWidth={50} inputWidth={50} />
  );
};

export const FieldHelpStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" fieldHelp="Help" />;
};

export const MaxWidthStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" maxWidth="70%" />;
};

export const InputHintStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" inputHint="Hint text (optional)." />;
};

export const LabelHelpStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" labelHelp="Help" helpAriaLabel="Help" />;
};

export const RequiredStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" required />;
};

export const ValidationStringStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationStringPositionStory: ComponentStory<
  typeof Textarea
> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </>
  );
};
ValidationStringPositionStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationLabelStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationLabelPositionStory: ComponentStory<
  typeof Textarea
> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </div>
      ))}
    </>
  );
};
ValidationLabelPositionStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const NewDesignValidationStory: ComponentStory<typeof Textarea> = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) => (
        <div
          style={{ width: "296px" }}
          key={`${validationType}-string-component`}
        >
          <Textarea
            label={`${validationType}`}
            inputHint="Hint text (optional)."
            {...{ [validationType]: "Message" }}
            m={4}
          />
          <Textarea
            label={`readOnly - ${validationType}`}
            inputHint="Hint text (optional)."
            readOnly
            {...{ [validationType]: "Message" }}
            m={4}
          />
        </div>
      ))}
    </CarbonProvider>
  );
};

export const ValidationBooleanStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <Textarea label="Textarea" {...{ [validationType]: true }} mb={2} />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const BorderRadiusStory: ComponentStory<typeof Textarea> = () => {
  const [stateOne, setStateOne] = useState("");
  const [stateTwo, setStateTwo] = useState("");
  const [stateThree, setStateThree] = useState("");
  const [stateFour, setStateFour] = useState("");
  const setValueOne = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateOne(target.value);
  };
  const setValueTwo = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateTwo(target.value);
  };
  const setValueThree = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateThree(target.value);
  };
  const setValueFour = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateFour(target.value);
  };
  return (
    <>
      <Textarea
        label="Textarea with borderRadius100"
        value={stateOne}
        onChange={setValueOne}
        borderRadius="borderRadius100"
      />

      <Textarea
        mt={4}
        label="Textarea with an array of two values"
        value={stateTwo}
        onChange={setValueTwo}
        borderRadius={["borderRadius400", "borderRadius025"]}
      />

      <Textarea
        mt={4}
        label="Textarea with an array of three values"
        value={stateThree}
        onChange={setValueThree}
        borderRadius={["borderRadius400", "borderRadius025", "borderRadius100"]}
      />

      <Textarea
        mt={4}
        label="Textarea with an array of four values"
        value={stateFour}
        onChange={setValueFour}
        borderRadius={[
          "borderRadius400",
          "borderRadius025",
          "borderRadius100",
          "borderRadius400",
        ]}
      />
    </>
  );
};

export const BorderlessExample: ComponentStory<typeof Textarea> = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box
      bg="var(--colorsUtilityMajor040)"
      height={200}
      width={800}
      borderRadius="borderRadius200"
    >
      <Textarea
        label="Borderless Textarea"
        value={state}
        onChange={setValue}
        rows={7}
        hideBorders
        m={2}
      />
    </Box>
  );
};
