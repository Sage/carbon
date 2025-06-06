import React, { useState } from "react";
import { action } from "storybook/actions";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "./utils";

export default {
  title: "Textbox/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("");
  const setValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <div>
      <Textbox
        m={2}
        onClick={action("onClick")}
        iconOnClick={action("iconOnClick")}
        value={state}
        onChange={setValue}
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
    </div>
  );
};
Default.storyName = "Default";
Default.argTypes = commonTextboxArgTypes();
Default.args = getCommonTextboxArgs();

export const Validation = () => {
  return (
    <>
      <Textbox label="Textbox" error="Error Message" />
      <Textbox label="Textbox" warning="Warning Message" />
      <Textbox label="Textbox" info="Info Message" />

      <Textbox label="Textbox" error="Error Message" validationOnLabel />
      <Textbox label="Textbox" warning="Warning Message" validationOnLabel />
      <Textbox label="Textbox" info="Info Message" validationOnLabel />

      <Textbox label="Textbox" error />
      <Textbox label="Textbox" warning />
      <Textbox label="Textbox" info />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox label="Textbox" error="Error Message" />
      <Textbox label="Textbox" warning="Warning Message" />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const PrefixWithSizes = () => {
  return (
    <>
      {["small", "medium", "large"].map((size) => (
        <Textbox
          key={`Textbox - ${size}`}
          label={`Textbox - ${size}`}
          defaultValue="Textbox"
          prefix="prefix"
          size={size as TextboxProps["size"]}
          mb={2}
        />
      ))}
    </>
  );
};
PrefixWithSizes.storyName = "Prefix with sizes";

export const LabelAndHintTextAlign = () => {
  const variants = [
    { inline: false, align: "left", error: "Error message" },
    { inline: false, align: "left", error: undefined },
    { inline: false, align: "right", error: "Error message" },
    { inline: false, align: "right", error: undefined },
    { inline: true, align: "left", error: "Error message" },
    { inline: true, align: "left", error: undefined },
    { inline: true, align: "right", error: "Error message" },
    { inline: true, align: "right", error: undefined },
  ];
  return (
    <Box>
      <h1>Old Validation</h1>
      <Box>
        {variants.map(({ inline, align, error: e }) => (
          <Textbox
            label={`${inline ? "Inline" : "Stacked"} - ${align}${e ? " with Error" : ""}`}
            value="Textbox"
            inputWidth={50}
            key={`${inline ? "inline" : "stacked"}-${align}-old-${e ? "error" : "no-error"}`}
            labelAlign={align as TextboxProps["labelAlign"]}
            inputHint="Hint text (optional)."
            labelInline={inline}
            error={e}
          />
        ))}
      </Box>

      <h1>New Validation</h1>
      <CarbonProvider validationRedesignOptIn>
        <Box>
          {variants.map(({ inline, align, error: e }) => (
            <Textbox
              label={`${inline ? "Inline" : "Stacked"} - ${align}${e ? " with Error" : ""}`}
              value="Textbox"
              inputWidth={50}
              key={`${inline ? "inline" : "stacked"}-${align}-new-${e ? "error" : "no-error"}`}
              labelAlign={align as TextboxProps["labelAlign"]}
              inputHint="Hint text (optional)."
              labelInline={inline}
              error={e}
            />
          ))}
        </Box>
      </CarbonProvider>
    </Box>
  );
};
LabelAndHintTextAlign.storyName = "Label and hint text align";
LabelAndHintTextAlign.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AutoFocus = () => {
  return (
    <Box>
      <Textbox label="Textbox" value="Textbox" autoFocus />
    </Box>
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
