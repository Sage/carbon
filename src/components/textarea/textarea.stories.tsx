import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import I18nProvider from "../i18n-provider";

import Textarea from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const DefaultStory: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textarea label="Textarea" value={state} onChange={setValue} />;
};
DefaultStory.storyName = "Default";

export const DisabledStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      disabled
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
DisabledStory.storyName = "Disabled";

export const LabelAlignStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <>
      {(["right", "left"] as const).map((alignment) => (
        <Textarea
          label="Textarea"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
          mb={2}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      ))}
    </>
  );
};
LabelAlignStory.storyName = "Label Align";

export const ReadOnlyStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      readOnly
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
ReadOnlyStory.storyName = "Read Only";

export const ExpandableStory: Story = () => {
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

export const CharacterLimitStory: Story = () => {
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
CharacterLimitStory.storyName = "Character Limit";

export const TranslationsCharacterLimitStory: Story = () => {
  const [value, setValue] = useState("");
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
TranslationsCharacterLimitStory.storyName = "Translations Character Limit";

export const LabelInlineStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      labelInline
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
LabelInlineStory.storyName = "Label Inline";

export const CustomWidthStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      labelInline
      labelWidth={50}
      inputWidth={50}
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
CustomWidthStory.storyName = "Custom Width";

export const FieldHelpStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      fieldHelp="Help"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
FieldHelpStory.storyName = "Field Help";

export const MaxWidthStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      maxWidth="70%"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
MaxWidthStory.storyName = "Max Width";

export const InputHintStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      inputHint="Hint text (optional)."
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
InputHintStory.storyName = "Input Hint";

export const LabelHelpStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      labelHelp="Help"
      helpAriaLabel="Help"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
LabelHelpStory.storyName = "Label Help";

export const RequiredStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      required
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
RequiredStory.storyName = "Required";

export const IsOptionalStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      isOptional
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
IsOptionalStory.storyName = "isOptional";

export const BorderRadiusStory: Story = () => {
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
BorderRadiusStory.storyName = "Border Radius";

export const BorderlessExample: Story = () => {
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
BorderlessExample.storyName = "Borderless Example";
