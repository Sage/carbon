import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
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
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      <Textbox
        label="Textbox"
        error="Error Message"
        value={state}
        onChange={setValue}
      />
      <Textbox
        label="Textbox"
        warning="Warning Message"
        value={state}
        onChange={setValue}
      />
      <Textbox
        label="Textbox"
        info="Info Message"
        value={state}
        onChange={setValue}
      />

      <Textbox
        label="Textbox"
        error="Error Message"
        validationOnLabel
        value={state}
        onChange={setValue}
      />
      <Textbox
        label="Textbox"
        warning="Warning Message"
        validationOnLabel
        value={state}
        onChange={setValue}
      />
      <Textbox
        label="Textbox"
        info="Info Message"
        validationOnLabel
        value={state}
        onChange={setValue}
      />

      <Textbox label="Textbox" error value={state} onChange={setValue} />
      <Textbox label="Textbox" warning value={state} onChange={setValue} />
      <Textbox label="Textbox" info value={state} onChange={setValue} />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        label="Textbox"
        error="Error Message"
        value={state}
        onChange={setValue}
      />
      <Textbox
        label="Textbox"
        warning="Warning Message"
        value={state}
        onChange={setValue}
      />
      <Textbox
        validationMessagePositionTop={false}
        label="Textbox"
        error="Error Message"
        value={state}
        onChange={setValue}
      />
      <Textbox
        validationMessagePositionTop={false}
        label="Textbox"
        warning="Warning Message"
        value={state}
        onChange={setValue}
      />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const PrefixWithSizes = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <>
      {["small", "medium", "large"].map((size) => (
        <Textbox
          key={`Textbox - ${size}`}
          label={`Textbox - ${size}`}
          value={state}
          onChange={setValue}
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
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box>
      <h1>Old Validation</h1>
      <Box>
        {variants.map(({ inline, align, error: e }) => (
          <Textbox
            label={`${inline ? "Inline" : "Stacked"} - ${align}${e ? " with Error" : ""}`}
            value={state}
            onChange={setValue}
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
              value={state}
              onChange={setValue}
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
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box>
      <Textbox label="Textbox" value={state} onChange={setValue} autoFocus />
    </Box>
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
