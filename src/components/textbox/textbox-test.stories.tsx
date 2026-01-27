import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
import Link from "../link";
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

export const FormFieldRelativePosition = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box
      flexGrow={1}
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      height="calc(100vh - 40px)"
    >
      <Box overflowY="auto" flexGrow={1}>
        <Box p="40px" overflow="auto">
          <Link href="#Textbox">Test Link</Link>
          <Box height={1000} />
          <Textbox
            value={state}
            onChange={setValue}
            characterLimit={2000}
            id="Textbox"
            label={"Textbox"}
          />
        </Box>
      </Box>
    </Box>
  );
};
FormFieldRelativePosition.storyName = "Form Field Relative Position";

export const InFlexContainer = () => {
  const [value, setValue] = useState("Textbox");
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };
  return (
    <>
      In flexbox with one input:
      <Box display="flex" mb={2}>
        <Textbox label="Textbox" value={value} onChange={handleChange} />
      </Box>
      In flexbox with two inputs:
      <Box display="flex" gap={2}>
        <Textbox label="Textbox" value={value} onChange={handleChange} />
        <Textbox label="Textbox" value={value} onChange={handleChange} m={0} />
      </Box>
    </>
  );
};
