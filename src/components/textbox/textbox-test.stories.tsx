import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
import Link from "../link";
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
      <Box display="flex" mb={2} justifyContent="space-evenly">
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox small error above"
            label="Textbox small error above"
            inputHint="Hint text"
            size="small"
            error="Error message"
            value={state["textbox small error above"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox small warning above"
            label="Textbox small warning above"
            inputHint="Hint text"
            size="small"
            warning="Warning message"
            value={state["textbox small warning above"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          mb={2}
        >
          <Textbox
            name="textbox medium error above"
            label="Textbox medium error above"
            inputHint="Hint text"
            size="medium"
            error="Error message"
            value={state["textbox medium error above"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox medium warning above"
            label="Textbox medium warning above"
            inputHint="Hint text"
            size="medium"
            warning="Warning message"
            value={state["textbox medium warning above"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          mb={2}
        >
          <Textbox
            name="textbox large error above"
            label="Textbox large error above"
            inputHint="Hint text"
            size="large"
            error="Error message"
            value={state["textbox large error above"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox large warning above"
            label="Textbox large warning above"
            inputHint="Hint text"
            size="large"
            warning="Warning message"
            value={state["textbox large warning above"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox small error below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="small"
            label="Textbox small error below"
            error="Error message"
            value={state["textbox small error below"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox small warning below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="small"
            label="Textbox small warning below"
            warning="Warning message"
            value={state["textbox small warning below"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox medium error below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="medium"
            label="Textbox medium error below"
            error="Error message"
            value={state["textbox medium error below"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox medium warning below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="medium"
            label="Textbox medium warning below"
            warning="Warning message"
            value={state["textbox medium warning below"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox large error below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="large"
            label="Textbox large error below"
            error="Error message"
            value={state["textbox large error below"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox large warning below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="large"
            label="Textbox large warning below"
            warning="Warning message"
            value={state["textbox large warning below"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
      </Box>
    </>
  );
};
Validation.storyName = "Validation";

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
