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
import useMultiInput from "../../hooks/use-multi-input";

export default {
  title: "Textbox/Test",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
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
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Textbox
        name="textbox1"
        label="Textbox"
        error="Error Message"
        value={state["textbox1"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox2"
        label="Textbox"
        warning="Warning Message"
        value={state["textbox2"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox3"
        label="Textbox"
        info="Info Message"
        value={state["textbox3"] || ""}
        onChange={setValue}
      />

      <Textbox
        name="textbox4"
        label="Textbox"
        error="Error Message"
        validationOnLabel
        value={state["textbox4"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox5"
        label="Textbox"
        warning="Warning Message"
        validationOnLabel
        value={state["textbox5"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox6"
        label="Textbox"
        info="Info Message"
        validationOnLabel
        value={state["textbox6"] || ""}
        onChange={setValue}
      />

      <Textbox
        name="textbox7"
        label="Textbox"
        error
        value={state["textbox7"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox8"
        label="Textbox"
        warning
        value={state["textbox8"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox9"
        label="Textbox"
        info
        value={state["textbox9"] || ""}
        onChange={setValue}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const { state, setValue } = useMultiInput();

  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        name="textbox1"
        label="Textbox"
        error="Error Message"
        value={state["textbox1"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox2"
        label="Textbox"
        warning="Warning Message"
        value={state["textbox2"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox3"
        validationMessagePositionTop={false}
        label="Textbox"
        error="Error Message"
        value={state["textbox3"] || ""}
        onChange={setValue}
      />
      <Textbox
        name="textbox4"
        validationMessagePositionTop={false}
        label="Textbox"
        warning="Warning Message"
        value={state["textbox4"] || ""}
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

export const NewValidationInline = ({ ...args }: Partial<TextboxProps>) => {
  const { state, setValue } = useMultiInput();

  return (
    <CarbonProvider validationRedesignOptIn>
      <Box maxWidth="400px" backgroundColor="#f5f5f5" p={2}>
        <Textbox
          label="Just a label"
          labelInline
          mb={2}
          name="Textbox-il"
          value={state["textbox1"] || ""}
          onChange={setValue}
          {...args}
        />
        <Textbox
          labelInline
          label="Label"
          inputHint="Hint text"
          mb={2}
          name="Textbox-il-hint"
          value={state["textbox2"] || ""}
          onChange={setValue}
          {...args}
        />
        <Textbox
          labelInline
          inputHint="Just hint text"
          fieldHelp="fieldHelp"
          labelSpacing={1}
          name="Textbox-il-field"
          value={state["textbox3"] || ""}
          onChange={setValue}
          {...args}
        />
        <Textbox
          label="Label"
          labelInline
          labelWidth={50}
          inputHint="Really long hint text that should wrap to the next line if it gets too long because labelWidth is set to 50%"
          fieldHelp="field help"
          mt={2}
          name="Textbox-il-long-help"
          value={state["textbox4"] || ""}
          onChange={setValue}
        />

        <Textbox
          required
          label="Label"
          inputHint="Hint text"
          error="Error Message (Fix is required)"
          labelInline
          my={2}
          name="Textbox-il-hint-error"
          value={state["textbox5"] || ""}
          onChange={setValue}
          {...args}
        />
        <Textbox
          label="Label"
          inputHint="Hint text"
          error="Error Message (Fix is required)"
          labelInline
          characterLimit={500}
          my={2}
          name="Textbox-il-hint-error"
          value={state["textbox5"] || ""}
          onChange={setValue}
          {...args}
        />
        <Textbox
          label="Label"
          warning="Warning Message (Fix is optional)"
          labelInline
          fieldHelp="fieldHelp"
          mb={2}
          mt="30px"
          name="Textbox-il-field-warn"
          value={state["textbox6"] || ""}
          onChange={setValue}
          {...args}
        />
        <Textbox
          inputHint="Just hint text"
          error="Error Message (Fix is required)"
          labelInline
          validationMessagePositionTop={false}
          my={2}
          name="Textbox-il-help-error-bot"
          value={state["textbox7"] || ""}
          onChange={setValue}
          {...args}
        />
      </Box>
    </CarbonProvider>
  );
};
NewValidationInline.storyName = "New Validation Inline";
NewValidationInline.args = {
  labelInline: true,
};
NewValidationInline.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const PrefixWithSizes = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      {["small", "medium", "large"].map((size) => (
        <Textbox
          key={`Textbox - ${size}`}
          label={`Textbox - ${size}`}
          value={state[size] || ""}
          onChange={setValue}
          prefix="prefix"
          name={size}
          size={size as TextboxProps["size"]}
          mb={2}
          placeholder="Textbox"
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
  const { state, setValue } = useMultiInput();

  return (
    <Box>
      <h1>Old Validation</h1>
      <Box>
        {variants.map(({ inline, align, error: e }) => (
          <Textbox
            label={`${inline ? "Inline" : "Stacked"} - ${align}${e ? " with Error" : ""}`}
            value={
              state[`old-${inline}-${align}-${e ? "error" : "no-error"}`] || ""
            }
            name={`old-${inline}-${align}-${e ? "error" : "no-error"}`}
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
              value={
                state[`new-${inline}-${align}-${e ? "error" : "no-error"}`] ||
                ""
              }
              name={`new-${inline}-${align}-${e ? "error" : "no-error"}`}
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
