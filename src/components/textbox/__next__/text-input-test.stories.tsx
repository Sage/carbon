import React, { useState } from "react";
import TextInput from ".";
import Box from "../../box";
import {
  CommonTextInputArgs,
  commonTextInputArgTypes,
  getCommonTextInputArgs,
  getCommonTextInputArgsWithSpecialCharacters,
} from "./utils";
import useMultiInput from "../../../hooks/use-multi-input";

export default {
  title: "TextInput/Test",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Default = (args: CommonTextInputArgs) => {
  const [state, setState] = useState("");
  const setValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <div>
      <TextInput
        m={2}
        value={state}
        onChange={setValue}
        {...getCommonTextInputArgsWithSpecialCharacters(args)}
      />
    </div>
  );
};
Default.storyName = "Default";
Default.argTypes = commonTextInputArgTypes();
Default.args = getCommonTextInputArgs();

export const Validation = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="1px" display="flex" flexDirection="column">
        <TextInput
          name="error-sm"
          label="Small + Error"
          size="small"
          error="Error message"
          value={state["error-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-hint"
          label="Small + Error + Hint"
          size="small"
          inputHint="Hint text"
          error="Error message"
          value={state["error-sm-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-char"
          label="Small + Error + CharLimit"
          size="small"
          characterLimit={15}
          error="Error message"
          value={state["error-sm-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-hint-char"
          label="Small + Error + Hint + CharLimit"
          size="small"
          inputHint="Hint text"
          characterLimit={15}
          error="Error message"
          value={state["error-sm-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-req"
          label="Small + Error + Required"
          size="small"
          required
          error="Error message"
          value={state["error-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-req-hint"
          label="Small + Error + Required + Hint"
          size="small"
          required
          inputHint="Hint text"
          error="Error message"
          value={state["error-sm-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-req-char"
          label="Small + Error + Required + CharLimit"
          size="small"
          required
          characterLimit={15}
          error="Error message"
          value={state["error-sm-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-sm-req-hint-char"
          label="Small + Error + Required + Hint + CharLimit"
          size="small"
          required
          inputHint="Hint text"
          characterLimit={15}
          error="Error message"
          value={state["error-sm-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm"
          label="Small + Warning"
          size="small"
          warning="Warning message"
          value={state["warning-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-hint"
          label="Small + Warning + Hint"
          size="small"
          inputHint="Hint text"
          warning="Warning message"
          value={state["warning-sm-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-char"
          label="Small + Warning + CharLimit"
          size="small"
          characterLimit={15}
          warning="Warning message"
          value={state["warning-sm-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-hint-char"
          label="Small + Warning + Hint + CharLimit"
          size="small"
          inputHint="Hint text"
          characterLimit={15}
          warning="Warning message"
          value={state["warning-sm-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-req"
          label="Small + Warning + Required"
          size="small"
          required
          warning="Warning message"
          value={state["warning-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-req-hint"
          label="Small + Warning + Required + Hint"
          size="small"
          required
          inputHint="Hint text"
          warning="Warning message"
          value={state["warning-sm-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-req-char"
          label="Small + Warning + Required + CharLimit"
          size="small"
          required
          characterLimit={15}
          warning="Warning message"
          value={state["warning-sm-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-sm-req-hint-char"
          label="Small + Warning + Required + Hint + CharLimit"
          size="small"
          required
          inputHint="Hint text"
          characterLimit={15}
          warning="Warning message"
          value={state["warning-sm-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md"
          label="Medium + Error"
          size="medium"
          error="Error message"
          value={state["error-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-hint"
          label="Medium + Error + Hint"
          size="medium"
          inputHint="Hint text"
          error="Error message"
          value={state["error-md-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-char"
          label="Medium + Error + CharLimit"
          size="medium"
          characterLimit={20}
          error="Error message"
          value={state["error-md-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-hint-char"
          label="Medium + Error + Hint + CharLimit"
          size="medium"
          inputHint="Hint text"
          characterLimit={20}
          error="Error message"
          value={state["error-md-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-req"
          label="Medium + Error + Required"
          size="medium"
          required
          error="Error message"
          value={state["error-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-req-hint"
          label="Medium + Error + Required + Hint"
          size="medium"
          required
          inputHint="Hint text"
          error="Error message"
          value={state["error-md-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-req-char"
          label="Medium + Error + Required + CharLimit"
          size="medium"
          required
          characterLimit={20}
          error="Error message"
          value={state["error-md-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-md-req-hint-char"
          label="Medium + Error + Required + Hint + CharLimit"
          size="medium"
          required
          inputHint="Hint text"
          characterLimit={20}
          error="Error message"
          value={state["error-md-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md"
          label="Medium + Warning"
          size="medium"
          warning="Warning message"
          value={state["warning-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-hint"
          label="Medium + Warning + Hint"
          size="medium"
          inputHint="Hint text"
          warning="Warning message"
          value={state["warning-md-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-char"
          label="Medium + Warning + CharLimit"
          size="medium"
          characterLimit={20}
          warning="Warning message"
          value={state["warning-md-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-hint-char"
          label="Medium + Warning + Hint + CharLimit"
          size="medium"
          inputHint="Hint text"
          characterLimit={20}
          warning="Warning message"
          value={state["warning-md-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-req"
          label="Medium + Warning + Required"
          size="medium"
          required
          warning="Warning message"
          value={state["warning-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-req-hint"
          label="Medium + Warning + Required + Hint"
          size="medium"
          required
          inputHint="Hint text"
          warning="Warning message"
          value={state["warning-md-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-req-char"
          label="Medium + Warning + Required + CharLimit"
          size="medium"
          required
          characterLimit={20}
          warning="Warning message"
          value={state["warning-md-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-md-req-hint-char"
          label="Medium + Warning + Required + Hint + CharLimit"
          size="medium"
          required
          inputHint="Hint text"
          characterLimit={20}
          warning="Warning message"
          value={state["warning-md-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg"
          label="Large + Error"
          size="large"
          error="Error message"
          value={state["error-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-hint"
          label="Large + Error + Hint"
          size="large"
          inputHint="Hint text"
          error="Error message"
          value={state["error-lg-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-char"
          label="Large + Error + CharLimit"
          size="large"
          characterLimit={25}
          error="Error message"
          value={state["error-lg-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-hint-char"
          label="Large + Error + Hint + CharLimit"
          size="large"
          inputHint="Hint text"
          characterLimit={25}
          error="Error message"
          value={state["error-lg-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-req"
          label="Large + Error + Required"
          size="large"
          required
          error="Error message"
          value={state["error-lg-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-req-hint"
          label="Large + Error + Required + Hint"
          size="large"
          required
          inputHint="Hint text"
          error="Error message"
          value={state["error-lg-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-req-char"
          label="Large + Error + Required + CharLimit"
          size="large"
          required
          characterLimit={25}
          error="Error message"
          value={state["error-lg-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-lg-req-hint-char"
          label="Large + Error + Required + Hint + CharLimit"
          size="large"
          required
          inputHint="Hint text"
          characterLimit={25}
          error="Error message"
          value={state["error-lg-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg"
          label="Large + Warning"
          size="large"
          warning="Warning message"
          value={state["warning-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-hint"
          label="Large + Warning + Hint"
          size="large"
          inputHint="Hint text"
          warning="Warning message"
          value={state["warning-lg-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-char"
          label="Large + Warning + CharLimit"
          size="large"
          characterLimit={25}
          warning="Warning message"
          value={state["warning-lg-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-hint-char"
          label="Large + Warning + Hint + CharLimit"
          size="large"
          inputHint="Hint text"
          characterLimit={25}
          warning="Warning message"
          value={state["warning-lg-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-req"
          label="Large + Warning + Required"
          size="large"
          required
          warning="Warning message"
          value={state["warning-lg-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-req-hint"
          label="Large + Warning + Required + Hint"
          size="large"
          required
          inputHint="Hint text"
          warning="Warning message"
          value={state["warning-lg-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-req-char"
          label="Large + Warning + Required + CharLimit"
          size="large"
          required
          characterLimit={25}
          warning="Warning message"
          value={state["warning-lg-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-lg-req-hint-char"
          label="Large + Warning + Required + Hint + CharLimit"
          size="large"
          required
          inputHint="Hint text"
          characterLimit={25}
          warning="Warning message"
          value={state["warning-lg-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-bottom-sm"
          label="Small + Error Bottom"
          size="small"
          error="Error message"
          validationMessagePositionTop={false}
          value={state["error-bottom-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-bottom-sm-req"
          label="Small + Error Bottom + Required"
          size="small"
          required
          error="Error message"
          validationMessagePositionTop={false}
          value={state["error-bottom-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-bottom-md"
          label="Medium + Error Bottom"
          size="medium"
          error="Error message"
          validationMessagePositionTop={false}
          value={state["error-bottom-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-bottom-md-req"
          label="Medium + Error Bottom + Required"
          size="medium"
          required
          error="Error message"
          validationMessagePositionTop={false}
          value={state["error-bottom-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-bottom-lg"
          label="Large + Error Bottom"
          size="large"
          error="Error message"
          validationMessagePositionTop={false}
          value={state["error-bottom-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="error-bottom-lg-req"
          label="Large + Error Bottom + Required"
          size="large"
          required
          error="Error message"
          validationMessagePositionTop={false}
          value={state["error-bottom-lg-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-bottom-sm"
          label="Small + Warning Bottom"
          size="small"
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["warning-bottom-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-bottom-sm-req"
          label="Small + Warning Bottom + Required"
          size="small"
          required
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["warning-bottom-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-bottom-md"
          label="Medium + Warning Bottom"
          size="medium"
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["warning-bottom-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-bottom-md-req"
          label="Medium + Warning Bottom + Required"
          size="medium"
          required
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["warning-bottom-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-bottom-lg"
          label="Large + Warning Bottom"
          size="large"
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["warning-bottom-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="warning-bottom-lg-req"
          label="Large + Warning Bottom + Required"
          size="large"
          required
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["warning-bottom-lg-req"] || ""}
          onChange={setValue}
        />
      </Box>
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ValidationLabelInline = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="1px" display="flex" flexDirection="column">
        <TextInput
          name="inline-error-sm"
          label="Small + Error"
          size="small"
          labelInline
          inputWidth={60}
          error="Error message"
          value={state["inline-error-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-hint"
          label="Small + Error + Hint"
          size="small"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          error="Error message"
          value={state["inline-error-sm-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-char"
          label="Small + Error + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          characterLimit={15}
          error="Error message"
          value={state["inline-error-sm-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-hint-char"
          label="Small + Error + Hint + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          characterLimit={15}
          error="Error message"
          value={state["inline-error-sm-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-req"
          label="Small + Error + Required"
          size="small"
          labelInline
          inputWidth={60}
          required
          error="Error message"
          value={state["inline-error-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-req-hint"
          label="Small + Error + Required + Hint"
          size="small"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          error="Error message"
          value={state["inline-error-sm-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-req-char"
          label="Small + Error + Required + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          required
          characterLimit={15}
          error="Error message"
          value={state["inline-error-sm-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-sm-req-hint-char"
          label="Small + Error + Required + Hint + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          characterLimit={15}
          error="Error message"
          value={state["inline-error-sm-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm"
          label="Small + Warning"
          size="small"
          labelInline
          inputWidth={60}
          warning="Warning message"
          value={state["inline-warning-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-hint"
          label="Small + Warning + Hint"
          size="small"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          warning="Warning message"
          value={state["inline-warning-sm-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-char"
          label="Small + Warning + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          characterLimit={15}
          warning="Warning message"
          value={state["inline-warning-sm-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-hint-char"
          label="Small + Warning + Hint + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          characterLimit={15}
          warning="Warning message"
          value={state["inline-warning-sm-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-req"
          label="Small + Warning + Required"
          size="small"
          labelInline
          inputWidth={60}
          required
          warning="Warning message"
          value={state["inline-warning-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-req-hint"
          label="Small + Warning + Required + Hint"
          size="small"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          warning="Warning message"
          value={state["inline-warning-sm-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-req-char"
          label="Small + Warning + Required + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          required
          characterLimit={15}
          warning="Warning message"
          value={state["inline-warning-sm-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-sm-req-hint-char"
          label="Small + Warning + Required + Hint + CharLimit"
          size="small"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          characterLimit={15}
          warning="Warning message"
          value={state["inline-warning-sm-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md"
          label="Medium + Error"
          size="medium"
          labelInline
          inputWidth={60}
          error="Error message"
          value={state["inline-error-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-hint"
          label="Medium + Error + Hint"
          size="medium"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          error="Error message"
          value={state["inline-error-md-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-char"
          label="Medium + Error + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          characterLimit={20}
          error="Error message"
          value={state["inline-error-md-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-hint-char"
          label="Medium + Error + Hint + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          characterLimit={20}
          error="Error message"
          value={state["inline-error-md-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-req"
          label="Medium + Error + Required"
          size="medium"
          labelInline
          inputWidth={60}
          required
          error="Error message"
          value={state["inline-error-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-req-hint"
          label="Medium + Error + Required + Hint"
          size="medium"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          error="Error message"
          value={state["inline-error-md-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-req-char"
          label="Medium + Error + Required + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          required
          characterLimit={20}
          error="Error message"
          value={state["inline-error-md-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-md-req-hint-char"
          label="Medium + Error + Required + Hint + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          characterLimit={20}
          error="Error message"
          value={state["inline-error-md-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md"
          label="Medium + Warning"
          size="medium"
          labelInline
          inputWidth={60}
          warning="Warning message"
          value={state["inline-warning-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-hint"
          label="Medium + Warning + Hint"
          size="medium"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          warning="Warning message"
          value={state["inline-warning-md-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-char"
          label="Medium + Warning + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          characterLimit={20}
          warning="Warning message"
          value={state["inline-warning-md-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-hint-char"
          label="Medium + Warning + Hint + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          characterLimit={20}
          warning="Warning message"
          value={state["inline-warning-md-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-req"
          label="Medium + Warning + Required"
          size="medium"
          labelInline
          inputWidth={60}
          required
          warning="Warning message"
          value={state["inline-warning-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-req-hint"
          label="Medium + Warning + Required + Hint"
          size="medium"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          warning="Warning message"
          value={state["inline-warning-md-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-req-char"
          label="Medium + Warning + Required + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          required
          characterLimit={20}
          warning="Warning message"
          value={state["inline-warning-md-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-md-req-hint-char"
          label="Medium + Warning + Required + Hint + CharLimit"
          size="medium"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          characterLimit={20}
          warning="Warning message"
          value={state["inline-warning-md-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg"
          label="Large + Error"
          size="large"
          labelInline
          inputWidth={60}
          error="Error message"
          value={state["inline-error-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-hint"
          label="Large + Error + Hint"
          size="large"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          error="Error message"
          value={state["inline-error-lg-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-char"
          label="Large + Error + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          characterLimit={25}
          error="Error message"
          value={state["inline-error-lg-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-hint-char"
          label="Large + Error + Hint + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          characterLimit={25}
          error="Error message"
          value={state["inline-error-lg-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-req"
          label="Large + Error + Required"
          size="large"
          labelInline
          inputWidth={60}
          required
          error="Error message"
          value={state["inline-error-lg-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-req-hint"
          label="Large + Error + Required + Hint"
          size="large"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          error="Error message"
          value={state["inline-error-lg-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-req-char"
          label="Large + Error + Required + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          required
          characterLimit={25}
          error="Error message"
          value={state["inline-error-lg-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-lg-req-hint-char"
          label="Large + Error + Required + Hint + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          characterLimit={25}
          error="Error message"
          value={state["inline-error-lg-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg"
          label="Large + Warning"
          size="large"
          labelInline
          inputWidth={60}
          warning="Warning message"
          value={state["inline-warning-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-hint"
          label="Large + Warning + Hint"
          size="large"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          warning="Warning message"
          value={state["inline-warning-lg-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-char"
          label="Large + Warning + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          characterLimit={25}
          warning="Warning message"
          value={state["inline-warning-lg-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-hint-char"
          label="Large + Warning + Hint + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          inputHint="Hint text"
          characterLimit={25}
          warning="Warning message"
          value={state["inline-warning-lg-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-req"
          label="Large + Warning + Required"
          size="large"
          labelInline
          inputWidth={60}
          required
          warning="Warning message"
          value={state["inline-warning-lg-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-req-hint"
          label="Large + Warning + Required + Hint"
          size="large"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          warning="Warning message"
          value={state["inline-warning-lg-req-hint"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-req-char"
          label="Large + Warning + Required + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          required
          characterLimit={25}
          warning="Warning message"
          value={state["inline-warning-lg-req-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-lg-req-hint-char"
          label="Large + Warning + Required + Hint + CharLimit"
          size="large"
          labelInline
          inputWidth={60}
          required
          inputHint="Hint text"
          characterLimit={25}
          warning="Warning message"
          value={state["inline-warning-lg-req-hint-char"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-bottom-sm"
          label="Small + Error Bottom"
          size="small"
          labelInline
          inputWidth={60}
          error="Error message"
          validationMessagePositionTop={false}
          value={state["inline-error-bottom-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-bottom-sm-req"
          label="Small + Error Bottom + Required"
          size="small"
          labelInline
          inputWidth={60}
          required
          error="Error message"
          validationMessagePositionTop={false}
          value={state["inline-error-bottom-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-bottom-md"
          label="Medium + Error Bottom"
          size="medium"
          labelInline
          inputWidth={60}
          error="Error message"
          validationMessagePositionTop={false}
          value={state["inline-error-bottom-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-bottom-md-req"
          label="Medium + Error Bottom + Required"
          size="medium"
          labelInline
          inputWidth={60}
          required
          error="Error message"
          validationMessagePositionTop={false}
          value={state["inline-error-bottom-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-bottom-lg"
          label="Large + Error Bottom"
          size="large"
          labelInline
          inputWidth={60}
          error="Error message"
          validationMessagePositionTop={false}
          value={state["inline-error-bottom-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-error-bottom-lg-req"
          label="Large + Error Bottom + Required"
          size="large"
          labelInline
          inputWidth={60}
          required
          error="Error message"
          validationMessagePositionTop={false}
          value={state["inline-error-bottom-lg-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-bottom-sm"
          label="Small + Warning Bottom"
          size="small"
          labelInline
          inputWidth={60}
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["inline-warning-bottom-sm"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-bottom-sm-req"
          label="Small + Warning Bottom + Required"
          size="small"
          labelInline
          inputWidth={60}
          required
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["inline-warning-bottom-sm-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-bottom-md"
          label="Medium + Warning Bottom"
          size="medium"
          labelInline
          inputWidth={60}
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["inline-warning-bottom-md"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-bottom-md-req"
          label="Medium + Warning Bottom + Required"
          size="medium"
          labelInline
          inputWidth={60}
          required
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["inline-warning-bottom-md-req"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-bottom-lg"
          label="Large + Warning Bottom"
          size="large"
          labelInline
          inputWidth={60}
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["inline-warning-bottom-lg"] || ""}
          onChange={setValue}
        />
        <TextInput
          name="inline-warning-bottom-lg-req"
          label="Large + Warning Bottom + Required"
          size="large"
          labelInline
          inputWidth={60}
          required
          warning="Warning message"
          validationMessagePositionTop={false}
          value={state["inline-warning-bottom-lg-req"] || ""}
          onChange={setValue}
        />
      </Box>
    </>
  );
};
ValidationLabelInline.storyName = "Validation - Label Inline";
ValidationLabelInline.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
