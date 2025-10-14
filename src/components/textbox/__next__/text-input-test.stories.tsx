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
    <TextInput
      m={2}
      value={state}
      onChange={setValue}
      {...getCommonTextInputArgsWithSpecialCharacters(args)}
    />
  );
};
Default.storyName = "Default";
Default.argTypes = commonTextInputArgTypes();
Default.args = getCommonTextInputArgs();
Default.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AutoFocus = () => {
  const [state, setState] = useState("");
  const setValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  return (
    <TextInput autoFocus label="TextInput" value={state} onChange={setValue} />
  );
};
AutoFocus.storyName = "Auto Focus";

export const ValidationSmallError = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationSmallError.storyName = "Validation - Small Error";

export const ValidationSmallWarning = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationSmallWarning.storyName = "Validation - Small Warning";

export const ValidationMediumError = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationMediumError.storyName = "Validation - Medium Error";

export const ValidationMediumWarning = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationMediumWarning.storyName = "Validation - Medium Warning";

export const ValidationLargeError = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationLargeError.storyName = "Validation - Large Error";

export const ValidationLargeWarning = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationLargeWarning.storyName = "Validation - Large Warning";

export const ValidationInlineSmallError = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationInlineSmallError.storyName = "Validation - Inline Small Error";

export const ValidationInlineSmallWarning = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationInlineSmallWarning.storyName = "Validation - Inline Small Warning";

export const ValidationInlineMediumError = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationInlineMediumError.storyName = "Validation - Inline Medium Error";

export const ValidationInlineMediumWarning = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationInlineMediumWarning.storyName = "Validation - Inline Medium Warning";

export const ValidationInlineLargeError = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationInlineLargeError.storyName = "Validation - Inline Large Error";

export const ValidationInlineLargeWarning = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
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
      </Box>
    </>
  );
};
ValidationInlineLargeWarning.storyName = "Validation - Inline Large Warning";

export const Disabled = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
        <TextInput
          name="disabled"
          label="Disabled"
          disabled
          value={state["disabled"] || "Disabled value"}
          onChange={setValue}
        />
        <TextInput
          name="disabled-hint"
          label="Disabled + Hint"
          disabled
          inputHint="Hint text"
          value={state["disabled-hint"] || "Disabled value"}
          onChange={setValue}
        />
        <TextInput
          name="disabled-icon"
          label="Disabled + Icon"
          disabled
          inputIcon="search"
          value={state["disabled-icon"] || "Disabled value"}
          onChange={setValue}
        />
      </Box>
    </>
  );
};
Disabled.storyName = "Disabled";

export const ReadOnly = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box gap="8px" display="flex" flexDirection="column">
        <TextInput
          name="readonly"
          label="Read Only"
          readOnly
          value={state["readonly"] || "Read only value"}
          onChange={setValue}
        />
        <TextInput
          name="readonly-hint"
          label="Read Only + Hint"
          readOnly
          inputHint="Hint text"
          value={state["readonly-hint"] || "Read only value"}
          onChange={setValue}
        />
        <TextInput
          name="readonly-icon"
          label="Read Only + Icon"
          readOnly
          inputIcon="search"
          value={state["readonly-icon"] || "Read only value"}
          onChange={setValue}
        />
      </Box>
    </>
  );
};
ReadOnly.storyName = "Read Only";
